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

## Architecture Overview

### Supabase Integration Pattern
This project uses three distinct Supabase client configurations:

1. **Browser Client** (`lib/supabase/client.ts`) - For client-side operations in React components
2. **Server Client** (`lib/supabase/server.ts`) - For server-side operations in Server Components and API routes
3. **Middleware Client** (`lib/supabase/middleware.ts`) - For authentication checks in Next.js middleware

**Critical Implementation Details:**
- Server clients must NEVER be stored in global variables (important for Vercel Fluid compute)
- Always create new server client instances within each function
- Middleware handles automatic redirects to `/auth/login` for unauthenticated users accessing protected routes

### Authentication Flow
- **Public routes:** `/`, `/auth/*` paths (login, signup, etc.)
- **Protected routes:** All other paths require authentication via middleware
- **Auto-redirect:** Unauthenticated users are redirected to `/auth/login`
- **Session management:** Handled automatically by middleware using `getClaims()` - DO NOT remove this call

### Component Architecture
- **UI Components:** Built with shadcn/ui (Radix primitives + Tailwind)
- **Auth Components:** Pre-built forms for login, signup, password reset, etc. in `/components`
- **Theme System:** next-themes integration with system preference detection
- **Layout Structure:**
  - `/app/layout.tsx` - Root layout with theme provider
  - `/app/protected/layout.tsx` - Protected area navigation and layout

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