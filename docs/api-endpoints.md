# User Service — API Endpoints

Base URL: **`{USER_SERVICE_URL}/api/v1/users`**

All external endpoints use **Bearer** access token in `Authorization` header.

---

## Error response format

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

## Basic (user lookup)

### GET `/:userId`

Get user public info by user ID. **Auth: Bearer**

**Params:** `userId` — User ID (uuid)

**Success (200):**

```json
{
  "status": "success",
  "data": {
    "userId": "uuid",
    "username": "string",
    "avatarUrl": "string",
    "createdAt": "string",
    "updatedAt": "string"
  },
  "message": "string"
}
```

---

### GET `/status/:userId`

Get user status (e.g. ONLINE, OFFLINE, IN_GAME). **Auth: Bearer**

**Params:** `userId`

**Success (200):** `{ "status": "success", "data": { "userId": "uuid", "status": "string" }, "message": "string" }` (structure may vary)

---

### GET `/username/:username`

Get user by username. **Auth: Bearer**

**Params:** `username`

**Success (200):** Same shape as `GET /:userId` (userId, username, avatarUrl, createdAt, updatedAt).

---

### GET `/search`

Search users by username. **Auth: Bearer**

**Query:** `username` (required) — Search query

**Success (200):**

```json
{
  "status": "success",
  "data": {
    "query": "string",
    "count": number,
    "results": [
      {
        "userId": "uuid",
        "username": "string",
        "avatarUrl": "string",
        "status": "string"
      }
    ]
  },
  "message": "string"
}
```

**Rate limit:** e.g. 20 requests per minute.

---

## Me (current user)

### GET `/me`

Get current user profile. **Auth: Bearer**

**Success (200):**

```json
{
  "status": "success",
  "data": {
    "userId": "uuid",
    "username": "string",
    "avatarUrl": "string",
    "createdAt": "string",
    "updatedAt": "string"
  },
  "message": "string"
}
```

---

### PATCH `/me`

Update current user (username, avatarUrl). **Auth: Bearer**

**Body:** At least one of:

| Field     | Type   | Required | Description   |
|-----------|--------|----------|---------------|
| username  | string | No       | New username  |
| avatarUrl | string | No       | New avatar URL |

**Success (200):** Same shape as GET /me (updated data).

---

## Avatar

### PATCH `/me/avatar`

Update avatar (e.g. upload or set URL). **Auth: Bearer**

**Body:** Service-specific (e.g. base64 image or URL). See schema/controller.

**Success (200):** `{ "status": "success", "message": "string" }`

---

### DELETE `/me/avatar`

Delete avatar. **Auth: Bearer**

**Success (200):** `{ "status": "success", "message": "string" }`

---

## Friends

### GET `/me/friends`

List friends (pending or accepted). **Auth: Bearer**

**Query:** `status` (optional) — `'pending'` | `'accepted'`

**Success (200):**

```json
{
  "status": "success",
  "data": {
    "friends": [
      { "userId": "uuid", "username": "string", "status": "pending|accepted" }
    ],
    "count": number
  },
  "message": "string"
}
```

---

### POST `/me/friends/:username`

Send friend request. **Auth: Bearer**

**Params:** `username` — Target username

**Success (200):** `{ "status": "success", "message": "string" }`

---

### PATCH `/me/friends/:username`

Accept friend request. **Auth: Bearer**

**Params:** `username` — Requester username

**Success (200):** `{ "status": "success", "message": "string" }`

---

### DELETE `/me/friends/:username`

Delete (revoke) friend request or remove friend. **Auth: Bearer**

**Params:** `username`

**Success (200):** `{ "status": "success", "message": "string" }`

---

## Blocked

### GET `/blocks`

Get blocked users list. **Auth: Bearer**

**Success (200):**

```json
{
  "status": "success",
  "data": {
    "blocked": [
      { "userId": "uuid", "username": "string" }
    ],
    "count": number
  },
  "message": "string"
}
```

---

### POST `/block`

Block a user by username. **Auth: Bearer**

**Body:**

| Field           | Type   | Required | Description      |
|-----------------|--------|----------|------------------|
| targetUsername  | string | Yes      | Username to block |

**Success (200):** `{ "status": "success", "message": "string" }`

---

### POST `/unblock`

Unblock a user by username. **Auth: Bearer**

**Body:**

| Field           | Type   | Required | Description        |
|-----------------|--------|----------|--------------------|
| targetUsername  | string | Yes      | Username to unblock |

**Success (200):** `{ "status": "success", "message": "string" }`

---

## Internal API (backend only)

Endpoints under `/internal` (create user, delete user, update status, check block, get accepted friends). **Auth:** Service token. Not for frontend.

---

## Summary

| Method | Path                       | Auth   | Purpose           |
|--------|----------------------------|--------|-------------------|
| GET    | `/:userId`                 | Bearer | User by ID        |
| GET    | `/status/:userId`          | Bearer | User status       |
| GET    | `/username/:username`      | Bearer | User by username  |
| GET    | `/search?username=`        | Bearer | Search users      |
| GET    | `/me`                      | Bearer | Current user       |
| PATCH  | `/me`                      | Bearer | Update profile     |
| PATCH  | `/me/avatar`               | Bearer | Update avatar      |
| DELETE | `/me/avatar`               | Bearer | Delete avatar      |
| GET    | `/me/friends`               | Bearer | List friends       |
| POST   | `/me/friends/:username`     | Bearer | Send request       |
| PATCH  | `/me/friends/:username`     | Bearer | Accept request     |
| DELETE | `/me/friends/:username`     | Bearer | Delete/remove      |
| GET    | `/blocks`                   | Bearer | List blocked       |
| POST   | `/block`                    | Bearer | Block user         |
| POST   | `/unblock`                  | Bearer | Unblock user       |
