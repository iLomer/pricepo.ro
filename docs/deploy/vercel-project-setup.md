# Vercel Project and Environment Variables Setup

Checklist for deploying Prevo (prevo.ro) on Vercel.

## 1. Create Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" > "Project"
3. Import the GitHub repository: `iLomer/prevo.ro`
4. Settings:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `next build` (default)
   - **Output Directory:** `.next` (default)
   - **Node.js Version:** 20.x

## 2. Configure Environment Variables

In the Vercel project settings, go to **Settings > Environment Variables**.

Add the following variables for **Production** environment:

| Variable | Value | Source |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` | Supabase dashboard > Settings > API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOi...` | Supabase dashboard > Settings > API |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Google Analytics > Admin > Data Streams |

Optional variables (add when ready):

| Variable | Value | Purpose |
|---|---|---|
| `CRON_SECRET` | (generate random string) | Protects /api/alerts/send endpoint |

## 3. Deploy

1. Click "Deploy" to trigger the first production deployment
2. Wait for the build to complete successfully
3. Verify the app loads at the Vercel-generated URL (e.g., `pricepo-ro.vercel.app`)

## 4. Verify Production

- [ ] Build completes without errors
- [ ] App loads at `*.vercel.app` URL
- [ ] Landing page renders correctly
- [ ] Waitlist form submits successfully
- [ ] Auth flow works: sign up, sign in, sign out
- [ ] Dashboard pages load after authentication
- [ ] Fiscal calendar shows deadlines
- [ ] Tax estimator calculates correctly

## 5. .env.example

The `.env.example` file in the repository lists all required environment variables (without values) for developer reference. It has been updated to include all variables.

## Notes

- Custom domain configuration is handled in slice-023
- Preview deployments are auto-configured by Vercel for PRs
- Vercel Analytics / Speed Insights are not configured yet
