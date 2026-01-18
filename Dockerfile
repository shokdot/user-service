FROM node:20 AS builder

WORKDIR /apps

COPY core/package*.json core/
COPY core/tsconfig.json core/
COPY core/src core/src

WORKDIR /apps/core
RUN npm install && npm run build

WORKDIR /apps

COPY user-service/package*.json user-service/
COPY user-service/prisma.config.ts user-service/
COPY user-service/tsconfig.json user-service/
COPY user-service/tsup.config.ts user-service/
COPY user-service/prisma user-service/prisma
COPY user-service/src user-service/src

WORKDIR /apps/user-service

RUN npm install
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /apps

COPY --from=builder /apps/core/dist core/dist
COPY --from=builder /apps/user-service/dist user-service/dist
COPY --from=builder /apps/user-service/package*.json user-service/
COPY --from=builder /apps/user-service/prisma.config.ts user-service/
COPY --from=builder /apps/user-service/prisma user-service/prisma

WORKDIR /apps/user-service

RUN npm install --omit=dev

EXPOSE 3001

CMD ["npm", "run", "start"]
