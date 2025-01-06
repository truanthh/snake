import { Snake } from "./snake";
import { Grid } from "./grid";
import { getSettings, setSettings } from "./settings";

const gridDOM = document.getElementById("grid__container");
const bodyDOM = document.querySelector("body");
const scoreDOM = document.getElementById("score");
const messageDOM = document.getElementById("message");
bodyDOM!.addEventListener("keydown", setMoveDirection);

const gridSizeInput = document.getElementById(
  "gridSizeSlider",
) as HTMLInputElement;
const cellSizeInput = document.getElementById(
  "cellSizeSlider",
) as HTMLInputElement;
const gameSpeedInput = document.getElementById(
  "gameSpeedSlider",
) as HTMLInputElement;
const gridSizeSliderValue = document.getElementById(
  "gridSizeSliderValue",
) as HTMLElement;
const cellSizeSliderValue = document.getElementById(
  "cellSizeSliderValue",
) as HTMLElement;
const gameSpeedSliderValue = document.getElementById(
  "gameSpeedSliderValue",
) as HTMLElement;
const startGameButton = document.getElementById(
  "startGameButton",
) as HTMLButtonElement;

for (let el of [gridSizeInput, cellSizeInput, bodyDOM!]) {
  el.addEventListener("keydown", (e: any) => {
    // console.log(e.code);
    if (e.code === "ArrowDown" || e.code === "ArrowUp") {
      e.preventDefault();
    }
  });
}

gridSizeInput.oninput = function () {
  gridSizeSliderValue.innerText = gridSizeInput.value;
};

cellSizeInput.oninput = function () {
  cellSizeSliderValue.innerText = cellSizeInput.value;
};

gameSpeedInput.oninput = function () {
  gameSpeedSliderValue.innerText = gameSpeedInput.value;
};

startGameButton.addEventListener("click", () => {
  settings = {
    gridSize: parseInt(gridSizeInput.value),
    cellSize: parseInt(cellSizeInput.value),
    gameSpeed: parseInt(gameSpeedInput.value),
  };
  setSettings(settings);
  createGame(settings);
});

let grid: any;
let snake: any;
let render: any;

let settings = getSettings();

gridSizeInput.value = settings.gridSize.toString();
cellSizeInput.value = settings.cellSize.toString();
gameSpeedInput.value = settings.gameSpeed.toString();
gridSizeSliderValue.innerText = settings.gridSize.toString();
cellSizeSliderValue.innerText = settings.cellSize.toString();
gameSpeedSliderValue.innerText = settings.gameSpeed.toString();
gridSizeInput.min = "8";
gridSizeInput.max = "20";
cellSizeInput.min = "16";
cellSizeInput.max = "60";
gameSpeedInput.min = "20";
gameSpeedInput.max = "120";

createGame(settings);

function update(gameSpeed: number) {
  return setInterval(() => {
    grid.spawnFood();
    let newPos = snake.getNextPosition();
    if (JSON.stringify(newPos) === JSON.stringify(snake.getBody())) {
      snake.moveDir *= -1;
      newPos = snake.getNextPosition();
    }
    grid.setValue(snake.arr.shift()!, 0);
    if (grid.getValue(newPos) === 1) {
      stopGame();
      return;
    }
    if (grid.getValue(newPos) === 2) {
      snake.arr.push(newPos);
      grid.isFoodSpawned = false;
    }
    snake.arr.push(newPos);
    for (const vec of snake.arr) {
      grid.setValue(vec, 1);
    }
    grid.render(gridDOM, "grid__cell_empty");
    updateScore(scoreDOM!);
  }, gameSpeed);
}

function createGame(settings: any) {
  clearInterval(render);
  document.documentElement.style.setProperty(
    "--gridSize",
    `${settings.gridSize}`,
  );
  document.documentElement.style.setProperty(
    "--cellSize",
    `${settings.cellSize}px`,
  );
  grid = new Grid(settings.gridSize);
  snake = new Snake(grid);
  render = update(settings.gameSpeed);
}

function stopGame() {
  clearInterval(render);
  grid.render(gridDOM, "grid__cell_gray");
  messageDOM!.innerText = `Game Over! Press F5 to restart.`;
}

function setMoveDirection(e: any) {
  // up
  if (e.code === "KeyK" || e.code === "ArrowUp") {
    snake.moveDir = 2;
    return;
  }
  // right
  if (e.code === "KeyL" || e.code === "ArrowRight") {
    snake.moveDir = 1;
    return;
  }
  // down
  if (e.code === "KeyJ" || e.code === "ArrowDown") {
    snake.moveDir = -2;
    return;
  }
  // left
  if (e.code === "KeyH" || e.code === "ArrowLeft") {
    snake.moveDir = -1;
    return;
  }
}

function updateScore(scoreDOM: HTMLElement) {
  scoreDOM.innerText = `Score: ${snake.getLength().toString()}`;
}
