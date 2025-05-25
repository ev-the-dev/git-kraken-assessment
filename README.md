# Evan Hutchinson's Git Kraken Backend Assessment

## Initial Setup

0. Run `pnpm install`
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

If you'd like to run the app outside of a container, but still connect to the containerized Postgres instance, then you need to do a couple of things. 
1. `docker compose up -d db` <- starts just the db container.
2. `docker compose ps` <- ensure that it's running.
3. Create a `.env` file with `DATABASE_URL` pointed to the same connection string in the docker-compose file, and `PORT` set to whatever.
4. Run `sh ./build` <- outputs everything you should need in the `dist` directory.
5. Run `node --env-file=.env dist/main.js` <- starts the server with the environment variables set.

## Endpoints
To test out different users, pass in different values to the `x-user-id` header. An admin userId -- if using seed, should be id `1` -- can operate on anything. Otherwise, when viewing posts by user, updating, or deleting, the `x-user-id` needs to line up with the `userId` of the path and the `author_id` that the `postId` relates to.

### HEALTH
- `GET health/` <- returns whether or not the server can communicate with the DB.

### POSTS
```ts
type Post = {
    id: number
    author_id: number
    created_at: Date
    content: string
    status: "draft" | "published"
    title: string
    updated_at: Date
}
```
- `DELETE posts/:userId/:postId` <- delete a specific post.
- `GET posts/published` <- view all published posts.
- `GET posts/:userId` <- get all posts by user.
- `POST posts/:userId` <- create a new post.
- `PUT posts/:userId/:postId` <- update a post.

### USERS
```ts
type User = {
    id: number
    created_at: Date
    name: string
    role: "user" | "admin"
    updated_at: Date
}
```
- `POST users/` <- create a new user
