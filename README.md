# Evan Hutchinson's Git Kraken Backend Assessment

## Initial Setup

1. Ensure `make` is available on your system (or just copy-paste the make target recipes into your shell prompt)
2. Run `make up`
3. Run `make migrate`
4. Run `make seed`

## Manual Testing

With the containers up and running, you can connect to the "app" via `localhost:9001` -- or any other `PORT` if you chose to override the default.

To check that everything is working fine, you can hit `GET localhost:{PORT}/health`, and should receive a successful response like:
```json
{
    "db": "connected",
    "status": "healthy"
}
```
