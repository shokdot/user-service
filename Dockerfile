FROM node:20 AS builder

WORKDIR /app

COPY apps/core ./apps/core
COPY apps/user-service ./apps/user-service

WORKDIR /app/apps/core
RUN npm install && npm run build

WORKDIR /app/apps/user-service
RUN npm install
COPY apps/user-service/prisma ./prisma
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

# Copy only the dist files needed for runtime
COPY --from=builder /app/apps/core/dist ./apps/core/dist
COPY --from=builder /app/apps/user-service/dist ./apps/user-service/dist
COPY --from=builder /app/apps/user-service/package*.json ./apps/user-service/
COPY --from=builder /app/apps/user-service/prisma ./apps/user-service/prisma

WORKDIR /app/apps/user-service

RUN npm install --omit=dev

RUN npx prisma generate

EXPOSE 3001
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
