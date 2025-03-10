"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSettings = exports.getSettings = void 0;
const GRID_SIZE_DEFAULT = 12;
const CELL_SIZE_DEFAULT = 40;
const GAME_SPEED_DEFAULT = 100;
function getSettings() {
    let s = localStorage.getItem("settings");
    let settings = s !== null
        ? JSON.parse(s)
        : {
            gridSize: GRID_SIZE_DEFAULT,
            cellSize: CELL_SIZE_DEFAULT,
            gameSpeed: GAME_SPEED_DEFAULT,
        };
    return settings;
}
exports.getSettings = getSettings;
/**
 * @param settings - {gridSize, cellSize, gameSpeed}
 */
function setSettings(settings) {
    localStorage.setItem("settings", JSON.stringify(settings));
}
exports.setSettings = setSettings;
