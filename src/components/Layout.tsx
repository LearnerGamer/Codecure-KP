import { Link, useLocation } from "wouter";
import { 
  Activity, 
  LayoutDashboard, 
  Stethoscope, 
  Ambulance, 
  Bot, 
  LogOut 
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
  role?: "admin" | "doctor" | "ambulance" | "public";
}

export default function Layout({ children, role = "public" }: LayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { label: "AI Doctor", icon: Bot, href: "/ai-doctor", roles: ["public", "admin", "doctor", "ambulance"] },
    { label: "Admin", icon: LayoutDashboard, href: "/admin", roles: ["admin"] },
    { label: "Doctor Portal", icon: Stethoscope, href: "/doctor", roles: ["doctor"] },
    { label: "Ambulance", icon: Ambulance, href: "/ambulance", roles: ["ambulance"] },
  ];

  const filteredNav = navItems.filter(item => item.roles.includes(role));

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 fixed h-full z-10 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-slate-900 leading-none">VITAL-SYNC</h1>
              <p className="text-xs text-muted-foreground font-medium mt-1">Smart Hospital System</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {filteredNav.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer
                  ${isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}
                `}>
                  <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/5">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </Link>
        </div>
      </aside>

      {/* Mobile Header (visible only on small screens) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b z-20 flex items-center px-4 justify-between">
         <Link href="/" className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            <span className="font-display font-bold text-lg">VITAL-SYNC</span>
         </Link>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen pt-16 md:pt-0">
        <div className="max-w-7xl mx-auto p-4 md:p-8 animate-in">
          {children}
        </div>
      </main>
    </div>
  );
}
