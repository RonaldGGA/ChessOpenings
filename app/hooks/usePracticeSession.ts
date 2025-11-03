// hooks/usePracticeSession.ts
import { useCallback } from 'react';
import { useChessGame } from '../stores/useChessStore';

export const usePracticeSession = () => {
  const {
    movesHistory,
    chessPosition,
  } = useChessGame();

  // Function to save practice session
  const savePracticeSession = useCallback(async () => {
    if (movesHistory.length === 0) {
      alert('No moves to save!');
      return;
    }

    try {
      const sessionData = {
        moves: movesHistory.join(' '),
        finalFen: chessPosition,
        movesCount: movesHistory.length,
      };

      console.log("Saving practice session:", {
        movesCount: sessionData.movesCount,
      });

      const response = await fetch("/api/user/practice-sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(sessionData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      alert('Practice session saved successfully!');
      console.log("Practice session saved successfully", result);
      
      return result;
    } catch (error) {
      console.error("Error saving practice session:", error);
      alert('Error saving practice session. Please try again.');
      throw error;
    }
  }, [movesHistory, chessPosition]);

  return {
    savePracticeSession,
  };
};