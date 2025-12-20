# @genesis/react - Modern Full-Stack Template

A production-ready full-stack TypeScript template featuring Bun runtime, Hono API, React 19, and PostgreSQL. Built for scalable applications with type safety end-to-end.

## ✨ Tech Stack

- **Runtime**: Bun (fast package manager & runtime)
- **Frontend**: React 19 + TanStack Router + TypeScriptw
- **Backend**: Hono (fast API framework) + Drizzle ORM
- **Database**: PostgreSQL with type-safe queries
- **Styling**: TailwindCSS v4 + shadcn/ui components
- **State**: Zustand (client) + TanStack Query (server)
- **Animations**: Motion/React
- **Validation**: Zod schemas
- **Build**: Custom Bun bundler with HMR

## 🚀 Quick Start

### Prerequisites
- Bun
- PostgreSQL database

### Setup
```bash
# Clone or create from template
bun create genesis-bun/mono my-app
cd my-app

# Install dependencies
bun install

# Setup environment
cp .env.template .env
# Edit .env with your DATABASE_URL and other configs

### Development
```bash
bun run dev          # sets up database, pushes schema, checks code, starts development server with HMR
bun run dev:legacy   # runs legacy development mode (dev.ts)
```

### Production
```bash
bun run start        # runs production server
bun run start:legacy # runs legacy production mode (prod.ts)
```

### Deployment
```bash
bun run deploy       # deployment: installs deps, creates db, pushes schema, checks code, starts production server
bun run deploy:legacy # deployment with legacy build process
```

## 🏗️ Architecture

```
├── api/              # Backend API (Hono)
│   ├── hono.ts      # API entry point with middleware
│   ├── routes/      # API routes
│   └── lib/db/      # Database schema & connection
├── src/              # Frontend (React)
│   ├── main.tsx     # App entry point
│   ├── pages/       # Routes & components
│   └── lib/         # Utilities, hooks, components
├── build.ts         # Custom production bundler
├── server.ts        # Development server
└── prod.ts          # Production server
```

## 🎯 Features

### Core
- **Type Safety**: End-to-end TypeScript with Hono RPC
- **Modern React**: React 19 with concurrent features
- **Fast Runtime**: Bun for development & production
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: Code-based routing with TanStack Router

### Developer Experience
- **Hot Reload**: Instant updates during development
- **Component Library**: shadcn/ui with 40+ components
- **Theming**: Dark/light mode with CSS variables
- **Animations**: Smooth transitions with Motion/React
- **State Management**: Zustand + TanStack Query
- **Linting**: Biome (fast, opinionated formatter/linter)

### Production Ready
- **Security**: Rate limiting, CORS, input validation
- **Performance**: Optimized bundling, static asset caching
- **Error Handling**: Structured responses, error boundaries
- **Environment**: Zod-validated configuration
- **Analytics**: Google Analytics 4 integration

## 📝 Scripts

### Main Commands
```bash
bun run dev              # Development: creates database, pushes schema, checks code, starts dev server
bun run dev:legacy       # Legacy development mode
bun run start            # Production: runs optimized production server
bun run start:legacy     # Legacy production mode
bun run deploy           # Full deployment: installs deps, creates db, pushes schema, checks code, starts prod server
bun run deploy:legacy    # Full deployment with legacy build process
```

### Utility Commands
```bash
bun run check            # Lint & format code automatically using Biome
bun run push             # Push schema changes to DB using Drizzle Kit
bun run generate         # Generate database types using Drizzle Kit
bun run migrate          # Run database migrations using Drizzle Kit
bun run build            # Legacy: builds with build.ts
bun run shadcn           # Interactive component picker
```

## 🔧 Customization

### Add UI Components
```bash
bun run shadcn button  # Add specific component
bun run shadcn         # Interactive component picker
```

### Add API Routes
Create new route files in `api/routes/` and register them in `api/routes/router.ts`

### Database Schema
Add tables in `api/lib/db/schema/` and update the index to export

## 📋 Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection string
- `PUBLIC_SERVER_URL` - Frontend server URL
- `PORT` - Server port

Optional:
- `PUBLIC_GA_ID` - Google Analytics ID

## 🚦 Status

This is a **production-ready template** with modern, scalable architecture. Ready for real applications with proper error handling, security, and performance optimizations.

---

## 📦 Serving Static Assets

Avoid using Public Directory for static assets. Instead, add your assets to the `src/assets` directory and import them directly in your components like this:

```tsx
import logo from "@/assets/logo.svg";
<Image src={logo} alt="Logo" />
```

Bun will automatically hash and cache the assets being used in your production build for you.

---

Built with ❤️ using modern web technologies by [@ishtails](https://github.com/ishtails)