"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
class Grid {
    constructor(size) {
        this.size = size;
        this.arr = this.init(size);
        this.isFoodSpawned = false;
    }
    getSize() {
        return this.size;
    }
    init(size) {
        const arr = [];
        for (let i = 0; i < size; i++) {
            arr[i] = new Array(size).fill(0);
        }
        return arr;
    }
    getValue(point) {
        if (point.x < this.arr.length &&
            point.y < this.arr.length &&
            point.x >= 0 &&
            point.y >= 0) {
            return this.arr[point.y][point.x];
        }
    }
    setValue(point, value) {
        if (point.x < this.arr.length &&
            point.y < this.arr.length &&
            point.x >= 0 &&
            point.y >= 0) {
            this.arr[point.y][point.x] = value;
        }
    }
    /**
     * @param rendering xd
     */
    render(gridDOM, emptyCell) {
        gridDOM.innerHTML = "";
        for (let r = 0; r < this.arr.length; r++) {
            for (let c = 0; c < this.arr.length; c++) {
                const div = document.createElement("div");
                if (this.arr[r][c] === 0) {
                    div.className = emptyCell;
                }
                else if (this.arr[r][c] === 2) {
                    div.className = "grid__cell_food";
                }
                else {
                    div.className = "grid__cell_full";
                }
                gridDOM.appendChild(div);
            }
        }
        // displayDOM.innerText = `score: ${score}`;
    }
    spawnFood() {
        if (!this.isFoodSpawned) {
            const emptyCells = [];
            for (let x = 0; x < this.arr.length; x++) {
                for (let y = 0; y < this.arr.length; y++) {
                    if (this.arr[x][y] === 0) {
                        emptyCells.push({ x: x, y: y });
                    }
                }
            }
            if (emptyCells.length > 0) {
                const idx = Math.floor(Math.random() * (emptyCells.length - 1));
                const rand = emptyCells[idx];
                this.arr[rand.x][rand.y] = 2;
                this.isFoodSpawned = true;
            }
        }
    }
}
exports.Grid = Grid;
