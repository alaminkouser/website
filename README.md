# website

This is a monorepo containing the source code for my personal website. It
integrates multiple technologies to serve a seamless experience, including a
blog/documentation site, a dynamic backend, and an automated resume builder.

## Tech Stack

- **Backend**: [FastAPI](https://fastapi.tiangolo.com/) (Python) - Serves the
  main application, APIs, and static content.
- **Documentation/Blog**: [Astro](https://astro.build/) &
  [Starlight](https://starlight.astro.build/) (Node.js) - Generates the
  documentation and blog pages.
- **Resume**: [Typst](https://typst.app/) - Programmatically generates my resume
  PDF.
- **Deployment**: [Vercel](https://vercel.com/) via
  [GitHub Actions](https://github.com/features/actions).

## Project Structure

```
├── app/          # FastAPI application & static asset serving
│   ├── home/     # Static files root (HTML, CSS, JS, generated artifacts)
│   └── routes/   # FastAPI route definitions
├── docs/         # Astro + Starlight project for the /docs section
├── resume/       # Typst source code for the resume
├── .github/      # CI/CD workflows for building and deploying
└── vercel.json   # Vercel deployment configuration
```

## Getting Started

### Prerequisites

- **Python** (3.12+)
- **Node.js** (LTS recommended)
- **Typst** (CLI tool for compiling the resume)

### Installation

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/alaminkouser/website.git
    cd website
    ```

2.  **Setup Python Environment**

    ```bash
    python -m venv .venv
    source .venv/bin/activate  # On Windows: .venv\Scripts\activate
    pip install -r requirements.txt
    pip install -r requirements-dev.txt # For development tools
    ```

3.  **Setup Node Environment (for Docs)**

    ```bash
    cd docs
    npm install
    cd ..
    ```

4.  **Environment Variables** Create a `.env` file in the root directory based
    on `.env.example`.
    ```bash
    cp .env.example .env
    ```

## Development

You can run different parts of the stack independently or together.

### Running the Backend (FastAPI)

This starts the main server. Note that without building the docs or resume
first, those sections might be missing or outdated.

```bash
uvicorn app.main:app --reload --port 8080 --host 127.0.0.1 --env-file .env
```

### Running Docs in Isolation (Astro)

To work on the content or design of the documentation/blog without the Python
backend:

```bash
cd docs
npm run dev
```

### Full Stack Local Development

To replicate the production environment locally (build everything and serve via
FastAPI):

1.  **Build Resume (PDF)**

    ```bash
    typst compile resume/main.typ --ignore-system-fonts --font-path="./resume/backend/fonts/"
    mv resume/main.pdf app/home/resume.pdf
    ```

2.  **Build Documentation**

    ```bash
    cd docs
    npm run build
    npx @divriots/jampack dist/ # Optimizes static assets
    cd ..
    # Clean old docs and move new build to app home
    rm -rf app/home/docs
    mv docs/dist/docs app/home/docs
    ```

3.  **Run Server**
    ```bash
    uvicorn app.main:app --reload --port 8080 --host 127.0.0.1 --env-file .env
    ```

## Deployment

The project uses a **GitHub Actions** workflow
(`.github/workflows/production.yaml`) that triggers on push to the `main`
branch.

1.  **Checkout**: Pulls the latest code.
2.  **Build Resume**: Compiles `resume/main.typ` to PDF and places it in
    `app/home/`.
3.  **Build Docs**: Installs dependencies, builds the Astro site, runs Jampack
    optimization, and moves the output to `app/home/docs`.
4.  **Deploy**: Pushes the prepared artifact (FastAPI app + built static files)
    to Vercel.

## Committing

Before committing, please ensure code formatting is applied:

1.  **Prettier** (for JS/HTML/CSS/Markdown):

    ```bash
    npx prettier --write app docs
    ```

2.  **Black** (for Python):
    ```bash
    black app
    ```
