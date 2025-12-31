import {
  BrowserMultiFormatReader,
  RGBLuminanceSource,
  HybridBinarizer,
  BinaryBitmap
} from "@zxing/library";
import GIF from "gif.js";

const video = document.getElementById("video") as HTMLVideoElement;
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
const downloadButtonsDiv = document.getElementById("downloadButtons") as HTMLDivElement;
const downloadGifBtn = document.getElementById("downloadGif") as HTMLButtonElement;
const shareButtonsDiv = document.getElementById("shareButtons") as HTMLDivElement;
const shareXBtn = document.getElementById("shareX") as HTMLButtonElement;
const shareFacebookBtn = document.getElementById("shareFacebook") as HTMLButtonElement;
const shareBlueskyBtn = document.getElementById("shareBluesky") as HTMLButtonElement;

// ---------- カメラ起動 ----------
const stream = await navigator.mediaDevices.getUserMedia({
  video: { facingMode: "environment" }
});
video.srcObject = stream;

// ビデオの準備ができたらcanvasにカメラ映像を表示
video.addEventListener("loadedmetadata", () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  
  // カメラ映像をcanvasに描画し続ける
  function drawCamera() {
    if (lifeCells) return; // QR読み取り後は停止
    ctx.drawImage(video, 0, 0);
    requestAnimationFrame(drawCamera);
  }
  drawCamera();
});

// ---------- Reader ----------
const reader = new BrowserMultiFormatReader();

