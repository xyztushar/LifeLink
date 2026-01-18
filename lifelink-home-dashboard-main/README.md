# LifeLink – Donor Home Dashboard (Frontend)

This section is the donor's main landing page after registration.

Scope:
- Show donor status
- Show eligibility
- Show recent donation info
- Show alert if urgent blood request exists

Screens:
1. Donor Home
   - Profile badge (Blood group, Verified)
   - Eligibility status (Green / Red)
   - CTA: "View Urgent Request" (only visible if request exists)

Navigation Rule:
This section does NOT control routing.
It exposes ONE callback:

```ts
onUrgent(): void
