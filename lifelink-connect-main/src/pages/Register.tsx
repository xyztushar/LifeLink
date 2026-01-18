import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { saveDonorPhone } from "@/lib/storage";

const Register = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isValid = phone.length === 10 && /^\d+$/.test(phone);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(value);
    setError("");
  };

  const handleContinue = () => {
    if (!isValid) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    saveDonorPhone(phone);
    navigate("/otp");
  };

  return (
    <div className="page-container flex flex-col animate-fade-in">
      {/* Header */}
      <div className="pt-8 pb-12">
        <Logo size="lg" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Join the LifeLink Network
        </h1>
        <p className="text-muted-foreground mb-8">
          Register as a blood donor and help save lives in your community.
        </p>

        {/* Phone Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Mobile Number
          </label>
          <div className="flex gap-3">
            <div className="lifelink-input w-20 flex items-center justify-center bg-muted text-muted-foreground">
              +91
            </div>
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Enter 10-digit number"
              className="lifelink-input flex-1"
              autoFocus
            />
          </div>
          {error && (
            <p className="text-destructive text-sm mt-2">{error}</p>
          )}
        </div>

        {/* Trust indicators */}
        <div className="lifelink-card bg-secondary/50 mb-8">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Your data is secure</p>
              <p className="text-xs text-muted-foreground">
                We only share your information with verified hospitals during emergencies.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleContinue}
        disabled={!isValid}
        className="btn-primary"
      >
        Continue
      </button>
    </div>
  );
};

export default Register;
