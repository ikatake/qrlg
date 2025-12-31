import { CellGrid } from "../qr/qrToCells";

function serialize(grid: CellGrid): string {
  return grid.map(row => row.map(c => (c ? "1" : "0")).join("")).join("/");
}

export function analyzeLife(
  initial: CellGrid,
  stepFn: (g: CellGrid) => CellGrid,
  maxGen = 1000
) {
  const seen = new Map<string, number>();
  let grid = initial;

  for (let gen = 0; gen < maxGen; gen++) {
    const key = serialize(grid);
    if (seen.has(key)) {
      return {
        type: "loop",
        start: seen.get(key)!,
        period: gen - seen.get(key)!,
      };
    }
    seen.set(key, gen);
    grid = stepFn(grid);
  }

  return { type: "limit", generations: maxGen };
}
