# NOTAS

BASICOS

EL UI es manejado por react-chessboard
LA LOGICA del luego es manejada por chess.js
LAS ESTADISTICAS y JUEGOS LIBRES son manejadas por stockfish

## UI

Esta manejada por los componentes
-chessboard
-practiceClient

## LOGICA

Esta manejada por:

- el hooks useChessStore(maneja el transcurso global del juego) se encarga de:
1-> Inicializar el juego con un opening determinado
2-> Hacer un movimiento
3-> reiniciar el juego
4-> obtener el estado del juego
5-> obtener los movimientos validos initializePractice: (opening: any) => void

- el hook useUiStore (estado global del UI): Se encarga de la orientacion del tablero.

## ESTADISTICAS Y JUEGO LIBRE

Estructura:
-Configuracion de stockfish con stockfish.wasm.js y stockfish.wasm
-Uso del motor(engine.ts) para conectar el webworker de stockfish con la aplicacion
