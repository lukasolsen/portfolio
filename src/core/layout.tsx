import { useMemo, type FC } from "react";
import { InstanceHeader } from "./header";
import { Outlet, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export const Layout: FC = () => {
  const currentDate = new Date();
  const { location } = useRouterState();

  const isPlayground = useMemo(() => {
    return location.pathname.includes("/playground");
  }, [location.pathname]);

  return (
    <div
      className={cn(
        "flex flex-col min-h-screen w-full mx-auto ",
        isPlayground ? "" : "max-w-6xl px-8",
      )}
    >
      <InstanceHeader />

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <footer className="w-full p-4 text-center text-sm text-muted-foreground">
        © {currentDate.getFullYear()} Lukas Olsen. All rights reserved.
      </footer>
    </div>
  );
};
