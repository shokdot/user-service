# User Service

> Part of the [ft_transcendence](https://github.com/shokdot/ft_transcendence) project.

User profile and social microservice. Handles user profiles (lookup by ID/username/search), avatar management, status, friends system (send/accept/remove requests), and user blocking. Internal API for auth-service and other backend services.

## Tech Stack

- **Runtime**: Node.js 20
- **Framework**: Fastify 5
- **ORM**: Prisma (SQLite)
- **Auth**: JWT Bearer (external), service token (internal)

## Quick Start

```bash
npm install
npm run dev
```

Service listens on `HOST:PORT` (default `0.0.0.0:3001`).

### Docker

Built from monorepo root; see project `Dockerfile` and `docker-compose*.yml`.

## Environment

| Variable                   | Required | Description                      |
|----------------------------|----------|----------------------------------|
| `PORT`                     | No       | Server port (default: 3001)      |
| `HOST`                     | No       | Bind address (default: 0.0.0.0)  |
| `SERVICE_TOKEN`            | Yes      | Service-to-service token         |
| `JWT_SECRET`               | Yes      | Access token verification        |
| `NOTIFICATION_SERVICE_URL` | Yes      | Notification service base URL    |

---

## API Endpoints

Base URL: **`{USER_SERVICE_URL}/api/v1/users`**

All external endpoints use **Bearer** access token in `Authorization` header.

### Error Response Format

```json
{
  "status": "error",
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": null
  }
}
```

---

### User Lookup

#### `GET /:userId`

Get public profile of a user by ID. **Auth: Bearer**

**Params:** `userId` — User ID (uuid)

**Success (200):**

```json
{
  "status": "success",
  "data": {
    "userId": "uuid",
    "username": "string",
    "displayName": "string | null",
    "bio": "string | null",
    "avatarUrl": "string | null",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

#### `GET /status/:userId`

Get user presence status (ONLINE / OFFLINE / IN_GAME). **Auth: Bearer**

**Success (200):** `{ "status": "success", "data": { "userId": "uuid", "status": "ONLINE" } }`

---

#### `GET /username/:username`

Get user by username. **Auth: Bearer**

**Success (200):** Same as `GET /:userId` but also includes `status` field.

---

#### `GET /search`

Search users by username. **Auth: Bearer** / Rate limit: 20 req/min

**Query:** `username` (required) — search query

**Success (200):**

```json
{
  "status": "success",
  "data": {
    "query": "string",
    "count": 3,
    "results": [
      { "userId": "uuid", "username": "string", "avatarUrl": "string", "status": "string" }
    ]
  }
}
```

---

### Current User (Me)

#### `GET /me`

Get the current authenticated user's profile. **Auth: Bearer**

**Success (200):** Same shape as `GET /:userId`.

---

#### `PATCH /me`

Update current user's profile. **Auth: Bearer**

At least one field required:

| Field       | Type   | Required | Description               |
|-------------|--------|----------|---------------------------|
| username    | string | No       | New username              |
| displayName | string | No       | Display name (max 50)     |
| bio         | string | No       | Bio text (max 160)        |
| avatarUrl   | string | No       | Avatar URL                |

**Success (200):** Updated profile (same shape as GET /me).

---

### Avatar

#### `PATCH /me/avatar`

Update avatar. **Auth: Bearer**

**Body:** Service-specific (base64 image or URL).

**Success (200):** `{ "status": "success", "message": "..." }`

---

#### `DELETE /me/avatar`

Delete avatar. **Auth: Bearer**

**Success (200):** `{ "status": "success", "message": "..." }`

---

### Friends

#### `GET /me/friends`

List friends. **Auth: Bearer**

**Query:** `status` — `"pending"` | `"accepted"` (optional, returns all if omitted)

**Success (200):**

```json
{
  "status": "success",
  "data": {
    "friends": [
      {
        "userId": "uuid",
        "username": "string",
        "avatarUrl": "string | null",
        "onlineStatus": "ONLINE | OFFLINE | IN_GAME",
        "status": "pending | accepted",
        "direction": "incoming | outgoing",
        "createdAt": "ISO 8601"
      }
    ],
    "count": 1
  }
}
```

> `direction` only present when `status` is `"pending"`.

---

#### `POST /me/friends/:username`

Send a friend request. **Auth: Bearer**

**Params:** `username` — Target username

**Success (200):** `{ "status": "success", "message": "..." }`

---

#### `PATCH /me/friends/:username`

Accept a friend request. **Auth: Bearer**

**Params:** `username` — Requester's username

**Success (200):** `{ "status": "success", "message": "..." }`

---

#### `DELETE /me/friends/:username`

Remove a friend or revoke a sent request. **Auth: Bearer**

**Params:** `username`

**Success (200):** `{ "status": "success", "message": "..." }`

---

### Blocked Users

#### `GET /blocks`

Get list of blocked users. **Auth: Bearer**

**Success (200):**

```json
{
  "status": "success",
  "data": {
    "blocked": [
      { "userId": "uuid", "username": "string" }
    ],
    "count": 1
  }
}
```

---

#### `POST /block`

Block a user by username. **Auth: Bearer**

**Body:** `{ "targetUsername": "string" }`

**Success (200):** `{ "status": "success", "message": "..." }`

---

#### `POST /unblock`

Unblock a user by username. **Auth: Bearer**

**Body:** `{ "targetUsername": "string" }`

**Success (200):** `{ "status": "success", "message": "..." }`

---

### Internal API (backend only)

Endpoints under `/internal`: create user, delete user, update status, check block, get accepted friends.

**Auth:** Service token (`x-service-token` header). Not for frontend use.

---

### Summary

| Method | Path                    | Auth   | Purpose               |
|--------|-------------------------|--------|-----------------------|
| GET    | `/:userId`              | Bearer | User by ID            |
| GET    | `/status/:userId`       | Bearer | User status           |
| GET    | `/username/:username`   | Bearer | User by username      |
| GET    | `/search`               | Bearer | Search users          |
| GET    | `/me`                   | Bearer | Current user profile  |
| PATCH  | `/me`                   | Bearer | Update profile        |
| PATCH  | `/me/avatar`            | Bearer | Update avatar         |
| DELETE | `/me/avatar`            | Bearer | Delete avatar         |
| GET    | `/me/friends`           | Bearer | List friends          |
| POST   | `/me/friends/:username` | Bearer | Send friend request   |
| PATCH  | `/me/friends/:username` | Bearer | Accept friend request |
| DELETE | `/me/friends/:username` | Bearer | Remove friend         |
| GET    | `/blocks`               | Bearer | List blocked users    |
| POST   | `/block`                | Bearer | Block user            |
| POST   | `/unblock`              | Bearer | Unblock user          |
| *      | `/internal/...`         | Service| Internal (backend)    |
