"use client";

import { ReactNode } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  trailing?: ReactNode;
};

export function PageHeader({ title, subtitle, actions, trailing }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 min-w-0">
        <SidebarTrigger />
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold leading-tight truncate">{title}</h1>
          {subtitle ? (
            <p className="text-muted-foreground text-sm truncate">{subtitle}</p>
          ) : null}
        </div>
        {actions ? <div className="hidden sm:flex items-center gap-2">{actions}</div> : null}
      </div>
      {trailing}
    </div>
  );
}


