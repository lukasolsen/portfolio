import { type FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlaygroundCanvas } from "./playground-canvas";
import { PlaygroundSidebar } from "./playground-sidebar";
import { RequestPanel } from "./request-panel";
import { Button } from "@/components/ui/button";
import { PanelRightOpen } from "lucide-react";

export const PlaygroundLayout: FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-1 h-full overflow-hidden">
      <main className="flex-1 relative flex flex-col h-max overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <PlaygroundCanvas />
        </div>
        <RequestPanel />

        {!isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-4 right-4 z-50"
          >
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-xl bg-background/70 backdrop-blur-xl shadow-lg border-border/30"
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
            animate={{ width: 340, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="h-full overflow-hidden flex flex-col"
          >
            <PlaygroundSidebar onClose={() => setSidebarOpen(false)} />
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};
