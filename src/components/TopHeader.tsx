"use client";

import { usePathname } from "next/navigation";
import { Search, Bell, Sparkles, Menu } from "lucide-react";

export default function TopHeader({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean, setSidebarOpen: (v: boolean) => void }) {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6 sticky top-0 z-20">
      <div className="flex items-center gap-4 flex-none">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 -ml-2 text-muted-foreground hover:bg-secondary/30 rounded-md transition-all active:scale-95"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 max-w-2xl px-4 md:px-8 hidden sm:block">
        <div className="relative group">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <input
            type="text"
            placeholder="Search customers, interactions..."
            className="w-full h-9 pl-10 pr-4 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground shadow-sm"
          />
        </div>
      </div>

      <div className="flex-none flex items-center justify-end gap-3 sm:gap-6">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/30 border border-secondary text-xs font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          <span>AI Engine Active</span>
        </div>

        <button className="relative text-muted-foreground hover:text-foreground hover:bg-secondary/30 p-2 rounded-full transition-all active:scale-95">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-card"></span>
        </button>

        <button className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-sm transition-transform active:scale-95 hover:shadow-sm">
          A
        </button>
      </div>
    </header>
  );
}
