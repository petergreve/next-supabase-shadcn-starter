# Next.js Supabase Starter

A Next.js application with Supabase integration for local development.

## Features

- Next.js 15 with Turbopack
- Supabase for database and authentication
- Local development environment with Docker
- TypeScript support
- Tailwind CSS for styling
- Radix UI components

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
├── app/                    # Next.js app directory
├── components/            # Reusable components
├── lib/                   # Utility functions and configurations
│   └── supabase/         # Supabase client configurations
├── supabase/             # Supabase configuration and migrations
│   ├── config.toml       # Supabase configuration
│   └── migrations/       # Database migrations
└── .env.local            # Local environment variables
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint

## Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli)