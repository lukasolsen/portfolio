import type { FC } from "react";
import { Toaster } from "../components/ui/sonner";
import { InstanceHeader } from "./header";
import { Outlet } from "@tanstack/react-router";

export const Layout: FC = () => {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-6xl mx-auto px-8">
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
