import { Vec2 } from "./vec2";
import type { Grid } from "./grid";

export class Snake {
  public arr: Vec2[];
  public moveDir: number = 1;
  public grid: Grid;

  constructor(grid: Grid) {
    // this.arr = arr;
    this.arr = [new Vec2(3, 1), new Vec2(4, 1), new Vec2(5, 1)];
    this.grid = grid;

    for (const vec of this.arr) {
      this.grid.setValue(vec, 1);
    }
  }

  public getHead(): Vec2 {
    return this.arr[this.arr.length - 1];
  }

  public getBody(): Vec2 {
    return this.arr[this.arr.length - 2];
  }

  public getLength(): number {
    return this.arr.length;
  }

  // setHead(point: Vec2) {
  //   this.arr[this.arr.length - 1] = point; }

  getNextPosition(): any {
    if (this.moveDir === 1) {
      let x = this.getHead().x + 1;
      if (x >= this.grid.getSize()) return new Vec2(0, this.getHead().y);
      else return new Vec2(x, this.getHead().y);
    }
    if (this.moveDir === -1) {
      let x = this.getHead().x - 1;
      if (x < 0) return new Vec2(this.grid.getSize() - 1, this.getHead().y);
      else return new Vec2(x, this.getHead().y);
    }
    if (this.moveDir === 2) {
      let y = this.getHead().y - 1;
      if (y < 0) return new Vec2(this.getHead().x, this.grid.getSize() - 1);
      else return new Vec2(this.getHead().x, y);
    }
    if (this.moveDir === -2) {
      let y = this.getHead().y + 1;
      if (y >= this.grid.getSize()) return new Vec2(this.getHead().x, 0);
      else return new Vec2(this.getHead().x, y);
    }
  }
}
