"use client";
import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Plus, LogOut, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
const AppSidebarFooter = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex gap-1" style={{ alignItems: "center" }}>
      {mounted && (
        <Button
          variant="outline"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
      )}
      <Link href="/workflows/new">
        <Button className="bg-crew hover:bg-crew-dark">
          <Plus />
          New Workflow
        </Button>
      </Link>
      <Link href="/">
        <Button variant="outline">
          <LogOut />
        </Button>
      </Link>
    </div>
  );
};

export default AppSidebarFooter;
