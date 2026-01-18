// Mock storage utilities for LifeLink PWA

export interface Donor {
  phone: string;
  name: string;
  bloodGroup: string;
  lastDonationDate: string | null;
  eligible: boolean;
  verified: boolean;
  hasDonatedBefore: boolean;
  locationEnabled: boolean;
}

export interface BloodRequest {
  id: string;
  hospital: string;
  address: string;
  units: number;
  bloodGroup: string;
  distance: string;
  eta: string;
  otp: string;
  isUrgent: boolean;
}

const DONOR_KEY = "lifelink_donor";
const REQUEST_KEY = "lifelink_current_request";
const MOCK_OTP = "8473";

export const saveDonorPhone = (phone: string) => {
  const donor = getDonor() || {};
  localStorage.setItem(DONOR_KEY, JSON.stringify({ ...donor, phone }));
};

export const getDonor = (): Donor | null => {
  const data = localStorage.getItem(DONOR_KEY);
  return data ? JSON.parse(data) : null;
};

export const verifyOTP = (otp: string): boolean => {
  return otp === MOCK_OTP;
};

export const setDonorVerified = () => {
  const donor = getDonor();
  if (donor) {
    localStorage.setItem(DONOR_KEY, JSON.stringify({ ...donor, verified: true }));
  }
};

export const saveDonorDetails = (details: Partial<Donor>) => {
  const donor = getDonor() || {};
  const updatedDonor = { ...donor, ...details };
  
  // Calculate eligibility based on last donation date
  if (updatedDonor.lastDonationDate) {
    const lastDate = new Date(updatedDonor.lastDonationDate);
    const today = new Date();
    const diffMonths = (today.getFullYear() - lastDate.getFullYear()) * 12 + 
                       (today.getMonth() - lastDate.getMonth());
    updatedDonor.eligible = diffMonths >= 3;
  } else {
    updatedDonor.eligible = true;
  }
  
  localStorage.setItem(DONOR_KEY, JSON.stringify(updatedDonor));
};

export const isRegistrationComplete = (): boolean => {
  const donor = getDonor();
  return !!(donor?.name && donor?.bloodGroup && donor?.verified);
};

// Mock blood requests
export const getMockRequests = (): BloodRequest[] => [
  {
    id: "1",
    hospital: "City General Hospital",
    address: "123 Medical Center Drive",
    units: 2,
    bloodGroup: "O+",
    distance: "2.3 km",
    eta: "8 mins",
    otp: generateOTP(),
    isUrgent: true,
  },
  {
    id: "2",
    hospital: "St. Mary's Medical Center",
    address: "456 Healthcare Blvd",
    units: 1,
    bloodGroup: "A+",
    distance: "4.1 km",
    eta: "15 mins",
    otp: generateOTP(),
    isUrgent: false,
  },
];

export const generateOTP = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const acceptRequest = (request: BloodRequest) => {
  localStorage.setItem(REQUEST_KEY, JSON.stringify(request));
};

export const getCurrentRequest = (): BloodRequest | null => {
  const data = localStorage.getItem(REQUEST_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearCurrentRequest = () => {
  localStorage.removeItem(REQUEST_KEY);
};

export const clearAllData = () => {
  localStorage.removeItem(DONOR_KEY);
  localStorage.removeItem(REQUEST_KEY);
};
