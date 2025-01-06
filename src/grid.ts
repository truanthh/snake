import type { Vec2 } from "./vec2";

export class Grid {
  private size: number;
  private arr: number[][];
  public isFoodSpawned: boolean;

  constructor(size: number) {
    this.size = size;
    this.arr = this.init(size);
    this.isFoodSpawned = false;
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

  /**
   * @param rendering xd
   */
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
    // displayDOM.innerText = `score: ${score}`;
  }

  public spawnFood() {
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
