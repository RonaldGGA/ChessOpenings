// scripts/seedDatabase.ts
import { PrismaClient } from '../app/generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Crear un usuario de ejemplo
  console.log('Creating demo user...');
  const user = await prisma.user.upsert({
    where: { email: 'demo@chessmaster.com' },
    update: {},
    create: {
      email: 'demo@chessmaster.com',
      name: 'Demo Chess Player',
      password: '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvq.7dGq', // "password"
      preferredDepth: 15,
      showBestMoveArrow: true,
      showPonderArrow: true,
      defaultBoardOrientation: 'white',
    },
  });
  console.log(`✅ User created: ${user.email}`);

  // 2. Obtener algunas aperturas existentes para trabajar con ellas
  console.log('Finding existing openings...');
  const existingOpenings = await prisma.opening.findMany({
    take: 10,
    orderBy: { eco: 'asc' },
  });

  if (existingOpenings.length === 0) {
    console.log('❌ No existing openings found. Please run the openings migration first.');
    return;
  }

  console.log(`✅ Found ${existingOpenings.length} existing openings`);

  // 3. Crear favoritos para el usuario
  console.log('Creating user favorites...');
  const favoriteOpenings = existingOpenings.slice(0, 3);
  
  for (const opening of favoriteOpenings) {
    await prisma.userFavorite.upsert({
      where: {
        userId_openingId: {
          userId: user.id,
          openingId: opening.id,
        },
      },
      update: {},
      create: {
        userId: user.id,
        openingId: opening.id,
      },
    });

    // Actualizar contador de favoritos en la apertura
    await prisma.opening.update({
      where: { id: opening.id },
      data: {
        totalFavorites: { increment: 1 },
      },
    });
  }
  console.log(`✅ Created ${favoriteOpenings.length} favorites`);

  // 4. Crear visitas a aperturas
  console.log('Creating opening visits...');
  const visitedOpenings = existingOpenings.slice(0, 5);
  
  for (const opening of visitedOpenings) {
    await prisma.openingVisit.upsert({
      where: {
        userId_openingId: {
          userId: user.id,
          openingId: opening.id,
        },
      },
      update: {
        count: { increment: 1 },
        visitedAt: new Date(),
      },
      create: {
        userId: user.id,
        openingId: opening.id,
        count: 1,
        visitedAt: new Date(),
      },
    });

    // Actualizar contador de visitas en la apertura
    await prisma.opening.update({
      where: { id: opening.id },
      data: {
        totalVisits: { increment: 1 },
      },
    });
  }
  console.log(`✅ Created ${visitedOpenings.length} visits`);

  // 5. Crear sesiones de práctica realistas
  console.log('Creating practice sessions...');
  
  const practiceSessions = [
    {
      openingId: existingOpenings[0].id,
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7',
      finalFen: 'r1bq1rk1/pppn1ppp/3p1n2/1B2p3/3PP3/5N2/PPP2PPP/RNBQ1RK1 b - - 0 10',
      movesCount: 10,
    },
    {
      openingId: existingOpenings[1].id,
      moves: '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f3 O-O 6. Be3 e5 7. d5 c6',
      finalFen: 'rnbq1rk1/pp2ppbp/2pp1np1/3P4/2P1P3/2N1B3/PP3PPP/R2QKBNR w KQ - 0 8',
      movesCount: 7,
    },
    {
      openingId: null, // Free practice sin apertura específica
      moves: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Be3 e5 7. Nb3 Be6 8. f3 Be7 9. Qd2 O-O',
      finalFen: 'rnbq1rk1/1p2bppp/p2ppn2/4p3/4P3/1NN5/PPP1BPPP/R2QK2R w KQ - 0 10',
      movesCount: 9,
    },
  ];

  for (const sessionData of practiceSessions) {
    const session = await prisma.practiceSession.create({
      data: {
        userId: user.id,
        openingId: sessionData.openingId,
        moves: sessionData.moves,
        finalFen: sessionData.finalFen,
        movesCount: sessionData.movesCount,
      },
    });

    // Si hay openingId, actualizar contador de sesiones de práctica
    if (sessionData.openingId) {
      await prisma.opening.update({
        where: { id: sessionData.openingId },
        data: {
          totalPracticeSessions: { increment: 1 },
        },
      });
    }

    console.log(`✅ Created practice session: ${session.movesCount} moves`);
  }

  // 6. Crear algunas relaciones FromTo de ejemplo
  console.log('Creating FromTo relationships...');
  
  if (existingOpenings.length >= 3) {
    const fromToRelations = [
      {
        fromFen: existingOpenings[0].fen,
        toFen: existingOpenings[1].fen,
        fromSrc: existingOpenings[0].src,
        toSrc: existingOpenings[1].src,
      },
      {
        fromFen: existingOpenings[1].fen,
        toFen: existingOpenings[2].fen,
        fromSrc: existingOpenings[1].src,
        toSrc: existingOpenings[2].src,
      },
    ];

    for (const relation of fromToRelations) {
      try {
        await prisma.fromTo.create({
          data: relation,
        });
        console.log(`✅ Created FromTo relationship`);
      } catch (error) {
        console.log('ℹ️ FromTo relationship already exists or error:', error);
      }
    }
  }

  // 7. Crear aliases de ejemplo para algunas aperturas
  console.log('Creating aliases...');
  
  const aliasesData = [
    {
      openingId: existingOpenings[0].id,
      source: 'scid',
      value: 'Ruy Lopez Main Line',
    },
    {
      openingId: existingOpenings[0].id,
      source: 'eco_wikip',
      value: 'Spanish Game',
    },
    {
      openingId: existingOpenings[1].id,
      source: 'scid',
      value: 'King\'s Indian Defense',
    },
  ];

  for (const aliasData of aliasesData) {
    try {
      await prisma.alias.upsert({
        where: {
          openingId_source_value: {
            openingId: aliasData.openingId,
            source: aliasData.source,
            value: aliasData.value,
          },
        },
        update: {},
        create: aliasData,
      });
      console.log(`✅ Created alias: ${aliasData.source} - ${aliasData.value}`);
    } catch (error) {
      console.log('ℹ️ Alias already exists or error:', error);
    }
  }

  // 8. Actualizar algunas estadísticas globales en aperturas para que sean más realistas
  console.log('Updating opening statistics...');
  
  for (let i = 0; i < existingOpenings.length; i++) {
    const opening = existingOpenings[i];
    
    // Hacer que las estadísticas sean más realistas
    const randomVisits = Math.floor(Math.random() * 100) + 10;
    const randomFavorites = Math.floor(Math.random() * 20) + 1;
    const randomPracticeSessions = Math.floor(Math.random() * 30) + 5;

    await prisma.opening.update({
      where: { id: opening.id },
      data: {
        totalVisits: randomVisits,
        totalFavorites: randomFavorites,
        totalPracticeSessions: randomPracticeSessions,
      },
    });
  }

  console.log('🎉 Database seed completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   - User: ${user.email}`);
  console.log(`   - Openings: ${existingOpenings.length} referenced`);
  console.log(`   - Favorites: ${favoriteOpenings.length} created`);
  console.log(`   - Visits: ${visitedOpenings.length} created`);
  console.log(`   - Practice Sessions: ${practiceSessions.length} created`);
  console.log(`   - FromTo relationships: 2 created`);
  console.log(`   - Aliases: ${aliasesData.length} created`);

  console.log('\n🔑 Demo user credentials:');
  console.log('   Email: demo@chessmaster.com');
  console.log('   Password: password');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });