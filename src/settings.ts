const GRID_SIZE_DEFAULT: number = 12;
const CELL_SIZE_DEFAULT: number = 40;
const GAME_SPEED_DEFAULT: number = 100;

export function getSettings() {
  let s: string | null = localStorage.getItem("settings");
  let settings: any =
    s !== null
      ? JSON.parse(s)
      : {
          gridSize: GRID_SIZE_DEFAULT,
          cellSize: CELL_SIZE_DEFAULT,
          gameSpeed: GAME_SPEED_DEFAULT,
        };

  return settings;
}

/**
 * @param settings - {gridSize, cellSize, gameSpeed}
 */
export function setSettings(settings: any) {
  localStorage.setItem("settings", JSON.stringify(settings));
}
