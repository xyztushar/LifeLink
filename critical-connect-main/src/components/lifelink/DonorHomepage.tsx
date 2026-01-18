import { Heart, Bell, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DonorHomepageProps {
  onViewRequest: () => void;
}

const DonorHomepage = ({ onViewRequest }: DonorHomepageProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-4 py-3 flex items-center justify-between bg-card border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">LifeLink</h1>
            <p className="text-xs text-muted-foreground">Blood Donation Network</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-muted transition-colors relative">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-critical rounded-full" />
          </button>
          <button className="p-2 rounded-lg hover:bg-muted transition-colors">
            <User className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="px-4 py-8 text-center space-y-4">
        <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
          <Heart className="w-10 h-10 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Welcome back, Donor</h2>
          <p className="text-muted-foreground mt-1">Ready to save lives today?</p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full">
          <span className="text-sm font-medium text-accent-foreground">Blood Type:</span>
          <span className="text-sm font-bold text-primary">O+</span>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 grid grid-cols-3 gap-3">
        <div className="bg-card rounded-xl p-4 text-center medical-shadow border border-border">
          <p className="text-2xl font-bold text-foreground">12</p>
          <p className="text-xs text-muted-foreground">Donations</p>
        </div>
        <div className="bg-card rounded-xl p-4 text-center medical-shadow border border-border">
          <p className="text-2xl font-bold text-foreground">36</p>
          <p className="text-xs text-muted-foreground">Lives Saved</p>
        </div>
        <div className="bg-card rounded-xl p-4 text-center medical-shadow border border-border">
          <p className="text-2xl font-bold text-primary">92</p>
          <p className="text-xs text-muted-foreground">Days Since</p>
        </div>
      </div>

      {/* Urgent Alert Card */}
      <div className="px-4 mt-6">
        <div className="bg-critical/5 rounded-2xl p-4 border border-critical/20 medical-shadow">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-critical/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-critical" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-critical text-critical-foreground text-xs font-bold rounded uppercase">
                  Urgent
                </span>
                <span className="text-xs text-muted-foreground">2 min ago</span>
              </div>
              <h3 className="font-semibold text-foreground">Orange City Hospital needs O+ blood</h3>
              <p className="text-sm text-muted-foreground mt-0.5">2.1 km away · 2 units needed</p>
            </div>
          </div>
          <Button 
            className="w-full mt-4 h-12 bg-critical hover:bg-critical/90 text-critical-foreground"
            onClick={onViewRequest}
          >
            View Request
          </Button>
        </div>
      </div>

      {/* Eligibility Status */}
      <div className="px-4 mt-6">
        <div className="bg-card rounded-xl p-4 medical-shadow border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-success" />
            </div>
            <div>
              <p className="font-medium text-foreground">Eligible to Donate</p>
              <p className="text-sm text-muted-foreground">Next eligible: Now</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Padding */}
      <div className="flex-1 min-h-16" />
    </div>
  );
};

export default DonorHomepage;
