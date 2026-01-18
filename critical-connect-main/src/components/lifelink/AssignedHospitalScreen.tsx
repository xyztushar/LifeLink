import { ArrowLeft, Phone, Navigation, MapPin, Lock, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface AssignedHospitalScreenProps {
  onBack: () => void;
  onCancel: () => void;
}

const AssignedHospitalScreen = ({ onBack, onCancel }: AssignedHospitalScreenProps) => {
  const [countdown, setCountdown] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-4 py-3 flex items-center gap-3 bg-card border-b border-border">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 rounded-lg hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">LifeLink – Assigned</h1>
      </header>

      {/* Map Section */}
      <div className="relative h-56 bg-muted overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-muted/80 flex items-center justify-center">
          <div className="w-full h-full bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/79.0882,21.1458,14,0/400x250@2x?access_token=pk.placeholder')] bg-cover bg-center opacity-50" />
        </div>
        
        {/* Pin */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rotate-45" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-5 space-y-5">
        {/* Verified Badge */}
        <div className="flex justify-center">
          <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            VERIFIED DONOR
          </span>
        </div>

        {/* Assignment Info */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Assigned — Orange City Hospital
          </h2>
          <p className="text-muted-foreground">
            Please arrive as soon as possible.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* ETA Card */}
          <div className="bg-card rounded-xl p-4 medical-shadow border border-border text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground font-medium">ETA</span>
            </div>
            <p className="text-3xl font-bold text-foreground">25</p>
            <p className="text-sm text-muted-foreground">min</p>
          </div>

          {/* OTP Card */}
          <div className="bg-card rounded-xl p-4 medical-shadow border border-border text-center relative overflow-hidden">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Lock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground font-medium">OTP</span>
            </div>
            <p className="text-3xl font-bold text-foreground tracking-widest">8473</p>
            <p className="text-sm text-muted-foreground">Show at desk</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button 
            variant="secondary"
            className="h-14 text-base gap-2 bg-foreground text-background hover:bg-foreground/90"
          >
            <Phone className="w-4 h-4" />
            Call Hospital
          </Button>
          <Button 
            className="h-14 text-base gap-2 bg-primary hover:bg-primary/90"
          >
            <Navigation className="w-4 h-4" />
            Get Directions
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-4 py-4 border-t border-border bg-card space-y-3">
        <button
          onClick={onCancel}
          className="w-full py-3 text-critical font-medium hover:bg-critical/5 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          Cancel Request
          <span className="text-sm px-2 py-0.5 bg-critical/10 rounded-md font-mono">
            {formatTime(countdown)}
          </span>
        </button>
        <p className="text-xs text-muted-foreground text-center">
          Donor phone shared with hospital only after acceptance to coordinate arrival.
        </p>
      </footer>
    </div>
  );
};

export default AssignedHospitalScreen;
