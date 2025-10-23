/*!
 * Stockfish.js (http://github.com/nmrugg/stockfish.js)
 * License: GPL
 */

type EngineMessage = {
  uciMessage: string;
  bestMove?: string;
  ponder?: string;
  positionEvaluation?: string;
  possibleMate?: string;
  pv?: string;
  depth?: number;
};

// Mock para desarrollo local
class MockStockfish {
  private callbacks: ((event: MessageEvent) => void)[] = [];

  addEventListener(type: string, callback: (event: MessageEvent) => void) {
    if (type === 'message') {
      this.callbacks.push(callback);
    }
  }

  postMessage(message: string) {
    console.log('Mock Stockfish received:', message);

    // Simular respuestas del engine
    setTimeout(() => {
      if (message === 'uci') {
        this.triggerMessage('id name Mock Stockfish');
        this.triggerMessage('uciok');
      } else if (message === 'isready') {
        this.triggerMessage('readyok');
      } else if (message.startsWith('position fen')) {
        this.triggerMessage('info string position set');
      } else if (message.startsWith('go depth')) {
        // Simular análisis después de un delay
        setTimeout(() => {
          const mockMoves = ['e2e4', 'd2d4', 'g1f3', 'b1c3'];
          const randomMove = mockMoves[Math.floor(Math.random() * mockMoves.length)];
          this.triggerMessage(`info depth 10 score cp 32 nodes 1234 nps 45678 time 50 pv ${randomMove}`);
          this.triggerMessage(`bestmove ${randomMove}`);
        }, 1000);
      }
    }, 100);
  }

  private triggerMessage(data: string) {
    this.callbacks.forEach(callback => {
      callback(new MessageEvent('message', { data }));
    });
  }

  terminate() {
    this.callbacks = [];
  }
}

export default class Engine {
  private stockfish: Worker | MockStockfish;
  private messageCallbacks: ((message: EngineMessage) => void)[] = [];
  isReady: boolean = false;

  constructor(useMock: boolean = false) {
    // Determinar si usar mock o worker real
    if (useMock || this.shouldUseMock()) {
      console.log('🚀 Usando Mock Stockfish para desarrollo local');
      this.stockfish = new MockStockfish();
    } else {
      console.log('🎯 Usando Stockfish real para producción');
      this.stockfish = new Worker(this.getWorkerPath());
    }

    this.setupMessageHandling();
    this.init();
  }

  private shouldUseMock(): boolean {
    // Usar mock en desarrollo local
    return (
      typeof window === 'undefined' || // Node.js environment
      typeof Worker === 'undefined' || // No Web Worker support
      process.env.NODE_ENV === 'development' // Desarrollo local
    );
  }

  private getWorkerPath(): string {
    // En producción, ajusta esta ruta según tu estructura
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      return '/stockfish.wasm.js'; // Desarrollo con servidor local
    }
    return '/stockfish.wasm.js'; // Producción - ajusta esta ruta
  }

  private setupMessageHandling() {
    if (this.stockfish instanceof Worker) {
      // Worker real
      this.stockfish.addEventListener('message', (e: MessageEvent<string>) => {
        this.handleMessage(e.data);
      });
    } else {
      // Mock
      this.stockfish.addEventListener('message', (e: MessageEvent) => {
        this.handleMessage(e.data);
      });
    }
  }

  private handleMessage(uciMessage: string) {
    const messageData = this.transformSFMessageData(uciMessage);
    
    // Llamar todos los callbacks registrados
    this.messageCallbacks.forEach(callback => {
      callback(messageData);
    });

    // Log para debugging
    if (messageData.bestMove) {
      console.log('📊 Análisis completado:', {
        bestMove: messageData.bestMove,
        evaluation: messageData.positionEvaluation,
        depth: messageData.depth
      });
    }
  }

  private transformSFMessageData(uciMessage: string): EngineMessage {
    return {
      uciMessage,
      bestMove: uciMessage.match(/bestmove\s+(\S+)/)?.[1],
      ponder: uciMessage.match(/ponder\s+(\S+)/)?.[1],
      positionEvaluation: uciMessage.match(/cp\s+(\S+)/)?.[1],
      possibleMate: uciMessage.match(/mate\s+(\S+)/)?.[1],
      pv: uciMessage.match(/ pv\s+(.*)/)?.[1],
      depth: Number(uciMessage.match(/ depth\s+(\S+)/)?.[1] ?? 0),
    };
  }

  init() {
    this.stockfish.postMessage('uci');
    this.stockfish.postMessage('isready');
    
    this.onMessage(({ uciMessage }) => {
      if (uciMessage === 'readyok') {
        this.isReady = true;
        console.log('✅ Engine listo');
      }
    });
  }

  onMessage(callback: (message: EngineMessage) => void) {
    this.messageCallbacks.push(callback);
  }

  onReady(callback: () => void) {
    this.onMessage(({ uciMessage }) => {
      if (uciMessage === 'readyok') {
        callback();
      }
    });
  }

  evaluatePosition(fen: string, depth: number = 12) {
    if (!this.isReady) {
      console.warn('Engine no está listo');
      return;
    }

    if (depth > 24) depth = 24;

    console.log(`🔍 Analizando posición: ${fen.substring(0, 30)}...`);
    this.stockfish.postMessage(`position fen ${fen}`);
    this.stockfish.postMessage(`go depth ${depth}`);
  }

  stop() {
    this.stockfish.postMessage('stop');
  }

  terminate() {
    this.isReady = false;
    this.messageCallbacks = [];
    this.stockfish.postMessage('quit');
  }
}