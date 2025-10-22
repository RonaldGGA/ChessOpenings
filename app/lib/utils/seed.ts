
import { prisma } from '../db';
import bcrypt from 'bcryptjs';

// ✅ Datos de usuarios de prueba
const usersData = [
  {
    name: 'Jugador Principiante',
    email: 'principiante@chess.com',
    password: 'password123',
    image: 'https://images.chesscomfiles.com/uploads/v1/user/12345678.12345678.500x500o.1234567890abc.jpeg',
  },
  {
    name: 'Ajedrecista Avanzado',
    email: 'avanzado@chess.com',
    password: 'password123',
    image: 'https://images.chesscomfiles.com/uploads/v1/user/87654321.87654321.500x500o.9876543210def.jpeg',
  },
  {
    name: 'Maestro FIDE',
    email: 'maestro@chess.com',
    password: 'password123',
    image: 'https://images.chesscomfiles.com/uploads/v1/user/11223344.11223344.500x500o.112233445566778.jpeg',
  },
];

// ✅ Datos reales de aperturas con variaciones y estadísticas
const openingsData = [
  {
    eco: 'C60',
    name: 'Ruy López',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5'],
    description: 'Una de las aperturas más antiguas y analizadas del ajedrez. Comienza con 1.e4 e5 2.Cf3 Cc6 3.Ab5.',
    initialFen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
    popularity: 0.85,
    whiteWins: 1542,
    blackWins: 1103,
    draws: 855,
    totalGames: 3500,
    variations: [
      {
        name: 'Ataque Morphy',
        moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Be7', 'Re1', 'b5', 'Bb3', 'd6', 'c3', 'O-O']
      },
      {
        name: 'Variante Cerrada',
        moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Be7', 'Re1', 'b5', 'Bb3', 'd6', 'c3', 'O-O', 'h3']
      }
    ],
    moveStatistics: [
      { move: 'a6', wins: 650, losses: 420, draws: 310, total: 1380 },
      { move: 'Nf6', wins: 480, losses: 350, draws: 290, total: 1120 },
      { move: 'Bc5', wins: 412, losses: 333, draws: 255, total: 1000 }
    ]
  },
  {
    eco: 'B20',
    name: 'Defensa Siciliana',
    moves: ['e4', 'c5'],
    description: 'Defensa agresiva y popular para las negras. La respuesta más común a 1.e4 a nivel magistral.',
    initialFen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
    popularity: 0.78,
    whiteWins: 1820,
    blackWins: 1630,
    draws: 1550,
    totalGames: 5000,
    variations: [
      {
        name: 'Variante del Dragón',
        moves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'g6']
      },
      {
        name: 'Ataque Inglés',
        moves: ['e4', 'c5', 'Nf3', 'd6', 'c4']
      }
    ],
    moveStatistics: [
      { move: 'Nf3', wins: 920, losses: 810, draws: 770, total: 2500 },
      { move: 'Nc3', wins: 650, losses: 520, draws: 480, total: 1650 },
      { move: 'c3', wins: 250, losses: 300, draws: 300, total: 850 }
    ]
  },
  {
    eco: 'B90',
    name: 'Siciliana Najdorf',
    moves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6'],
    description: 'Variante muy agresiva y profundamente analizada de la Defensa Siciliana.',
    initialFen: 'rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6',
    popularity: 0.82,
    whiteWins: 864,
    blackWins: 912,
    draws: 624,
    totalGames: 2400,
    variations: [
      {
        name: 'Ataque Inglés',
        moves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6', 'Be3']
      },
      {
        name: 'Variante del Peón Envenenado',
        moves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6', 'Bg5']
      }
    ],
    moveStatistics: [
      { move: 'Be3', wins: 320, losses: 280, draws: 200, total: 800 },
      { move: 'Bg5', wins: 280, losses: 310, draws: 210, total: 800 },
      { move: 'f3', wins: 264, losses: 322, draws: 214, total: 800 }
    ]
  },
  {
    eco: 'D02',
    name: 'Ataque Indio de Rey',
    moves: ['d4', 'd5', 'Nf3', 'Nf6', 'c4'],
    description: 'Apertura clásica que conduce a posiciones estratégicas y tácticas complejas.',
    initialFen: 'rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2',
    popularity: 0.70,
    whiteWins: 1120,
    blackWins: 980,
    draws: 700,
    totalGames: 2800,
    variations: [
      {
        name: 'Variante Principal',
        moves: ['d4', 'd5', 'Nf3', 'Nf6', 'c4', 'e6', 'Nc3']
      }
    ],
    moveStatistics: [
      { move: 'e6', wins: 450, losses: 390, draws: 280, total: 1120 },
      { move: 'c6', wins: 380, losses: 320, draws: 220, total: 920 },
      { move: 'dxc4', wins: 290, losses: 270, draws: 200, total: 760 }
    ]
  },
  {
    eco: 'E00',
    name: 'Defensa India de Rey',
    moves: ['d4', 'Nf6', 'c4', 'e6', 'g3'],
    description: 'Apertura hipermoderna que enfatiza el control del centro desde los flancos.',
    initialFen: 'rnbqkb1r/pppp1ppp/4pn2/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
    popularity: 0.65,
    whiteWins: 1092,
    blackWins: 936,
    draws: 672,
    totalGames: 2700,
    variations: [
      {
        name: 'Variante Clásica',
        moves: ['d4', 'Nf6', 'c4', 'e6', 'g3', 'd5', 'Bg2']
      }
    ],
    moveStatistics: [
      { move: 'd5', wins: 440, losses: 380, draws: 270, total: 1090 },
      { move: 'Bb4+', wins: 320, losses: 280, draws: 200, total: 800 },
      { move: 'c5', wins: 332, losses: 276, draws: 202, total: 810 }
    ]
  }
];

