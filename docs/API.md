# API Documentation

Base URL: `http://localhost:5000/api`

All responses follow the format:

```json
{
  "success": true,
  "data": { ... }
}
```

Error responses:

```json
{
  "success": false,
  "error": "Error message"
}
```

---

## Authentication

### Register

```
POST /api/auth/register
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "created_at": "2025-01-01T00:00:00.000Z"
    },
    "token": "jwt-token"
  }
}
```

### Login

```
POST /api/auth/login
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):** Same as register.

### Get Current User

```
GET /api/auth/me
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "created_at": "2025-01-01T00:00:00.000Z"
    }
  }
}
```

---

## Todos

All todo endpoints require `Authorization: Bearer <token>`.

### Get All Todos

```
GET /api/todos?search=keyword&completed=true&page=1&limit=10
```

**Query Parameters:**

| Param       | Type    | Description                      |
|-------------|---------|----------------------------------|
| `search`    | string  | Search by title or description   |
| `completed` | string  | Filter: `"true"` or `"false"`    |
| `page`      | number  | Page number (default: 1)         |
| `limit`     | number  | Items per page (default: 10)     |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "todos": [...],
    "total": 25,
    "page": 1,
    "totalPages": 3
  }
}
```

### Create Todo

```
POST /api/todos
```

**Body:**
```json
{
  "title": "New Todo",
  "description": "Optional description"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "todo": {
      "id": "uuid",
      "title": "New Todo",
      "description": "Optional description",
      "completed": false,
      "user_id": "uuid",
      "created_at": "...",
      "updated_at": "..."
    }
  }
}
```

### Update Todo

```
PUT /api/todos/:id
```

**Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "completed": true
}
```

### Delete Todo

```
DELETE /api/todos/:id
```

**Response (200):**
```json
{
  "success": true,
  "message": "Todo deleted successfully"
}
```

### Toggle Complete

```
PATCH /api/todos/:id/complete
```

**Response (200):** Returns the updated todo with toggled `completed` field.

---

## Error Codes

| Code | Meaning                          |
|------|----------------------------------|
| 400  | Bad request / validation error   |
| 401  | Unauthorized / invalid token     |
| 403  | Forbidden / not your resource    |
| 404  | Resource not found               |
| 409  | Conflict (e.g., duplicate email) |
| 429  | Too many requests (rate limited) |
| 500  | Internal server error            |
