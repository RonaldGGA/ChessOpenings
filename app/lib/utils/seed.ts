// lib/utils/seed.ts - VERSIÓN COMPLETA Y CORREGIDA
import { prisma } from '../db';

// ✅ Datos reales de aperturas populares
const openingsData = [
  {
    eco: 'C60',
    name: 'Ruy López',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5'],
    description: 'Una de las aperturas más antiguas y analizadas del ajedrez. Comienza con 1.e4 e5 2.Cf3 Cc6 3.Ab5.',
    initialFen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
    popularity: 0.85,
    whiteWins: 42,
    blackWins: 30,
    draws: 28,
    totalGames: 1500,
  },
  {
    eco: 'B20',
    name: 'Defensa Siciliana',
    moves: ['e4', 'c5'],
    description: 'Defensa agresiva y popular para las negras. La respuesta más común a 1.e4 a nivel magistral.',
    initialFen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
    popularity: 0.78,
    whiteWins: 38,
    blackWins: 34,
    draws: 28,
    totalGames: 2000,
  },
  {
    eco: 'D02',
    name: 'Ataque Indio de Rey',
    moves: ['d4', 'd5', 'Nf3', 'Nf6', 'c4'],
    description: 'Apertura clásica que conduce a posiciones estratégicas y tácticas complejas.',
    initialFen: 'rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2',
    popularity: 0.70,
    whiteWins: 40,
    blackWins: 35,
    draws: 25,
    totalGames: 800,
  },
  {
    eco: 'E00',
    name: 'Defensa India de Rey',
    moves: ['d4', 'Nf6', 'c4', 'e6', 'g3'],
    description: 'Apertura hipermoderna que enfatiza el control del centro desde los flancos.',
    initialFen: 'rnbqkb1r/pppp1ppp/4pn2/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
    popularity: 0.65,
    whiteWins: 39,
    blackWins: 33,
    draws: 28,
    totalGames: 700,
  },
  {
    eco: 'C41',
    name: 'Defensa Philidor',
    moves: ['e4', 'e5', 'Nf3', 'd6'],
    description: 'Defensa sólida pero pasiva para las negras. Popular en el siglo XIX.',
    initialFen: 'rnbqkbnr/ppp2ppp/3p4/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3',
    popularity: 0.45,
    whiteWins: 44,
    blackWins: 32,
    draws: 24,
    totalGames: 400,
  },
  {
    eco: 'B90',
    name: 'Siciliana Najdorf',
    moves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6'],
    description: 'Variante muy agresiva y profundamente analizada de la Defensa Siciliana.',
    initialFen: 'rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6',
    popularity: 0.82,
    whiteWins: 36,
    blackWins: 38,
    draws: 26,
    totalGames: 1200,
  },
  {
    eco: 'D55',
    name: 'Gambito de Dama Rehusado',
    moves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e3', 'O-O'],
    description: 'Apertura clásica que conduce a juego posicional y estructuras de peones complejas.',
    initialFen: 'rnbq1rk1/ppp1bppp/4pn2/3p2B1/2PP4/2N1P3/PP3PPP/R2QKBNR w KQ - 0 7',
    popularity: 0.68,
    whiteWins: 37,
    blackWins: 31,
    draws: 32,
    totalGames: 900,
  },
  {
    eco: 'A40',
    name: 'Defensa Inglesa',
    moves: ['c4', 'e6'],
    description: 'Defensa flexible que puede transponer a varias estructuras de peones.',
    initialFen: 'rnbqkbnr/pppp1ppp/4p3/8/2P5/8/PP1PPPPP/RNBQKBNR w KQkq - 0 2',
    popularity: 0.52,
    whiteWins: 41,
    blackWins: 34,
    draws: 25,
    totalGames: 350,
  },
  {
    eco: 'C44',
    name: 'Apertura Escocesa',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'd4'],
    description: 'Apertura directa que busca romper el centro rápidamente.',
    initialFen: 'rnbqkbnr/pppp1ppp/8/4p3/3PP3/8/PPP2PPP/RNBQKBNR b KQkq - 0 2',
    popularity: 0.58,
    whiteWins: 43,
    blackWins: 35,
    draws: 22,
    totalGames: 600,
  },
  {
    eco: 'B00',
    name: 'Defensa Caro-Kann',
    moves: ['e4', 'c6'],
    description: 'Defensa sólida que busca controlar el centro con peones.',
    initialFen: 'rnbqkbnr/pp1ppppp/2p5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
    popularity: 0.72,
    whiteWins: 39,
    blackWins: 32,
    draws: 29,
    totalGames: 1100,
  }
];

export async function seedDatabase() {
  console.log('🌱 Iniciando seed de la base de datos...');

  try {
    // Limpiar base de datos existente en orden correcto
    await prisma.userProgress.deleteMany();
    await prisma.userFavorite.deleteMany();
    await prisma.moveStatistic.deleteMany();
    await prisma.variation.deleteMany();
    await prisma.opening.deleteMany();

    console.log('🗑️ Base de datos limpiada');

    // Crear aperturas
    for (const openingData of openingsData) {
      await prisma.opening.create({
        data: openingData
      });
      console.log(`✅ Apertura creada: ${openingData.name}`);
    }

    console.log(`🎉 ${openingsData.length} aperturas creadas exitosamente!`);
    
    // Mostrar estadísticas finales
    const openingCount = await prisma.opening.count();
    console.log(`📊 Total de aperturas en la base de datos: ${openingCount}`);
    
  } catch (error) {
    console.error('❌ Error en el seed:', error);
    throw error;
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('✨ Seed completado exitosamente!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 El seed falló:', error);
      process.exit(1);
    });
}