"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  ListOrdered,
  Map,
  MessageSquare,
  BarChart,
  Zap,
  Sparkles,
  Settings,
  BrainCircuit,
  MessageCircle,
} from "lucide-react";

const mainNav = [
  { name: "AI Assistant", href: "/chat", icon: MessageCircle },
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Priority Queue", href: "/priority-queue", icon: ListOrdered },
  { name: "Visit Planner", href: "/visit-planner", icon: Map },
  { name: "Interactions", href: "/interactions", icon: MessageSquare },
  { name: "Analytics", href: "/analytics", icon: BarChart },
];

const aiNav = [
  { name: "Automation", href: "/automation", icon: Zap },
  { name: "AI Insights", href: "/insights", icon: Sparkles },
];

const bottomNav = [
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (v: boolean) => void }) {
  const pathname = usePathname();

  const NavItem = ({ item }: { item: any }) => {
    const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");
    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all active:scale-[0.98] text-sm font-medium whitespace-nowrap overflow-hidden",
          isActive
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
        )}
      >
        <item.icon className="h-5 w-5 shrink-0" />
        <span className={cn("transition-opacity duration-300", isOpen ? "opacity-100" : "opacity-0")}>
          {item.name}
        </span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-background/80 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside 
        className={cn(
          "border-r border-border bg-card flex flex-col h-screen shrink-0 sticky top-0 transition-all duration-300 ease-in-out z-30",
          isOpen ? "w-[240px] translate-x-0" : "w-[72px] -translate-x-full lg:translate-x-0"
        )}
      >
        <div className="h-16 flex items-center px-5 border-b border-border overflow-hidden">
          <Link href="/" className="flex items-center gap-3 font-bold text-lg text-primary min-w-max">
            <div className="bg-primary/10 p-1.5 rounded-lg flex items-center justify-center shrink-0">
              <BrainCircuit className="h-6 w-6" />
            </div>
            <span className={cn("transition-opacity duration-300", isOpen ? "opacity-100" : "opacity-0")}>
              HumanTouch AI
            </span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 flex flex-col gap-6 custom-scrollbar">
          <div className="flex flex-col gap-1.5">
            {mainNav.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </div>

          <div>
            <div className="h-px bg-border/60 my-3 mx-3" />
            <div className="flex flex-col gap-1.5">
              {aiNav.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-border mt-auto overflow-hidden">
          <div className="flex flex-col gap-1 mb-2">
            {bottomNav.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </div>
          <div className="flex items-center gap-3 px-3 py-3 mt-2 rounded-md hover:bg-secondary/20 transition-colors cursor-pointer min-w-max">
            <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-primary font-bold shrink-0">
              A
            </div>
            <div className={cn("flex flex-col transition-opacity duration-300", isOpen ? "opacity-100" : "opacity-0 w-0")}>
              <span className="text-sm font-medium text-foreground">Alex M.</span>
              <span className="text-xs text-muted-foreground">Sales Manager</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
