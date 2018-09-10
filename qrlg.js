//qrlg.js
window.onload = funcOnLoad;

var video;
var canvasElement;
var canvas;
var trimCanvasElement;
var trimCanvas;
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

function funcOnLoad() {
	video = document.createElement("video");
	canvasElement = document.getElementById("canvas");
	canvas = canvasElement.getContext("2d");
	trimCanvasElement = document.getElementById("trimCanvas");
	trimCanvas = trimCanvasElement.getContext("2d");
	binCanvasElement = document.getElementById("binCanvas");
	binCanvas = binCanvasElement.getContext("2d");
	grayCanvasElement = document.getElementById("grayCanvas");
	grayCanvas = grayCanvasElement.getContext("2d");
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
				if( ( ( width > (RATIO_ENLARGE * firstWidth ) ) && ( height > (RATIO_ENLARGE * firstHeight ) ) ) || ( ( width > ( RATIO_SHARE * video.videoWidth ) ) && ( height > (RATIO_SHARE * video.videoHeight ) ) ) ) {
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
	var point = calcPointCode(code);
	var trimWidth = point.right - point.left;
	var trimHeight = point.bottom - point.top;
	var trimImage = canvas.getImageData(point.left, point.top, trimWidth, trimHeight);
	trimCanvasElement.hidden = false;
	trimCanvasElement.height = trimHeight;
	trimCanvasElement.width = trimWidth;
	trimCanvas.putImageData(trimImage,0 ,0);
	/* 逆射影変換する */
	const NUM_SAMPLE = 1000;
	grayCanvasElement.hidden = false;
	grayCanvasElement.height = NUM_SAMPLE;
	grayCanvasElement.width = NUM_SAMPLE;
	var grayImage = new ImageData(NUM_SAMPLE, NUM_SAMPLE);
	var sumGray = 0.0;
	for(i = 0; i < NUM_SAMPLE; i++){
		pStart = getPointN( code.location.topLeftCorner,  code.location.bottomLeftCorner, i, NUM_SAMPLE);
		pEnd = getPointN( code.location.topRightCorner,  code.location.bottomRightCorner, i, NUM_SAMPLE);
		for(j = 0; j < NUM_SAMPLE; j++){
			var point = getPointN(pStart, pEnd, j, NUM_SAMPLE);
			var pixel = canvas.getImageData(point.x, point.y, 1, 1);
			var data = pixel.data;
			var index = (j + i * NUM_SAMPLE) * 4;
			var gray = (data[0] + data[1] + data[2]) / 3.0; 
			grayImage.data[index + 0] = gray;
			grayImage.data[index + 1] = gray;
			grayImage.data[index + 2] = gray;
			grayImage.data[index + 3] = 255;
			sumGray += gray;
		}
	}
	grayThreshold = sumGray / ( NUM_SAMPLE * NUM_SAMPLE );
	grayCanvas.putImageData(grayImage, 0, 0);

	binCanvasElement.hidden = false;
	binCanvasElement.height = NUM_SAMPLE;
	binCanvasElement.width = NUM_SAMPLE;
	var binImage = new ImageData(NUM_SAMPLE, NUM_SAMPLE);
	for(i = 0; i < NUM_SAMPLE; i++){
		for(j = 0; j < NUM_SAMPLE; j++) {
			var index = (j + i * NUM_SAMPLE) * 4;
			var data = grayImage.data[index + 0];
			if( grayThreshold < data ) {
				binImage.data[index + 0] = 255;
				binImage.data[index + 1] = 255;
				binImage.data[index + 2] = 255;
			} else {
				binImage.data[index + 0] = 0;
				binImage.data[index + 1] = 0;
				binImage.data[index + 2] = 0;
			}
			binImage.data[index + 3] = 255;
		}
	}
	binCanvas.putImageData(binImage, 0, 0);
	var sumLength = getLengthFinderPattern(binImage, 1);
	sumLength += getLengthFinderPattern(binImage, 2);
	sumLength += getLengthFinderPattern(binImage, 3);
	const SIZE_MODULE = sumLength / 12.0;
	const NUM_MODULE = NUM_SAMPLE / SIZE_MODULE;
	/**/
	// var lgArr = new Array( NUM_SAMPLE * NUM_SAMPLE );
	qrCanvasElement.hidden = false;
	qrCanvasElement.height = NUM_SAMPLE;
	qrCanvasElement.width = NUM_SAMPLE;
	for(i = 0; i < NUM_MODULE; i++) {
		yPick = Math.round( (i + 0.5) * SIZE_MODULE );
		yRect0 = Math.round( i * SIZE_MODULE );
		for(j = 0; j < NUM_MODULE; j++) {
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
			console.log("idx:%d, c:%d clr:%d, fS:%s", index, binImage.data[index], clrPick, qrCanvas.fillStyle);
		}
	}
	binCanvas.putImageData(binImage, 0, 0);
}

function getLengthFinderPattern(binImage, posPattern) {
	// posPattern 1:左上, 2:右上, 3:左下
	var mode = 0;
	var sumLength = 0;
	var width = binImage.width;
	for(i = 0; i < width; i++) {
		var index = 0;
		if (posPattern == 1) {
			index = (i + i * width ) * 4;
		} 
		else if (posPattern == 2) {
			index = ( (width - i) + i * width) * 4;
		}
		else {
			index = (i + (width - i) * width) * 4;
		}
		var data = binImage.data[index + 0];
		if( (mode == 0) && (data == 0) ) {
			mode = 1; //最初の黒色枠線に入った。
			temp = i;
			//console.log ("0->1:" + "%d" , i );
		}
		if( (mode == 1) && (data == 255) ) {
			mode = 2; //黒枠から白枠に移動。
			//console.log ("1->2:" + "%d" , i );
		}
		if( (mode == 2) && (data == 0) ) {
			mode =3; //中央の黒四角に移動
			sumLength += (i - 1 - temp);
			//console.log ("2->3:" + "%d" , i );
		} 
		if( (mode == 3) && (data == 255) ) {
			mode = 4; //中央黒四角から白枠に移動。
			temp = i;
			//console.log ("3-4>:" + "%d" , i );
		}
		if( (mode == 4) && (data == 0) ) {
			mode = 5; //白枠から黒色枠線に入った。
			//console.log ("4->5:" + "%d" , i );
		}
		if( (mode == 5) && (data == 255) ) {
			sumLength += (i - 1 - temp); // 黒色枠線から外に出た。
			//console.log ("5->6:" + "%d" , i );
				break;
		}
	}
	//console.log(sumLength);
	return sumLength;
}
function calcPointCode(code) {
	var l = min(code.location.bottomLeftCorner.x, code.location.topLeftCorner.x);
	var r = max(code.location.bottomRightCorner.x, code.location.topRightCorner.x);
	var t = min(code.location.topLeftCorner.y, code.location.topRightCorner.y);
	var b = max(code.location.bottomRightCorner.y, code.location.bottomLeftCorner.y);
	var point = {left:l, right:r, top:t, bottom:b};
	return point; 
}
function min(var1, var2) {
	if(var1 < var2) {
		return var1;
	} else {
		return var2;
	}
}
function max(var1, var2) {
	if(var1 > var2) {
		return var1;
	} else {
		return var2;
	}
}
//始点から終点までをn分割したi番目の点を返す
function getPointN(p0, p1, i, n) {
	var dx = p1.x - p0.x;
	var dy = p1.y - p0.y;
	var x = p0.x + dx * ( i / ( n - 1 ) );
	var y = p0.y + dy * ( i / ( n - 1 ) );
	var p = {x:x, y:y};
	return p;
}
