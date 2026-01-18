# LifeLink – Registration Section (Frontend)

This section handles the complete donor onboarding flow.

Scope:
- Phone number input
- OTP verification (mocked for now)
- Donor basic details collection

Screens:
1. Mobile Number Entry
   - Input: phone number
   - CTA: "Continue"

2. OTP Verification
   - 4-digit OTP input
   - CTA: "Verify & Continue"

3. Donor Details
   - Full Name
   - Blood Group
   - Medical Certificate Upload (UI only)
   - Location Access Toggle
   - Previous Donation Status
   - Last Donation Date
   - CTA: "Complete Registration"

Navigation Rule:
This section does NOT manage routing.
It exposes ONE callback:

```ts
onComplete(): void
