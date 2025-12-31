import { startCamera } from "./camera/camera";
import { scanQR } from "./qr/qrScanner";
import { nextGeneration } from "./lifeGame/lifeGame";
import { analyzeLife } from "./lifeGame/analyzer";

const video = document.getElementById("camera") as HTMLVideoElement;
const canvas = document.getElementById("preview") as HTMLCanvasElement;

await startCamera(video);

document.getElementById("scanBtn")!.onclick = () => {
  const qr = scanQR(video, canvas);
  if (!qr) return alert("QRが見つかりません");
  // → qrToCells → LifeGame 初期化
};