// ✅ Datos de progreso de usuarios (simulados)
const userProgressData = [
  // Usuario 1 - Principiante
  {
    userId: '', // Se llenará dinámicamente
    openingId: '', // Se llenará dinámicamente
    correctMoves: 45,
    totalMoves: 80,
    bestScore: 12,
    timesPracticed: 8,
    lastPracticed: new Date('2024-01-15')
  },
  {
    userId: '',
    openingId: '',
    correctMoves: 32,
    totalMoves: 60,
    bestScore: 8,
    timesPracticed: 5,
    lastPracticed: new Date('2024-01-10')
  },
  // Usuario 2 - Avanzado
  {
    userId: '',
    openingId: '',
    correctMoves: 120,
    totalMoves: 150,
    bestScore: 25,
    timesPracticed: 15,
    lastPracticed: new Date('2024-01-18')
  },
  {
    userId: '',
    openingId: '',
    correctMoves: 95,
    totalMoves: 120,
    bestScore: 20,
    timesPracticed: 12,
    lastPracticed: new Date('2024-01-16')
  },
  // Usuario 3 - Maestro
  {
    userId: '',
    openingId: '',
    correctMoves: 200,
    totalMoves: 220,
    bestScore: 35,
    timesPracticed: 25,
    lastPracticed: new Date('2024-01-20')
  },
  {
    userId: '',
    openingId: '',
    correctMoves: 180,
    totalMoves: 200,
    bestScore: 30,
    timesPracticed: 20,
    lastPracticed: new Date('2024-01-19')
  }
];

// ✅ Datos de favoritos de usuarios
const userFavoritesData = [
  { userId: '', openingId: '' }, // Usuario 1 -> Ruy López
  { userId: '', openingId: '' }, // Usuario 1 -> Siciliana
  { userId: '', openingId: '' }, // Usuario 2 -> Najdorf
  { userId: '', openingId: '' }, // Usuario 3 -> India de Rey
];

