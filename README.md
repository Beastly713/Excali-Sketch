# Excali-Sketch 

**Excali-Sketch** is a modern, full-stack collaborative whiteboarding application designed to bridge the gap between simple offline sketching and persistent, real-time visual collaboration.

Built with a **Hybrid Engine Architecture**, it offers the best of both worlds:
1.  **Collaborative Mode:** A custom-built HTML5 Canvas engine for ultra-low latency, multi-user diagramming.
2.  **Instant Board:** A robust, feature-rich standalone whiteboard powered by the Excalidraw library for quick, offline-capable sketching.

##  Key Features

* **Real-Time Collaboration:** Seamless, low-latency drawing synchronization using WebSockets.
* **Dual Whiteboarding Modes:**
    * **Custom Collaborative Canvas:** Built from scratch for optimal performance. Supports shapes (Rectangles, Ellipses, Diamonds, Arrows), freehand drawing, and text.
    * **Instant Board:** A "Guest Mode" powered by Excalidraw for advanced, local-only sketching without login.
* **Smart Room Management:** Create persistent rooms with unique slugs, join existing sessions, and manage active rooms via a dashboard.
* **Secure Authentication:** Full sign-up/sign-in flow using JWT (JSON Web Tokens) and bcrypt password hashing.
* **Robust Persistence:** All room data and canvas states are persisted in a PostgreSQL database using Prisma ORM.
* **Optimistic UI:** Local updates render immediately while synchronizing in the background, ensuring a lag-free drawing experience.
* **Modern UI/UX:** Fully responsive design with a "Dark Mode First" aesthetic, featuring interactive particle backgrounds and smooth Framer Motion animations.

##  Tech Stack

This project is structured as a **Monorepo** using **TurboRepo** and **pnpm**.

### **Frontend (`apps/ExcaliSketch`)**
* **Framework:** Next.js 15 (App Router).
* **Library:** React 19.
* **Styling:** Tailwind CSS, Framer Motion.
* **State Management:** Zustand.
* **Canvas Logic:** Native HTML5 Canvas API (Custom Engine) & `@excalidraw/excalidraw`.

### **Backend (`apps/backend`)**
* **Runtime:** Node.js.
* **Framework:** Express.js.
* **Communication:** `ws` (WebSockets) for real-time events.
* **Validation:** Zod.
* **Database:** PostgreSQL (via Neon or local Docker).
* **ORM:** Prisma.

### **DevOps & Tooling**
* **Build System:** TurboRepo.
* **Package Manager:** pnpm.
* **Containerization:** Docker (Alpine Node images).
* **Linting:** ESLint.

##  Project Structure

```bash
Excali-Sketch/
├── .turbo/
├── .vscode/
├── apps/
│   ├── backend/
│   │   ├── node_modules/
│   │   ├── prisma/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── logs/
│   │   │   ├── middlewares/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── schema/
│   │   │   ├── services/
│   │   │   ├── types/
│   │   │   ├── index.ts
│   │   │   └── wsHandler.ts
│   │   ├── .env.example
│   │   ├── .gitignore
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── tsconfig.tsbuildinfo
│   └── ExcaliSketch/
│       ├── .next/
│       ├── node_modules/
│       ├── public/
│       ├── src/
│       ├── .gitignore
│       ├── eslint.config.mjs
│       ├── global.css
│       ├── next-env.d.ts
│       ├── next.config.ts
│       ├── package.json
│       ├── postcss.config.mjs
│       ├── README.md
│       ├── tailwind.config.ts
│       └── tsconfig.json
├── node_modules/
├── packages/
├── .dockerignore
├── .env
├── .gitignore
├── .npmrc
├── dockerfile
├── excali-key.pem
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── turbo.json

```

##  Getting Started

Follow these steps to set up the project locally.

### Prerequisites

* **Node.js** (v18 or higher).
* **pnpm** (Install via `npm i -g pnpm`).
* **PostgreSQL** (Local instance or a cloud provider like Neon/Supabase).

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/excali-sketch.git](https://github.com/your-username/excali-sketch.git)
cd excali-sketch
```

### 2. Install Dependencies
Install all dependencies across the monorepo from the root directory:

```bash
pnpm install
```

### 3. Environment Setup
Backend (apps/backend)

Create a .env file in apps/backend/ based on .env.example:

```bash
PORT=5000
# Connection string to your PostgreSQL database
DATABASE_URL="postgresql://user:password@localhost:5432/excalisketch?schema=public"
# Secret key for signing JWT tokens
USER_JWT_SECRET="your_super_secret_jwt_key"
```

Frontend (apps/ExcaliSketch)

Create a .env file in apps/ExcaliSketch/:
```bash
# URL for the Express REST API
NEXT_PUBLIC_BACKEND_URL="http://localhost:5000"
# URL for the WebSocket Server (Use wss:// for production)
NEXT_PUBLIC_WS_URL="ws://localhost:5000"
# Optional: URL for a demo video on the landing page
NEXT_PUBLIC_VIDEO_URL="[https://your-demo-video-link.com](https://your-demo-video-link.com)"
```

### 4. Database Setup
Initialize the Prisma schema and push it to your database:

```bash
cd apps/backend
npx prisma generate
npx prisma migrate dev
cd ../..
```
### 5. Running the Application
You can run the entire stack (Frontend + Backend) simultaneously using Turbo:

```bash
pnpm dev
```
* Frontend: http://localhost:3000
* Backend: http://localhost:5000

### Docker Setup (Backend)
To run the backend service in a container:

1. Build the image
```bash
docker build -t excali-sketch-backend .
```
2. Run the container
```bash
docker run -p 5000:5000 \
  -e DATABASE_URL="your_postgres_connection_string" \
  -e USER_JWT_SECRET="your_secret" \
  excali-sketch-backend
```