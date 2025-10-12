FROM node:20 AS builder

WORKDIR /apps

COPY core core
COPY user-service user-service

WORKDIR /apps/core
RUN npm install && npm run build

WORKDIR /apps/user-service
RUN npm install

COPY user-service/prisma ./prisma
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /apps

# Copy only the dist files needed for runtime
COPY --from=builder /apps/core/dist core/dist
COPY --from=builder /apps/user-service/dist user-service/dist
COPY --from=builder /apps/user-service/package*.json user-service/
COPY --from=builder /apps/user-service/prisma user-service/prisma

WORKDIR /apps/user-service

RUN npm install --omit=dev

RUN npx prisma generate

EXPOSE 3001

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
