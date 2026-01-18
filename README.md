# LifeLink – AI-Driven Blood Donation Management (Frontend PWA)

LifeLink is a Progressive Web Application (PWA) that demonstrates an end-to-end blood donation flow: from donor onboarding, to donor dashboard, to real-time emergency blood request handling.
This repository unifies three independent frontend modules into one cohesive application flow.

The project is designed for hackathon demos:

* UI-first
* Fast navigation
* Mocked logic (no backend dependency)
* Clear architecture for later Supabase / Firebase integration

---

## 🧩 Application Flow

```
Registration → Donor Home Dashboard → Urgent Blood Request Flow → Back to Home
```

1. **Registration Section**

   * Phone number input
   * OTP verification (mocked)
   * Donor details collection

2. **Donor Home Dashboard**

   * Shows donor profile & eligibility
   * Displays alert if urgent request exists
   * Entry point to emergency flow

3. **Urgent Blood Request Flow**

   * Shows critical blood request
   * Accept / Decline logic
   * Eligibility confirmation modal
   * Assigned hospital screen with OTP & ETA

Each section is developed independently and connected using a central navigation controller.

---

## 📁 Repository Structure

```
LifeLink/
├── lifelink-connect-main/           # Section 1: Registration Flow
├── lifelink-home-dashboard-main/    # Section 2: Donor Home Dashboard
├── critical-connect-main/           # Section 3: Urgent Blood Request Flow
├── frontend/                        # Unified PWA shell (navigation controller)
├── ui/                              # Shared UI utilities
└── backup/                          # Safe local backup (ignored in logic)
```

Each section contains its own:

* `main.md` describing its responsibilities
* UI components
* Internal logic

The root project connects them without modifying their design or internal structure.

---

## 🎯 Core Design Principles

* **Medical Trust UI**

  * Healing Green: `#22C55E`
  * Emergency Red: `#DC2626`
* Mobile-first
* Calm but urgent UX
* Clear CTAs
* Minimal friction for emergency response
* PWA ready

---

## 🧠 Architecture Philosophy

This project follows **modular frontend architecture**:

| Section        | Responsibility     | Exposed Callback |
| -------------- | ------------------ | ---------------- |
| Registration   | Collect donor info | `onComplete()`   |
| Home Dashboard | Show donor status  | `onUrgent()`     |
| Urgent Flow    | Handle emergencies | `onBack()`       |

A single `App.tsx` file orchestrates navigation between them.

No UI is rewritten.
No layouts are refactored.
Only navigation glue is added.

---

## 🚀 How to Run (Each Section Independently)

Each section is a Vite + React app.

Example:

```bash
cd lifelink-connect-main
npm install
npm run dev
```

Repeat for:

* `lifelink-home-dashboard-main`
* `critical-connect-main`

Later they will be wired under one root shell.

---

## 🔌 Backend (Future Scope)

Planned integrations:

* Supabase for:

  * OTP authentication
  * Donor database
  * Hospital requests
* Firebase / FCM:

  * Push notifications
* Google Maps:

  * Distance & ETA calculation

Currently all logic is mocked for demo stability.

---

## 🏆 Hackathon Value

This repository demonstrates:

* Clean UX for emergency healthcare
* Realistic product thinking
* Modular scalable architecture
* PWA readiness
* Production-grade system design

This is not a prototype screen deck.
This is a **real product scaffold**.

---

## ✨ Team: Nexus

* **Tushar Nipane** – System Design & Backend Architecture
* **Harshu Kirmire** – Data, Research & Domain Logic
* **Shravani Navghare** – AI Logic & API Integration
* **Sarang Wankhede** – UI Engineering & Testing

---

## 📌 Status

Frontend architecture ready.
UI sections unified.
Next phase: navigation wiring + backend integration.

---

LifeLink is built to save time, save blood, and save lives.
