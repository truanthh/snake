"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snake = void 0;
const vec2_1 = require("./vec2");
class Snake {
    constructor(grid) {
        this.moveDir = 1;
        // this.arr = arr;
        this.arr = [new vec2_1.Vec2(3, 1), new vec2_1.Vec2(4, 1), new vec2_1.Vec2(5, 1)];
        this.grid = grid;
        for (const vec of this.arr) {
            this.grid.setValue(vec, 1);
        }
    }
    getHead() {
        return this.arr[this.arr.length - 1];
    }
    getBody() {
        return this.arr[this.arr.length - 2];
    }
    getLength() {
        return this.arr.length;
    }
    // setHead(point: Vec2) {
    //   this.arr[this.arr.length - 1] = point; }
    getNextPosition() {
        if (this.moveDir === 1) {
            let x = this.getHead().x + 1;
            if (x >= this.grid.getSize())
                return new vec2_1.Vec2(0, this.getHead().y);
            else
                return new vec2_1.Vec2(x, this.getHead().y);
        }
        if (this.moveDir === -1) {
            let x = this.getHead().x - 1;
            if (x < 0)
                return new vec2_1.Vec2(this.grid.getSize() - 1, this.getHead().y);
            else
                return new vec2_1.Vec2(x, this.getHead().y);
        }
        if (this.moveDir === 2) {
            let y = this.getHead().y - 1;
            if (y < 0)
                return new vec2_1.Vec2(this.getHead().x, this.grid.getSize() - 1);
            else
                return new vec2_1.Vec2(this.getHead().x, y);
        }
        if (this.moveDir === -2) {
            let y = this.getHead().y + 1;
            if (y >= this.grid.getSize())
                return new vec2_1.Vec2(this.getHead().x, 0);
            else
                return new vec2_1.Vec2(this.getHead().x, y);
        }
    }
}
exports.Snake = Snake;
