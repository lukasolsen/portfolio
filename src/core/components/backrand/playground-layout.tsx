import { type FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlaygroundCanvas } from "./playground-canvas";
import { PlaygroundSidebar } from "./playground-sidebar";
import { Button } from "@/components/ui/button";
import { PanelRightOpen } from "lucide-react";

export const PlaygroundLayout: FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-1 h-full overflow-hidden relative">
      <main className="flex-1 relative flex flex-col h-full overflow-hidden bg-muted/20">
        <PlaygroundCanvas />

        {!isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-4 right-4 z-50"
          >
            <Button
              variant="outline"
              size="icon"
              className="rounded-full shadow-lg bg-background/50 backdrop-blur-md"
              onClick={() => setSidebarOpen(true)}
            >
              <PanelRightOpen className="w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </main>

      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 380, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="h-full border-l border-border bg-card/50 backdrop-blur-xl z-40 flex flex-col shadow-2xl"
          >
            <PlaygroundSidebar onClose={() => setSidebarOpen(false)} />
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};
