import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isRegistrationComplete } from "@/lib/storage";
import Logo from "@/components/Logo";
import { Heart, Droplets, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already registered
    if (isRegistrationComplete()) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="page-container flex flex-col animate-fade-in">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
        <div className="mb-8">
          <Logo size="lg" />
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-3">
          Every Drop <span className="text-primary">Saves Lives</span>
        </h1>
        <p className="text-muted-foreground mb-12 max-w-xs">
          Join thousands of donors helping save lives in their community every day.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 w-full mb-12">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">10K+</p>
            <p className="text-xs text-muted-foreground">Lives Saved</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-destructive/10 flex items-center justify-center">
              <Droplets className="w-6 h-6 text-destructive" />
            </div>
            <p className="text-2xl font-bold text-foreground">5K+</p>
            <p className="text-xs text-muted-foreground">Donations</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-success/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-success" />
            </div>
            <p className="text-2xl font-bold text-foreground">2K+</p>
            <p className="text-xs text-muted-foreground">Active Donors</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="space-y-3">
        <button
          onClick={() => navigate("/register")}
          className="btn-primary"
        >
          Become a Donor
        </button>
        <p className="text-xs text-center text-muted-foreground">
          Already registered? Your profile will be restored automatically.
        </p>
      </div>
    </div>
  );
};

export default Index;
