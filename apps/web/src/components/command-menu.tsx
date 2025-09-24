"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Home,
  GitBranch,
  PlayCircle,
  KeySquare,
  LayoutGrid,
  Settings2,
  Plus,
  Search,
} from "lucide-react";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onAction = useCallback((path: string) => {
    setOpen(false);
    router.push(path);
  }, [router]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Command Menu">
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => onAction("/home")}> <Home className="mr-2 size-4"/> Home</CommandItem>
          <CommandItem onSelect={() => onAction("/workflows")}> <GitBranch className="mr-2 size-4"/> Workflows</CommandItem>
          <CommandItem onSelect={() => onAction("/executions")}> <PlayCircle className="mr-2 size-4"/> Executions</CommandItem>
          <CommandItem onSelect={() => onAction("/credentials")}> <KeySquare className="mr-2 size-4"/> Credentials</CommandItem>
          <CommandItem onSelect={() => onAction("/templates")}> <LayoutGrid className="mr-2 size-4"/> Templates</CommandItem>
          <CommandItem onSelect={() => onAction("/settings")}> <Settings2 className="mr-2 size-4"/> Settings</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => onAction("/workflows?new=1")}> <Plus className="mr-2 size-4"/> New Workflow</CommandItem>
          <CommandItem onSelect={() => setOpen(false)}> <Search className="mr-2 size-4"/> Close</CommandItem>
        </CommandGroup>
      </CommandList>
      <div className="border-t px-3 py-2 text-xs text-muted-foreground">
        Press ⌘K / Ctrl K to open anywhere
      </div>
    </CommandDialog>
  );
}


