import { User, Droplets } from "lucide-react";

interface HeaderProps {
  name: string;
  bloodGroup: string;
}

export const Header = ({ name, bloodGroup }: HeaderProps) => {
  return (
    <header className="px-4 pt-6 pb-4 animate-fade-up">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Droplets className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">LifeLink</span>
        </div>

        {/* Profile badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-card rounded-full px-3 py-2 card-shadow">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <User className="w-4 h-4 text-muted-foreground" />
            </div>
            <span className="px-2 py-0.5 bg-danger text-danger-foreground text-sm font-semibold rounded-full">
              {bloodGroup}
            </span>
          </div>
        </div>
      </div>

      {/* Welcome message */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {name}
        </h1>
        <p className="text-muted-foreground">
          You're helping save lives today.
        </p>
      </div>
    </header>
  );
};
