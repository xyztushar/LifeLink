import { Phone, Navigation, MapPin, Clock, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UrgentRequestCardProps {
  onAccept: () => void;
  onDecline: () => void;
}

const UrgentRequestCard = ({ onAccept, onDecline }: UrgentRequestCardProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-4 py-3 flex items-center justify-between bg-card border-b border-border">
        <h1 className="text-xl font-bold text-foreground">LifeLink</h1>
        <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
          Donor (O+)
        </span>
      </header>

      {/* Map Section */}
      <div className="relative h-48 bg-muted overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-muted flex items-center justify-center">
          <div className="w-full h-full bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/79.0882,21.1458,13,0/400x200@2x?access_token=pk.placeholder')] bg-cover bg-center opacity-60" />
          <MapPin className="absolute w-10 h-10 text-critical drop-shadow-lg" />
        </div>
        
        {/* Urgent Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1.5 bg-critical text-critical-foreground text-xs font-bold rounded-md uppercase tracking-wide urgent-pulse">
            URGENT
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 px-4 py-5 space-y-5">
        {/* Title + Urgency */}
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-bold text-foreground">Urgent Request</h2>
          <span className="px-2.5 py-1 bg-critical/10 text-critical text-xs font-bold rounded-full uppercase">
            Critical
          </span>
        </div>

        {/* Blood Info */}
        <div className="bg-card rounded-xl p-4 medical-shadow border border-border">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-critical/10 flex items-center justify-center">
              <span className="text-critical font-bold text-xl">2</span>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">2 units needed</p>
              <p className="text-sm text-muted-foreground">Whole Blood · O Positive</p>
            </div>
          </div>
        </div>

        {/* Distance + ETA */}
        <div className="bg-card rounded-xl p-4 medical-shadow border border-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Navigation className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">2.1 km away</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Estimated arrival: 6 min
              </p>
            </div>
          </div>
        </div>

        {/* Hospital Info */}
        <div className="bg-card rounded-xl p-4 medical-shadow border border-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
              <Building2 className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">Orange City Hospital</p>
              <p className="text-sm text-muted-foreground">Emergency Wing · Gate 2</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-12 gap-2">
            <Phone className="w-4 h-4" />
            Call Hospital
          </Button>
          <Button variant="outline" className="h-12 gap-2">
            <Navigation className="w-4 h-4" />
            Get Directions
          </Button>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button 
            variant="secondary" 
            className="h-14 text-base"
            onClick={onDecline}
          >
            Decline
          </Button>
          <Button 
            className="h-14 text-base bg-primary hover:bg-primary/90"
            onClick={onAccept}
          >
            Accept Request
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-4 py-4 border-t border-border bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success" />
            <span className="text-sm font-medium text-success">Eligible for donation</span>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Last donation: 92 days ago</span>
          <button className="underline hover:text-foreground transition-colors">
            Report issue
          </button>
        </div>
      </footer>
    </div>
  );
};

export default UrgentRequestCard;
