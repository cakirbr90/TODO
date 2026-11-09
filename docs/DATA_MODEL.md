# Data Model

Source of truth for `apps/api/prisma/schema.prisma`.

```prisma
model User {
  id            String         @id @default(uuid())
  email         String         @unique
  passwordHash  String
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  todos         Todo[]
  refreshTokens RefreshToken[]
}

model Todo {
  id          String     @id @default(uuid())
  title       String     @db.VarChar(200)
  description String?    @db.VarChar(2000)
  status      TodoStatus @default(TODO)
  priority    Priority   @default(MEDIUM)
  dueDate     DateTime?
  completedAt DateTime?
  userId      String
  user        User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  @@index([userId, status])
  @@index([userId, createdAt])
}

model RefreshToken {
  id        String    @id @default(uuid())
  tokenHash String    @unique
  userId    String
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  revokedAt DateTime?
  createdAt DateTime  @default(now())

  @@index([userId])
}

enum TodoStatus { TODO DONE }
enum Priority   { LOW MEDIUM HIGH }
```

## Rules
- IDs are UUIDs; never expose sequential IDs.
- `passwordHash` and `tokenHash` are never returned by the API.
- Migrations: `prisma migrate dev --name <snake_case_description>`; never edit an applied migration.
- Seed data (`prisma/seed.ts`) uses fake data only (e.g. `user1@example.test`).
