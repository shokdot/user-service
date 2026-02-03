# User Service

User profile and social microservice for the ft_transcendence platform. Handles user profiles (get, update), avatar, status, friends (list, send/accept/delete request), and blocked users. Internal API for auth-service and other services.

## Features

- **Basic**: Get user by ID, by username, status, search (Bearer auth)
- **Me**: Get/update current user, update status (Bearer auth)
- **Avatar**: Update/delete avatar (Bearer auth)
- **Friends**: List friends, send/accept/delete friend request (Bearer auth)
- **Blocked**: List blocked users, block/unblock by username (Bearer auth)
- **Internal API**: Create user, delete user, update status, check block, get accepted friends (service token)

## Tech Stack

- **Runtime**: Node.js 20
- **Framework**: Fastify 5
- **ORM**: Prisma (SQLite)
- **Auth**: JWT Bearer (external), service token (internal)

## Quick Start

### Prerequisites

- Node.js 20+
- Environment variables (see [Environment](#environment))

### Install & Run

```bash
npm install
npm run dev
```

- **Dev**: `npm run dev`
- **Build**: `npm run build`
- **Start**: `npm start` (production)

Service listens on `HOST:PORT` (default `0.0.0.0:3001`).

### Docker

Built from monorepo root; see project `Dockerfile` and `docker-compose*.yml`.

## Environment

| Variable                   | Required | Description                    |
|----------------------------|----------|--------------------------------|
| `PORT`                     | No       | Server port (default: 3001)    |
| `HOST`                     | No       | Bind address (default: 0.0.0.0)|
| `SERVICE_TOKEN`            | Yes      | Service-to-service token       |
| `JWT_SECRET`               | Yes      | Access token verification      |
| `JWT_REFRESH_SECRET`       | Yes      | Refresh token (if needed)     |
| `JWT_TWO_FA`               | Yes      | 2FA token (if needed)          |
| `NOTIFICATION_SERVICE_URL` | Yes      | Notification service base URL  |

API prefix defaults to `/api/v1` (from core).

## API Base URL

All user routes are under:

```
{baseUrl}/api/v1/users
```

- **Basic:** `GET /:userId`, `GET /status/:userId`, `GET /username/:username`, `GET /search`
- **Me:** `GET /me`, `PATCH /me`
- **Avatar:** `PATCH /me/avatar`, `DELETE /me/avatar`
- **Friends:** `GET /me/friends`, `POST /me/friends/:username`, `PATCH /me/friends/:username`, `DELETE /me/friends/:username`
- **Blocked:** `GET /blocks`, `POST /block`, `POST /unblock`
- **Internal:** under `/internal` (service token)

## Documentation

- **[API Endpoints](docs/api-endpoints.md)** — Full list of endpoints, request/response bodies, errors.
- **[Frontend Integration Guide](docs/frontend-integration-guide.md)** — Flows and usage from React/Next.js.

## Project Structure

```
src/
├── controllers/   # basic, me, avatar, friends, blocked, internal
├── services/      # Business logic
├── routes/       # Route definitions
├── schemas/      # Validation
├── dto/          # Data transfer types
└── utils/        # env, prisma, avatar
prisma/
└── schema.prisma
```

## License

Part of ft_transcendence project.
