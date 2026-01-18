import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DonorHomepage from "@/components/lifelink/DonorHomepage";
import UrgentRequestCard from "@/components/lifelink/UrgentRequestCard";
import ConfirmDonationModal from "@/components/lifelink/ConfirmDonationModal";
import AssignedHospitalScreen from "@/components/lifelink/AssignedHospitalScreen";

type FlowState = "homepage" | "urgent-request" | "confirming" | "assigned";

const Index = () => {
  const [flowState, setFlowState] = useState<FlowState>("homepage");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewRequest = () => {
    setFlowState("urgent-request");
  };

  const handleAccept = () => {
    setIsModalOpen(true);
    setFlowState("confirming");
  };

  const handleDecline = () => {
    setFlowState("homepage");
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    setFlowState("assigned");
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
    setFlowState("urgent-request");
  };

  const handleBackFromAssigned = () => {
    setFlowState("homepage");
  };

  const handleCancelAssignment = () => {
    setFlowState("homepage");
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative overflow-hidden">
      <AnimatePresence mode="wait">
        {flowState === "homepage" && (
          <motion.div
            key="homepage"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DonorHomepage onViewRequest={handleViewRequest} />
          </motion.div>
        )}

        {(flowState === "urgent-request" || flowState === "confirming") && (
          <motion.div
            key="urgent-request"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <UrgentRequestCard 
              onAccept={handleAccept} 
              onDecline={handleDecline} 
            />
          </motion.div>
        )}

        {flowState === "assigned" && (
          <motion.div
            key="assigned"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <AssignedHospitalScreen 
              onBack={handleBackFromAssigned}
              onCancel={handleCancelAssignment}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Donation Modal (Bottom Sheet) */}
      <ConfirmDonationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancelModal}
      />
    </div>
  );
};

export default Index;
