# SafeTrade — Banking Risk Analysis System

A banking fraud prevention and risk analysis simulation platform. It demonstrates how a modern
financial institution onboards traders, verifies their identity, scores every transaction for
risk, and restricts account access to a recognised device.

> This is an educational demo. No real banking data is processed or stored — all traders,
> transactions, and risk scores are simulated in the browser.

## Features

- **Multi-role authentication** — separate sign-in portals for Admin, User, and Trader, each
  bound to a device fingerprint generated from the browser and operating system. Signing in from
  an unrecognised device is blocked.
- **Trader registration & KYC validation** — PAN, Aadhaar, bank account, and IFSC are checked
  against format rules. A trader that passes is marked *Verified*; a trader that fails shows the
  exact field that caused the rejection. Login credentials are generated automatically.
- **Risk scoring engine** — every investment is scored before it is accepted, using trader
  verification status, transaction amount, and device trust. Scores map to Safe / Warning / Danger
  decisions.
- **Invest, withdraw, and track** — users invest in verified traders and withdraw against their
  balance, with a live portfolio chart and a full transaction history.
- **Trader transparency** — traders see exactly who invested in them, how much, and what their
  current net balance is.
- **Admin oversight** — admins register traders, review the directory, and monitor activity.
- **Light / dark mode** and a responsive layout across every page.

## Tech Stack

| Layer     | Technology                                          |
|-----------|-----------------------------------------------------|
| Frontend  | React 18, TypeScript, Vite                          |
| Styling   | Tailwind CSS, shadcn/ui                             |
| Routing   | React Router v6                                     |
| Charts    | Recharts                                            |
| Animation | Framer Motion                                       |
| State     | localStorage (traders, transactions, sessions)      |
| Backend   | Cloud functions for auth and serverless services    |

## Getting Started

**Requirements:** Node.js 18 or newer, and npm.

```bash
npm install
npm run dev
```

Then open the URL printed in your terminal (by default http://localhost:8080).

If you see `'vite' is not recognized as an internal or external command`, the dependencies were
never installed — run `npm install` first, then `npm run dev` again.

## Demo Accounts

| Role   | Email              | Password   |
|--------|--------------------|------------|
| Admin  | admin@bank.com     | bank1234   |
| User   | user@bank.com      | user1234   |
| Trader | trader@bank.com    | trader1234 |
| Trader | trader2@bank.com   | trader1234 |

The device ID shown on each login screen is detected automatically from your machine. On a first
visit it is registered for that role; later sign-ins must come from the same browser and device.

## Project Structure

```text
src/
├── components/       # Reusable UI (navbar, footer, panels, tables, profile dropdown)
├── pages/            # Routed screens (home, logins, signup, dashboards, profiles)
├── hooks/            # Theme handling, toasts, mobile detection
├── lib/              # Banking logic, risk engine, device fingerprinting
└── integrations/     # Backend client
```

## Disclaimer

SafeTrade is a demonstration application for learning and portfolio purposes. It is not affiliated
with any bank or financial institution, and no real money, identity documents, or account details
are ever processed.
