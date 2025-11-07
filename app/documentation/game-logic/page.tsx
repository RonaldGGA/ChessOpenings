// app/documentation/game-logic/page.tsx
import Link from "next/link";
import {
  ArrowLeft,
  Cpu,
  Brain,
  Database,
  Zap,
  GitBranch,
  Settings,
  History,
  BarChart3,
} from "lucide-react";

export default function GameLogicDocumentation() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/documentation"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Documentation
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Chess Game Logic & Architecture
          </h1>
          <p className="text-xl text-slate-600">
            Deep dive into the chess engine, state management, and real-time
            analysis that powers ChessMaster.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <a
            href="#state-management"
            className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow"
          >
            <Database className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-slate-900">
              State Management
            </div>
          </a>
          <a
            href="#move-logic"
            className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow"
          >
            <GitBranch className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-slate-900">Move Logic</div>
          </a>
          <a
            href="#analysis-engine"
            className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow"
          >
            <Brain className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-slate-900">
              AI Analysis
            </div>
          </a>
          <a
            href="#practice-sessions"
            className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow"
          >
            <History className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-slate-900">
              Practice System
            </div>
          </a>
        </div>

        <div
          id="architecture"
          className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 mb-8"
        >
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Architecture Overview
          </h2>
          <div className="bg-slate-50 rounded-lg p-6 mb-6">
            <pre className="text-sm text-slate-800 overflow-x-auto">
              {`ChessMaster Game Architecture:
├── State Management (Zustand Store)
│   ├── Chess Game State
│   ├── UI State
│   └── Analysis State
├── Chess Logic Layer
│   ├── Move Validation
│   ├── Game Rules
│   └── Position Management
├── AI Analysis Engine
│   ├── Stockfish Integration
│   ├── Real-time Analysis
│   └── Move Suggestions
└── Practice System
    ├── Session Tracking
    ├── Progress Saving
    └── Opening Database`}
            </pre>
          </div>
        </div>

        <div
          id="state-management"
          className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 mb-8"
        >
          <div className="flex items-center mb-4">
            <Database className="h-6 w-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-semibold text-slate-900">
              State Management with Zustand
            </h2>
          </div>

          <p className="text-slate-700 mb-6">
            ChessMaster uses a centralized Zustand store to manage complex chess
            game state, UI state, and analysis data in a type-safe manner.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Core State Structure
          </h3>
          <div className="bg-slate-900 rounded-lg p-4 mb-6">
            <pre className="text-sm text-slate-200 overflow-x-auto">
              {`interface ChessGameState {
  // Game Engine
  chessGame: Chess;                    // chess.js instance
  chessPosition: string;               // Current FEN position
  movesHistory: string[];              // Move history in SAN
  
  // Move Interaction
  moveFrom: string;                    // Selected square for move
  optionSquares: Record<string, any>;  // Highlighted possible moves
  
  // Analysis & AI
  moveAnalysis: StockfishAnalysis | null;
  isAnalyzing: boolean;
  isCpuThinking: boolean;
  bestMove: string;
  bestEnemyMove: string;
  
  // Game State
  gameOver: { isOver: boolean; result?: string };
  relatedOpenings: Opening[];
  
  // UI State
  isFullscreen: boolean;
  settings: GameSettings;
}`}
            </pre>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Key State Actions
          </h3>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Game Actions</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>
                  <code>makeMove()</code> - Validate & execute moves
                </li>
                <li>
                  <code>resetBoard()</code> - Reset to initial position
                </li>
                <li>
                  <code>loadOpeningPosition()</code> - Load specific FEN
                </li>
                <li>
                  <code>onPieceDrop()</code> - Handle drag & drop moves
                </li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">UI Actions</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>
                  <code>onSquareClick()</code> - Handle square selection
                </li>
                <li>
                  <code>getMoveOptions()</code> - Show possible moves
                </li>
                <li>
                  <code>setIsFullscreen()</code> - Toggle fullscreen mode
                </li>
                <li>
                  <code>updateSettings()</code> - Modify user preferences
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          id="move-logic"
          className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 mb-8"
        >
          <div className="flex items-center mb-4">
            <GitBranch className="h-6 w-6 text-green-600 mr-3" />
            <h2 className="text-2xl font-semibold text-slate-900">
              Chess Move Logic & Validation
            </h2>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Move Execution Flow
          </h3>
          <div className="bg-slate-50 rounded-lg p-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-3 mt-0.5">
                  1
                </div>
                <div>
                  <strong>User Interaction</strong>
                  <p className="text-sm text-slate-600">
                    User clicks square or drags piece
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-3 mt-0.5">
                  2
                </div>
                <div>
                  <strong>Move Validation</strong>
                  <p className="text-sm text-slate-600">
                    chess.js validates move against game rules
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mr-3 mt-0.5">
                  3
                </div>
                <div>
                  <strong>State Update</strong>
                  <p className="text-sm text-slate-600">
                    Update FEN, move history, and game state
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded mr-3 mt-0.5">
                  4
                </div>
                <div>
                  <strong>Analysis Trigger</strong>
                  <p className="text-sm text-slate-600">
                    Kick off real-time position analysis
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Move Validation Code
          </h3>
          <div className="bg-slate-900 rounded-lg p-4 mb-6">
            <pre className="text-sm text-slate-200 overflow-x-auto">
              {`// Core move validation and execution
makeMove: (from, to, promotion = 'q') => {
  const state = get();
  try {
    // Validate and execute move using chess.js
    state.chessGame.move({ from, to, promotion });
    const newFen = state.chessGame.fen();
    const newHistory = state.chessGame.history();
    
    // Update all related state
    set({
      chessPosition: newFen,
      movesHistory: newHistory,
      moveFrom: '',
      optionSquares: {},
    });
    return true;
  } catch {
    return false; // Invalid move
  }
},

// Handle piece drop from react-chessboard
onPieceDrop: ({sourceSquare, targetSquare}) => {
  const state = get();
  const { settings, isCpuThinking } = state;
  
  // Prevent moves during CPU thinking
  const currentTurn = state.chessGame.turn();
  const isCpuTurn = (currentTurn === "w" && settings.cpuSide === "white") ||
                   (currentTurn === "b" && settings.cpuSide === "black");

  if (isCpuTurn || isCpuThinking) return false;

  // Execute the move
  return state.makeMove(sourceSquare, targetSquare, "q");
}`}
            </pre>
          </div>
        </div>

        <div
          id="analysis-engine"
          className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 mb-8"
        >
          <div className="flex items-center mb-4">
            <Brain className="h-6 w-6 text-purple-600 mr-3" />
            <h2 className="text-2xl font-semibold text-slate-900">
              AI Analysis Engine
            </h2>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Stockfish Integration
          </h3>
          <div className="bg-slate-900 rounded-lg p-4 mb-6">
            <pre className="text-sm text-slate-200 overflow-x-auto">
              {`// Real-time position analysis
const analyzePosition = async (fen: string) => {
  if (isCpuThinking) return;

  setIsAnalyzing(true);
  try {
    // External Stockfish API call
    const response = await fetch(
      \`https://stockfish.online/api/s/v2.php?fen=\${encodeURIComponent(
        fen
      )}&depth=\${settings?.analysisDepth || 11}\`
    );

    const data = await response.json();
    
    if (data.success) {
      const bestMoveParts = data.bestmove?.split(" ") || [];
      const analysis: StockfishAnalysis = {
        bestMove: bestMoveParts[1] || "",      // Best move for current player
        ponder: bestMoveParts[3] || "",        // Expected opponent response
        evaluation: data.evaluation || "0",    // Position evaluation (cp)
        continuation: data.continuation || "", // Suggested line
        mate: data.mate,                       // Mate in X moves if available
      };
      setMoveAnalysis(analysis);
    }
  } catch (error) {
    console.error("Error analyzing position:", error);
  } finally {
    setIsAnalyzing(false);
  }
};`}
            </pre>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            CPU Opponent Logic
          </h3>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-50 rounded-lg p-4">
              <Cpu className="h-5 w-5 text-blue-600 mb-2" />
              <h4 className="font-semibold text-slate-900">
                CPU Move Execution
              </h4>
              <ul className="text-sm text-slate-700 mt-2 space-y-1">
                <li>• Checks if it&quot;s CPU&quot;s turn based on settings</li>
                <li>• Uses Stockfish analysis for best moves</li>
                <li>• Adds 800ms delay for realistic thinking time</li>
                <li>• Validates moves before execution</li>
                <li>• Updates game state after CPU move</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <Settings className="h-5 w-5 text-green-600 mb-2" />
              <h4 className="font-semibold text-slate-900">
                Analysis Features
              </h4>
              <ul className="text-sm text-slate-700 mt-2 space-y-1">
                <li>• Best move suggestions (green arrows)</li>
                <li>• Expected responses (red arrows)</li>
                <li>• Position evaluation scores</li>
                <li>• Mate threat detection</li>
                <li>• Suggested continuation lines</li>
              </ul>
            </div>
          </div>
        </div>

        <div
          id="practice-sessions"
          className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 mb-8"
        >
          <div className="flex items-center mb-4">
            <History className="h-6 w-6 text-orange-600 mr-3" />
            <h2 className="text-2xl font-semibold text-slate-900">
              Practice Session System
            </h2>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Session Data Structure
          </h3>
          <div className="bg-slate-900 rounded-lg p-4 mb-6">
            <pre className="text-sm text-slate-200 overflow-x-auto">
              {`// Practice session data saved to database
interface PracticeSessionData {
  moves: string;        // "e4 e5 Nf3 Nc6 Bb5" - moves in SAN
  finalFen: string;     // Final position after moves
  movesCount: number;   // Total moves in session
  openingId?: string;   // Optional reference to opening
}

// Database model
model PracticeSession {
  id        String   @id @default(cuid())
  user      User     @relation(fields: [userId])
  userId    String
  opening   Opening? @relation(fields: [openingId])
  openingId String?
  
  moves     String   // Moves in SAN notation
  finalFen  String   // Final position
  movesCount Int     // Number of moves
  
  createdAt DateTime @default(now())
}`}
            </pre>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Session Saving Flow
          </h3>
          <div className="bg-slate-50 rounded-lg p-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-3 mt-0.5">
                  1
                </div>
                <div>
                  <strong>User Initiates Save</strong>
                  <p className="text-sm text-slate-600">
                    User clicks &quot;Save Session&quot; button
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-3 mt-0.5">
                  2
                </div>
                <div>
                  <strong>Data Validation</strong>
                  <p className="text-sm text-slate-600">
                    Check if moves exist and user is authenticated
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mr-3 mt-0.5">
                  3
                </div>
                <div>
                  <strong>API Call</strong>
                  <p className="text-sm text-slate-600">
                    Send session data to{" "}
                    <code>/api/user/practice-sessions</code>
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded mr-3 mt-0.5">
                  4
                </div>
                <div>
                  <strong>Database Storage</strong>
                  <p className="text-sm text-slate-600">
                    Store session with user relationship
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="real-time-features"
          className="bg-white rounded-xl shadow-sm p-6 border border-slate-200"
        >
          <div className="flex items-center mb-4">
            <Zap className="h-6 w-6 text-yellow-600 mr-3" />
            <h2 className="text-2xl font-semibold text-slate-900">
              Real-time Features & Optimization
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-lg p-4">
              <BarChart3 className="h-5 w-5 text-blue-600 mb-2" />
              <h4 className="font-semibold text-slate-900">
                Performance Optimizations
              </h4>
              <ul className="text-sm text-slate-700 mt-2 space-y-1">
                <li>• Debounced analysis requests</li>
                <li>• Conditional re-rendering with React.memo</li>
                <li>• Efficient state updates with Zustand</li>
                <li>• Lazy loading of chess board components</li>
                <li>• Optimized Stockfish API calls</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <GitBranch className="h-5 w-5 text-green-600 mb-2" />
              <h4 className="font-semibold text-slate-900">
                Real-time Updates
              </h4>
              <ul className="text-sm text-slate-700 mt-2 space-y-1">
                <li>• Instant move validation feedback</li>
                <li>• Live position analysis updates</li>
                <li>• Real-time opening suggestions</li>
                <li>• Dynamic move highlighting</li>
                <li>• Automatic game state detection</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-3">
            Key Dependencies & Technologies
          </h3>
          <div className="bg-slate-900 rounded-lg p-4">
            <pre className="text-sm text-slate-200 overflow-x-auto">
              {`Chess Game Engine Stack:
├── chess.js (v^1.0.0)        - Chess rules & move validation
├── react-chessboard (v^5.0.0) - Interactive chess board UI
├── Stockfish API             - AI analysis & engine moves
├── Zustand (v^4.0.0)         - State management
├── React Hooks               - Component lifecycle & effects
└── TypeScript                - Type safety & developer experience`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
