export async function shareResult(
  text: string,
  canvas: HTMLCanvasElement
) {
  const blob = await new Promise<Blob>(r =>
    canvas.toBlob(b => r(b!), "image/png")
  );

  await navigator.share({
    text,
    files: [new File([blob], "result.png", { type: "image/png" })],
  });
}
