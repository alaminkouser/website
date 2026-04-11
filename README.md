# AL AMIN KOUSER - Personal Website

Welcome to the repository for my personal website. The project is a highly
customized and automated full-stack application that leverages modern tools to
deliver content efficiently.

## 🚀 Overview

This website is served by a lightweight Python **FastAPI** backend and
dynamically deployed on **Vercel**. It uses **Jinja2 Templates** to deliver
dynamic page content and implements an automated CI/CD pipeline leveraging
GitHub Actions.

### Key Features

- **FastAPI Backend:** Handles incoming requests, middleware capabilities (like
  GZip compression and query parameter removal), page view tracking, and renders
  Jinja templates.
- **Serverless Hosting:** Hosted on Vercel leveraging the raw ASGI interface of
  FastAPI, ensuring reliable and fast serverless functioning around the globe.
- **Automated Resume Generation:** Automatically compiles the resume from Typst
  markup (`resume/main.typ`) into a structured PDF file (`resume.pdf`) during
  deployment.
- **Custom Static Document Generator:** Custom-built static documentation
  generator powered by **Deno**, converting markdown modules into HTML using
  Handlebars and Marked (`app/home/docs`).
- **Resource Minification:** Built-in Github Actions steps use `terser`,
  `html-minifier-terser`, and `clean-css-cli` to heavily minify all deployed
  HTML, CSS, and JS files, ensuring maximum performance.

## 🗂 Project Structure

- `app/`: FastAPI application code.
  - `main.py`: Entry point for FastAPI backend, managing middleware and error
    paths.
  - `routes/`: Organizes route handling (e.g., dynamic page serving and system
    status checks).
  - `tools/`: Core utilities, middleware classes, template loaders, and
    integrations (e.g., Firebase view logging).
  - `home/`: The public artifacts folder. This is where HTML Jinja templates,
    CSS, and JS resources exist.
- `docs/`: Markdown source files for documentation/blog alongside the custom
  Deno documentation builder (`main.ts`).
- `resume/`: Contains Typst markup source for tracking a highly professional and
  consistent resume structure.
- `.github/workflows/`: Contains the powerful GitHub Actions logic for complete
  automation.

## 🛠 CI/CD Pipeline (`build-and-deploy-on-push.yaml`)

The robustness of this project derives from its automated GitHub Actions
workflow, responding to both push events to `main` and recurring daily
schedules. Features inside the pipeline include:

1. **Pre-build:** Automatically provisions environments configuring Deno, Typst,
   and the Vercel CLI.
2. **Build Resume:** Compiles `resume/main.typ` formatting text into a
   production-ready PDF, placing it in the public output
   (`app/home/resume.pdf`).
3. **Download Font:** Fetches the JetBrains Mono web font and saves it to
   `app/home/main.woff2`.
4. **Build Docs:** Executes `deno run` against `docs/deno.json` configurations
   to transpile Markdown content to HTML seamlessly integrating it into
   `app/home/docs`.
5. **Minify Assets:** Crawls `.html`, `.css`, and `.js` output resources and
   aggressively minifies them reducing overall payload.
6. **Deploy:** Uses Vercel CLI to securely push production-ready artifacts
   entirely to Vercel (production deployments skipped on scheduled runs).

## 💻 Local Development

### Prerequisites

- **Python 3.13+**
- **Deno** (Optional, specifically for building docs via script)
- **Typst** (Optional, specifically for building the Typst resume layout
  locally)

### Running FastAPI Locally

1. Create a virtual environment and install dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   pip install -r requirements-dev.txt
   ```
2. Download the site font (JetBrains Mono):
   ```bash
   curl -L "https://github.com/JetBrains/JetBrainsMono/raw/refs/heads/master/fonts/webfonts/JetBrainsMono%5Bwght%5D.woff2" -o "app/home/main.woff2"
   ```
3. Ensure your environment variables are set up by creating a `.env` file (you
   can copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```
4. Start the FastAPI development server using `uvicorn`:
   ```bash
   uvicorn app.main:app --reload --port 8080 --host 127.0.0.1 --env-file .env
   ```
   The site layout should now be accessible spanning on
   `http://127.0.0.1:8080/`.

### Building the Integrations Locally

- To generate the document pages manually, simply run:

  ```bash
  rm -rf app/home/docs
  deno run --config docs/deno.json preparePublicDirectory
  deno run --config docs/deno.json pagefind
  deno run --config docs/deno.json build
  mv docs/public app/home/docs
  ```

- To compile the resume output locally quickly, run:
  ```bash
  typst compile resume/main.typ
  mv resume/main.pdf app/home/resume.pdf
  ```
