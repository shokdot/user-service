# Frontend Integration Guide — User Service

How a **React/Next.js** frontend should use the User Service: flows, requests, and patterns.

---

## Base URL and auth

- **Base URL**: `{USER_SERVICE_URL}/api/v1/users`
- **Auth**: Send access token (from Auth Service) as `Authorization: Bearer <accessToken>` on every request.

---

## 1. Current user profile

**Purpose:** Load and update the logged-in user's profile.

**Get:** `GET /api/v1/users/me`  
**Update:** `PATCH /api/v1/users/me` with body `{ "username": "...", "avatarUrl": "..." }` (at least one field).

**Flow:** On app load (after auth), call GET /me to show profile. On settings save, call PATCH /me and update UI with response data.

---

## 2. User lookup and search

**Purpose:** Show another user's profile or search for users.

**By ID:** `GET /api/v1/users/:userId`  
**By username:** `GET /api/v1/users/username/:username`  
**Search:** `GET /api/v1/users/search?username=query`

**Flow:** Use for profile pages, friend search, or invite flows. Render `data` (userId, username, avatarUrl, status if present).

---

## 3. User status

**Purpose:** Show online/offline/in-game for a user.

**Request:** `GET /api/v1/users/status/:userId`

**Flow:** Call when displaying a user (e.g. in list or profile). Update status in notification-service WebSocket for real-time changes.

---

## 4. Avatar

**Purpose:** Update or remove the current user's avatar.

**Update:** `PATCH /api/v1/users/me/avatar` (body per API: e.g. base64 or URL)  
**Delete:** `DELETE /api/v1/users/me/avatar`

**Flow:** On upload/save, call PATCH; on "Remove avatar", call DELETE. Then refresh GET /me or update local state.

---

## 5. Friends

**Purpose:** List friends, send/accept/delete friend requests.

**List:** `GET /api/v1/users/me/friends?status=accepted` (or `pending`)  
**Send request:** `POST /api/v1/users/me/friends/:username`  
**Accept:** `PATCH /api/v1/users/me/friends/:username`  
**Delete/remove:** `DELETE /api/v1/users/me/friends/:username`

**Flow:** Friends list page: GET /me/friends. Send request from search/profile: POST with username. Accept/decline from pending list: PATCH or DELETE. Use same token; on 401 refresh and retry.

---

## 6. Blocked users

**Purpose:** List blocked users, block/unblock by username.

**List:** `GET /api/v1/users/blocks`  
**Block:** `POST /api/v1/users/block` with body `{ "targetUsername": "..." }`  
**Unblock:** `POST /api/v1/users/unblock` with body `{ "targetUsername": "..." }`

**Flow:** Settings or profile: GET /blocks to show list. Block from profile: POST /block. Unblock: POST /unblock.

---

## Quick reference

| User action        | Request                               | Then              |
|--------------------|----------------------------------------|-------------------|
| Load my profile    | `GET /users/me`                        | Render profile    |
| Update profile     | `PATCH /users/me` (username/avatarUrl)| Update UI         |
| View user          | `GET /users/:userId` or `/username/:username` | Render profile |
| Search users       | `GET /users/search?username=`         | Render results    |
| User status        | `GET /users/status/:userId`           | Show status       |
| Update avatar      | `PATCH /users/me/avatar`              | Refresh profile  |
| Delete avatar      | `DELETE /users/me/avatar`             | Refresh profile  |
| List friends       | `GET /users/me/friends`                | Render list       |
| Send friend request| `POST /users/me/friends/:username`     | Show success      |
| Accept request     | `PATCH /users/me/friends/:username`   | Update list       |
| Remove friend      | `DELETE /users/me/friends/:username`   | Update list       |
| List blocked       | `GET /users/blocks`                    | Render list       |
| Block user         | `POST /users/block` (targetUsername)  | Update list       |
| Unblock user       | `POST /users/unblock` (targetUsername)| Update list       |

Use the same access token as for Auth Service; on 401, refresh token and retry.
