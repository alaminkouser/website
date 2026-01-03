# website

## Setup

1. Clone the Repository.
2. Open the Repository.
3. Create a Virtual Python Environment.
4. Activate the Virtual Python Environment.
5. Install the Dependencies:

```shell
pip install -r requirements.txt
pip install -r requirements-dev.txt
```

6. Install the Prettier Plugin for Jinja Templates.

```shell
npm install
```

7. Create a `.env` file and add the environment variables.
8. Copy the `.env.example` file to `.env`.
9. Run the Development Server:

```shell
uvicorn app.main:app --reload --port 8080 --host 127.0.0.1 --env-file .env
```

10. If you want to run the full stack including the docs, then run:

```shell
npm --prefix docs install; npm --prefix docs run build; npx --prefix docs @divriots/jampack docs/dist; rm -rf app/home/docs; mv docs/dist app/home/docs; uvicorn app.main:app --reload --port 8080 --host 127.0.0.1 --env-file .env
```

> [!NOTE]
> This will install the dependencies for the docs, remove the existing docs,
> build the docs, move the docs to the location where the app can serve them,
> and run the server as if it was running in production.

## Committing

1. Run the Prettier Formatting:

```shell
npx prettier --write app
npx prettier --write docs
```

2. Run the Black Formatting:

```shell
black app
```

3. Commit the Changes.
