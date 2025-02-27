/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/grid.js":
/*!**********************!*\
  !*** ./dist/grid.js ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Grid = void 0;\r\nclass Grid {\r\n    constructor(size) {\r\n        this.size = size;\r\n        this.arr = this.init(size);\r\n        this.isFoodSpawned = false;\r\n    }\r\n    getSize() {\r\n        return this.size;\r\n    }\r\n    init(size) {\r\n        const arr = [];\r\n        for (let i = 0; i < size; i++) {\r\n            arr[i] = new Array(size).fill(0);\r\n        }\r\n        return arr;\r\n    }\r\n    getValue(point) {\r\n        if (point.x < this.arr.length &&\r\n            point.y < this.arr.length &&\r\n            point.x >= 0 &&\r\n            point.y >= 0) {\r\n            return this.arr[point.y][point.x];\r\n        }\r\n    }\r\n    setValue(point, value) {\r\n        if (point.x < this.arr.length &&\r\n            point.y < this.arr.length &&\r\n            point.x >= 0 &&\r\n            point.y >= 0) {\r\n            this.arr[point.y][point.x] = value;\r\n        }\r\n    }\r\n    /**\r\n     * @param rendering xd\r\n     */\r\n    render(gridDOM, emptyCell) {\r\n        gridDOM.innerHTML = \"\";\r\n        for (let r = 0; r < this.arr.length; r++) {\r\n            for (let c = 0; c < this.arr.length; c++) {\r\n                const div = document.createElement(\"div\");\r\n                if (this.arr[r][c] === 0) {\r\n                    div.className = emptyCell;\r\n                }\r\n                else if (this.arr[r][c] === 2) {\r\n                    div.className = \"grid__cell_food\";\r\n                }\r\n                else {\r\n                    div.className = \"grid__cell_full\";\r\n                }\r\n                gridDOM.appendChild(div);\r\n            }\r\n        }\r\n        // displayDOM.innerText = `score: ${score}`;\r\n    }\r\n    spawnFood() {\r\n        if (!this.isFoodSpawned) {\r\n            const emptyCells = [];\r\n            for (let x = 0; x < this.arr.length; x++) {\r\n                for (let y = 0; y < this.arr.length; y++) {\r\n                    if (this.arr[x][y] === 0) {\r\n                        emptyCells.push({ x: x, y: y });\r\n                    }\r\n                }\r\n            }\r\n            if (emptyCells.length > 0) {\r\n                const idx = Math.floor(Math.random() * (emptyCells.length - 1));\r\n                const rand = emptyCells[idx];\r\n                this.arr[rand.x][rand.y] = 2;\r\n                this.isFoodSpawned = true;\r\n            }\r\n        }\r\n    }\r\n}\r\nexports.Grid = Grid;\r\n\n\n//# sourceURL=webpack:///./dist/grid.js?");

/***/ }),

