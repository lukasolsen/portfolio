import { useState, useCallback, useRef, useEffect } from "react";

interface SpeechReaderState {
  isSpeaking: boolean;
  isPaused: boolean;
  currentWordIndex: number;
  currentWord: string;
  progress: number;
  isSupported: boolean;
}

interface UseSpeechReaderOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: string;
  onWordBoundary?: (index: number, word: string) => void;
  onComplete?: () => void;
}

export function useSpeechReader(options: UseSpeechReaderOptions = {}) {
  const {
    rate = 1,
    pitch = 1,
    volume = 1,
    lang = "en-US",
    onWordBoundary,
    onComplete,
  } = options;

  const [state, setState] = useState<SpeechReaderState>({
    isSpeaking: false,
    isPaused: false,
    currentWordIndex: -1,
    currentWord: "",
    progress: 0,
    isSupported: typeof window !== "undefined" && "speechSynthesis" in window,
  });

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const wordsRef = useRef<string[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordRefsMap = useRef<Map<number, HTMLElement>>(new Map());

  const speak = useCallback(
    (text: string) => {
      if (!state.isSupported) return;

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;
      utterance.lang = lang;

      wordsRef.current = text.split(/\s+/);

      utterance.onstart = () => {
        setState((prev) => ({ ...prev, isSpeaking: true, isPaused: false }));
      };

      utterance.onend = () => {
        setState((prev) => ({
          ...prev,
          isSpeaking: false,
          isPaused: false,
          currentWordIndex: -1,
          currentWord: "",
          progress: 100,
        }));
        onComplete?.();
      };

      utterance.onerror = (event) => {
        if (event.error !== "canceled") {
          setState((prev) => ({
            ...prev,
            isSpeaking: false,
            isPaused: false,
          }));
        }
      };

      utterance.onboundary = (event) => {
        if (event.name === "word") {
          const charIndex = event.charIndex;
          const textBefore = text.substring(0, charIndex);
          const wordIndex = textBefore.split(/\s+/).length - 1;

          setState((prev) => ({
            ...prev,
            currentWordIndex: wordIndex,
            currentWord: wordsRef.current[wordIndex] || "",
            progress: (wordIndex / wordsRef.current.length) * 100,
          }));

          onWordBoundary?.(wordIndex, wordsRef.current[wordIndex] || "");

          // Scroll to the highlighted word
          const wordEl = wordRefsMap.current.get(wordIndex);
          if (wordEl) {
            wordEl.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "nearest",
            });
          }
        }
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [rate, pitch, volume, lang, state.isSupported, onWordBoundary, onComplete]
  );

  const pause = useCallback(() => {
    if (state.isSupported && state.isSpeaking) {
      window.speechSynthesis.pause();
      setState((prev) => ({ ...prev, isPaused: true }));
    }
  }, [state.isSupported, state.isSpeaking]);

  const resume = useCallback(() => {
    if (state.isSupported && state.isPaused) {
      window.speechSynthesis.resume();
      setState((prev) => ({ ...prev, isPaused: false }));
    }
  }, [state.isSupported, state.isPaused]);

  const stop = useCallback(() => {
    if (state.isSupported) {
      window.speechSynthesis.cancel();
      setState((prev) => ({
        ...prev,
        isSpeaking: false,
        isPaused: false,
        currentWordIndex: -1,
        currentWord: "",
        progress: 0,
      }));
    }
  }, [state.isSupported]);

  const togglePlayPause = useCallback(() => {
    if (state.isSpeaking && !state.isPaused) {
      pause();
    } else if (state.isPaused) {
      resume();
    }
  }, [state.isSpeaking, state.isPaused, pause, resume]);

  // Register word element refs
  const registerWord = useCallback((index: number, element: HTMLElement | null) => {
    if (element) {
      wordRefsMap.current.set(index, element);
    } else {
      wordRefsMap.current.delete(index);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (state.isSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [state.isSupported]);

  return {
    ...state,
    speak,
    pause,
    resume,
    stop,
    togglePlayPause,
    registerWord,
    containerRef,
    words: wordsRef.current,
  };
}
