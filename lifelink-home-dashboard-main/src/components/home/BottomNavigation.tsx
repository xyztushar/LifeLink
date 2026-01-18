import { Home, Bell, User } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Bell, label: "Alerts", active: false },
  { icon: User, label: "Profile", active: false },
];

export const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-6 pb-safe animate-fade-up-delay-4">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`
              flex flex-col items-center gap-1 py-2 px-6 rounded-xl transition-all
              ${item.active 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
              }
            `}
          >
            <div className={`
              p-2 rounded-xl transition-all
              ${item.active ? 'bg-primary/10' : ''}
            `}>
              <item.icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
