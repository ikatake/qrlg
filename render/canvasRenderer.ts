import { CellGrid } from "../qr/qrToCells";

export function drawGrid(
  ctx: CanvasRenderingContext2D,
  grid: CellGrid,
  cellSize = 10
) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  grid.forEach((row, y) =>
    row.forEach((cell, x) => {
      ctx.fillStyle = cell ? "#000" : "#fff";
      ctx.fillRect(
        x * cellSize,
        y * cellSize,
        cellSize,
        cellSize
      );
    })
  );
}
