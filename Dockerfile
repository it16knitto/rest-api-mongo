FROM node:20-slim AS base

WORKDIR /app

ARG github_token
ENV GITHUB_TOKEN=$github_token
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
# -----------------------------------------------------------------------------

FROM base AS prod-deps
COPY ./.npmrc .npmrc
COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml
RUN echo //npm.pkg.github.com/:_authToken=$GITHUB_TOKEN >> .npmrc
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# -----------------------------------------------------------------------------

FROM base AS build
COPY ./.npmrc .npmrc
COPY src src
COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml
COPY tsconfig.json tsconfig.json
RUN echo //npm.pkg.github.com/:_authToken=$GITHUB_TOKEN >> .npmrc
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# -----------------------------------------------------------------------------

FROM base
COPY package.json package.json
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
EXPOSE 8000
CMD [ "pnpm", "start" ]
