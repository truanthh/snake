"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const snake_1 = require("./snake");
const grid_1 = require("./grid");
const settings_1 = require("./settings");
const gridDOM = document.getElementById("grid__container");
const bodyDOM = document.querySelector("body");
const scoreDOM = document.getElementById("score");
const messageDOM = document.getElementById("message");
bodyDOM.addEventListener("keydown", setMoveDirection);
const gridSizeInput = document.getElementById("gridSizeSlider");
const cellSizeInput = document.getElementById("cellSizeSlider");
const gameSpeedInput = document.getElementById("gameSpeedSlider");
const gridSizeSliderValue = document.getElementById("gridSizeSliderValue");
const cellSizeSliderValue = document.getElementById("cellSizeSliderValue");
const gameSpeedSliderValue = document.getElementById("gameSpeedSliderValue");
const startGameButton = document.getElementById("startGameButton");
for (let el of [gridSizeInput, cellSizeInput, bodyDOM]) {
    el.addEventListener("keydown", (e) => {
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
        // to revert input value so max speed is to the right of the bar
        gameSpeed: 140 - parseInt(gameSpeedInput.value),
    };
    (0, settings_1.setSettings)(settings);
    createGame(settings);
});
let grid;
let snake;
let render;
let settings = (0, settings_1.getSettings)();
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
function update(gameSpeed) {
    return setInterval(() => {
        grid.spawnFood();
        let newPos = snake.getNextPosition();
        if (JSON.stringify(newPos) === JSON.stringify(snake.getBody())) {
            snake.moveDir *= -1;
            newPos = snake.getNextPosition();
        }
        if (grid.getValue(newPos) === 1) {
            stopGame();
            return;
        }
        grid.setValue(snake.arr.shift(), 0);
        if (grid.getValue(newPos) === 2) {
            snake.arr.push(newPos);
            grid.isFoodSpawned = false;
        }
        snake.arr.push(newPos);
        for (const vec of snake.arr) {
            grid.setValue(vec, 1);
        }
        grid.render(gridDOM, "grid__cell_empty");
        updateScore(scoreDOM);
    }, gameSpeed);
}
function createGame(settings) {
    clearInterval(render);
    document.documentElement.style.setProperty("--gridSize", `${settings.gridSize}`);
    document.documentElement.style.setProperty("--cellSize", `${settings.cellSize}px`);
    grid = new grid_1.Grid(settings.gridSize);
    snake = new snake_1.Snake(grid);
    render = update(settings.gameSpeed);
}
function stopGame() {
    clearInterval(render);
    grid.render(gridDOM, "grid__cell_gray");
    messageDOM.innerText = `Game Over! Press F5 to restart.`;
}
function setMoveDirection(e) {
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
function updateScore(scoreDOM) {
    scoreDOM.innerText = `Score: ${snake.getLength().toString()}`;
}
