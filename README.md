# ADB – Next.js & Sanity Studio

This is a monorepo project featuring a **Next.js** frontend and a **Sanity Studio** CMS.

---

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have the following installed:

- **Node.js** (v20 or higher recommended)  
- **pnpm** (used for workspace management)

---

### 2. Installation

Install dependencies for the entire project from the root directory:

```bash
pnpm install
```

---

## 🌱 Environment Setup (Critical)

To avoid the `projectId` validation error, you must create a `.env.local` file in the **root directory**.

The Sanity client requires a project ID that contains only lowercase letters, numbers, and dashes.

Add the following values found in `src/sanity/client.ts`:

```env
# Found in src/sanity/client.ts
NEXT_PUBLIC_SANITY_PROJECT_ID=-----
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_GA_MEASUREMENT_ID=YOUR_GA_ID_HERE
```

---

## 🛠 Development

You need to run both the Next.js server and the Sanity Studio to manage content and view the site simultaneously.

### Option A: Run Both Together (Parallel)

From the root directory:

```bash
pnpm -r --parallel dev
```

---

### Option B: Run Separately

#### ▶ Main App

Run in the root directory:

```bash
pnpm dev
```

Access at:  
http://localhost:3000

---

#### ▶ Sanity Studio

Run inside the `/sanity` folder:

```bash
pnpm dev
```

Access at:  
http://localhost:3333

---

## 📁 Project Structure

```
/
├── src/                 # Next.js frontend code
│   └── sanity/          # Sanity client configuration and queries
├── sanity/              # Sanity Studio configuration, schemas, and local development environment
├── pnpm-workspace.yaml  # Manages the link between the root and the sanity subdirectory
└── README.md
```

---

## 📝 Configuration Details

- **API Version:** `2024-02-05`  
- **Project ID:** `-------`  
- **Dataset:** `production`
