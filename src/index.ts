const gridDOM = document.getElementById("grid__container");
const bodyDOM = document.querySelector("body");
const displayDOM = document.getElementById("display");
bodyDOM.addEventListener("keydown", setMoveDirection);

let isGameRunning: boolean = false;

class Vec2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

// class Grid{
//   arr: any;
//
//   constructor(arr: any){
//     this.arr = arr;
//   }
//
//   isValidVec2(x: number, y: number){
//     return (x > 0 && x < this.arr.length && y > 0 && y < this.arr.length)
//   }
// }

class snakeSquare {
  arr: any;
  x: number;
  y: number;
  prevX: number;
  prevY: number;

  moveDir: number;

  next: snakeSquare | null = null;

  constructor(x: number, y: number, arr: any, next: snakeSquare | null) {
    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    this.arr = arr;
    this.next = next;

    this.moveDir = 1;
    this.arr[this.y][this.x] = 1;
  }

  setNewPos(x: number, y: number): void {
    this.prevX = this.x;
    this.prevY = this.y;

    // snake kills itself
    // and snake cant move backwards
    if (isInsideArr(x, this.arr) && isInsideArr(y, this.arr)) {
      if (this.arr[y][x] === 1) {
        stopGame();
      }
      if (this.arr[y][x] === 2) {
        isFoodSpawned = false;
        snakeGrow();
      }
    }

    if (!isGameRunning) return;

    // setting new x and y
    this.x = x;
    this.y = y;

    // updating grid
    this.arr[this.y][this.x] = 1;
    // this.arr[this.prevY][this.prevX] = 0;

    if (this.next) {
      this.next.x = this.prevX;
      this.next.y = this.prevY;
    }
  }

  updatePos() {
    // this is to avoid "killing" food with tail apparently
    if (this.arr[this.y][this.x] === 2) {
      console.log("food spawned on snake!");
      // isFoodSpawned = false;
    }

    this.arr[this.y][this.x] = 1;

    if (!this.next) {
      this.arr[this.prevY][this.prevX] = 0;
    }

    if (this.next) {
      this.next.x = this.prevX;
      this.next.y = this.prevY;
    }

    this.prevX = this.x;
    this.prevY = this.y;
  }
}

const gridSize = 12;
let score = 3;

let gridArray = [];

initGrid();

const head = new snakeSquare(
  4,
  0,
  gridArray,
  new snakeSquare(3, 0, gridArray, new snakeSquare(2, 0, gridArray)),
);

// gridArray[0][11] = 2;

renderGrid();

isGameRunning = true;
let isFoodSpawned = false;

let last = head;

while (last.next) {
  last = last.next;
}

function update() {
  return setInterval(() => {
    move(head);
    let curr = head.next;
    while (curr) {
      curr.updatePos();
      curr = curr.next;
    }
    spawnFood(gridArray);
    if (isGameRunning) {
      renderGrid();
    }
  }, 100);
}

const render = update();

function spawnFood(arr) {
  // if (!isFoodSpawned) {
  //   if (arr[0][5] === 0) {
  //     arr[0][5] = 2;
  //     isFoodSpawned = true;
  //     return;
  //   }
  // }
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

function isInsideArr(i, arr) {
  return i < arr.length && i >= 0;
}

function stopGame() {
  isGameRunning = false;
  clearInterval(render);
  renderGameOver();
}

function snakeGrow(x, y, head) {
  last.next = new snakeSquare(last.prevX, last.prevY, gridArray);
  last = last.next;
  score++;
}

function setMoveDirection(e) {
  // up
  if (e.code === "KeyK" || e.code === "ArrowUp") {
    head.moveDir = 2;
    return;
  }
  // right
  if (e.code === "KeyL" || e.code === "ArrowRight") {
    head.moveDir = 1;
    return;
  }
  // down
  if (e.code === "KeyJ" || e.code === "ArrowDown") {
    head.moveDir = -2;
    return;
  }
  // left
  if (e.code === "KeyH" || e.code === "ArrowLeft") {
    head.moveDir = -1;
    return;
  }
}

function getNextPosition(head: any): any {
  // let currMoveDir = head.moveDir;

  if (head.moveDir === 1) {
    let x = head.x + 1;
    if (x >= gridArray.length) return [0, head.y];
    else return [x, head.y];
  }
  if (head.moveDir === -1) {
    let x = head.x - 1;
    if (x < 0) return [gridArray.length - 1, head.y];
    else return [x, head.y];
  }
  if (head.moveDir === 2) {
    let y = head.y - 1;
    if (y < 0) return [head.x, gridArray.length - 1];
    else return [head.x, y];
  }
  if (head.moveDir === -2) {
    let y = head.y + 1;
    if (y >= gridArray.length) return [head.x, 0];
    else return [head.x, y];
  }
}

function move(head) {
  let [x, y] = getNextPosition(head);

  if (x === head.next.x && y === head.next.y) {
    head.moveDir *= -1;
    [x, y] = getNextPosition(head);
  }

  head.setNewPos(x, y);
}

function initGrid() {
  for (let i = 0; i < gridSize; i++) {
    gridArray[i] = new Array(gridSize).fill(0);
  }
}

function renderGrid() {
  gridDOM.innerHTML = "";
  for (let r = 0; r < gridArray.length; r++) {
    for (let c = 0; c < gridArray.length; c++) {
      const div = document.createElement("div");
      if (gridArray[r][c] === 0) {
        div.className = "grid__cell_empty";
      } else if (gridArray[r][c] === 2) {
        div.className = "grid__cell_food";
      } else {
        div.className = "grid__cell_full";
      }
      gridDOM.appendChild(div);
    }
  }
  displayDOM.innerText = `head: ${head.x}, ${head.y} score: ${score}`;
}

function renderGameOver() {
  gridDOM.innerHTML = "";
  for (let r = 0; r < gridArray.length; r++) {
    for (let c = 0; c < gridArray.length; c++) {
      const div = document.createElement("div");
      if (gridArray[r][c] === 0) {
        div.className = "grid__cell_gray";
      } else if (gridArray[r][c] === 2) {
        div.className = "grid__cell_food";
      } else {
        div.className = "grid__cell_full";
      }
      gridDOM.appendChild(div);
    }
  }
  displayDOM.innerText = `GAME IS OVER !!! F5 TO START AGAIN :)`;
}
