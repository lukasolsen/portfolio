import { useMemo, type FC } from "react";
import { Toaster } from "../components/ui/sonner";
import { InstanceHeader } from "./header";
import { Outlet, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export const Layout: FC = () => {
  const { location } = useRouterState();

  const isPlayground = useMemo(() => {
    return location.pathname.includes("/playground");
  }, [location.pathname]);

  return (
    <div
      className={cn(
        "flex flex-col min-h-screen w-full mx-auto px-8",
        isPlayground ? "max-w-full" : "max-w-6xl"
      )}
    >
      <InstanceHeader />
      <Toaster closeButton richColors />

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <footer className="w-full p-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Lukas Olsen. All rights reserved.
      </footer>
    </div>
  );
};
