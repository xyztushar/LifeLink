import { AlertTriangle, CheckCircle, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AlertCardProps {
  hasUrgentRequest: boolean;
}

export const AlertCard = ({ hasUrgentRequest }: AlertCardProps) => {
  const navigate = useNavigate();

  if (hasUrgentRequest) {
    return (
      <div className="rounded-2xl p-5 bg-gradient-to-br from-danger/10 to-danger/5 border border-danger/20 card-shadow animate-fade-up-delay-2">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-danger/20 flex items-center justify-center flex-shrink-0 animate-pulse-soft">
            <AlertTriangle className="w-6 h-6 text-danger" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-danger mb-1">
              Urgent blood request nearby
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Someone in your area urgently needs blood. Your donation could save a life.
            </p>
            <button
              onClick={() => navigate('/urgent-request')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-danger text-danger-foreground font-medium rounded-xl hover:bg-danger/90 transition-all active:scale-95"
            >
              View Request
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-5 bg-gradient-to-br from-success/10 to-success/5 border border-success/20 card-shadow animate-fade-up-delay-2">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
          <CheckCircle className="w-6 h-6 text-success" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-success">
            All caught up!
          </h3>
          <p className="text-sm text-muted-foreground">
            No urgent requests right now. We'll notify you when someone needs help.
          </p>
        </div>
      </div>
    </div>
  );
};