export async function seedDatabase() {
  console.log('🌱 Iniciando seed completo de la base de datos...');

  try {
    // 🔄 Limpiar base de datos existente en orden correcto (por dependencias)
    console.log('🗑️ Limpiando base de datos existente...');
    
    await prisma.userProgress.deleteMany();
    await prisma.userFavorite.deleteMany();
    await prisma.moveStatistic.deleteMany();
    await prisma.variation.deleteMany();
    await prisma.opening.deleteMany();
    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.user.deleteMany();

    console.log('✅ Base de datos limpiada completamente');

    // 👥 Crear usuarios
    console.log('👥 Creando usuarios...');
    const createdUsers = [];

    for (const userData of usersData) {
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      
      const user = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          image: userData.image,
          emailVerified: new Date(), // Verificar email para testing
        },
      });
      
      createdUsers.push(user);
      console.log(`✅ Usuario creado: ${user.name} (${user.email})`);
    }

    // ♟️ Crear aperturas con variaciones y estadísticas
    console.log('♟️ Creando aperturas...');
    const createdOpenings = [];

    for (const openingData of openingsData) {
      const { variations, moveStatistics, ...opening } = openingData;

      const createdOpening = await prisma.opening.create({
        data: opening,
      });

      createdOpenings.push(createdOpening);
      console.log(`✅ Apertura creada: ${createdOpening.name} (${createdOpening.eco})`);

      // Crear variaciones si existen
      if (variations && variations.length > 0) {
        for (const variation of variations) {
          await prisma.variation.create({
            data: {
              ...variation,
              openingId: createdOpening.id,
            },
          });
        }
        console.log(`   📚 ${variations.length} variaciones creadas`);
      }

      // Crear estadísticas de movimientos si existen
      if (moveStatistics && moveStatistics.length > 0) {
        for (const moveStat of moveStatistics) {
          await prisma.moveStatistic.create({
            data: {
              ...moveStat,
              openingId: createdOpening.id,
            },
          });
        }
        console.log(`   📊 ${moveStatistics.length} estadísticas de movimientos creadas`);
      }
    }

    // 📈 Crear progreso de usuarios
    console.log('📈 Creando progreso de usuarios...');
    
    // Asignar progreso a usuarios y aperturas específicas
    const userProgressWithIds = [
      // Usuario 1 (Principiante) -> Aperturas 0 y 1
      { ...userProgressData[0], userId: createdUsers[0].id, openingId: createdOpenings[0].id },
      { ...userProgressData[1], userId: createdUsers[0].id, openingId: createdOpenings[1].id },
      // Usuario 2 (Avanzado) -> Aperturas 1 y 2
      { ...userProgressData[2], userId: createdUsers[1].id, openingId: createdOpenings[1].id },
      { ...userProgressData[3], userId: createdUsers[1].id, openingId: createdOpenings[2].id },
      // Usuario 3 (Maestro) -> Aperturas 3 y 4
      { ...userProgressData[4], userId: createdUsers[2].id, openingId: createdOpenings[3].id },
      { ...userProgressData[5], userId: createdUsers[2].id, openingId: createdOpenings[4].id },
    ];

    for (const progressData of userProgressWithIds) {
      await prisma.userProgress.create({
        data: progressData,
      });
    }
    console.log(`✅ ${userProgressWithIds.length} registros de progreso creados`);

    // ⭐ Crear favoritos de usuarios
    console.log('⭐ Creando favoritos de usuarios...');
    
    const userFavoritesWithIds = [
      // Usuario 1 -> Aperturas 0 y 1
      { userId: createdUsers[0].id, openingId: createdOpenings[0].id },
      { userId: createdUsers[0].id, openingId: createdOpenings[1].id },
      // Usuario 2 -> Apertura 2
      { userId: createdUsers[1].id, openingId: createdOpenings[2].id },
      // Usuario 3 -> Apertura 4
      { userId: createdUsers[2].id, openingId: createdOpenings[4].id },
    ];

    for (const favoriteData of userFavoritesWithIds) {
      await prisma.userFavorite.create({
        data: favoriteData,
      });
    }
    console.log(`✅ ${userFavoritesWithIds.length} favoritos creados`);

    // 📊 Estadísticas finales
    console.log('\n📊 ESTADÍSTICAS FINALES DEL SEED:');
    console.log(`👥 Usuarios creados: ${createdUsers.length}`);
    console.log(`♟️ Aperturas creadas: ${createdOpenings.length}`);
    
    const totalVariations = await prisma.variation.count();
    const totalMoveStats = await prisma.moveStatistic.count();
    const totalProgress = await prisma.userProgress.count();
    const totalFavorites = await prisma.userFavorite.count();
    
    console.log(`📚 Variaciones creadas: ${totalVariations}`);
    console.log(`📊 Estadísticas de movimientos: ${totalMoveStats}`);
    console.log(`📈 Progresos de usuario: ${totalProgress}`);
    console.log(`⭐ Favoritos: ${totalFavorites}`);
    
    console.log('\n🎉 Seed completado exitosamente!');
    console.log('\n🔑 CREDENCIALES DE PRUEBA:');
    console.log('Principiante: principiante@chess.com / password123');
    console.log('Avanzado: avanzado@chess.com / password123');
    console.log('Maestro: maestro@chess.com / password123');

  } catch (error) {
    console.error('❌ Error durante el seed:', error);
    throw error;
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('✨ Proceso de seed finalizado!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 El seed falló:', error);
      process.exit(1);
    });
}