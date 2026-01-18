import { User, History, HeadphonesIcon } from "lucide-react";

const actions = [
  {
    icon: User,
    label: "My Profile",
    description: "View details",
  },
  {
    icon: History,
    label: "Donation History",
    description: "Past donations",
  },
  {
    icon: HeadphonesIcon,
    label: "Support",
    description: "Get help",
  },
];

export const QuickActions = () => {
  return (
    <div className="animate-fade-up-delay-3">
      <h2 className="text-lg font-semibold text-foreground mb-3 px-1">
        Quick Actions
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {actions.map((action, index) => (
          <button
            key={action.label}
            className="flex flex-col items-center gap-2 p-4 bg-card rounded-2xl card-shadow hover:shadow-soft transition-all active:scale-95 cursor-not-allowed opacity-80"
            disabled
          >
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
              <action.icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">{action.label}</p>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
