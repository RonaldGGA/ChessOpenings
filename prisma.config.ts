import 'dotenv/config'
import { defineConfig } from "prisma/config";

// Asegurarse de que DATABASE_URL está definido
if (!process.env.DATABASE_URL && !process.env.DIRECT_URL) {
  throw new Error('DATABASE_URL o DIRECT_URL debe estar definido');
}

// Usar DIRECT_URL como fallback si DATABASE_URL no está disponible
const databaseUrl = process.env.DATABASE_URL || process.env.DIRECT_URL || 'prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19IbW5oSTZBcGoxWTVPTnAwNWN4YUUiLCJhcGlfa2V5IjoiMDFLOFE0WVc0TThBWVowWFFNSDAyTkhRUEUiLCJ0ZW5hbnRfaWQiOiIyYTBjNDQ4Y2NmYTk2N2NmYzc2MTBmMTRjODkwZWJiZGNkYmJjNjRmNWI3NTEyYjgwMTQ5NDVlMDJiZGVlYTNjIiwiaW50ZXJuYWxfc2VjcmV0IjoiY2EyZjc0MjctMTdiZi00MzVhLWE3MWYtNDBlNjc3M2NiZGVmIn0.9Pa-uoQDamPFl3M2RCF9IVRVNbCeKeCrFR0DyQkgfvQ';

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
