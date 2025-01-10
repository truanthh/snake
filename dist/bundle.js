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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Grid = void 0;\nclass Grid {\n    constructor(size) {\n        this.size = size;\n        this.arr = this.init(size);\n        this.isFoodSpawned = false;\n    }\n    getSize() {\n        return this.size;\n    }\n    init(size) {\n        const arr = [];\n        for (let i = 0; i < size; i++) {\n            arr[i] = new Array(size).fill(0);\n        }\n        return arr;\n    }\n    getValue(point) {\n        if (point.x < this.arr.length &&\n            point.y < this.arr.length &&\n            point.x >= 0 &&\n            point.y >= 0) {\n            return this.arr[point.y][point.x];\n        }\n    }\n    setValue(point, value) {\n        if (point.x < this.arr.length &&\n            point.y < this.arr.length &&\n            point.x >= 0 &&\n            point.y >= 0) {\n            this.arr[point.y][point.x] = value;\n        }\n    }\n    /**\n     * @param rendering xd\n     */\n    render(gridDOM, emptyCell) {\n        gridDOM.innerHTML = \"\";\n        for (let r = 0; r < this.arr.length; r++) {\n            for (let c = 0; c < this.arr.length; c++) {\n                const div = document.createElement(\"div\");\n                if (this.arr[r][c] === 0) {\n                    div.className = emptyCell;\n                }\n                else if (this.arr[r][c] === 2) {\n                    div.className = \"grid__cell_food\";\n                }\n                else {\n                    div.className = \"grid__cell_full\";\n                }\n                gridDOM.appendChild(div);\n            }\n        }\n        // displayDOM.innerText = `score: ${score}`;\n    }\n    spawnFood() {\n        if (!this.isFoodSpawned) {\n            const emptyCells = [];\n            for (let x = 0; x < this.arr.length; x++) {\n                for (let y = 0; y < this.arr.length; y++) {\n                    if (this.arr[x][y] === 0) {\n                        emptyCells.push({ x: x, y: y });\n                    }\n                }\n            }\n            if (emptyCells.length > 0) {\n                const idx = Math.floor(Math.random() * (emptyCells.length - 1));\n                const rand = emptyCells[idx];\n                this.arr[rand.x][rand.y] = 2;\n                this.isFoodSpawned = true;\n            }\n        }\n    }\n}\nexports.Grid = Grid;\n\n\n//# sourceURL=webpack:///./dist/grid.js?");

/***/ }),

/***/ "./dist/index.js":
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst snake_1 = __webpack_require__(/*! ./snake */ \"./dist/snake.js\");\nconst grid_1 = __webpack_require__(/*! ./grid */ \"./dist/grid.js\");\nconst settings_1 = __webpack_require__(/*! ./settings */ \"./dist/settings.js\");\nconst gridDOM = document.getElementById(\"grid__container\");\nconst bodyDOM = document.querySelector(\"body\");\nconst scoreDOM = document.getElementById(\"score\");\nconst messageDOM = document.getElementById(\"message\");\nbodyDOM.addEventListener(\"keydown\", setMoveDirection);\nconst gridSizeInput = document.getElementById(\"gridSizeSlider\");\nconst cellSizeInput = document.getElementById(\"cellSizeSlider\");\nconst gameSpeedInput = document.getElementById(\"gameSpeedSlider\");\nconst gridSizeSliderValue = document.getElementById(\"gridSizeSliderValue\");\nconst cellSizeSliderValue = document.getElementById(\"cellSizeSliderValue\");\nconst gameSpeedSliderValue = document.getElementById(\"gameSpeedSliderValue\");\nconst startGameButton = document.getElementById(\"startGameButton\");\nfor (let el of [gridSizeInput, cellSizeInput, bodyDOM]) {\n    el.addEventListener(\"keydown\", (e) => {\n        // console.log(e.code);\n        if (e.code === \"ArrowDown\" || e.code === \"ArrowUp\") {\n            e.preventDefault();\n        }\n    });\n}\ngridSizeInput.oninput = function () {\n    gridSizeSliderValue.innerText = gridSizeInput.value;\n};\ncellSizeInput.oninput = function () {\n    cellSizeSliderValue.innerText = cellSizeInput.value;\n};\ngameSpeedInput.oninput = function () {\n    gameSpeedSliderValue.innerText = gameSpeedInput.value;\n};\n// to revert input value so max speed is to the right of the bar\nstartGameButton.addEventListener(\"click\", () => {\n    settings = {\n        gridSize: parseInt(gridSizeInput.value),\n        cellSize: parseInt(cellSizeInput.value),\n        gameSpeed: parseInt(gameSpeedInput.value),\n    };\n    (0, settings_1.setSettings)(settings);\n    createGame(settings);\n});\nlet grid;\nlet snake;\nlet render;\nlet settings = (0, settings_1.getSettings)();\ngridSizeInput.value = settings.gridSize.toString();\ncellSizeInput.value = settings.cellSize.toString();\ngameSpeedInput.value = (140 - settings.gameSpeed).toString();\ngridSizeSliderValue.innerText = settings.gridSize.toString();\ncellSizeSliderValue.innerText = settings.cellSize.toString();\ngameSpeedSliderValue.innerText = (140 - settings.gameSpeed).toString();\ngridSizeInput.min = \"8\";\ngridSizeInput.max = \"20\";\ncellSizeInput.min = \"16\";\ncellSizeInput.max = \"60\";\ngameSpeedInput.min = \"20\";\ngameSpeedInput.max = \"120\";\ncreateGame(settings);\nfunction update(gameSpeed) {\n    return setInterval(() => {\n        grid.spawnFood();\n        let newPos = snake.getNextPosition();\n        if (JSON.stringify(newPos) === JSON.stringify(snake.getBody())) {\n            snake.moveDir *= -1;\n            newPos = snake.getNextPosition();\n        }\n        if (grid.getValue(newPos) === 1) {\n            stopGame();\n            return;\n        }\n        grid.setValue(snake.arr.shift(), 0);\n        if (grid.getValue(newPos) === 2) {\n            snake.arr.push(newPos);\n            grid.isFoodSpawned = false;\n        }\n        snake.arr.push(newPos);\n        for (const vec of snake.arr) {\n            grid.setValue(vec, 1);\n        }\n        grid.render(gridDOM, \"grid__cell_empty\");\n        updateScore(scoreDOM);\n    }, gameSpeed);\n}\nfunction createGame(settings) {\n    clearInterval(render);\n    document.documentElement.style.setProperty(\"--gridSize\", `${settings.gridSize}`);\n    document.documentElement.style.setProperty(\"--cellSize\", `${settings.cellSize}px`);\n    grid = new grid_1.Grid(settings.gridSize);\n    snake = new snake_1.Snake(grid);\n    render = update(140 - settings.gameSpeed);\n}\nfunction stopGame() {\n    clearInterval(render);\n    grid.render(gridDOM, \"grid__cell_gray\");\n    messageDOM.innerText = `Game Over! Press F5 to restart.`;\n}\nfunction setMoveDirection(e) {\n    // up\n    if (e.code === \"KeyK\" || e.code === \"ArrowUp\") {\n        snake.moveDir = 2;\n        return;\n    }\n    // right\n    if (e.code === \"KeyL\" || e.code === \"ArrowRight\") {\n        snake.moveDir = 1;\n        return;\n    }\n    // down\n    if (e.code === \"KeyJ\" || e.code === \"ArrowDown\") {\n        snake.moveDir = -2;\n        return;\n    }\n    // left\n    if (e.code === \"KeyH\" || e.code === \"ArrowLeft\") {\n        snake.moveDir = -1;\n        return;\n    }\n}\nfunction updateScore(scoreDOM) {\n    scoreDOM.innerText = `Score: ${snake.getLength().toString()}`;\n}\n\n\n//# sourceURL=webpack:///./dist/index.js?");

