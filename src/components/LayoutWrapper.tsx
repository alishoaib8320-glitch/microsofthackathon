"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground transition-colors duration-300">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <TopHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 relative">
          <div className="mx-auto w-full h-full animate-in fade-in duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
