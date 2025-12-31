import jsQR from "jsqr";

export function scanQR(
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement
) {
  const ctx = canvas.getContext("2d")!;
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.drawImage(video, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const qr = jsQR(imageData.data, canvas.width, canvas.height);
  return qr; // null or QRCode
}
