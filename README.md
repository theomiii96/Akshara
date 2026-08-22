# Akshara Farmer Producer Company (APSK) Platform

> **Enterprise agricultural operations platform** for managing member farmer records, tracking certified onion seed production batches (N-2-4-1, Fursungi Special, Bhima varieties), managing seed distribution allocations with subsidy tracking, and visualizing operational metrics on an executive dashboard.

---

## 🌾 Key Modules & Features

- **Staff Admin Authentication Portal**: Secure credentials-based login with role-based access control.
- **Executive Operations Dashboard**: Live KPI cards for total farmers, acreage, harvest yields, and revenue, paired with interactive Recharts multi-bar and donut visualizations.
- **Verified Tech Farmer Management (CRUD)**:
  - Track farmer profiles, land owned vs. onion cultivation acreage, soil types, and irrigation sources.
  - Track seed purchase details (variety purchased, quantity in kg, batch lot, purchase date).
  - Annual Financial Mahiti reporting (harvest yields, gross annual income ₹25L–₹50L, and net profit per acre).
  - Efficiency ratio comparison cards (Land vs. Yield Ratio) and multi-year historical tables.
  - Smart filters (Sort by gross income, net profit/acre, yield, land size) and 1-click CSV export.
- **Onion Seed Inventory & Batch Tracking**:
  - Certified seed lots with germination rate (%), physical purity (%), and moisture tests.
  - Quality inspection logs and MSCA certificate numbers.
  - Real-time stock availability meters.
- **Seed Distribution & Voucher Hub**:
  - Issue certified seeds to registered farmers with live stock decrement.
  - Government subsidy calculation (NHM / FPC subsidy rates).
  - Printable official seed distribution vouchers with authorization stamps.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS, Lucide Icons, Recharts.
- **Backend**: Next.js API Route Handlers.
- **Database & ORM**: SQLite / PostgreSQL with Prisma ORM.
- **Authentication**: JWT session tokens with HTTP-only cookies and bcryptjs password encryption.

---

## 🚀 Getting Started Locally

### 1. Clone the Repository
```bash
git clone https://github.com/theomiii96/APSK.git
cd APSK
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Database & Seed Mock Data
```bash
# Push Prisma schema and seed 10 verified tech farmers + 5 certified seed batches
npx prisma generate
npx prisma db push
node prisma/seed.js
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 🔑 Default Admin Credentials
- **Email**: `admin@aksharafpc.com`
- **Password**: `admin123`
*(Or use the 1-click "Fill & Apply" demo access button on the login screen)*

---

## 📄 License
Registered under Akshara Farmer Producer Company Ltd. (Maharashtra, India).
