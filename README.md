# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## TODO:

### Platform Setup

- [x] Make it deployment
- [x] Set up Tailwind for styling
- [x] Set up shadcn for nuxt
- [x] Create landing page
- [x] Set up ci/cd
- [x] Set up coderabbit for PR reviews and code quality
- [x] Set up typescript

## Frontend tasks

- [x] Build out landing page
- [ ] Build out onboarding forms
- [ ] Build out login screens

## Backend tasks

- [x] Evaluate backend options - convex
- [x] Set up database schema
- [ ] Evaluate Auth providers: We'll go with the 2 step approach we saw with WorkOS; We'll have to use clerk because of single tenancy limitations with WorkOS
- [ ] Set up authentication and user management
- [ ] Set up API endpoints for onboarding flow
- [ ] Figure out user roles, constraints and permissions
- [ ] Evaluate browserbase for verifying pharmacist ids
- [ ] Set up email service for onboarding and notifications
