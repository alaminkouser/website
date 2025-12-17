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
8. Run the Development Server:

```shell
uvicorn app.main:app --reload --port 8080 --host 127.0.0.1 --env-file .env
```

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
