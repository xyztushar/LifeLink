import { CheckCircle2, XCircle, Calendar, Clock } from "lucide-react";

interface EligibilityCardProps {
  eligible: boolean;
  lastDonationDate: string;
}

export const EligibilityCard = ({ eligible, lastDonationDate }: EligibilityCardProps) => {
  // Calculate days since last donation and days remaining
  const lastDonation = new Date(lastDonationDate);
  const today = new Date();
  const daysSince = Math.floor((today.getTime() - lastDonation.getTime()) / (1000 * 60 * 60 * 24));
  const daysRemaining = Math.max(0, 56 - daysSince); // 56 days = 8 weeks minimum between donations
  
  const formattedDate = lastDonation.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div 
      className={`
        rounded-2xl p-5 card-shadow animate-fade-up-delay-1
        ${eligible 
          ? 'bg-gradient-to-br from-success/10 to-success/5 border border-success/20' 
          : 'bg-gradient-to-br from-danger/10 to-danger/5 border border-danger/20'
        }
      `}
    >
      {/* Status header */}
      <div className="flex items-center gap-3 mb-4">
        {eligible ? (
          <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-success" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-danger/20 flex items-center justify-center">
            <XCircle className="w-6 h-6 text-danger" />
          </div>
        )}
        <div>
          <h3 className={`font-semibold text-lg ${eligible ? 'text-success' : 'text-danger'}`}>
            {eligible ? 'You are eligible to donate' : 'You are currently not eligible'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {eligible ? 'Ready to save lives!' : `${daysRemaining} days until eligible`}
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex gap-4 pt-4 border-t border-border/50">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">Last donation:</span>
          <span className="font-medium text-foreground">{formattedDate}</span>
        </div>
        {!eligible && (
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium text-danger">{daysRemaining} days left</span>
          </div>
        )}
      </div>
    </div>
  );
};
