---
title: Automating Deployments for Cielotrip Website
date: 2026-04-11
keywords:
  - ci-cd
  - cielotrip
  - deno
  - github-actions
  - vercel
  - website
---

This article explores the CI/CD pipeline powering the Cielotrip project. It
details how a combination of GitHub Actions, Deno, and Vercel automates
production deployments upon codebase updates, while preserving reliability
through daily scheduled health checks without forced redeployments.

---

## Automating Deployments with GitHub Actions, Deno, and Vercel

In modern web development, CI/CD (Continuous Integration and Continuous
Deployment) is the backbone of a fast and reliable workflow. Today, I want to
walk through how we handle automated deployments for the **Cielotrip** project
using GitHub Actions, Deno, and Vercel.

Our workflow is designed to do two primary things:

1. **Deploy to production** every time we push new code to our `main` branch.
2. **Run daily scheduled builds** to ensure our codebase and data sources remain
   healthy over time.

Let's break down the GitHub Actions workflow YAML file that makes this all
happen.

### The CI/CD Configuration

Here is the GitHub Actions workflow we use:

```yaml
name: Build and Deploy on Push
env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
on:
  push:
    branches:
      - main
  schedule:
    - cron: "0 0 * * *"
```

**Environment Variables and Triggers:** At the top of the file, we link our
securely stored `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` as environment
variables. The `on` block defines our triggers. The pipeline kicks off in two
scenarios:

- **On Push:** Whenever a developer pushes code to the `main` branch.
- **On Schedule:** Every day at midnight (`0 0 * * *`), via a CRON job.

### The Step by Step Workflow

Once triggered, the workflow starts a job called `Build-and-Deploy-on-Push`
running on the latest Ubuntu environment (`ubuntu-latest`). Here is what happens
next:

#### Checking out the Code and Setting Up the Environment

```yaml
- uses: actions/checkout@v6
- name: Install Vercel CLI
  run: npm install --global vercel@50.37.1
- name: Install Deno
  uses: denoland/setup-deno@v2
```

First, the runner clones the repository so it can access our project files using
`actions/checkout`. Then, it explicitly installs the Vercel CLI globally and
sets up the Deno runtime environment using the official `setup-deno` action.

#### Pulling Vercel Environment Variables

```yaml
- name: Pull Vercel Environment Information
  run:
    vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN
    }}
```

Before building, our application needs context. By running `vercel pull`, we
pull the production environment configuration directly from Vercel securely,
authenticating with a secret `VERCEL_TOKEN`.

#### The Build Step Using Deno

```yaml
- name: Build step
  run: |
    deno run --allow-net --allow-env --allow-run ./airport-pagefind/main.ts
    mv pagefind static/
```

This is where the heavy lifting happens. We execute a Deno script (`main.ts`)
which requires specific permissions (`--allow-net`, `--allow-env`,
`--allow-run`) to securely fetch data or execute native commands. This script
likely builds a search index using **Pagefind**. After the script finishes, we
move the resulting `pagefind` directory into our `static/` folder so it can be
shipped alongside our project.

#### Conditional Deployments

```yaml
- name: Deploy Project Artifacts to Vercel
  if: github.event_name != 'schedule'
  run: vercel deploy --prod --token=${{ secrets.VERCEL_TOKEN }} --archive=tgz

- name: Skip Deploy on Schedule
  if: github.event_name == 'schedule'
  run: echo "Scheduled build completed. Skipping deployment."
```

Finally, we decide what to do with the generated build.

- If the workflow was triggered by a **push to main**, we securely push the
  updated artifacts to our production Vercel environment over a TGZ archive.
- If the workflow was triggered by our **daily schedule**, we skip the
  deployment. This scheduled run acts as an automated health check—making sure
  our APIs, Deno scripts, and indexing processes still work on their own,
  without forcefully updating the live site.

## Full Workflow YAML

The following is the full workflow YAML file:

```yaml
name: Build and Deploy on Push
env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
on:
  push:
    branches:
      - main
  schedule:
    - cron: "0 0 * * *"
jobs:
  Build-and-Deploy-on-Push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - name: Install Vercel CLI
        run: npm install --global vercel@50.37.1
      - name: Install Deno
        uses: denoland/setup-deno@v2
      - name: Pull Vercel Environment Information
        run:
          vercel pull --yes --environment=production --token=${{
          secrets.VERCEL_TOKEN }}
      - name: Build step
        run: |
          deno run --allow-net --allow-env --allow-run ./airport-pagefind/main.ts
          mv pagefind static/
      - name: Deploy Project Artifacts to Vercel
        if: github.event_name != 'schedule'
        run:
          vercel deploy --prod --token=${{ secrets.VERCEL_TOKEN }} --archive=tgz
      - name: Skip Deploy on Schedule
        if: github.event_name == 'schedule'
        run: echo "Scheduled build completed. Skipping deployment."
```

## Conclusion

By combining GitHub Actions with Vercel and Deno, we get a predictable, robust
system that manages static indexing while protecting our production environment
from unnecessary or untested changes.