/***/ "./dist/index.js":
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst snake_1 = __webpack_require__(/*! ./snake */ \"./dist/snake.js\");\r\nconst grid_1 = __webpack_require__(/*! ./grid */ \"./dist/grid.js\");\r\nconst settings_1 = __webpack_require__(/*! ./settings */ \"./dist/settings.js\");\r\nconst gridDOM = document.getElementById(\"grid__container\");\r\nconst bodyDOM = document.querySelector(\"body\");\r\nconst scoreDOM = document.getElementById(\"score\");\r\nconst messageDOM = document.getElementById(\"message\");\r\nbodyDOM.addEventListener(\"keydown\", setMoveDirection);\r\nconst gridSizeInput = document.getElementById(\"gridSizeSlider\");\r\nconst cellSizeInput = document.getElementById(\"cellSizeSlider\");\r\nconst gameSpeedInput = document.getElementById(\"gameSpeedSlider\");\r\nconst gridSizeSliderValue = document.getElementById(\"gridSizeSliderValue\");\r\nconst cellSizeSliderValue = document.getElementById(\"cellSizeSliderValue\");\r\nconst gameSpeedSliderValue = document.getElementById(\"gameSpeedSliderValue\");\r\nconst startGameButton = document.getElementById(\"startGameButton\");\r\nfor (let el of [gridSizeInput, cellSizeInput, bodyDOM]) {\r\n    el.addEventListener(\"keydown\", (e) => {\r\n        // console.log(e.code);\r\n        if (e.code === \"ArrowDown\" || e.code === \"ArrowUp\") {\r\n            e.preventDefault();\r\n        }\r\n    });\r\n}\r\ngridSizeInput.oninput = function () {\r\n    gridSizeSliderValue.innerText = gridSizeInput.value;\r\n};\r\ncellSizeInput.oninput = function () {\r\n    cellSizeSliderValue.innerText = cellSizeInput.value;\r\n};\r\ngameSpeedInput.oninput = function () {\r\n    gameSpeedSliderValue.innerText = gameSpeedInput.value;\r\n};\r\nstartGameButton.addEventListener(\"click\", () => {\r\n    settings = {\r\n        gridSize: parseInt(gridSizeInput.value),\r\n        cellSize: parseInt(cellSizeInput.value),\r\n        gameSpeed: parseInt(gameSpeedInput.value),\r\n    };\r\n    (0, settings_1.setSettings)(settings);\r\n    createGame(settings);\r\n});\r\nlet grid;\r\nlet snake;\r\nlet render;\r\nlet settings = (0, settings_1.getSettings)();\r\ngridSizeInput.value = settings.gridSize.toString();\r\ncellSizeInput.value = settings.cellSize.toString();\r\ngameSpeedInput.value = settings.gameSpeed.toString();\r\ngridSizeSliderValue.innerText = settings.gridSize.toString();\r\ncellSizeSliderValue.innerText = settings.cellSize.toString();\r\ngameSpeedSliderValue.innerText = settings.gameSpeed.toString();\r\ngridSizeInput.min = \"8\";\r\ngridSizeInput.max = \"20\";\r\ncellSizeInput.min = \"16\";\r\ncellSizeInput.max = \"60\";\r\ngameSpeedInput.min = \"20\";\r\ngameSpeedInput.max = \"120\";\r\ncreateGame(settings);\r\nfunction update(gameSpeed) {\r\n    return setInterval(() => {\r\n        grid.spawnFood();\r\n        let newPos = snake.getNextPosition();\r\n        if (JSON.stringify(newPos) === JSON.stringify(snake.getBody())) {\r\n            snake.moveDir *= -1;\r\n            newPos = snake.getNextPosition();\r\n        }\r\n        if (grid.getValue(newPos) === 1) {\r\n            stopGame();\r\n            return;\r\n        }\r\n        grid.setValue(snake.arr.shift(), 0);\r\n        if (grid.getValue(newPos) === 2) {\r\n            snake.arr.push(newPos);\r\n            grid.isFoodSpawned = false;\r\n        }\r\n        snake.arr.push(newPos);\r\n        for (const vec of snake.arr) {\r\n            grid.setValue(vec, 1);\r\n        }\r\n        grid.render(gridDOM, \"grid__cell_empty\");\r\n        updateScore(scoreDOM);\r\n    }, gameSpeed);\r\n}\r\nfunction createGame(settings) {\r\n    clearInterval(render);\r\n    document.documentElement.style.setProperty(\"--gridSize\", `${settings.gridSize}`);\r\n    document.documentElement.style.setProperty(\"--cellSize\", `${settings.cellSize}px`);\r\n    grid = new grid_1.Grid(settings.gridSize);\r\n    snake = new snake_1.Snake(grid);\r\n    render = update(140 - settings.gameSpeed);\r\n}\r\nfunction stopGame() {\r\n    clearInterval(render);\r\n    grid.render(gridDOM, \"grid__cell_gray\");\r\n    messageDOM.innerText = `Game Over! Press F5 to restart.`;\r\n}\r\nfunction setMoveDirection(e) {\r\n    // up\r\n    if (e.code === \"KeyK\" || e.code === \"ArrowUp\" || e.code === \"KeyW\") {\r\n        snake.moveDir = 2;\r\n        return;\r\n    }\r\n    // right\r\n    if (e.code === \"KeyL\" || e.code === \"ArrowRight\" || e.code === \"KeyD\") {\r\n        snake.moveDir = 1;\r\n        return;\r\n    }\r\n    // down\r\n    if (e.code === \"KeyJ\" || e.code === \"ArrowDown\" || e.code === \"KeyS\") {\r\n        snake.moveDir = -2;\r\n        return;\r\n    }\r\n    // left\r\n    if (e.code === \"KeyH\" || e.code === \"ArrowLeft\" || e.code === \"KeyA\") {\r\n        snake.moveDir = -1;\r\n        return;\r\n    }\r\n}\r\nfunction updateScore(scoreDOM) {\r\n    scoreDOM.innerText = `Score: ${snake.getLength().toString()}`;\r\n}\r\n\n\n//# sourceURL=webpack:///./dist/index.js?");

