# @genesis/mono - Modern Full-Stack Template

A production-ready full-stack TypeScript template that empowers developers to build scalable web applications with end-to-end type safety, modern tooling, and exceptional developer experience. Built on Bun runtime, React 19, and PostgreSQL, it eliminates the setup friction that slows down project launches.

## The Problem

Starting a new full-stack project typically involves days of configuration: setting up build tools, configuring type safety, choosing libraries, implementing security middleware, and establishing development workflows. Developers waste valuable time on boilerplate instead of building features. Most templates are either too minimal (missing production essentials) or too opinionated (hard to customize).

## The Solution

Genesis React provides a complete, battle-tested foundation that's ready to use immediately. It combines the fastest modern runtime (Bun), the latest React features, and production-grade security and performance optimizations—all with full TypeScript type safety from database to UI. One command sets up the database, validates configuration, and starts development with hot module replacement.

## What Makes It Special

**Speed-First Architecture**: Built on Bun runtime, offering faster package installation, faster builds, and faster development cycles compared to Node.js-based alternatives.

**End-to-End Type Safety**: TypeScript types flow seamlessly from database schema through API routes to React components, catching errors at compile time rather than runtime.

**Production-Ready Out of the Box**: Includes rate limiting, CORS, input validation, error boundaries, structured logging, and optimized asset bundling—features that usually require weeks of integration.

**Modern Developer Experience**: Instant hot reload, comprehensive component library (40+ shadcn/ui components), dark/light theming, smooth animations, and intelligent code formatting—all configured and working from day one.

**Zero-Config Deployment**: Single command handles dependency installation, database setup, schema migration, code validation, and production server startup.

## How It Works

The template follows a clean monorepo architecture with clear separation of concerns:

- **Backend API** (`api/`): Hono-based REST API with middleware for security, logging, and rate limiting. Database schema defined with Drizzle ORM for type-safe queries.

- **Frontend** (`src/`): React 19 application with TanStack Router for type-safe routing, Zustand for client state, and TanStack Query for server state management.

- **Build System**: Custom Bun bundler with Tailwind CSS plugin integration, automatic asset hashing, and optimized production builds.

- **Development Server**: Integrated server handles both API and frontend routing, with hot module replacement for instant feedback during development.

The entire stack shares TypeScript types, ensuring that API contracts match frontend expectations and database schemas align with application logic.

## Key Features

### Core Capabilities
- **Type-Safe API**: Hono framework with Zod validation ensures request/response types are enforced at runtime
- **Modern React**: React 19 with concurrent features, server components support, and optimized rendering
- **Fast Runtime**: Bun provides native-speed JavaScript execution and built-in package management
- **Type-Safe Database**: Drizzle ORM generates TypeScript types from schema, preventing SQL errors
- **Code-Based Routing**: TanStack Router enables type-safe navigation with automatic code splitting

### Developer Experience
- **Instant Hot Reload**: Changes reflect immediately without full page refreshes
- **Rich Component Library**: 40+ pre-built, accessible UI components from shadcn/ui
- **Theme System**: Dark/light mode with CSS variables for easy customization
- **Smooth Animations**: Motion/React integration for polished user interfaces
- **Intelligent Formatting**: Biome provides fast, opinionated code formatting and linting

### Production Features
- **Security**: Rate limiting (300 requests/second), CORS protection, input validation
- **Performance**: Optimized bundling, static asset caching, efficient code splitting
- **Error Handling**: Structured error responses, React error boundaries, graceful degradation
- **Configuration**: Environment variables validated with Zod schemas
- **Analytics**: Google Analytics 4 integration ready to enable

## Use Cases

**Rapid Prototyping**: Launch MVPs and proof-of-concepts in hours instead of days, focusing on features rather than infrastructure.

**Team Templates**: Standardize development practices across teams with a consistent, well-documented starting point.

**Portfolio Projects**: Build impressive full-stack applications quickly with modern technologies that demonstrate technical proficiency.

**Production Applications**: Start real projects with confidence, knowing security, performance, and scalability concerns are already addressed.

**Learning Platform**: Study modern full-stack architecture patterns, type-safe API design, and production deployment practices.

## What Sets It Apart

**vs. Create React App / Vite Templates**: Includes backend API, database integration, and production security features that frontend-only templates lack.

**vs. Next.js**: More flexible routing and API structure, faster runtime with Bun, and lighter-weight for applications that don't need SSR.

**vs. T3 Stack**: Simpler architecture without tRPC complexity, faster with Bun runtime, and easier to customize without framework constraints.

**vs. Custom Setups**: Saves weeks of configuration work while remaining fully customizable—not a black box framework.

## Technologies Used

### Runtime & Build
- **Bun** - Fast JavaScript runtime, bundler, and package manager
- **TypeScript** - Type-safe development with compile-time error checking

### Frontend
- **React 19** - Modern UI library with concurrent features
- **TanStack Router** - Type-safe routing and navigation
- **TanStack Query** - Powerful server state management and caching
- **Zustand** - Lightweight client-side state management
- **Motion/React** - Smooth animations and transitions
- **Tailwind CSS v4** - Utility-first styling with design system support
- **shadcn/ui** - High-quality, accessible component library (40+ components)

### Backend
- **Hono** - Fast, lightweight web framework
- **Drizzle ORM** - Type-safe database toolkit
- **PostgreSQL** - Robust relational database
- **Zod** - Schema validation and type inference

### Developer Tools
- **Biome** - Fast formatter and linter
- **Drizzle Kit** - Database migrations and schema management
- **React Hook Form** - Performant form handling with validation

### Production
- **Rate Limiting** - API protection against abuse
- **CORS** - Cross-origin resource sharing configuration
- **Error Boundaries** - Graceful error handling in React
- **Google Analytics 4** - User analytics integration

---

Built with modern web technologies to help developers ship faster and build better applications.
