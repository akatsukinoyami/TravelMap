FROM oven/bun:alpine AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM fholzer/nginx-brotli
COPY nginx.conf /etc/nginx/nginx.conf
RUN mkdir /app
COPY --from=build /app/dist /app

EXPOSE 80
