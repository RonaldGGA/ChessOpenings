import { requireAuth } from "../lib/auth-utils"
import { prisma } from "../lib/db"

// app/dashboard/page.tsx
export default async function Dashboard() {
  const user = await requireAuth()

  // Obtener estadísticas del usuario
  const userStats = await prisma.userProgress.findMany({
    where: { userId: user.id },
    include: {
      opening: true
    },
    orderBy: { lastPracticed: 'desc' }
  })

  const totalCorrectMoves = userStats.reduce((sum, stat) => sum + stat.correctMoves, 0)
  const totalMoves = userStats.reduce((sum, stat) => sum + stat.totalMoves, 0)
  const accuracy = totalMoves > 0 ? Math.round((totalCorrectMoves / totalMoves) * 100) : 0

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        My Dashboard
      </h1>
      
      {/* Estadísticas generales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Precisión General</h3>
          <p className="text-3xl font-bold text-blue-600">{accuracy}%</p>
          <p className="text-sm text-gray-500">{totalCorrectMoves}/{totalMoves} movimientos</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Aperturas Practicadas</h3>
          <p className="text-3xl font-bold text-green-600">{userStats.length}</p>
          <p className="text-sm text-gray-500">Total de aperturas</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Sesiones de Práctica</h3>
          <p className="text-3xl font-bold text-purple-600">
            {userStats.reduce((sum, stat) => sum + stat.timesPracticed, 0)}
          </p>
          <p className="text-sm text-gray-500">Veces practicadas</p>
        </div>
      </div>

      {/* Progreso por apertura */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Mi Progreso</h2>
        </div>
        <div className="divide-y">
          {userStats.map((stat) => (
            <div key={stat.id} className="px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{stat.opening.name}</h3>
                <p className="text-sm text-gray-500">{stat.opening.eco}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  {stat.correctMoves}/{stat.totalMoves} ({Math.round((stat.correctMoves / stat.totalMoves) * 100)}%)
                </p>
                <p className="text-sm text-gray-500">
                  Practicado {stat.timesPracticed} veces
                </p>
              </div>
            </div>
          ))}
          
          {userStats.length === 0 && (
            <div className="px-6 py-8 text-center">
              <p className="text-gray-500">Aún no has practicado ninguna apertura</p>
              <a
                href="/explore"
                className="inline-block mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Explorar Aperturas
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}