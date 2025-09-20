# Next.js Supabase Starter Template

A clean, minimal starter template with Next.js, Supabase, and shadcn/ui. Perfect for rapidly bootstrapping new projects with authentication.

## Features

- **Next.js 15** with Turbopack for fast development
- **Supabase** for authentication, database, and real-time features
- **shadcn/ui** components built on Radix primitives
- **TypeScript** for type safety
- **Tailwind CSS** with CSS variables for theming
- **Dark/Light mode** with system preference detection
- **Complete authentication flow** (login, signup, password reset)
- **Protected routes** with middleware
- **Clean, minimal UI** ready for customization

## Getting Started

### Prerequisites

- Node.js 18+
- Docker (for local Supabase)
- Supabase CLI

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the local Supabase stack:
```bash
supabase start
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## What You Get

This starter template provides a **minimal foundation** with everything you need to start building:

### 🏠 **Landing Page (`/`)**
- Clean welcome card with app description
- Sign in and sign up buttons
- Responsive design with theme switcher

### 🔐 **Complete Authentication Flow**
- **Login** (`/auth/login`) - Email/password authentication
- **Sign Up** (`/auth/sign-up`) - User registration with email confirmation
- **Forgot Password** (`/auth/forgot-password`) - Password reset flow
- **Update Password** (`/auth/update-password`) - New password setting
- **Success/Error Pages** - User feedback for auth actions

### 🛡️ **Protected Area (`/protected`)**
- Simple "Hello World" page showing authenticated user's email
- **Perfect starting point** for building your app
- Protected by middleware - redirects to login if not authenticated

### 🎨 **UI Components**
- **shadcn/ui** components (Button, Card, Input, Label, etc.)
- **Dark/Light theme** toggle with system preference
- **Responsive design** with Tailwind CSS
- **Clean, professional styling** ready for customization

## Local Supabase Development

### Supabase Commands

| Command | Description |
|---------|-------------|
| `supabase start` | Start the local Supabase stack |
| `supabase stop` | Stop the local Supabase stack |
| `supabase status` | Check the status of local services |
| `supabase db reset` | Reset the local database to initial state |
| `supabase db push` | Push local migrations to remote database |
| `supabase db pull` | Pull remote database schema to local |

### Local Services

When running `supabase start`, the following services are available:

- **API URL:** http://127.0.0.1:54321
- **Studio URL:** http://127.0.0.1:54323 (Database management)
- **Inbucket URL:** http://127.0.0.1:54324 (Email testing)
- **Database URL:** postgresql://postgres:postgres@127.0.0.1:54322/postgres

### Database Migrations

Create a new migration:
```bash
supabase migration new <migration_name>
```

Apply migrations:
```bash
supabase db reset
```

### Type Generation

Generate TypeScript types from your database schema:
```bash
supabase gen types typescript --local > lib/database.types.ts
```

### Seeding Data

Add SQL files to `supabase/seed.sql` to seed your database with initial data.

## Environment Variables

The project uses `.env.local` for local development:

```bash
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=your-anon-key
```

For production, update these values to point to your hosted Supabase project.

## Project Structure

```
├── app/                           # Next.js app directory
│   ├── auth/                     # Authentication pages
│   │   ├── login/               # Login page
│   │   ├── sign-up/             # Sign up page
│   │   ├── forgot-password/     # Password reset page
│   │   └── update-password/     # Password update page
│   ├── protected/               # Protected area (requires auth)
│   │   ├── layout.tsx          # Protected layout with header
│   │   └── page.tsx            # "Hello World" starting page
│   ├── layout.tsx              # Root layout with theme provider
│   └── page.tsx                # Landing page
├── components/                  # Reusable components
│   ├── ui/                     # shadcn/ui components
│   ├── auth-button.tsx         # Sign in/out button
│   ├── theme-switcher.tsx      # Dark/light mode toggle
│   └── *-form.tsx              # Authentication forms
├── lib/                        # Utility functions and configurations
│   ├── supabase/              # Supabase client configurations
│   │   ├── client.ts          # Browser client
│   │   ├── server.ts          # Server client
│   │   └── middleware.ts      # Middleware client
│   └── utils.ts               # Shared utilities
├── supabase/                  # Supabase configuration
│   ├── config.toml           # Supabase configuration
│   ├── migrations/           # Database migrations
│   └── seed.sql              # Database seeding
├── components.json            # shadcn/ui configuration
├── middleware.ts              # Route protection
├── .env.local                # Local environment variables
└── CLAUDE.md                 # Development guide for Claude Code
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint

## Adding Components

This template uses **shadcn/ui** for components. Add new components with:

```bash
# Add individual components
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add table

# Add complex component blocks
npx shadcn@latest add @shadcn/sidebar-01
npx shadcn@latest add @shadcn/dashboard-01
```

## Template Philosophy

This is a **clean foundation**, not a feature-complete application. It provides:

- ✅ **Essential authentication** flow that just works
- ✅ **Beautiful, accessible UI** components ready for customization
- ✅ **Professional development setup** with TypeScript and Tailwind
- ✅ **Zero unnecessary complexity** or opinionated choices

**Start building from the "Hello World" page** (`/protected`) and add features as your project needs them.

## Deployment

### Environment Variables

For production deployment, update your environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=your-anon-key
```

### Platform Deployment

This template works with any Next.js hosting platform:
- **Vercel** (recommended)
- **Netlify**
- **Railway**
- **Docker containers**

## Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)