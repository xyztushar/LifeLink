import { motion, AnimatePresence } from "framer-motion";
import { Info, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ConfirmDonationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

type Answer = "yes" | "no" | null;

const ConfirmDonationModal = ({ isOpen, onConfirm, onCancel }: ConfirmDonationModalProps) => {
  const [hasFever, setHasFever] = useState<Answer>("no");
  const [hasTravel, setHasTravel] = useState<Answer>("no");

  const isIneligible = hasFever === "yes" || hasTravel === "yes";
  const canConfirm = hasFever === "no" && hasTravel === "no";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-foreground/40 z-40"
            onClick={onCancel}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-3xl medical-shadow-lg max-h-[85vh] overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              {/* Handle */}
              <div className="flex justify-center">
                <div className="w-12 h-1.5 rounded-full bg-muted" />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-foreground text-center">
                Confirm donation
              </h2>

              {/* Info Banner */}
              <div className="bg-accent rounded-xl p-4 flex gap-3">
                <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-accent-foreground">
                  By confirming, your phone number will be shared with the hospital for coordination purposes only.
                </p>
              </div>

              {/* Eligibility Check */}
              <div className="space-y-5">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Eligibility Check
                </h3>

                {/* Question 1 */}
                <div className="space-y-3">
                  <p className="text-base font-medium text-foreground">
                    Do you currently have a fever?
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setHasFever("yes")}
                      className={`h-12 rounded-xl font-medium transition-all ${
                        hasFever === "yes"
                          ? "bg-critical text-critical-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setHasFever("no")}
                      className={`h-12 rounded-xl font-medium transition-all ${
                        hasFever === "no"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                {/* Question 2 */}
                <div className="space-y-3">
                  <p className="text-base font-medium text-foreground">
                    Recent international travel?
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setHasTravel("yes")}
                      className={`h-12 rounded-xl font-medium transition-all ${
                        hasTravel === "yes"
                          ? "bg-critical text-critical-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setHasTravel("no")}
                      className={`h-12 rounded-xl font-medium transition-all ${
                        hasTravel === "no"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                {/* Warning Message */}
                <AnimatePresence>
                  {isIneligible && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-critical/10 rounded-xl p-4 flex gap-3"
                    >
                      <AlertTriangle className="w-5 h-5 text-critical flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-critical font-medium">
                        Based on your answers, you may not be eligible to donate at this time. Please consult with the hospital staff.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-2">
                <Button
                  className="w-full h-14 text-base bg-primary hover:bg-primary/90"
                  disabled={!canConfirm}
                  onClick={onConfirm}
                >
                  Confirm & Notify Hospital
                </Button>
                <Button
                  variant="ghost"
                  className="w-full h-12 text-base text-muted-foreground"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDonationModal;
