import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Navigation, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import Logo from "@/components/Logo";
import { getCurrentRequest, clearCurrentRequest } from "@/lib/storage";

const Assigned = () => {
  const navigate = useNavigate();
  const [cancelTimer, setCancelTimer] = useState(300); // 5 minutes in seconds
  const request = getCurrentRequest();

  useEffect(() => {
    if (!request) {
      navigate("/urgent");
      return;
    }

    const timer = setInterval(() => {
      setCancelTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [request, navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCancel = () => {
    if (cancelTimer > 0) {
      clearCurrentRequest();
      navigate("/urgent");
    }
  };

  const handleCall = () => {
    alert("📞 Calling hospital... (Demo)");
  };

  const handleDirections = () => {
    window.open("https://maps.google.com", "_blank");
  };

  if (!request) return null;

  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Logo size="md" />
        <div className="badge-verified">
          <CheckCircle2 className="w-4 h-4" />
          Verified Donor
        </div>
      </div>

      {/* Success Banner */}
      <div className="lifelink-card bg-gradient-to-br from-primary to-success mb-6">
        <div className="text-center text-white">
          <CheckCircle2 className="w-12 h-12 mx-auto mb-3" />
          <h1 className="text-xl font-bold mb-1">You're on your way!</h1>
          <p className="text-white/90 text-sm">
            The hospital has been notified of your arrival
          </p>
        </div>
      </div>

      {/* Hospital Details */}
      <div className="lifelink-card mb-4">
        <h2 className="font-semibold text-foreground mb-1">{request.hospital}</h2>
        <p className="text-sm text-muted-foreground mb-4">{request.address}</p>

        {/* ETA */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary mb-4">
          <Clock className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Estimated Arrival</p>
            <p className="font-bold text-foreground">{request.eta}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button onClick={handleCall} className="btn-outline py-3 flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" />
            Call Hospital
          </button>
          <button onClick={handleDirections} className="btn-primary py-3 flex items-center justify-center gap-2">
            <Navigation className="w-4 h-4" />
            Directions
          </button>
        </div>
      </div>

      {/* Verification OTP */}
      <div className="lifelink-card mb-4">
        <h3 className="font-semibold text-foreground mb-2">Verification Code</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Show this code to the hospital staff upon arrival
        </p>
        <div className="flex justify-center gap-3">
          {request.otp.split("").map((digit, index) => (
            <div
              key={index}
              className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center"
            >
              <span className="text-2xl font-bold text-primary">{digit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cancel Option */}
      <div className="lifelink-card bg-secondary/50">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-foreground mb-2">
              You can cancel within {formatTime(cancelTimer)}
            </p>
            <button
              onClick={handleCancel}
              disabled={cancelTimer === 0}
              className={`text-sm font-semibold ${
                cancelTimer > 0 ? "text-destructive" : "text-muted-foreground"
              }`}
            >
              {cancelTimer > 0 ? "Cancel Request" : "Cannot Cancel"}
            </button>
          </div>
        </div>
      </div>

      {/* Consent Note */}
      <p className="text-xs text-muted-foreground text-center mt-6 px-4">
        By proceeding, you consent to share your verified donor information with the hospital for this donation request.
      </p>
    </div>
  );
};

export default Assigned;
