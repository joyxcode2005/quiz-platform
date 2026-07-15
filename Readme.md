# Readme for Quiz Platform

# DB Schema
# Database Schema

## User

| Column | Type | Constraints / Notes |
|--------|------|---------------------|
| id | uuid | PK, default `gen_random_uuid()` |
| name | string | NOT NULL |
| email | citext | UNIQUE, NOT NULL |
| password_hash | text | Optional (only if not using 3rd-party auth) |
| role | enum | `Reader`, `Player`, `Admin` (default: `Player`) |
| phone | string | Optional |
| country | char(2) | Optional (ISO 3166-1 alpha-2 code) |
| email_verified | boolean | Default `false` |
| is_active | boolean | Default `true` (soft delete instead of delete) |
| created_at | timestamptz | Default `now()` |
| updated_at | timestamptz | |

---

## Championship

| Column | Type | Constraints / Notes |
|--------|------|---------------------|
| id | uuid | PK, default `gen_random_uuid()` |
| name | string | UNIQUE, NOT NULL |
| description | text | Optional |
| is_active | boolean | Default `true` |
| created_by | uuid | FK → `User(id)` (must be role = `Admin`) |
| created_at | timestamptz | Default `now()` |
| updated_at | timestamptz | |

### Relations

- `seasons → Season[id]` *(inverse ORM relation, not an actual database column)*

---

## Season

| Column | Type | Constraints / Notes |
|--------|------|---------------------|
| id | uuid | PK, default `gen_random_uuid()` |
| championship_id | uuid | FK → `Championship(id)`, NOT NULL |
| name | string | Optional (e.g. `"Season 4"` or `"Winter 2026"`) |
| season_number | integer | NOT NULL, sequential per championship (`1, 2, 3...`) |
| status | enum | `Upcoming`, `Active`, `Completed` (default: `Upcoming`) |
| start_date | date | Optional |
| end_date | date | Optional |
| created_by | uuid | FK → `User(id)` (must be role = `Admin`) |
| created_at | timestamptz | Default `now()` |
| updated_at | timestamptz | |

### Constraints

```text
UNIQUE (championship_id, season_number)
```

---

## Game

| Column | Type | Constraints / Notes |
|--------|------|---------------------|
| id | uuid | PK, default `gen_random_uuid()` |
| season_id | uuid | FK → `Season(id)`, NOT NULL |
| reader_id | uuid | FK → `User(id)` (role = `Reader`), Optional |
| title | string | NOT NULL (e.g. `"Round 3: Science & Nature"`) |
| status | enum | `Draft`, `Scheduled`, `Live`, `Completed`, `Cancelled` (default: `Draft`) |
| scheduled_at | timestamptz | Optional |
| started_at | timestamptz | Optional |
| ended_at | timestamptz | Optional |
| max_players | integer | Optional (capacity if capped) |
| created_by | uuid | FK → `User(id)` (must be role = `Admin`) |
| created_at | timestamptz | Default `now()` |
| updated_at | timestamptz | |

---

## PlayerGameAccess

| Column | Type | Constraints / Notes |
|--------|------|---------------------|
| id | uuid | PK, default `gen_random_uuid()` |
| player_id | uuid | FK → `User(id)` (role = `Player`), NOT NULL |
| game_id | uuid | FK → `Game(id)`, NOT NULL |
| status | enum | `Invited`, `Confirmed`, `Declined`, `Removed` (default: `Invited`) |
| assigned_by | uuid | FK → `User(id)` (must be role = `Admin`), NOT NULL |
| assigned_at | timestamptz | Default `now()` |
| updated_at | timestamptz | |

### Constraints

```text
UNIQUE (player_id, game_id)
```

---

# Entity Relationships

```text
User (Admin)
    │
    ├──────────────► Championship
    │                    │
    │                    ▼
    │                 Season
    │                    │
    │                    ▼
    │                  Game
    │                    ▲
    │                    │
Reader ───────────────► reader_id

Player ──► PlayerGameAccess ◄── Game
```

## Foreign Keys

| Table | Foreign Key | References |
|------|-------------|------------|
| Championship | created_by | User(id) |
| Season | championship_id | Championship(id) |
| Season | created_by | User(id) |
| Game | season_id | Season(id) |
| Game | reader_id | User(id) |
| Game | created_by | User(id) |
| PlayerGameAccess | player_id | User(id) |
| PlayerGameAccess | game_id | Game(id) |
| PlayerGameAccess | assigned_by | User(id) |