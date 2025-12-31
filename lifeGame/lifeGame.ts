import { CellGrid } from "../qr/qrToCells";

export function nextGeneration(grid: CellGrid): CellGrid {
  const h = grid.length;
  const w = grid[0].length;

  const next: CellGrid = Array.from({ length: h }, () =>
    Array(w).fill(false)
  );

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let n = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const ny = y + dy;
          const nx = x + dx;
          if (grid[ny]?.[nx]) n++;
        }
      }

      next[y][x] =
        grid[y][x] ? n === 2 || n === 3 : n === 3;
    }
  }
  return next;
}
