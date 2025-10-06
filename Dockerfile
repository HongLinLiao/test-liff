FROM node:22-alpine AS builder

WORKDIR /app

COPY .npmrc ./
COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install

COPY . .

ARG NEXT_PUBLIC_LIFF_ID_ARG
ENV NEXT_PUBLIC_LIFF_ID=${NEXT_PUBLIC_LIFF_ID_ARG}

RUN pnpm build

FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/.npmrc ./.npmrc
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

RUN npm install -g pnpm && pnpm install --frozen-lockfile --prod --ignore-scripts

CMD ["node_modules/.bin/next", "start"]