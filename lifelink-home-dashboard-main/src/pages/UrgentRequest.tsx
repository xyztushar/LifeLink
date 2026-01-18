import { ArrowLeft, MapPin, Clock, Droplets, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UrgentRequest = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 pt-6 pb-4 animate-fade-up">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>
        <h1 className="text-2xl font-bold text-danger">Urgent Blood Request</h1>
        <p className="text-muted-foreground mt-1">Someone nearby needs your help</p>
      </header>

      {/* Request details */}
      <main className="px-4 space-y-4">
        <div className="rounded-2xl bg-card p-5 card-shadow animate-fade-up-delay-1">
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
            <div className="w-16 h-16 rounded-2xl bg-danger/10 flex items-center justify-center">
              <Droplets className="w-8 h-8 text-danger" />
            </div>
            <div>
              <span className="px-3 py-1 bg-danger text-danger-foreground text-lg font-bold rounded-full">
                O+
              </span>
              <p className="text-muted-foreground text-sm mt-1">Blood type needed</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-foreground">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <span>City General Hospital, 2.5 km away</span>
            </div>
            <div className="flex items-center gap-3 text-foreground">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <span>Needed within 3 hours</span>
            </div>
            <div className="flex items-center gap-3 text-foreground">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <span>Contact: +91 98765 00000</span>
            </div>
          </div>
        </div>

        <p className="text-center text-muted-foreground text-sm px-4 animate-fade-up-delay-2">
          This is a mock urgent request screen. In the full app, you would be able to respond to this request.
        </p>
      </main>
    </div>
  );
};

export default UrgentRequest;