/***/ }),

/***/ "./dist/settings.js":
/*!**************************!*\
  !*** ./dist/settings.js ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getSettings = getSettings;\nexports.setSettings = setSettings;\nconst GRID_SIZE_DEFAULT = 12;\nconst CELL_SIZE_DEFAULT = 40;\nconst GAME_SPEED_DEFAULT = 60;\nfunction getSettings() {\n    let s = localStorage.getItem(\"settings\");\n    let settings = s !== null\n        ? JSON.parse(s)\n        : {\n            gridSize: GRID_SIZE_DEFAULT,\n            cellSize: CELL_SIZE_DEFAULT,\n            gameSpeed: GAME_SPEED_DEFAULT,\n        };\n    return settings;\n}\n/**\n * @param settings - {gridSize, cellSize, gameSpeed}\n */\nfunction setSettings(settings) {\n    localStorage.setItem(\"settings\", JSON.stringify(settings));\n}\n\n\n//# sourceURL=webpack:///./dist/settings.js?");

/***/ }),

/***/ "./dist/snake.js":
/*!***********************!*\
  !*** ./dist/snake.js ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Snake = void 0;\nconst vec2_1 = __webpack_require__(/*! ./vec2 */ \"./dist/vec2.js\");\nclass Snake {\n    constructor(grid) {\n        this.moveDir = 1;\n        // this.arr = arr;\n        this.arr = [new vec2_1.Vec2(3, 1), new vec2_1.Vec2(4, 1), new vec2_1.Vec2(5, 1)];\n        this.grid = grid;\n        for (const vec of this.arr) {\n            this.grid.setValue(vec, 1);\n        }\n    }\n    getHead() {\n        return this.arr[this.arr.length - 1];\n    }\n    getBody() {\n        return this.arr[this.arr.length - 2];\n    }\n    getLength() {\n        return this.arr.length;\n    }\n    // setHead(point: Vec2) {\n    //   this.arr[this.arr.length - 1] = point; }\n    getNextPosition() {\n        if (this.moveDir === 1) {\n            let x = this.getHead().x + 1;\n            if (x >= this.grid.getSize())\n                return new vec2_1.Vec2(0, this.getHead().y);\n            else\n                return new vec2_1.Vec2(x, this.getHead().y);\n        }\n        if (this.moveDir === -1) {\n            let x = this.getHead().x - 1;\n            if (x < 0)\n                return new vec2_1.Vec2(this.grid.getSize() - 1, this.getHead().y);\n            else\n                return new vec2_1.Vec2(x, this.getHead().y);\n        }\n        if (this.moveDir === 2) {\n            let y = this.getHead().y - 1;\n            if (y < 0)\n                return new vec2_1.Vec2(this.getHead().x, this.grid.getSize() - 1);\n            else\n                return new vec2_1.Vec2(this.getHead().x, y);\n        }\n        if (this.moveDir === -2) {\n            let y = this.getHead().y + 1;\n            if (y >= this.grid.getSize())\n                return new vec2_1.Vec2(this.getHead().x, 0);\n            else\n                return new vec2_1.Vec2(this.getHead().x, y);\n        }\n    }\n}\nexports.Snake = Snake;\n\n\n//# sourceURL=webpack:///./dist/snake.js?");

/***/ }),

/***/ "./dist/vec2.js":
/*!**********************!*\
  !*** ./dist/vec2.js ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Vec2 = void 0;\nclass Vec2 {\n    constructor(x, y) {\n        this.x = x;\n        this.y = y;\n    }\n}\nexports.Vec2 = Vec2;\n\n\n//# sourceURL=webpack:///./dist/vec2.js?");

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