let lifeCells: boolean[][] | null = null;
let generation = 0;
let running = false;
let history: string[] = []; // 過去の状態を保持（最大100世代）
const MAX_HISTORY = 1000;let allGenerations: boolean[][][] = []; // GIF用に全世代を保存
reader.decodeFromVideoDevice(
  null,
  video,
  (result: any, error: any, controls: any) => {
    if (lifeCells) return;

    // 非同期処理は即時関数で分離
    (async () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // RGBA(4バイト/ピクセル) から 輝度(1バイト/ピクセル) に変換
      const luminancePixels = new Uint8ClampedArray(imageData.width * imageData.height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        // 輝度計算（より正確な加重平均）
        luminancePixels[i / 4] = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
      }

      const luminance = new RGBLuminanceSource(
        luminancePixels as any,
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
        const blackMatrix = bitmap.getBlackMatrix();
        
        // QRコードとして正しく検出できるか確認
        const detector = new Detector(blackMatrix);
        const detectorResult = detector.detect(new Map());
        
        // モジュール単位のデータを取得（ファインダーパターン含む）
        const bits = detectorResult.getBits();
        const h = bits.getHeight();
        const w = bits.getWidth();
        console.log(bits.toString())
        
        lifeCells = [];
        for (let y = 0; y < h; y++) {
          const row: boolean[] = [];
          for (let x = 0; x < w; x++) {
            row.push(bits.get(x, y));
          }
          lifeCells.push(row);
        }

        // カメラ停止を試みる（エラーは無視）
        try {
          if (controls) {
            controls.stop();
          }
        } catch (e) {
          console.warn("カメラ停止エラー:", e);
        }
        
        // カメラ映像の描画は自動的に停止（lifeCellsがnullでなくなるため）
        
        console.log("QRコード読み取り成功:", h, "x", w);
        console.log("初期セル数:", lifeCells.flat().filter(c => c).length);
        
        running = true;
        
        // 初期状態を描画
        drawLifeGame();
        
        // ライフゲーム開始
        setTimeout(() => {
          requestAnimationFrame(loop);
        }, 100);

      } catch (e) {
        // QR未検出時は無視（正常な動作）
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

// ---------- 描画 ----------
function drawLifeGame() {
  if (!lifeCells) return;

  const size = 10;
  canvas.width = lifeCells[0].length * size;
  canvas.height = lifeCells.length * size;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000";

  lifeCells.forEach((row, y) =>
    row.forEach((v, x) => {
      if (v) {
        ctx.fillRect(x * size, y * size, size, size);
      }
    })
  );
  
  // フレームを保存（GIF用）- 状態のコピーを保存
  if (running && lifeCells) {
    allGenerations.push(lifeCells.map(row => [...row]));
  }
}

// ---------- 実行 ----------
function loop() {
  if (!running || !lifeCells) return;

  // 次の世代を計算
  lifeCells = nextGeneration(lifeCells);
  generation++;

  // 現在の状態を文字列化
  const currentState = lifeCells.map(row => row.map(v => v ? '1' : '0').join('')).join('\n');
  
  // 過去の状態と比較
  const cycleIndex = history.indexOf(currentState);
  if (cycleIndex !== -1) {
    // ループまたは固定を検出
    const cycle = cycleIndex + 1; // cycleIndex=0なら1世代前と同じ（周期1）
    running = false;
    
    console.log("=== ライフゲーム終了 ===");
    console.log("寿命:", generation, "世代");
    if (cycle === 1) {
      console.log("状態: 固定");
    } else {
      console.log("状態: ループ（周期", cycle, "）");
    }
    
    // 結果をページに表示
    const result = document.createElement('div');
    result.style.marginTop = '10px';
    result.style.fontWeight = 'bold';
    result.innerHTML = `寿命: ${generation}世代<br>状態: ${cycle === 1 ? '固定' : `ループ（周期${cycle}）`}`;
    document.body.appendChild(result);
    
    // ダウンロードボタンを表示
    result.appendChild(document.createElement('br'));
    result.appendChild(downloadButtonsDiv);
    downloadButtonsDiv.style.display = 'block';
    
    // 共有ボタンを表示
    result.appendChild(shareButtonsDiv);
    shareButtonsDiv.style.display = 'block';
    
    return; // ループ終了
  }
  
  // 履歴に追加（最大100世代まで）
  history.unshift(currentState);
  if (history.length > MAX_HISTORY) {
    history.pop();
  }

  // 描画
  drawLifeGame();

  setTimeout(() => requestAnimationFrame(loop), 200);
}

// ---------- GIFダウンロード ----------
downloadGifBtn.onclick = async () => {
  downloadGifBtn.disabled = true;
  downloadGifBtn.textContent = "生成中...";
  
  // 一時Canvasを作成
  const tempCanvas = document.createElement('canvas');
  const w = allGenerations[0][0].length;
  const h = allGenerations[0].length;
  const size = 10;
  tempCanvas.width = w * size;
  tempCanvas.height = h * size;
  const tempCtx = tempCanvas.getContext('2d')!;
  
  const gif = new GIF({
    workers: 2,
    quality: 10,
    width: tempCanvas.width,
    height: tempCanvas.height,
    workerScript: new URL('gif.js/dist/gif.worker.js', import.meta.url).href
  });
  
  // 各世代を描画してフレームに追加（間引きして軽量化）
  const step = Math.max(1, Math.floor(allGenerations.length / 100)); // 最大100フレーム
  for (let i = 0; i < allGenerations.length; i += step) {
    const cells = allGenerations[i];
    
    // 一時Canvasに描画
    tempCtx.fillStyle = "#fff";
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.fillStyle = "#000";
    
    cells.forEach((row, y) =>
      row.forEach((v, x) => {
        if (v) {
          tempCtx.fillRect(x * size, y * size, size, size);
        }
      })
    );
    
    gif.addFrame(tempCanvas, { delay: 200, copy: true });
  }
  
  gif.on('finished', (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qr-lifegame-${generation}gen.gif`;
    a.click();
    URL.revokeObjectURL(url);
    
    downloadGifBtn.disabled = false;
    downloadGifBtn.textContent = "記念に保存";
  });
  
  gif.render();
};

// ---------- SNS共有 ----------
const shareText = () => `QRコードを読み取ってライフゲームを走らせました。結果は${generation}世代で寿命を迎えました。#QRライフゲーム`;
const shareUrl = "https://www.wetsteam.org/qrlg/";

// X (Twitter)
shareXBtn.onclick = () => {
  const text = encodeURIComponent(shareText() + " " + shareUrl);
  window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
};

// Facebook
shareFacebookBtn.onclick = () => {
  const url = encodeURIComponent(shareUrl);
  const quote = encodeURIComponent(shareText());
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`, '_blank');
};

// BlueSky
shareBlueskyBtn.onclick = () => {
  const text = encodeURIComponent(shareText() + "\n" + shareUrl);
  window.open(`https://bsky.app/intent/compose?text=${text}`, '_blank');
};
