import { useNavigate } from "react-router-dom";
import { Droplets, FileText, Settings, ChevronRight, Heart } from "lucide-react";
import Logo from "@/components/Logo";
import { getDonor } from "@/lib/storage";

const Home = () => {
  const navigate = useNavigate();
  const donor = getDonor();

  const isEligible = donor?.eligible !== false;

  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Logo size="md" />
        <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
          <Droplets className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-primary">
            {donor?.bloodGroup || "O+"}
          </span>
        </div>
      </div>

      {/* Welcome Card */}
      <div className="lifelink-card bg-gradient-to-br from-primary to-success mb-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
            <Heart className="w-7 h-7 text-white fill-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white mb-1">
              Hello, {donor?.name?.split(" ")[0] || "Donor"}!
            </h1>
            <p className="text-white/90 text-sm">
              Ready to save lives today?
            </p>
          </div>
        </div>
      </div>

      {/* Eligibility Status */}
      <div className="mb-6">
        {isEligible ? (
          <div className="badge-eligible">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
            Eligible for Donation
          </div>
        ) : (
          <div className="badge-ineligible">
            <div className="w-2 h-2 rounded-full bg-warning" />
            Not Eligible Yet
          </div>
        )}
      </div>

      {/* Action Cards */}
      <div className="space-y-4">
        {/* Urgent Requests */}
        <button
          onClick={() => navigate("/urgent")}
          className="action-card w-full text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
            <Droplets className="w-6 h-6 text-destructive" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground">View Active Requests</h3>
              <span className="badge-urgent text-xs py-0.5 px-2">URGENT</span>
            </div>
            <p className="text-sm text-muted-foreground">
              2 hospitals nearby need your help
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Donation History */}
        <button className="action-card w-full text-left opacity-60">
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
            <FileText className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Donation History</h3>
            <p className="text-sm text-muted-foreground">
              View your past donations
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Profile Settings */}
        <button className="action-card w-full text-left opacity-60">
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
            <Settings className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Profile Settings</h3>
            <p className="text-sm text-muted-foreground">
              Manage your account
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="lifelink-card text-center">
          <p className="text-3xl font-bold text-primary mb-1">0</p>
          <p className="text-sm text-muted-foreground">Lives Saved</p>
        </div>
        <div className="lifelink-card text-center">
          <p className="text-3xl font-bold text-foreground mb-1">
            {donor?.hasDonatedBefore ? "1+" : "0"}
          </p>
          <p className="text-sm text-muted-foreground">Total Donations</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
