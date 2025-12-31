import {
  BrowserMultiFormatReader,
  RGBLuminanceSource,
  HybridBinarizer,
  BinaryBitmap
} from "@zxing/library";

const video = document.getElementById("video") as HTMLVideoElement;
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const shareBtn = document.getElementById("share") as HTMLButtonElement;

// ---------- カメラ起動 ----------
const stream = await navigator.mediaDevices.getUserMedia({
  video: { facingMode: "environment" }
});
video.srcObject = stream;

// ---------- Reader ----------
const reader = new BrowserMultiFormatReader();

let lifeCells: boolean[][] | null = null;
let generation = 0;
let running = false;

reader.decodeFromVideoDevice(
  null,
  video,
  (result: any, controls: any) => {
    if (lifeCells) return;

    // 非同期処理は即時関数で分離
    (async () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const luminance = new RGBLuminanceSource(
        imageData.data,
        imageData.width,
        imageData.height
      );
      const bitmap = new BinaryBitmap(
        new HybridBinarizer(luminance)
      );

      const DetectorModule = await import(
        "@zxing/library/esm/core/qrcode/detector/Detector"
      );
      const Detector = DetectorModule.default;

      try {
        const detector = new Detector(bitmap.getBlackMatrix());
        const detectorResult = detector.detect(new Map());
        const bits = detectorResult.getBits();

        const h = bits.getHeight();
        const w = bits.getWidth();

        lifeCells = [];
        for (let y = 0; y < h; y++) {
          const row: boolean[] = [];
          for (let x = 0; x < w; x++) {
            row.push(bits.get(x, y));
          }
          lifeCells.push(row);
        }

        if (controls) {
          controls.stop();
        }
        running = true;
        requestAnimationFrame(loop);

      } catch {
        // QR 未検出時は無視
      }
    })();
  }
);

// ---------- ライフゲーム ----------
function nextGeneration(cells: boolean[][]): boolean[][] {
  const h = cells.length;
  const w = cells[0].length;
  const next: boolean[][] = [];

  for (let y = 0; y < h; y++) {
    const row: boolean[] = [];
    for (let x = 0; x < w; x++) {
      let n = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue;
          const ny = y + dy, nx = x + dx;
          if (ny >= 0 && ny < h && nx >= 0 && nx < w && cells[ny][nx]) n++;
        }
      }
      row.push(n === 3 || (cells[y][x] && n === 2));
    }
    next.push(row);
  }
  return next;
}

// ---------- 実行 ----------
function loop() {
  if (!running || !lifeCells) return;

  const size = 10;
  canvas.width = lifeCells[0].length * size;
  canvas.height = lifeCells.length * size;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  lifeCells.forEach((row, y) =>
    row.forEach((v, x) => {
      if (v) {
        ctx.fillRect(x * size, y * size, size, size);
      }
    })
  );

  lifeCells = nextGeneration(lifeCells);
  generation++;
  setTimeout(() => requestAnimationFrame(loop), 200);
}

// ---------- SNS共有 ----------
shareBtn.onclick = async () => {
  if (!navigator.share) return;

  await navigator.share({
    title: "QR Life Game",
    text: `QRコード由来ライフゲーム\n世代数: ${generation}`
  });
};
