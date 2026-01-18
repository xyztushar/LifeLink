# LifeLink – Urgent Blood Request Flow (Frontend)

This section handles emergency donation coordination.

Scope:
- Show urgent blood request
- Confirm donor participation
- Assign hospital
- Show OTP + ETA

Screens:

1. Urgent Request Card
   - Hospital name
   - Distance + ETA
   - Blood units required
   - Buttons:
     - Accept Request
     - Decline

2. Confirm Donation Modal
   - Eligibility questions:
     - Fever?
     - Recent international travel?
   - CTA:
     - Confirm & Notify Hospital
     - Cancel

3. Assigned Hospital Screen
   - Hospital name
   - Verified donor badge
   - OTP Code
   - ETA
   - Call hospital
   - Get directions
   - Cancel request timer

Navigation Rule:
This section exposes ONE callback:

```ts
onBack(): void
