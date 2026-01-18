import { useEffect, useState } from "react";
import { Header } from "@/components/home/Header";
import { EligibilityCard } from "@/components/home/EligibilityCard";
import { AlertCard } from "@/components/home/AlertCard";
import { QuickActions } from "@/components/home/QuickActions";
import { BottomNavigation } from "@/components/home/BottomNavigation";

interface Donor {
  phone: string;
  name: string;
  bloodGroup: string;
  eligible: boolean;
  lastDonationDate: string;
  verified: boolean;
}

// Default mock data
const defaultDonor: Donor = {
  phone: "+91 98765 43210",
  name: "Rahul",
  bloodGroup: "O+",
  eligible: true,
  lastDonationDate: "2024-10-15",
  verified: true,
};

const Index = () => {
  const [donor, setDonor] = useState<Donor>(defaultDonor);
  const [hasUrgentRequest, setHasUrgentRequest] = useState(false);

  useEffect(() => {
    // Try to load donor data from localStorage
    const storedDonor = localStorage.getItem("donor");
    if (storedDonor) {
      try {
        setDonor(JSON.parse(storedDonor));
      } catch (e) {
        console.log("Using default donor data");
      }
    } else {
      // Set default data in localStorage for demo
      localStorage.setItem("donor", JSON.stringify(defaultDonor));
    }

    // Check for urgent request
    const urgentRequest = localStorage.getItem("urgentRequest");
    setHasUrgentRequest(urgentRequest === "true");
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <Header name={donor.name} bloodGroup={donor.bloodGroup} />

      {/* Main content */}
      <main className="px-4 space-y-5">
        {/* Eligibility Status */}
        <EligibilityCard 
          eligible={donor.eligible} 
          lastDonationDate={donor.lastDonationDate} 
        />

        {/* Active Alert */}
        <AlertCard hasUrgentRequest={hasUrgentRequest} />

        {/* Quick Actions */}
        <QuickActions />
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Index;
