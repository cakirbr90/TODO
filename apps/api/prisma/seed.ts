import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const FAKE_PASSWORD_HASH = 'seed-placeholder-not-a-valid-hash';

const users = [
  {
    email: 'user1@example.test',
    todos: [
      { title: 'Sample todo one', priority: 'HIGH' as const },
      { title: 'Sample todo two', description: 'Fake description', priority: 'LOW' as const },
      { title: 'Sample completed todo', status: 'DONE' as const, completedAt: new Date() },
    ],
  },
  {
    email: 'user2@example.test',
    todos: [{ title: 'Another sample todo', dueDate: new Date('2030-01-01T00:00:00Z') }],
  },
];

async function main(): Promise<void> {
  for (const { email, todos } of users) {
    await prisma.user.upsert({
      where: { email },
      update: {},
      create: { email, passwordHash: FAKE_PASSWORD_HASH, todos: { create: todos } },
    });
  }
}

main()
  .catch((error: unknown) => {
    process.stderr.write(`${String(error)}\n`);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
