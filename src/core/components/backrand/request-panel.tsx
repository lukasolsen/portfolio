import { useState, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, Clock, Check, X } from "lucide-react";
import { useBackrand, type RequestLog } from "@/context/backrand-context";
import { cn } from "@/lib/utils";
import { CodeBlockContent } from "@/components/kibo-ui/code-block";

const MethodBadge = ({ method }: { method: string }) => (
  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-medium bg-green-500/10 text-green-600 dark:text-green-400">
    {method}
  </span>
);

const StatusBadge = ({ status }: { status: number }) => {
  const ok = status >= 200 && status < 300;
  return (
    <span
      className={cn(
        "flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-medium",
        ok
          ? "bg-green-500/10 text-green-600 dark:text-green-400"
          : "bg-red-500/10 text-red-600 dark:text-red-400"
      )}
    >
      {ok ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
      {status}
    </span>
  );
};

const JsonView = ({ data, label }: { data: unknown; label?: string }) => {
  const formatted = JSON.stringify(data, null, 2);
  return (
    <div className="space-y-1">
      {label && (
        <span className="text-[9px] font-mono text-muted-foreground/40 uppercase">
          {label}
        </span>
      )}
      <div className="json-view rounded-lg overflow-hidden max-h-48 overflow-y-auto bg-[#f8f9fa] dark:bg-[#1a1b26] scrollbar-thin">
        <CodeBlockContent language="json">
          {formatted}
        </CodeBlockContent>
      </div>
    </div>
  );
};

const RequestEntry = ({ entry }: { entry: RequestLog }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-border/20 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-muted/30 transition-colors text-left"
      >
        <StatusBadge status={entry.status} />
        <MethodBadge method={entry.method} />
        <span className="text-[11px] font-mono text-muted-foreground/60 flex-1 truncate">
          {entry.endpoint}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-muted-foreground/40">
          <Clock className="w-2.5 h-2.5" />
          {entry.duration}ms
        </span>
        <span className="text-[10px] text-muted-foreground/30">
          {entry.timestamp}
        </span>
        {expanded ? (
          <ChevronDown className="w-3 h-3 text-muted-foreground/30" />
        ) : (
          <ChevronUp className="w-3 h-3 text-muted-foreground/30" />
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 space-y-3 border-t border-border/20">
              <div className="pt-2">
                <JsonView data={entry.body} label="Request Body" />
              </div>

              {Object.keys(entry.responseHeaders).length > 0 && (
                <JsonView data={entry.responseHeaders} label="Response Headers" />
              )}

              {entry.error && (
                <div className="p-2 rounded-lg bg-red-500/5 border border-red-500/20">
                  <span className="text-[10px] font-mono text-red-500/70">
                    {entry.error}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const RequestPanel: FC = () => {
  const { requestLog } = useBackrand();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="shrink-0 border-t border-border/30 bg-background/90 backdrop-blur-xl z-30">
      {/* Toggle bar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 hover:bg-muted/20 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-muted-foreground">
            Network
          </span>
          {requestLog.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-muted text-[9px] font-mono text-muted-foreground/60">
              {requestLog.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {requestLog.length > 0 && !isOpen && (
            <span className="text-[10px] text-muted-foreground/40">
              {requestLog[0].status === 200 ? "Last: 200 OK" : `Last: ${requestLog[0].status}`}
            </span>
          )}
          {isOpen ? (
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground/40" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5 text-muted-foreground/40" />
          )}
        </div>
      </button>

      {/* Panel content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 240 }}
            exit={{ height: 0 }}
            className="overflow-hidden border-t border-border/20"
          >
            <div className="h-[240px] overflow-y-auto p-3 space-y-2 scrollbar-thin">
              {requestLog.length === 0 ? (
                <div className="flex items-center justify-center h-full text-[11px] text-muted-foreground/40">
                  No requests yet. Generate an image to see the network activity.
                </div>
              ) : (
                requestLog.map((entry) => (
                  <RequestEntry key={entry.id} entry={entry} />
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
