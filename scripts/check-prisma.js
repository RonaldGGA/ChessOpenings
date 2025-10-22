// scripts/check-prisma.js
const { PrismaClient } = require('@prisma/client')

async function checkPrisma() {
  try {
    console.log('🔍 Checking Prisma Client...')
    
    // 1. Verificar si puede instanciar
    const prisma = new PrismaClient()
    console.log('✅ Prisma Client instantiated successfully')
    
    // 2. Verificar conexión a BD
    await prisma.$connect()
    console.log('✅ Database connection successful')
    
    // 3. Verificar consulta simple
    const userCount = await prisma.user.count()
    console.log(`✅ Query successful. Total users: ${userCount}`)
    
    // 4. Verificar estructura
    console.log('📊 Prisma Client structure:')
    console.log('- prisma.user:', typeof prisma.user)
    console.log('- prisma.opening:', typeof prisma.opening)
    
    await prisma.$disconnect()
    console.log('🎉 All checks passed!')
    
  } catch (error) {
    console.error('❌ Prisma check failed:', error)
    process.exit(1)
  }
}

checkPrisma()