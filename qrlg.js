//qrlg.js
"use strict"
window.onload = funcOnLoad;

var video;
var canvasElement;
var canvas;
var qrCanvasElement;
var qrCanvas;
var loadingMessage;
var outputContainer;
var noQRFound;
var outputData;
var firstWidth = 0;
var firstHeight = 0;
var firstData = "";
var space = {};
var sizeCell = 0;
const RATIO_ENLARGE = 2.0;
const RATIO_SHARE = 0.5;
const SIZE_CODE = 250.0;
const IMG_SIZE_MAX = 500.0;
const TEXT_HEIGHT = 30.0;
const LEN_PAST_STATES = 1000;
var intervalMilliSec = 1000;
var tid;
var pastStates = [];

function funcOnLoad() {
	video = document.createElement("video");
	canvasElement = document.getElementById("canvas");
	canvas = canvasElement.getContext("2d");
	qrCanvasElement = document.getElementById("qrCanvas");
	qrCanvas = qrCanvasElement.getContext("2d");
	loadingMessage = document.getElementById("loadingMessage");
	outputContainer = document.getElementById("output");
	noQRFound = document.getElementById("noQRFound");
	outputData = document.getElementById("outputData");
	document.onkeydown = interruptKeyBoard;
//	testfunc();
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
			noQRFound.hidden = true;
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
				enjoy(code.binaryMatrix);
				return;
				/*
				if( ( ( width > SIZE_CODE ) && ( height > SIZE_CODE ) ) || ( ( width > ( RATIO_SHARE * video.videoWidth ) ) && ( height > (RATIO_SHARE * video.videoHeight ) ) ) ) {
					enjoy(code.binaryMatrix);
					return;
				}
					*/
			}
		}
		else {
			noQRFound.hidden = false;
			outputData.parentElement.hidden = true;
		}
	}
	requestAnimationFrame(tick);
}
function enjoy(binaryMatrix) {
	qrCanvasElement.hidden = false;
	//縦と横の長い方を取る。
	var maxSizeMatrix = max(binaryMatrix.height, binaryMatrix.width);
	//最大のキャンバスサイズを長辺長さで割って、1セルのサイズを出す。
//	var sizeCell = Math.floor( IMG_SIZE_MAX / maxSizeMatrix );
	sizeCell = Math.floor( IMG_SIZE_MAX / maxSizeMatrix );
	//キャンバスのサイズを求める。
	qrCanvasElement.height = binaryMatrix.height * sizeCell + TEXT_HEIGHT;
	qrCanvasElement.width = binaryMatrix.width * sizeCell;
	var space = getInitialSpace(binaryMatrix);
	space = getInitialSpace(binaryMatrix);
	drawCanvas(space, qrCanvas, sizeCell);
	tid = setTimeout(loop, intervalMilliSec, space, canvas, sizeCell);
}

function loop(space, canvas, sizeCell){
	if (space.generation == 10) {
		intervalMilliSec = 100;
	} else if (space.generation == 100) {
		intervalMilliSec = 10;
	} else if (space.generation == 1000) {
		clearTimeout(tid);
		return;
	}
	var intervalGeneration = getIntervalGenerationPast(space, pastStates);
	if (intervalGeneration == 0) { //該当なし。
		pastStates[space.generation % LEN_PAST_STATES] = space.states;
	} else if (intervalGeneration == 1) {
		var msg = "frozen.";
		drawEndMessage(space, qrCanvas, sizeCell, msg);
		return;
	} else {
		var msg = "loop " + intervalGeneration + " generations.";
		drawEndMessage(space, qrCanvas, sizeCell, msg);
		return;
	}
	
	space = getNextGeneration(space);
	drawCanvas(space, qrCanvas, sizeCell);
	setTimeout(loop, intervalMilliSec, space, canvas, sizeCell);
}

function interruptKeyBoard(){
	if (event.key === "ArrowRight") {
		intervalMilliSec -= 100;
	}
	if (event.key === "ArrowLeft") {
		intervalMilliSec += 100;
	}
	if (event.key === "Enter") {
		space = getNextGeneration(space);
		drawCanvas(space, qrCanvas, sizeCell);
	}
}

