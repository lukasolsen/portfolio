import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SpeechReaderButtonProps {
  targetRef: React.RefObject<HTMLElement>;
}

interface SpeechVoice {
  name: string;
  lang: string;
  localService: boolean;
}

export function SpeechReaderButton({ targetRef }: SpeechReaderButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [totalWords, setTotalWords] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isSupported, setIsSupported] = useState(false);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);

  const [rate, setRate] = useState([0.9]);
  const [pitch, setPitch] = useState([1]);
  const [volume, setVolume] = useState([1]);
  const [voiceURI, setVoiceURI] = useState("");
  const [voices, setVoices] = useState<SpeechVoice[]>([]);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const charToWordRef = useRef<Map<number, number>>(new Map());
  const wordRectsRef = useRef<Map<number, DOMRect>>(new Map());

  // Load available voices
  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setIsSupported(false);
      return;
    }
    setIsSupported(true);

    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      const english = available
        .filter((v) => v.lang.startsWith("en"))
        .map((v) => ({
          name: v.name,
          lang: v.lang,
          localService: v.localService,
          voiceURI: v.voiceURI,
        }));

      setVoices(english);

      // Pick a good default voice: prefer Google or Microsoft natural voices
      if (!voiceURI && english.length > 0) {
        const preferred =
          english.find(
            (v) =>
              v.name.includes("Google") && v.name.includes("English")
          ) ||
          english.find(
            (v) =>
              (v.name.includes("Microsoft") ||
                v.name.includes("Natural")) &&
              v.name.includes("English")
          ) ||
          english.find((v) => v.name.includes("Google")) ||
          english.find((v) => v.name.includes("Samantha")) ||
          english[0];
        setVoiceURI(preferred.voiceURI);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, [voiceURI]);

  // Build char-index → word-index mapping and cache word rects
  const buildIndex = useCallback(() => {
    if (!targetRef.current) return;

    const container = targetRef.current;
    const charMap = new Map<number, number>();
    const rects = new Map<number, DOMRect>();

    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      null
    );

    let globalCharOffset = 0;
    let wordIndex = 0;
    let node;

    while ((node = walker.nextNode())) {
      const textNode = node as Text;
      const text = textNode.textContent || "";

      // Walk through each character, track word boundaries
      let inWord = false;
      let wordStart = 0;

      for (let i = 0; i <= text.length; i++) {
        const isSpace = i === text.length || /\s/.test(text[i]);

        if (!isSpace && !inWord) {
          // Start of a new word
          inWord = true;
          wordStart = i;
        } else if (isSpace && inWord) {
          // End of a word — get its rect
          inWord = false;
          try {
            const range = document.createRange();
            range.setStart(textNode, wordStart);
            range.setEnd(textNode, i);
            const rect = range.getBoundingClientRect();
            if (rect.width > 0) {
              rects.set(wordIndex, rect);
            }
          } catch {
            // ignore
          }
          wordIndex++;
        }

        // Map this global char offset to the word it belongs to
        charMap.set(globalCharOffset + i, inWord ? wordIndex : wordIndex);
      }

      // Handle word that runs to end of text node
      if (inWord) {
        charMap.set(globalCharOffset + text.length, wordIndex);
      }

      globalCharOffset += text.length;
    }

    charToWordRef.current = charMap;
    wordRectsRef.current = rects;
    setTotalWords(wordIndex);
  }, [targetRef]);

  // Given a charIndex from onboundary, find which word it maps to
  const charIndexToWordIndex = useCallback(
    (charIndex: number): number => {
      const map = charToWordRef.current;
      // Find the closest char offset that exists in our map
      let best = -1;
      for (const [offset, wordIdx] of map) {
        if (offset <= charIndex) {
          best = wordIdx;
        } else {
          break;
        }
      }
      return best;
    },
    []
  );

  // Scroll to keep word visible
  const scrollToWord = useCallback((rect: DOMRect) => {
    const scrollY = window.scrollY;
    const viewTop = scrollY;
    const viewBottom = scrollY + window.innerHeight;
    const wordTop = rect.top + scrollY;
    const wordBottom = wordTop + rect.height;

    if (wordTop < viewTop + 120 || wordBottom > viewBottom - 120) {
      window.scrollTo({
        top: wordTop - window.innerHeight / 3,
        behavior: "smooth",
      });
    }
  }, []);

  const showHighlight = useCallback(
    (index: number) => {
      const rect = wordRectsRef.current.get(index);
      if (!rect || rect.width === 0) return;

      setHighlight({
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
        w: rect.width,
        h: rect.height,
      });

      scrollToWord(rect);
    },
    [scrollToWord]
  );

  const clearHighlight = useCallback(() => {
    setHighlight(null);
  }, []);

  const getSelectedVoice = useCallback((): SpeechSynthesisVoice | null => {
    if (!voiceURI) return null;
    const all = window.speechSynthesis.getVoices();
    return all.find((v) => v.voiceURI === voiceURI) || null;
  }, [voiceURI]);

  const speak = useCallback(() => {
    if (!targetRef.current || !isSupported) return;

    window.speechSynthesis.cancel();

    // Build index before speaking
    buildIndex();

    const text = targetRef.current.textContent || "";

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate[0];
    utterance.pitch = pitch[0];
    utterance.volume = volume[0];
    utterance.lang = "en-US";

    const voice = getSelectedVoice();
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentWordIndex(-1);
      setProgress(100);
      clearHighlight();
    };

    utterance.onerror = (event) => {
      if (event.error !== "canceled") {
        setIsSpeaking(false);
        setIsPaused(false);
        clearHighlight();
      }
    };

    utterance.onboundary = (event) => {
      if (event.name === "word") {
        const wordIdx = charIndexToWordIndex(event.charIndex);
        if (wordIdx >= 0) {
          setCurrentWordIndex(wordIdx);
          setProgress(
            totalWords > 0 ? Math.round((wordIdx / totalWords) * 100) : 0
          );
          showHighlight(wordIdx);
        }
      }
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [
    targetRef,
    isSupported,
    rate,
    pitch,
    volume,
    buildIndex,
    getSelectedVoice,
    charIndexToWordIndex,
    showHighlight,
    clearHighlight,
    totalWords,
  ]);

  const pause = useCallback(() => {
    if (isSupported && isSpeaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isSupported, isSpeaking]);

  const resume = useCallback(() => {
    if (isSupported && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [isSupported, isPaused]);

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentWordIndex(-1);
      setProgress(0);
      clearHighlight();
    }
  }, [isSupported, clearHighlight]);

  const togglePlayPause = useCallback(() => {
    if (!isSpeaking) {
      speak();
    } else if (isPaused) {
      resume();
    } else {
      pause();
    }
  }, [isSpeaking, isPaused, speak, pause, resume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSupported]);

  if (!isSupported) return null;

  const selectedVoiceName =
    voices.find((v) => v.voiceURI === voiceURI)?.name || "";

  return (
    <>
      {/* Highlight overlay */}
      {highlight && (
        <div
          className="fixed z-[9999] pointer-events-none"
          style={{
            left: highlight.x,
            top: highlight.y,
            width: highlight.w,
            height: highlight.h,
            backgroundColor: "rgba(217, 119, 87, 0.12)",
            borderRadius: "3px",
            boxShadow: "0 0 0 2px rgba(217, 119, 87, 0.25)",
            transition:
              "left 0.12s ease, top 0.12s ease, width 0.12s ease, height 0.12s ease",
          }}
        />
      )}

      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.5,
        }}
      >
        <Popover open={open} onOpenChange={setOpen}>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <motion.button
                  className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-background/80 backdrop-blur-xl border border-border/40 shadow-lg hover:shadow-primary/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSpeaking && (
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5"
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="relative z-10 text-foreground/60"
                  >
                    <path d="M12 6a3 3 0 0 0-3 3v4a3 3 0 0 0 6 0V9a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" x2="12" y1="19" y2="22" />
                  </svg>
                </motion.button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>
              Read aloud
            </TooltipContent>
          </Tooltip>

          <PopoverContent
            side="right"
            align="end"
            alignOffset={-8}
            sideOffset={12}
            className="w-80 p-0 overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 pt-4 pb-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">
                  {isSpeaking && !isPaused
                    ? "Reading..."
                    : isPaused
                      ? "Paused"
                      : "Speech Reader"}
                </p>
                {isSpeaking && (
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {currentWordIndex + 1}/{totalWords}
                  </span>
                )}
              </div>
              {isSpeaking && (
                <div className="mt-2">
                  <div className="h-1 bg-muted/40 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Controls */}
            <div className="px-4 py-3">
              <div className="flex items-center justify-center gap-1.5">
                {(isSpeaking || isPaused) && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    onClick={stop}
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted/50 hover:bg-muted text-foreground/60 hover:text-foreground transition-colors"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="currentColor"
                    >
                      <rect x="3" y="3" width="8" height="8" rx="1.5" />
                    </svg>
                  </motion.button>
                )}

                <motion.button
                  onClick={togglePlayPause}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:shadow-primary/30 transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSpeaking && !isPaused ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <rect x="3" y="2" width="3.5" height="12" rx="1" />
                      <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M4 2v12l10-6L4 2z" />
                    </svg>
                  )}
                </motion.button>
              </div>
            </div>

            <Separator />

            {/* Settings */}
            <div className="px-4 py-3 space-y-3">
              {/* Voice selector */}
              {voices.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-muted-foreground">
                    Voice
                  </label>
                  <select
                    value={voiceURI}
                    onChange={(e) => setVoiceURI(e.target.value)}
                    className="w-full text-xs bg-muted/50 border border-border/40 rounded-lg px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-shadow appearance-none cursor-pointer"
                  >
                    {voices.map((v) => (
                      <option key={v.voiceURI} value={v.voiceURI}>
                        {v.name.replace(/Microsoft |Google /, "")} ({v.lang})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Speed */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-medium text-muted-foreground">
                    Speed
                  </label>
                  <span className="text-[10px] font-mono text-muted-foreground/60">
                    {rate[0].toFixed(1)}x
                  </span>
                </div>
                <Slider
                  value={rate}
                  onValueChange={setRate}
                  min={0.5}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* Pitch */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-medium text-muted-foreground">
                    Pitch
                  </label>
                  <span className="text-[10px] font-mono text-muted-foreground/60">
                    {pitch[0].toFixed(1)}
                  </span>
                </div>
                <Slider
                  value={pitch}
                  onValueChange={setPitch}
                  min={0.5}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* Volume */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-medium text-muted-foreground">
                    Volume
                  </label>
                  <span className="text-[10px] font-mono text-muted-foreground/60">
                    {Math.round(volume[0] * 100)}%
                  </span>
                </div>
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  min={0}
                  max={1}
                  step={0.1}
                  className="w-full"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </motion.div>
    </>
  );
}
