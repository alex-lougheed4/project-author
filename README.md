<a href="https://demo-nextjs-with-supabase.vercel.app/">
  <img alt="Next.js and Supabase Starter Kit - the fastest way to build apps with Next.js and Supabase" src="https://demo-nextjs-with-supabase.vercel.app/opengraph-image.png">
  <h1 align="center">Next.js and Supabase Starter Kit</h1>
</a>

<p align="center">
 The fastest way to build apps with Next.js and Supabase
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#deploy-to-vercel"><strong>Deploy to Vercel</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Clone and run locally</strong></a> ·
  <a href="#feedback-and-issues"><strong>Feedback and issues</strong></a>
  <a href="#more-supabase-examples"><strong>More Examples</strong></a>
</p>
<br/>

## Features

- Works across the entire [Next.js](https://nextjs.org) stack
  - App Router
  - Pages Router
  - Middleware
  - Client
  - Server
  - It just works!
- supabase-ssr. A package to configure Supabase Auth to use cookies
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Components with [shadcn/ui](https://ui.shadcn.com/)
- Optional deployment with [Supabase Vercel Integration and Vercel deploy](#deploy-your-own)
  - Environment variables automatically assigned to Vercel project

## Demo

You can view a fully working demo at [demo-nextjs-with-supabase.vercel.app](https://demo-nextjs-with-supabase.vercel.app/).

## Deploy to Vercel

Vercel deployment will guide you through creating a Supabase account and project.

After installation of the Supabase integration, all relevant environment variables will be assigned to the project so the deployment is fully functioning.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&demo-title=nextjs-with-supabase&demo-description=This+starter+configures+Supabase+Auth+to+use+cookies%2C+making+the+user%27s+session+available+throughout+the+entire+Next.js+app+-+Client+Components%2C+Server+Components%2C+Route+Handlers%2C+Server+Actions+and+Middleware.&demo-url=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&demo-image=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2Fopengraph-image.png)

The above will also clone the Starter kit to your GitHub, you can clone that locally and develop locally.

If you wish to just develop locally and not deploy to Vercel, [follow the steps below](#clone-and-run-locally).

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Create a Next.js app using the Supabase Starter template npx command

   ```bash
   npx create-next-app --example with-supabase with-supabase-app
   ```

   ```bash
   yarn create next-app --example with-supabase with-supabase-app
   ```

   ```bash
   pnpm create next-app --example with-supabase with-supabase-app
   ```

3. Use `cd` to change into the app's directory

   ```bash
   cd with-supabase-app
   ```

4. Rename `.env.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

5. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).

6. This template comes with the default shadcn/ui style initialized. If you instead want other ui.shadcn styles, delete `components.json` and [re-install shadcn/ui](https://ui.shadcn.com/docs/installation/next)

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

## Environment Setup

This project is configured to work with both local and remote Supabase instances. You can easily switch between environments for development and production.

### Environment Configuration

The project uses environment-specific configuration files:

- **`env.local.example`** → Copy to `.env.local` for local development
- **`env.production.example`** → Copy to `.env.production` for production

### Quick Start Commands

```bash
# Setup local development environment
npm run db:local

# Link to production environment
npm run db:prod YOUR_PROJECT_REF

# Deploy to production
npm run db:deploy

# Check current status
npm run supabase:status
```

### Manual Setup

If you prefer manual setup, use the provided script:

```bash
# Make script executable (first time only)
chmod +x scripts/supabase-setup.sh

# Setup local environment
./scripts/supabase-setup.sh local

# Link to production
./scripts/supabase-setup.sh production YOUR_PROJECT_REF

# Reset local database with seed data
./scripts/supabase-setup.sh reset --seed

# Deploy to production
./scripts/supabase-setup.sh deploy
```

### Prerequisites

1. **Install Supabase CLI**

   ```bash
   # Using Homebrew (macOS)
   brew install supabase/tap/supabase

   # Or download binary directly
   curl -fsSL https://supabase.com/install.sh | sh
   ```

2. **Install Docker** (required for local Supabase)
   - [Docker Desktop](https://www.docker.com/products/docker-desktop/) for macOS/Windows
   - [Docker Engine](https://docs.docker.com/engine/install/) for Linux

### Local Development Workflow

#### 1. Start Local Supabase Instance

```bash
# Start local Supabase (creates local database, API, and Studio)
supabase start

# This will output your local environment variables:
# API URL: http://localhost:54321
# DB URL: postgresql://postgres:postgres@localhost:54322/postgres
# Studio URL: http://localhost:54323
# Inbucket URL: http://localhost:54324
```

#### 2. Apply Database Migrations

```bash
# Apply all migrations to local database
supabase db reset

# Or apply specific migrations
supabase migration up
```

#### 3. Seed the Database (Optional)

```bash
# Apply migrations and seed data
supabase db reset --seed

# Or seed manually after migrations
supabase db reset
psql postgresql://postgres:postgres@localhost:54322/postgres -f supabase/seed.sql
```

#### 3. Set Environment Variables for Local Development

Create `.env.local` with your local Supabase credentials:

```bash
# Local development environment
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-local-anon-key
```

#### 4. Start Your Next.js App

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

#### 5. Access Local Tools

- **Supabase Studio**: http://localhost:54323 (database management)
- **API**: http://localhost:54321
- **Database**: localhost:54322
- **Email Testing**: http://localhost:54324

### Working with Sample Data

The local database is completely isolated from production, so you can:

- Add test users and data
- Experiment with schema changes
- Test features without affecting production
- Reset the database anytime with `supabase db reset`

#### Sample Data Included

The seed file (`supabase/seed.sql`) includes:

- **5 sample profiles** with different writing styles and backgrounds
- **8 creative writing prompts** covering various genres (sci-fi, mystery, fantasy, etc.)
- **5 sample stories** written in response to prompts
- **33 sample votes** to demonstrate the voting system
- **Realistic content** with proper word counts, deadlines, and metadata

Sample prompts include:

- "The Last Library on Earth" (post-apocalyptic)
- "Time Traveler's Dilemma" (sci-fi)
- "The Restaurant at the End of the Universe" (fantasy)
- "The Garden of Forgotten Dreams" (magical realism)
- And more!

### Database Schema

This project includes a comprehensive database schema for a writing platform:

- **`profiles`**: User profiles extending Supabase auth
- **`prompts`**: Writing prompts with deadlines and word limits
- **`stories`**: Stories written in response to prompts
- **`votes`**: Upvote/downvote system for content
- **Row Level Security**: Secure data access policies
- **Helper Functions**: Vote counting and metadata views
- **Triggers**: Automatic profile creation on signup

### Switching Between Local and Production

```bash
# Work with local database
supabase start
supabase db reset

# When ready to deploy to production
supabase stop                    # Stop local instance
supabase link --project-ref YOUR_PROJECT_REF
supabase db push                 # Push migrations to production
```

### Troubleshooting

- **Port conflicts**: If ports are in use, Supabase will show alternative ports
- **Database reset**: Use `supabase db reset` to start fresh
- **Migration issues**: Check `supabase migration list` for status
- **Docker issues**: Ensure Docker is running before `supabase start`

## Feedback and issues

Please file feedback and issues over on the [Supabase GitHub org](https://github.com/supabase/supabase/issues/new/choose).

## More Supabase examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Supabase Auth and the Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)
