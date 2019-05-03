//qrlg.js
window.onload = funcOnLoad;

var video;
var canvasElement;
var canvas;
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
const IMG_SIZE_MAX = 600.0;

function funcOnLoad() {
	video = document.createElement("video");
	canvasElement = document.getElementById("canvas");
	canvas = canvasElement.getContext("2d");
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
					enjoy(code.binaryMatrix);
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
function enjoy(binaryMatrix) {
	qrCanvasElement.hidden = false;
	//縦と横の長い方を取る。
	maxSizeMatrix = max(binaryMatrix.height, binaryMatrix.width);
	//最大のキャンバスサイズを長辺長さで割って、1セルのサイズを出す。
	sizeCell = Math.floor( IMG_SIZE_MAX / maxSizeMatrix );
	//キャンバスのサイズを求める。
	qrCanvasElement.height = binaryMatrix.height * sizeCell;
	qrCanvasElement.width = binaryMatrix.width * sizeCell;
	for(let y = 0; y < binaryMatrix.height; y++) {
		var py = y * sizeCell;
		for(let x = 0; x < binaryMatrix.width; x++) {
			var px = x * sizeCell;
			var index = x + y * binaryMatrix.width;
			if( binaryMatrix.data[index] == 1) {
				var clr = 0;
			} else {
				var clr = 255;
			}
			qrCanvas.fillStyle = "rgba(" + clr + "," + clr + "," + clr + ",1)";
			qrCanvas.fillRect(px, py, sizeCell, sizeCell);
		}
	}
}

