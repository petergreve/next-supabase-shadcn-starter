# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint

### Supabase Local Development
- `supabase start` - Start local Supabase stack (PostgreSQL, Auth, Storage, Studio)
- `supabase stop` - Stop local Supabase stack
- `supabase status` - Check status of local services
- `supabase db reset` - Reset local database and apply migrations
- `supabase migration new <name>` - Create new database migration
- `supabase gen types typescript --local > lib/database.types.ts` - Generate TypeScript types from schema

### Local Services (when Supabase is running)
- **API:** http://127.0.0.1:54321
- **Studio (DB Management):** http://127.0.0.1:54323
- **Email Testing (Inbucket):** http://127.0.0.1:54324
- **Database:** postgresql://postgres:postgres@127.0.0.1:54322/postgres

### shadcn/ui Component Management
- `npx shadcn@latest add <component>` - Add new shadcn/ui components
- `npx shadcn@latest add @shadcn/<block>` - Add shadcn blocks (complex components)
- **Configuration:** Uses "new-york" style with Lucide icons, CSS variables enabled

## Architecture Overview

This is a **clean starter template** designed for rapid project bootstrapping with essential authentication and minimal UI.

### Supabase Integration Pattern
Uses three distinct Supabase client configurations:

1. **Browser Client** (`lib/supabase/client.ts`) - For client-side operations in React components
2. **Server Client** (`lib/supabase/server.ts`) - For server-side operations in Server Components and API routes
3. **Middleware Client** (`lib/supabase/middleware.ts`) - For authentication checks in Next.js middleware

**Critical Implementation Details:**
- Server clients must NEVER be stored in global variables (important for Vercel Fluid compute)
- Always create new server client instances within each function
- Middleware handles automatic redirects to `/auth/login` for unauthenticated users accessing protected routes

### Authentication Flow
- **Public routes:** `/`, `/auth/*` paths (login, signup, forgot-password, etc.)
- **Protected routes:** `/protected/*` paths require authentication via middleware
- **Auto-redirect:** Unauthenticated users are redirected to `/auth/login`
- **Session management:** Handled automatically by middleware using `getClaims()` - DO NOT remove this call

### Minimal UI Structure
- **Landing Page (`/`):** Simple welcome card with sign-in/sign-up buttons
- **Protected Area (`/protected`):** Basic "Hello World" page showing authenticated user's email
- **Auth Pages:** Complete authentication flow with shadcn/ui styled forms
- **Layouts:** Consistent header with theme switcher and auth buttons

### Component Architecture
- **UI Components:** Essential shadcn/ui components (Button, Card, Input, Label, etc.)
- **Auth Components:** Pre-built forms for complete authentication flow
- **Theme System:** next-themes integration with system preference detection
- **No Complex Components:** Sidebar, breadcrumbs, and complex layouts removed for simplicity

### Environment Configuration
- **Local Development:** Uses `.env.local` with local Supabase credentials
- **Production:** Update environment variables to point to hosted Supabase project
- **Environment Check:** `hasEnvVars` utility prevents middleware issues during initial setup

### Database & Migrations
- **Schema:** Managed via Supabase migrations in `/supabase/migrations/`
- **Seeding:** Add SQL to `/supabase/seed.sql` for local development data
- **Type Safety:** Generate TypeScript types from schema for full type safety

### Email Testing
- **Local:** All emails captured by Inbucket (no real emails sent)
- **Confirmation Emails:** Auto-confirmed in local development for faster testing
- **Password Reset:** Emails are sent to Inbucket for testing reset flows

### Styling System
- **Framework:** Tailwind CSS with CSS variables for theming
- **Components:** shadcn/ui "new-york" style with Lucide icons
- **Font:** Geist Sans with antialiasing
- **Theme:** Dark/light mode support with system preference detection

## Starter Template Philosophy

This template provides the **essential foundation** for any project requiring authentication:
- Complete, secure authentication flow with Supabase
- Clean, minimal UI ready for customization
- Professional development setup with TypeScript, Tailwind, and shadcn/ui
- No unnecessary complexity or opinionated UI choices

**Start building from the "Hello World" protected page** and add components as needed.