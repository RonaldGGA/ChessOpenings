"use client"

import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { usePracticeStore } from '../../stores/usePracticeStore';
import ErrorMessage from './ui/errorMessage';
import MobileStatsBar from './ui/mobileStatsBar';
import ChessBoard from './chess/chessBoard';
import PracticeSidebar from './ui/practiceSidebar';
import LoadingSpinner from './ui/loadingSpinner';

const PracticeClient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    loadOpening, 
    initializePractice, 
    isLoading, 
    error,
    practiceMode 
  } = usePracticeStore();

  useEffect(() => {
    if (id) {
      loadOpening(id).then(() => {
        initializePractice('guided');
      });
    }
  }, [id, loadOpening, initializePractice]);

  if (isLoading) {
    return <LoadingSpinner message="Cargando apertura..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barra superior móvil */}
      <div className="lg:hidden">
        <MobileStatsBar />
      </div>

      {/* Layout principal */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Panel izquierdo - Solo desktop */}
          <div className="lg:col-span-3 hidden lg:block">
            <PracticeSidebar position="left" />
          </div>

          {/* Panel central - Tablero */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-center text-gray-800">
                  Práctica de Apertura
                </h1>
                <p className="text-center text-gray-600">
                  Modo: {practiceMode === 'guided' ? 'Guiado' : 
                         practiceMode === 'free' ? 'Libre' : 'VS Computadora'}
                </p>
              </div>
              
              <ChessBoard />
            </div>
          </div>

          {/* Panel derecho - Solo desktop */}
          <div className="lg:col-span-3 hidden lg:block">
            <PracticeSidebar position="right" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default PracticeClient;