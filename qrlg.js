//qrlg.js
window.onload = funcOnLoad;

var video;
var canvasElement;
var canvas;
var trimCanvasElement;
var trimCanvas;
var sampCanvasElement;
var sampCanvas;
var binCanvasElement;
var binCanvas;
var grayCanvasElement;
var grayCanvas;
var qrCanvasElement;
var qrCanvas;
var loadingMessage;
var outputContainer;
var outputMessage;
var outputData;
var firstWidth = 0;
var firstHeight = 0;
var firstData = "";
const RATIO_ENLARGE = 2.0;
const RATIO_SHARE = 0.5;
const SIZE_CODE = 250.0;

function funcOnLoad() {
	video = document.createElement("video");
	canvasElement = document.getElementById("canvas");
	canvas = canvasElement.getContext("2d");
	trimCanvasElement = document.getElementById("trimCanvas");
	trimCanvas = trimCanvasElement.getContext("2d");
	sampCanvasElement = document.getElementById("sampCanvas");
	sampCanvas = sampCanvasElement.getContext("2d");
	sharpenCanvasElement = document.getElementById("sharpenCanvas");
	sharpenCanvas = sharpenCanvasElement.getContext("2d");
	binCanvasElement = document.getElementById("binCanvas");
	binCanvas = binCanvasElement.getContext("2d");
	grayCanvasElement = document.getElementById("grayCanvas");
	grayCanvas = grayCanvasElement.getContext("2d");
	sharpenGrayCanvasElement = document.getElementById("sharpenGrayCanvas");
	sharpenGrayCanvas = sharpenGrayCanvasElement.getContext("2d");
	qrCanvasElement = document.getElementById("qrCanvas");
	qrCanvas = qrCanvasElement.getContext("2d");
	loadingMessage = document.getElementById("loadingMessage");
	outputContainer = document.getElementById("output");
	outputMessage = document.getElementById("outputMessage");
	outputData = document.getElementById("outputData");

}
function drawLine(begin, end, color) {
	canvas.beginPath();
	canvas.moveTo(begin.x, begin.y);
	canvas.lineTo(end.x, end.y);
	canvas.lineWidth = 4;
	canvas.strokeStyle = color;
	canvas.stroke();
}

// Use facingMode: environment to attemt to get the front camera on phones
navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
	video.srcObject = stream;
	video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
	video.play();
	requestAnimationFrame(tick);
});

function tick() {
	loadingMessage.innerText = "⌛ Loading video..."
	if (video.readyState === video.HAVE_ENOUGH_DATA) {
		loadingMessage.hidden = true;
		canvasElement.hidden = false;
		outputContainer.hidden = false;

		canvasElement.height = video.videoHeight;
		canvasElement.width = video.videoWidth;
		canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
		var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
		var code = jsQR(imageData.data, imageData.width, imageData.height, {
			inversionAttempts: "dontInvert",
		});
		if (code) {
			outputMessage.hidden = true;
			outputData.parentElement.hidden = false;
			outputData.innerText = code.data;
			if(firstData != code.data) {
				var point = calcPointCode(code);
				firstWidth = point.right - point.left;
				firstHeight = point.bottom - point.top;
				firstData = code.data
			}
			if(firstData == code.data) {
				var point = calcPointCode(code);
				var width = point.right - point.left;
				var height = point.bottom - point.top;
				if( ( ( width > SIZE_CODE ) && ( height > SIZE_CODE ) ) || ( ( width > ( RATIO_SHARE * video.videoWidth ) ) && ( height > (RATIO_SHARE * video.videoHeight ) ) ) ) {
					enjoy(code, imageData);
					return;
				}
			}
		}
		else {
			outputMessage.hidden = false;
			outputData.parentElement.hidden = true;
		}
	}
	requestAnimationFrame(tick);
}
function enjoy(code, imageData) {
	qrCanvasElement.hidden = false;
	qrCanvasElement.height = NUM_SAMPLE;
	qrCanvasElement.width = NUM_SAMPLE;
	for(let i = 0; i < NUM_MODULE; i++) {
		yPick = Math.round( (i + 0.5) * SIZE_MODULE );
		yRect0 = Math.round( i * SIZE_MODULE );
		for(let j = 0; j < NUM_MODULE; j++) {
			xPick = Math.round( (j + 0.5) * SIZE_MODULE );
			xRect0 = Math.round( j * SIZE_MODULE );
			var index = (xPick + yPick * NUM_SAMPLE) * 4;
			var clrPick = binImage.data[index];
			binImage.data[index + 0] = 255;
			binImage.data[index + 1] = 0;
			binImage.data[index + 2] = 0;
			qrCanvas.fillStyle = "rgba(" + clrPick + "," + clrPick + "," + clrPick + ",1)";
			qrCanvas.fillRect(xRect0, yRect0, SIZE_MODULE, SIZE_MODULE);
			//lgArr[ i + NUM_SAMPLE * j ] = clrPick / 255;
		}
	}
}

