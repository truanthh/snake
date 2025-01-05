// class Snake {
//   arr: Vec2[];
//   moveDir: number = 1;
//   grid: Vec2[][];
//
//   constructor(arr: Vec2[], grid: Vec2[][]) {
//     this.arr = arr;
//     this.grid = grid;
//   }
//
//   private getHead() {
//     return this.arr[this.arr.length - 1];
//   }
//
//   getBody() {
//     return this.arr[this.arr.length - 2];
//   }
//
//   setHead(point: Vec2) {
//     this.arr[this.arr.length - 1] = point;
//   }
//
//   getNextPosition(): any {
//     if (this.moveDir === 1) {
//       let x = this.getHead().x + 1;
//       if (x >= this.grid.getSize()) return new Vec2(0, this.getHead().y);
//       else return new Vec2(x, this.getHead().y);
//     }
//     if (this.moveDir === -1) {
//       let x = this.getHead().x - 1;
//       if (x < 0) return new Vec2(this.grid.getSize() - 1, this.getHead().y);
//       else return new Vec2(x, this.getHead().y);
//     }
//     if (this.moveDir === 2) {
//       let y = this.getHead().y - 1;
//       if (y < 0) return new Vec2(this.getHead().x, this.grid.getSize() - 1);
//       else return new Vec2(this.getHead().x, y);
//     }
//     if (this.moveDir === -2) {
//       let y = this.getHead().y + 1;
//       if (y >= this.grid.getSize()) return new Vec2(this.getHead().x, 0);
//       else return new Vec2(this.getHead().x, y);
//     }
//   }
// }
