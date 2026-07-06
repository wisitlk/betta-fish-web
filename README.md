# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/807ff5d8-f11f-46d6-a8dd-3ef7d581413a

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/807ff5d8-f11f-46d6-a8dd-3ef7d581413a) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

**Free hosting via GitHub Pages (recommended)**

A ready-made GitHub Actions deploy workflow lives at `.github/workflows-pending/deploy.yml`. It builds the site and publishes it to GitHub Pages on every push to `main`, at:

```
https://wisitlk.github.io/betta-fish-web/
```

One-time setup (needs your GitHub permissions — automation tokens can't write workflow files):

1. Make the repository **public** (Settings → General → Change visibility). GitHub Pages is free for public repos only; private repos need GitHub Pro/Team.
2. Activate the workflow:
   ```sh
   git mv .github/workflows-pending/deploy.yml .github/workflows/deploy.yml
   git commit -m "Activate GitHub Pages deploy workflow" && git push
   ```
3. Merge to `main` (or run it from the **Actions** tab → `Deploy to GitHub Pages` → `Run workflow`). If the first run reports a Pages permission error, enable **Settings → Pages → Source: GitHub Actions** once and re-run.

**Prefer to keep the repo private?** Netlify, Vercel, and Cloudflare Pages all offer free tiers that deploy private GitHub repos — connect the repo in their dashboard and set build command `npm run build`, output directory `dist`.

**Alternatively**, open [Lovable](https://lovable.dev/projects/807ff5d8-f11f-46d6-a8dd-3ef7d581413a) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
