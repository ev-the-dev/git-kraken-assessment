# Stage 1: Builder
FROM node:22-alpine as builder

RUN mkdir /app

COPY . /app

WORKDIR /app

RUN corepack enable pnpm

RUN pnpm install --frozen-lockfile

RUN bash build.sh

# Stage 2: Runtime
FROM node:22-alpine

RUN mkdir /app

COPY --from=builder /app/dist ./dist

EXPOSE 9001

CMD ["node", "dist/main.js"]
