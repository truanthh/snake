const gridDOM = document.getElementById("grid__container");
const bodyDOM = document.querySelector("body");
const displayDOM = document.getElementById("display");
bodyDOM.addEventListener("keydown", setMoveDirection);

// if you want to set different gridsize
// you need to change gridSize in css too
const gridSize: number = 12;

let isGameRunning: boolean = false;
let isFoodSpawned: boolean = false;
let score: number = 3;

class Vec2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Grid {
  private size: number;
  private arr: number[][];

  constructor(size: number) {
    this.size = size;
    this.arr = this.init(size);
  }

  public getSize() {
    return this.size;
  }

  private init(size: number): number[][] {
    const arr = [];

    for (let i = 0; i < size; i++) {
      arr[i] = new Array(size).fill(0);
    }

    return arr;
  }

  public getValue(point: Vec2): any {
    if (
      point.x < this.arr.length &&
      point.y < this.arr.length &&
      point.x >= 0 &&
      point.y >= 0
    ) {
      return this.arr[point.y][point.x];
    }
  }

  public setValue(point: Vec2, value: number): any {
    if (
      point.x < this.arr.length &&
      point.y < this.arr.length &&
      point.x >= 0 &&
      point.y >= 0
    ) {
      this.arr[point.y][point.x] = value;
    }
  }

  public render(gridDOM: any, emptyCell: string): any {
    gridDOM.innerHTML = "";
    for (let r = 0; r < this.arr.length; r++) {
      for (let c = 0; c < this.arr.length; c++) {
        const div = document.createElement("div");
        if (this.arr[r][c] === 0) {
          div.className = emptyCell;
        } else if (this.arr[r][c] === 2) {
          div.className = "grid__cell_food";
        } else {
          div.className = "grid__cell_full";
        }
        gridDOM.appendChild(div);
      }
    }
    displayDOM.innerText = `score: ${score}`;
  }

  spawnFood() {
    if (!isFoodSpawned) {
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

        if (this.arr[rand.x][rand.y] === 0) {
          // console.log(rand.x, rand.y);
          this.arr[rand.x][rand.y] = 2;
          isFoodSpawned = true;
          return;
        }
      }
    }
  }
}

class Snake {
  arr: Vec2[];
  moveDir: number = 1;
  grid: Vec2[][];

  constructor(arr: Vec2[], grid: Vec2[][]) {
    this.arr = arr;
    this.grid = grid;
  }

  private getHead() {
    return this.arr[this.arr.length - 1];
  }

  getBody() {
    return this.arr[this.arr.length - 2];
  }

  setHead(point: Vec2) {
    this.arr[this.arr.length - 1] = point;
  }

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

const grid = new Grid(12);

const snake = new Snake([new Vec2(3, 1), new Vec2(4, 1), new Vec2(5, 1)], grid);
// const snake = new Snake([new Vec2(5, 1)], grid);

for (const vec of snake.arr) {
  grid.setValue(vec, 1);
}

grid.render(gridDOM, "grid__cell_empty");

function update() {
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
    if (grid.getValue(newPos) === 2) {
      snake.arr.push(newPos);
      isFoodSpawned = false;
      score++;
    }
    snake.arr.push(newPos);
    grid.setValue(snake.arr.shift(), 0);
    for (const vec of snake.arr) {
      grid.setValue(vec, 1);
    }
    grid.render(gridDOM, "grid__cell_empty");
  }, 100);
}

const render = update();

function spawnFood(arr) {
  if (arr.flat().indexOf(2) === -1) isFoodSpawned = false;

  if (!isFoodSpawned) {
    const emptyCells = [];

    for (let x = 0; x < arr.length; x++) {
      for (let y = 0; y < arr.length; y++) {
        if (arr[x][y] === 0) {
          emptyCells.push({ x: x, y: y });
        }
      }
    }

    if (emptyCells.length > 0) {
      const idx = Math.floor(Math.random() * (emptyCells.length - 1));
      const rand = emptyCells[idx];

      if (arr[rand.x][rand.y] === 0) {
        // console.log(rand.x, rand.y);
        arr[rand.x][rand.y] = 2;
        isFoodSpawned = true;
        return;
      }
    }
  }
}

function stopGame() {
  isGameRunning = false;
  clearInterval(render);
  grid.render(gridDOM, "grid__cell_gray");
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
