import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";
import { getDonor, verifyOTP, setDonorVerified } from "@/lib/storage";

const OTP = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  
  const donor = getDonor();
  const maskedPhone = donor?.phone 
    ? `******${donor.phone.slice(-2)}` 
    : "******XX";

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const fullOtp = otp.join("");
    if (fullOtp.length !== 4) {
      setError("Please enter the complete OTP");
      return;
    }

    setIsVerifying(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (verifyOTP(fullOtp)) {
      setDonorVerified();
      navigate("/donor-details");
    } else {
      setError("Invalid OTP. Please try again. (Hint: 8473)");
      setOtp(["", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
    
    setIsVerifying(false);
  };

  const handleResend = () => {
    setResendTimer(30);
    setOtp(["", "", "", ""]);
    setError("");
    inputRefs.current[0]?.focus();
  };

  const isComplete = otp.every(digit => digit !== "");

  return (
    <div className="page-container flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate("/register")}
          className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <Logo size="sm" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Verify Your Number
        </h1>
        <p className="text-muted-foreground mb-8">
          We've sent a 4-digit code to +91 {maskedPhone}
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-4 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="otp-input"
              autoFocus={index === 0}
            />
          ))}
        </div>

        {error && (
          <p className="text-destructive text-sm text-center mb-6">{error}</p>
        )}

        {/* Resend */}
        <div className="text-center mb-8">
          {resendTimer > 0 ? (
            <p className="text-muted-foreground text-sm">
              Resend OTP in <span className="font-semibold text-foreground">{resendTimer}s</span>
            </p>
          ) : (
            <button 
              onClick={handleResend}
              className="text-primary font-semibold text-sm"
            >
              Resend OTP
            </button>
          )}
        </div>

        {/* Demo hint */}
        <div className="lifelink-card bg-primary/5 border-primary/20">
          <p className="text-sm text-center text-muted-foreground">
            <span className="font-medium text-primary">Demo Mode:</span> Use OTP <span className="font-bold text-foreground">8473</span>
          </p>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleVerify}
        disabled={!isComplete || isVerifying}
        className="btn-primary"
      >
        {isVerifying ? "Verifying..." : "Verify & Continue"}
      </button>
    </div>
  );
};

export default OTP;