/***/ }),

/***/ "./dist/settings.js":
/*!**************************!*\
  !*** ./dist/settings.js ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.setSettings = exports.getSettings = void 0;\r\nconst GRID_SIZE_DEFAULT = 12;\r\nconst CELL_SIZE_DEFAULT = 40;\r\nconst GAME_SPEED_DEFAULT = 100;\r\nfunction getSettings() {\r\n    let s = localStorage.getItem(\"settings\");\r\n    let settings = s !== null\r\n        ? JSON.parse(s)\r\n        : {\r\n            gridSize: GRID_SIZE_DEFAULT,\r\n            cellSize: CELL_SIZE_DEFAULT,\r\n            gameSpeed: GAME_SPEED_DEFAULT,\r\n        };\r\n    return settings;\r\n}\r\nexports.getSettings = getSettings;\r\n/**\r\n * @param settings - {gridSize, cellSize, gameSpeed}\r\n */\r\nfunction setSettings(settings) {\r\n    localStorage.setItem(\"settings\", JSON.stringify(settings));\r\n}\r\nexports.setSettings = setSettings;\r\n\n\n//# sourceURL=webpack:///./dist/settings.js?");

/***/ }),

/***/ "./dist/snake.js":
/*!***********************!*\
  !*** ./dist/snake.js ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Snake = void 0;\r\nconst vec2_1 = __webpack_require__(/*! ./vec2 */ \"./dist/vec2.js\");\r\nclass Snake {\r\n    constructor(grid) {\r\n        this.moveDir = 1;\r\n        // this.arr = arr;\r\n        this.arr = [new vec2_1.Vec2(3, 1), new vec2_1.Vec2(4, 1), new vec2_1.Vec2(5, 1)];\r\n        this.grid = grid;\r\n        for (const vec of this.arr) {\r\n            this.grid.setValue(vec, 1);\r\n        }\r\n    }\r\n    getHead() {\r\n        return this.arr[this.arr.length - 1];\r\n    }\r\n    getBody() {\r\n        return this.arr[this.arr.length - 2];\r\n    }\r\n    getLength() {\r\n        return this.arr.length;\r\n    }\r\n    // setHead(point: Vec2) {\r\n    //   this.arr[this.arr.length - 1] = point; }\r\n    getNextPosition() {\r\n        if (this.moveDir === 1) {\r\n            let x = this.getHead().x + 1;\r\n            if (x >= this.grid.getSize())\r\n                return new vec2_1.Vec2(0, this.getHead().y);\r\n            else\r\n                return new vec2_1.Vec2(x, this.getHead().y);\r\n        }\r\n        if (this.moveDir === -1) {\r\n            let x = this.getHead().x - 1;\r\n            if (x < 0)\r\n                return new vec2_1.Vec2(this.grid.getSize() - 1, this.getHead().y);\r\n            else\r\n                return new vec2_1.Vec2(x, this.getHead().y);\r\n        }\r\n        if (this.moveDir === 2) {\r\n            let y = this.getHead().y - 1;\r\n            if (y < 0)\r\n                return new vec2_1.Vec2(this.getHead().x, this.grid.getSize() - 1);\r\n            else\r\n                return new vec2_1.Vec2(this.getHead().x, y);\r\n        }\r\n        if (this.moveDir === -2) {\r\n            let y = this.getHead().y + 1;\r\n            if (y >= this.grid.getSize())\r\n                return new vec2_1.Vec2(this.getHead().x, 0);\r\n            else\r\n                return new vec2_1.Vec2(this.getHead().x, y);\r\n        }\r\n    }\r\n}\r\nexports.Snake = Snake;\r\n\n\n//# sourceURL=webpack:///./dist/snake.js?");

/***/ }),

/***/ "./dist/vec2.js":
/*!**********************!*\
  !*** ./dist/vec2.js ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Vec2 = void 0;\r\nclass Vec2 {\r\n    constructor(x, y) {\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n}\r\nexports.Vec2 = Vec2;\r\n\n\n//# sourceURL=webpack:///./dist/vec2.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./dist/index.js");
/******/ 	
/******/ })()
;