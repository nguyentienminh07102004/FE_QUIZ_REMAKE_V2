FROM node:22.11.0-alpine AS dependency
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install

FROM node:22.11.0 AS build
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY tailwind.config.ts .
COPY postcss.config.mjs .
COPY tsconfig.json .
COPY next.config.ts .
COPY src ./src
COPY public ./public
RUN npm run build
