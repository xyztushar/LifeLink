import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, MapPin, CheckCircle2 } from "lucide-react";
import Logo from "@/components/Logo";
import { saveDonorDetails } from "@/lib/storage";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const DonorDetails = () => {
  const [name, setName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [hasDonatedBefore, setHasDonatedBefore] = useState<boolean | null>(null);
  const [lastDonationDate, setLastDonationDate] = useState("");
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [certificateUploaded, setCertificateUploaded] = useState(false);
  const [dateError, setDateError] = useState("");
  const navigate = useNavigate();

  const validateDate = (date: string) => {
    if (!date) return true;
    
    const selectedDate = new Date(date);
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);
    
    if (selectedDate > threeMonthsAgo) {
      setDateError("Last donation must be at least 3 months ago");
      return false;
    }
    setDateError("");
    return true;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setLastDonationDate(date);
    validateDate(date);
  };

  const isValid = 
    name.trim().length > 0 && 
    bloodGroup !== "" && 
    hasDonatedBefore !== null &&
    (!hasDonatedBefore || (lastDonationDate && !dateError));

  const handleSubmit = () => {
    if (!isValid) return;
    
    saveDonorDetails({
      name: name.trim(),
      bloodGroup,
      hasDonatedBefore: hasDonatedBefore || false,
      lastDonationDate: hasDonatedBefore ? lastDonationDate : null,
      locationEnabled,
    });
    
    navigate("/home");
  };

  return (
    <div className="page-container flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate("/otp")}
          className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <Logo size="sm" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-4">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Complete Your Profile
        </h1>
        <p className="text-muted-foreground mb-6">
          Help us match you with patients who need your blood type.
        </p>

        {/* Full Name */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-foreground mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="lifelink-input"
          />
        </div>

        {/* Blood Group */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-foreground mb-2">
            Blood Group
          </label>
          <div className="grid grid-cols-4 gap-2">
            {BLOOD_GROUPS.map((group) => (
              <button
                key={group}
                onClick={() => setBloodGroup(group)}
                className={`blood-group-btn ${bloodGroup === group ? "selected" : ""}`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>

        {/* Medical Certificate */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-foreground mb-2">
            Medical Certificate (Optional)
          </label>
          <button
            onClick={() => setCertificateUploaded(!certificateUploaded)}
            className={`w-full p-4 rounded-xl border-2 border-dashed transition-all ${
              certificateUploaded 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              {certificateUploaded ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-primary font-medium">Certificate Uploaded</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Tap to upload</span>
                </>
              )}
            </div>
          </button>
        </div>

        {/* Location Access */}
        <div className="mb-5">
          <button
            onClick={() => setLocationEnabled(!locationEnabled)}
            className="w-full lifelink-card flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                locationEnabled ? "bg-primary/10" : "bg-secondary"
              }`}>
                <MapPin className={`w-5 h-5 ${locationEnabled ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">Location Access</p>
                <p className="text-xs text-muted-foreground">For nearby hospital matching</p>
              </div>
            </div>
            <div className={`w-12 h-7 rounded-full transition-all ${
              locationEnabled ? "bg-primary" : "bg-muted"
            }`}>
              <div className={`w-5 h-5 bg-white rounded-full mt-1 transition-all shadow ${
                locationEnabled ? "ml-6" : "ml-1"
              }`} />
            </div>
          </button>
        </div>

        {/* Previous Donation */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-foreground mb-2">
            Have you donated blood before?
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setHasDonatedBefore(true)}
              className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                hasDonatedBefore === true
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground"
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => {
                setHasDonatedBefore(false);
                setLastDonationDate("");
                setDateError("");
              }}
              className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                hasDonatedBefore === false
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground"
              }`}
            >
              No
            </button>
          </div>
        </div>

        {/* Last Donation Date */}
        {hasDonatedBefore && (
          <div className="mb-5 animate-fade-in">
            <label className="block text-sm font-medium text-foreground mb-2">
              Last Donation Date
            </label>
            <input
              type="date"
              value={lastDonationDate}
              onChange={handleDateChange}
              max={new Date().toISOString().split("T")[0]}
              className="lifelink-input"
            />
            {dateError && (
              <p className="text-destructive text-sm mt-2">{dateError}</p>
            )}
          </div>
        )}
      </div>

      {/* CTA */}
      <button
        onClick={handleSubmit}
        disabled={!isValid}
        className="btn-primary mt-4"
      >
        Complete Registration
      </button>
    </div>
  );
};

export default DonorDetails;
