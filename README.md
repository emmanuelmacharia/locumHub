[![Netlify Status](https://api.netlify.com/api/v1/badges/16104ee6-362b-486f-97d8-3b5041145fd6/deploy-status)](https://app.netlify.com/projects/Pharmify/deploys)

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
- [x] Build out onboarding forms
- [x] Build out login screens

## Backend tasks

- [x] Evaluate backend options - convex
- [x] Set up database schema
- [x] Evaluate Auth providers: We'll go with the 2-step approach we saw with WorkOS; We'll have to use clerk because of single tenancy limitations with WorkOS
- [x] Set up authentication and user management
- [x] Set up API endpoints for onboarding flow
- [ ] Complete Homepage navigation (consider view transition api)
  - [x] Find staff
  - [ ] Find Work
  - [x] How it Works
  - [x] Pricing??
- [ ] Add frontend middleware to act as an auth route guard
- [x] Add clerk middleware to protect backend api routes
- [ ] Implement the dashboard
- [ ] Shift management
  - [ ] Pharmacy -- create Shift
  - [ ] Pharmacy -- update shift details
  - [ ] Pharmacy -- delete shift
  - [ ] Locum -- view postings
  - [ ] Locum -- view post details
  - [ ] Locum -- make application for shift
  - [ ] Pharmacy -- review applications for shift
  - [ ] Pharmacy -- shortlist candidates
  - [ ] Pharmacy & locum -- fill shift
- [ ] Figure out user roles, constraints and permissions
- [x] Evaluate browserbase for verifying pharmacist ids - we don't need browserbase or puppeteer - we can fetch all the information using our server
- [ ] Set up email service for onboarding and notifications - take a look at resend
