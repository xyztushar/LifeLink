import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Navigation, MapPin, Clock, AlertTriangle } from "lucide-react";
import Logo from "@/components/Logo";
import { getMockRequests, acceptRequest, BloodRequest } from "@/lib/storage";
import ConfirmModal from "@/components/ConfirmModal";

const Urgent = () => {
  const navigate = useNavigate();
  const [selectedRequest, setSelectedRequest] = useState<BloodRequest | null>(null);
  const [showModal, setShowModal] = useState(false);
  const requests = getMockRequests();

  const handleAccept = (request: BloodRequest) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleConfirm = () => {
    if (selectedRequest) {
      acceptRequest(selectedRequest);
      navigate("/assigned");
    }
  };

  const handleCall = () => {
    alert("📞 Calling hospital... (Demo)");
  };

  const handleDirections = () => {
    window.open("https://maps.google.com", "_blank");
  };

  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate("/home")}
          className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <Logo size="sm" />
      </div>

      {/* Map Placeholder */}
      <div className="relative w-full h-40 bg-gradient-to-br from-secondary to-muted rounded-2xl mb-6 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-destructive mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Map View</p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-primary/10" />
        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-destructive/10" />
      </div>

      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-destructive" />
        <h2 className="text-lg font-bold text-foreground">Active Blood Requests</h2>
      </div>

      {/* Request Cards */}
      <div className="space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="lifelink-card">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {request.isUrgent && (
                    <span className="badge-urgent text-xs py-0.5 px-2">URGENT</span>
                  )}
                </div>
                <h3 className="font-semibold text-foreground">{request.hospital}</h3>
                <p className="text-sm text-muted-foreground">{request.address}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-destructive">{request.bloodGroup}</div>
                <p className="text-sm text-muted-foreground">{request.units} units</p>
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-4 mb-4 text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {request.distance}
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="w-4 h-4" />
                {request.eta} away
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <button onClick={handleCall} className="btn-outline py-3 flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Call
              </button>
              <button onClick={handleDirections} className="btn-outline py-3 flex items-center justify-center gap-2">
                <Navigation className="w-4 h-4" />
                Directions
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => handleAccept(request)}
                className="btn-primary py-3"
              >
                Accept
              </button>
              <button className="btn-outline py-3 text-muted-foreground">
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirm Modal */}
      {showModal && (
        <ConfirmModal
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default Urgent;
