import { useState } from "react";
import { X, AlertCircle, CheckCircle2 } from "lucide-react";

interface ConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModal = ({ onClose, onConfirm }: ConfirmModalProps) => {
  const [hasFever, setHasFever] = useState<boolean | null>(null);
  const [hasTraveled, setHasTraveled] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  const canProceed = hasFever === false && hasTraveled === false;
  const showError = (hasFever === true || hasTraveled === true);

  const handleConfirm = () => {
    if (hasFever === null || hasTraveled === null) {
      setError("Please answer all questions");
      return;
    }
    if (!canProceed) {
      setError("You are not eligible to donate at this time");
      return;
    }
    onConfirm();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Confirm Donation</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Eligibility Questions */}
        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-xl bg-secondary">
            <p className="font-medium text-foreground mb-3">
              Have you had a fever in the last 2 weeks?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setHasFever(true)}
                className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
                  hasFever === true
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-card border border-border text-foreground"
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setHasFever(false)}
                className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
                  hasFever === false
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground"
                }`}
              >
                No
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-secondary">
            <p className="font-medium text-foreground mb-3">
              Have you traveled internationally in the last 6 months?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setHasTraveled(true)}
                className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
                  hasTraveled === true
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-card border border-border text-foreground"
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setHasTraveled(false)}
                className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
                  hasTraveled === false
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground"
                }`}
              >
                No
              </button>
            </div>
          </div>
        </div>

        {/* Status Message */}
        {showError && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 mb-6">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
            <p className="text-sm text-destructive">
              Based on your answers, you may not be eligible to donate at this time. Please consult a healthcare provider.
            </p>
          </div>
        )}

        {canProceed && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/10 mb-6">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm text-primary">
              Great! You appear to be eligible for donation.
            </p>
          </div>
        )}

        {error && !showError && (
          <p className="text-destructive text-sm text-center mb-4">{error}</p>
        )}

        {/* CTA */}
        <button
          onClick={handleConfirm}
          disabled={!canProceed}
          className="btn-primary"
        >
          Confirm & Notify Hospital
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
