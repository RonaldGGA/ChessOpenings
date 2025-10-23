import { Opening, Variation, MoveStatistic, UserProgress } from '../types/practice';

const API_BASE = '/api';

export class OpeningService {
  async getOpeningById(id: string): Promise<Opening> {
    const response = await fetch(`${API_BASE}/openings/${id}`);
    if (!response.ok) throw new Error('Error fetching opening');
    return response.json();
  }

  async getTopMovesForPosition(
    openingId: string, 
    currentMoveSequence: string[]
  ): Promise<MoveStatistic[]> {
    const response = await fetch(`${API_BASE}/openings/${openingId}/moves`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sequence: currentMoveSequence })
    });
    
    if (!response.ok) throw new Error('Error fetching moves');
    const data = await response.json();
    return data.moves.slice(0, 3); // Solo top 3
  }

  async getVariationsForOpening(openingId: string): Promise<Variation[]> {
    const response = await fetch(`${API_BASE}/openings/${openingId}/variations`);
    if (!response.ok) throw new Error('Error fetching variations');
    return response.json();
  }

  async updateUserProgress(
    userId: string, 
    openingId: string, 
    isCorrect: boolean
  ): Promise<UserProgress> {
    const response = await fetch(`${API_BASE}/user-progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        openingId,
        isCorrect,
        timestamp: new Date().toISOString()
      })
    });
    
    if (!response.ok) throw new Error('Error updating progress');
    return response.json();
  }

  async getUserProgress(userId: string, openingId: string): Promise<UserProgress | null> {
    const response = await fetch(`${API_BASE}/user-progress?userId=${userId}&openingId=${openingId}`);
    if (!response.ok) return null;
    return response.json();
  }
}