import 'dotenv/config'
import { defineConfig, env } from "prisma/config";

// Asegurarse de que DATABASE_URL está definido
if (!process.env.DATABASE_URL && !process.env.DIRECT_URL) {
  throw new Error('DATABASE_URL o DIRECT_URL debe estar definido');
}

// Usar DIRECT_URL como fallback si DATABASE_URL no está disponible
const databaseUrl = process.env.DATABASE_URL || process.env.DIRECT_URL || '';

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: `tsx prisma/seed-users.ts`,
  },
  engine: "classic",
  datasource: {
    url: databaseUrl,
  },
});
