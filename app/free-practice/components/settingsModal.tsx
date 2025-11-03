// components/SettingsModal.tsx
"use client";

import { useState, useEffect } from "react";
import {
  X,
  RotateCw,
  Eye,
  Cpu,
  User,
  BarChart3,
  History,
  BookOpen,
} from "lucide-react";
import { FaChessBoard } from "react-icons/fa";
import { useChessGame } from "@/app/stores/useChessStore";

interface SettingsModalProps {
  openSettings:boolean,
  setOpenSettings:(openSettings:boolean)=>void
}

const SettingsModal:React.FC<SettingsModalProps> = ({openSettings, setOpenSettings}) => {
  const {
    settings,
    updateSettings,

  } = useChessGame();

  const [localSettings, setLocalSettings] = useState(settings);

  // Sincronizar localSettings cuando cambien las settings del store
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  // Manejar cambios individuales de settings
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSettingChange = (key: keyof typeof settings, value: any) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
  };

  // Guardar y cerrar
  const handleSaveAndClose = () => {
    updateSettings(localSettings);
    setOpenSettings(false);
  };

  // Reset a valores por defecto
  const handleReset = () => {
    const defaultSettings = {
      showBestMoveArrow: true,
      showPonderArrow: true,
      boardOrientation: "white" as const,
      showRelatedOpenings: true,
      showAnalysis: true,
      showMoveHistory: true,
      cpuSide: "none" as const,
      analysisDepth: 11,
    };
    setLocalSettings(defaultSettings);
    updateSettings(defaultSettings);
  };

  // Cerrar sin guardar
  const handleClose = () => {
    setOpenSettings(false);
    // Restaurar settings originales si se canceló
    setLocalSettings(settings);
  };

  if (!openSettings) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-100 flex items-center justify-center p-4">
      <div className="bg-slate-800/95 backdrop-blur-sm rounded-3xl border border-slate-600 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-500/20 rounded-xl">
              <FaChessBoard className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Board Settings</h2>
              <p className="text-gray-400 text-sm">
                Customize your practice experience
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-slate-700/50 rounded-xl transition-colors text-gray-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Visual Settings */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <Eye className="h-5 w-5 text-yellow-400" />
                <h3 className="text-lg font-semibold text-white">
                  Visual Settings
                </h3>
              </div>

              {/* Analysis Depth */}
              <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
                <h4 className="text-white font-medium mb-3">
                  Analysis Depth
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Depth: {localSettings.analysisDepth}</span>
                    <span className="text-xs text-gray-500">Max: 15</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="15"
                    value={localSettings.analysisDepth}
                    onChange={(e) =>
                      handleSettingChange(
                        "analysisDepth",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-xs text-gray-400">
                    Deeper analysis is stronger but slower. The API limits
                    maximum depth to 15.
                  </p>
                </div>
              </div>

              {/* Arrows */}
              <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
                <h4 className="text-white font-medium mb-3">Analysis Arrows</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Best Move</span>
                    <button
                      onClick={() =>
                        handleSettingChange(
                          "showBestMoveArrow",
                          !localSettings.showBestMoveArrow
                        )
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        localSettings.showBestMoveArrow
                          ? "bg-green-500"
                          : "bg-slate-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          localSettings.showBestMoveArrow
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Ponder Move</span>
                    <button
                      onClick={() =>
                        handleSettingChange(
                          "showPonderArrow",
                          !localSettings.showPonderArrow
                        )
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        localSettings.showPonderArrow
                          ? "bg-green-500"
                          : "bg-slate-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          localSettings.showPonderArrow
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Board Orientation */}
              <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
                <h4 className="text-white font-medium mb-3">
                  Board Orientation
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() =>
                      handleSettingChange("boardOrientation", "white")
                    }
                    className={`p-3 rounded-lg border-2 transition-all ${
                      localSettings.boardOrientation === "white"
                        ? "border-yellow-400 bg-yellow-400/20 text-white"
                        : "border-slate-600 bg-slate-600/50 text-gray-400 hover:border-slate-500"
                    }`}
                  >
                    <User className="h-5 w-5 mx-auto mb-1" />
                    <span className="text-sm">White</span>
                  </button>
                  <button
                    onClick={() =>
                      handleSettingChange("boardOrientation", "black")
                    }
                    className={`p-3 rounded-lg border-2 transition-all ${
                      localSettings.boardOrientation === "black"
                        ? "border-yellow-400 bg-yellow-400/20 text-white"
                        : "border-slate-600 bg-slate-600/50 text-gray-400 hover:border-slate-500"
                    }`}
                  >
                    <User className="h-5 w-5 mx-auto mb-1" />
                    <span className="text-sm">Black</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Panel Settings */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-5 w-5 text-yellow-400" />
                <h3 className="text-lg font-semibold text-white">
                  Panel Settings
                </h3>
              </div>

              {/* Panel Toggles */}
              <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-300">Related Openings</span>
                    </div>
                    <button
                      onClick={() =>
                        handleSettingChange(
                          "showRelatedOpenings",
                          !localSettings.showRelatedOpenings
                        )
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        localSettings.showRelatedOpenings
                          ? "bg-green-500"
                          : "bg-slate-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          localSettings.showRelatedOpenings
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="h-4 w-4 text-purple-400" />
                      <span className="text-gray-300">Analysis Panel</span>
                    </div>
                    <button
                      onClick={() =>
                        handleSettingChange(
                          "showAnalysis",
                          !localSettings.showAnalysis
                        )
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        localSettings.showAnalysis
                          ? "bg-green-500"
                          : "bg-slate-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          localSettings.showAnalysis
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <History className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300">Move History</span>
                    </div>
                    <button
                      onClick={() =>
                        handleSettingChange(
                          "showMoveHistory",
                          !localSettings.showMoveHistory
                        )
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        localSettings.showMoveHistory
                          ? "bg-green-500"
                          : "bg-slate-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          localSettings.showMoveHistory
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* CPU Opponent */}
              <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
                <h4 className="text-white font-medium mb-3 flex items-center space-x-2">
                  <Cpu className="h-5 w-5 text-yellow-400" />
                  <span>CPU Opponent</span>
                </h4>
                <div className="space-y-2">
                  {["none", "white", "black"].map((side) => (
                    <button
                      key={side}
                      onClick={() => handleSettingChange("cpuSide", side)}
                      className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                        localSettings.cpuSide === side
                          ? "border-yellow-400 bg-yellow-400/20 text-white"
                          : "border-slate-600 bg-slate-600/50 text-gray-400 hover:border-slate-500"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {side === "none" ? (
                          <>
                            <User className="h-5 w-5" />
                            <span>No CPU - Practice Alone</span>
                          </>
                        ) : side === "white" ? (
                          <>
                            <Cpu className="h-5 w-5" />
                            <span>CPU plays as White</span>
                          </>
                        ) : (
                          <>
                            <Cpu className="h-5 w-5" />
                            <span>CPU plays as Black</span>
                          </>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-slate-700 bg-slate-800/50">
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            <RotateCw className="h-4 w-4" />
            <span>Reset to Defaults</span>
          </button>
          <div className="flex space-x-3">
            <button
              onClick={handleClose}
              className="px-6 py-2 border border-slate-600 text-gray-300 hover:text-white hover:border-slate-500 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAndClose}
              className="px-6 py-2 bg-yellow-500 text-slate-900 font-semibold rounded-xl hover:bg-yellow-400 transition-colors shadow-lg hover:shadow-xl hover:shadow-yellow-500/25"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;