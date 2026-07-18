FROM node:24-bookworm-slim

WORKDIR /app

RUN apt-get update \
 && apt-get install -y openssl \
 && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY prisma ./prisma
COPY prisma.config.ts ./

RUN npx prisma generate

COPY scripts ./scripts
COPY src ./src

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]