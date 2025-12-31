export type CellGrid = boolean[][];

export function qrToCells(
  qrSize: number,
  moduleMatrix: boolean[]
): CellGrid {
  const grid: CellGrid = [];
  for (let y = 0; y < qrSize; y++) {
    grid[y] = [];
    for (let x = 0; x < qrSize; x++) {
      grid[y][x] = moduleMatrix[y * qrSize + x];
    }
  }
  return grid;
}
