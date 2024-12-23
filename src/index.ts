const grid = document.getElementById("grid__container");
const body = document.querySelector("body");
const display = document.getElementById("display");
body.addEventListener("keydown", setMoveDirection);

let isGameRunning: boolean = false;

class Head {
  arr: any;

  x: number;
  y: number;

  prevX: number;
  prevY: number;

  moveDir: number;

  constructor(x: number, y: number, arr: any) {
    this.arr = arr;
    this.x = x;
    this.y = y;

    this.moveDir = 1;
    this.arr[this.y][this.x] = 1;
  }

  setNewPos(x: number, y: number): void {
    this.prevX = this.x;
    this.prevY = this.y;

    // snake kills itself
    if (isInsideArr(x, this.arr) && isInsideArr(y, this.arr)) {
      if (this.arr[y][x] === 1) {
        stopGame();
      }
    }

    if (!isGameRunning) return;

    if (x !== this.x) {
      if (x >= this.arr.length) {
        this.x = 0;
      } else if (x < 0) {
        this.x = this.arr.length - 1;
      } else {
        this.x = x;
      }
    }
    if (y !== this.y) {
      if (y >= this.arr.length) {
        this.y = 0;
      } else if (y < 0) {
        this.y = this.arr.length - 1;
      } else {
        this.y = y;
      }
    }

    this.arr[this.prevY][this.prevX] = 0;
    this.arr[this.y][this.x] = 1;
  }
}

class Body extends Head {
  next: Body | Head | null;
  isTail: false;

  constructor(
    x: number,
    y: number,
    arr: any,
    next: Body | Head | null,
    isTail: boolean,
  ) {
    super(x, y, arr);
    this.next = next;
    this.isTail = isTail;
  }

  updatePos(): void {
    if (!isGameRunning) return;
    this.prevX = this.x;
    this.prevY = this.y;

    this.x = this.next.prevX;
    this.y = this.next.prevY;

    if (this.isTail) {
      this.arr[this.prevY][this.prevX] = 0;
    }
    this.arr[this.y][this.x] = 1;
  }
}

const gridSize = 12;

let gridArray = [];

initGrid();

const head = new Head(4, 0, gridArray);
const body1 = new Body(3, 0, gridArray, head, false);
const body2 = new Body(2, 0, gridArray, body1, false);
const body3 = new Body(1, 0, gridArray, body2, false);
const tail = new Body(0, 0, gridArray, body3, true);

renderGrid();

isGameRunning = true;

function constantRender() {
  return setInterval(() => {
    move(head.moveDir);
    body1.updatePos();
    body2.updatePos();
    body3.updatePos();
    tail.updatePos();
    if (isGameRunning) {
      renderGrid();
    }
  }, 200);
}

const render = constantRender();

function isInsideArr(i, arr) {
  return i < arr.length && i >= 0;
}

function stopGame() {
  isGameRunning = false;
  clearInterval(render);
  gameOver();
}

function setMoveDirection(e) {
  // up
  if (e.code === "KeyK" || e.code === "ArrowUp") {
    head.moveDir = 0;
    return;
  }
  // right
  if (e.code === "KeyL" || e.code === "ArrowRight") {
    head.moveDir = 1;
    return;
  }
  // down
  if (e.code === "KeyJ" || e.code === "ArrowDown") {
    head.moveDir = 2;
    return;
  }
  // left
  if (e.code === "KeyH" || e.code === "ArrowLeft") {
    head.moveDir = 3;
    return;
  }
}

function move(direction) {
  switch (direction) {
    // up
    case 0:
      head.setNewPos(head.x, head.y - 1, gridArray);
      break;
    // right
    case 1:
      head.setNewPos(head.x + 1, head.y, gridArray);
      break;
    // down
    case 2:
      head.setNewPos(head.x, head.y + 1, gridArray);
      break;
    // left
    case 3:
      head.setNewPos(head.x - 1, head.y, gridArray);
      break;
    default:
      break;
  }
}

function initGrid() {
  for (let i = 0; i < gridSize; i++) {
    let row = new Array(gridSize).fill(0);
    gridArray[i] = row;
  }
}

function renderGrid() {
  grid.innerHTML = "";
  for (let r = 0; r < gridArray.length; r++) {
    for (let c = 0; c < gridArray.length; c++) {
      const div = document.createElement("div");
      if (gridArray[r][c] === 0) {
        div.className = "grid__cell_empty";
      } else {
        div.className = "grid__cell_full";
      }
      grid.appendChild(div);
    }
  }
  display.innerText = `head: ${head.x}, ${head.y}`;
}

function gameOver() {
  grid.innerHTML = "";
  for (let r = 0; r < gridArray.length; r++) {
    for (let c = 0; c < gridArray.length; c++) {
      const div = document.createElement("div");
      if (gridArray[r][c] === 0) {
        div.className = "grid__cell_gray";
      } else {
        div.className = "grid__cell_full";
      }
      grid.appendChild(div);
    }
  }
  display.innerText = `GAME IS OVER !!! F5 TO START AGAIN :)`;
}
