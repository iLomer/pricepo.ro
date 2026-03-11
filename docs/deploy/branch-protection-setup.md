# Branch Protection Rules -- GitHub

Configure branch protection on the `main` branch to enforce CI checks before merging.

## Setup Steps

1. Go to GitHub repository: `https://github.com/iLomer/prevo.ro`
2. Navigate to **Settings > Branches**
3. Click **Add branch protection rule**
4. Configure:
   - **Branch name pattern:** `main`
   - [x] **Require a pull request before merging**
   - [x] **Require status checks to pass before merging**
     - Search and add: `Lint, Type Check, and Build`
   - [x] **Require branches to be up to date before merging**
   - [ ] Require approvals (optional -- enable if working with a team)

## What the CI Pipeline Checks

The `.github/workflows/ci.yml` pipeline runs on every push to `main` and on pull requests:

1. **TypeScript type check** (`tsc --noEmit`) -- catches type errors
2. **ESLint** (`npm run lint`) -- enforces code style
3. **Build** (`next build`) -- ensures the app compiles for production

All three must pass before a PR can be merged.
