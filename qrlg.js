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
	//canvasからQRコード部分のみを抽出する。
	//trimCanvas.putImageData(trimQR(canvas, code, trimCanvasElement), 0, 0);
	trimCanvasElement.hidden = false;
	trimCanvasElement.height = canvasElement.height;
	trimCanvasElement.width = canvasElement.width;
	var imgData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
	var binTrimedImageData = getTrimQRbinImage(imgData, code);
	trimCanvas.putImageData(binTrimedImageData, 0, 0);
	// 逆射影変換する(射影変換というよりただのサンプリング)
	const NUM_SAMPLE = 1000;
	//sampleCanvas(canvas, grayCanvasElement, NUM_SAMPLE);
	//カメラ画像から画像を拡大する。
	sampCanvasElement.hidden = false;
	sampCanvasElement.height = NUM_SAMPLE;
	sampCanvasElement.width = NUM_SAMPLE;
	sampImageData = sampleImage(canvas, NUM_SAMPLE, code);
	sampCanvas.putImageData(sampImageData, 0, 0);
	//カラー画像の閾値を求める。
	var rgbThreshold = getColorThreshold(sampImageData);
	//2値化画像を求める。
	//var binImage = getBinImage(sampImageData, rgbThreshold);
	grayCanvasElement.hidden = false;
	grayCanvasElement.height = NUM_SAMPLE;
	grayCanvasElement.width = NUM_SAMPLE;
	var grayImageData = sampleGrayImage(canvas, NUM_SAMPLE, code);
	grayCanvas.putImageData(grayImageData, 0, 0);
	var sharpedGrayImageData = sharpenImageGray(grayImageData);
	var grayThreshold = getOneThreshold(grayImageData, 0);
	var th = {r:grayThreshold, g:grayThreshold, b:grayThreshold};
	//2値化画像を求める。
	binImage = getBinImage(grayImageData, th);

	binCanvasElement.hidden = false;
	binCanvasElement.height = NUM_SAMPLE;
	binCanvasElement.width = NUM_SAMPLE;
	var sumLength = getLengthFinderPattern(binImage, 1);
	sumLength += getLengthFinderPattern(binImage, 2);
	sumLength += getLengthFinderPattern(binImage, 3);
	const SIZE_MODULE = sumLength / 12.0;
	const NUM_MODULE = NUM_SAMPLE / SIZE_MODULE;
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
		}
	}
	binCanvas.putImageData(binImage, 0, 0);
}
function trimQR(src, code, trimedCE){ /*jsqrの出力に従って、カメラの画像からQRコード部分を抜き出す。*/
	var point = calcPointCode(code);
	var trimWidth = point.right - point.left;
	var trimHeight = point.bottom - point.top;
	var trimImage = src.getImageData(point.left, point.top, trimWidth, trimHeight);
	trimedCE.hidden = false;
	trimedCE.height = trimHeight;
	trimedCE.width = trimWidth;
	return trimImage;
}
function getTrimQRbinImage(srcImageData, code){/*
	jsqrの出力に従って、カメラの画像からQRコード部分を抜き出し、2値化したImageDataを返す。*/
	var trimImageData = new ImageData(srcImageData.width, srcImageData.height);
	var point = calcPointCode(code);
	//pointの座標は浮動小数点数なので整数に変換する。
	var right = Math.ceil(point.right); //大きめの値を取るのでceilを使用。
	var left = Math.floor(point.left); //小さめの値を取るのでfloorを使用。
	var top = Math.floor(point.top);
	var bottom = Math.ceil(point.bottom);
	var w = srcImageData.width;
	var hist = new Array(256);
	hist.fill(0);
	for(y = top; y <= bottom; y++){
		for(x = left; x <= right; x++){
			var idx = pos2idx(x, y, 0, w);
			var red = srcImageData.data[idx + 0];
			var green = srcImageData.data[idx + 1];
			var blue = srcImageData.data[idx + 2];
			var gray = Math.round((red * 299 + green * 587 + blue * 114) / 1000);
			trimImageData.data[idx + 0] = red;
			trimImageData.data[idx + 1] = green;
			trimImageData.data[idx + 2] = blue;
			trimImageData.data[idx + 3] = 255;
			hist[Math.round(gray)]++;
			//console.log("x:%d, y:%d, idx:%d, r:%d g:%d b:%d c:%d", x, y, idx, red, blue, green, gray);
		}
	}
	//判別分析法を用いてしきい値を求める。
	var tMaxVarBC = getMaxVarianceBetweenClass(hist);
	for(y = top; y <= bottom; y++){
		for(x = left; x <= right; x++){
			var idx = pos2idx(x, y, 0, w);
			var gray = srcImageData.data[idx + 0];
			if(gray > tMaxVarBC){
				trimImageData.data[idx + 0] = 255;
				trimImageData.data[idx + 1] = 255;
				trimImageData.data[idx + 2] = 255;
			} else {
				trimImageData.data[idx + 0] = 0;
				trimImageData.data[idx + 1] = 0;
				trimImageData.data[idx + 2] = 0;
			}
		}
	}
	return trimImageData;
}
function sampleImage(src, numSample, code){/* 
	jsqrの出力に従ってカメラの画像からQRコード部分をサンプリングする。
	src: カメラ画像のcanvasオブジェクト
	numSample: サンプリング数=サンプリング後の画像サイズ
	code:jsqrの読込結果
	*/
	var image = new ImageData(numSample, numSample);
	for(y = 0; y < numSample; y++){
		pStart = getPointN( code.location.topLeftCorner,  code.location.bottomLeftCorner, y, numSample);
		pEnd = getPointN( code.location.topRightCorner,  code.location.bottomRightCorner, y, numSample);
		h = (pEnd.y - pStart.y) / numSample;
		w = (pEnd.x - pStart.x) / numSample;
		if(h >= 0){
			h = max(1, h);
		} else {
			h = min(-1, h);
		}
		if(w >= 0){
			w = max(1, w);
		} else {
			w = min(-1, w);
		}
		for(x = 0; x < numSample; x++){
			var point = getPointN(pStart, pEnd, x, numSample);
			var pixel = src.getImageData(point.x, point.y, w, h);
			var idx = pos2idx(x, y, 0, numSample);
			copyElements(pixel.data, image.data, 0, idx, 3);
			//image.data[idx + 0] = pixel.data[0];
			//image.data[idx + 1] = pixel.data[1];
			//image.data[idx + 2] = pixel.data[2];
			image.data[idx + 3] = 255;
		}
	}
	return image;
}
function sampleGrayImage(src, numSample, code){/*
	jsqrの出力に従ってカメラの画像からQRコード部分をサンプリングしてグレースケール画像とする。
	src: カメラ画像のcanvasオブジェクト
	numSample: サンプリング数=サンプリング後の画像サイズ
	code:jsqrの読込結果
	*/
	var grayImage = new ImageData(numSample, numSample);
	for(y = 0; y < numSample; y++){
		pStart = getPointN( code.location.topLeftCorner,  code.location.bottomLeftCorner, y, numSample);
		pEnd = getPointN( code.location.topRightCorner,  code.location.bottomRightCorner, y, numSample);
		h = (pEnd.y - pStart.y) / numSample;
		w = (pEnd.x - pStart.x) / numSample;
		if(h >= 0){
			h = max(1, h);
		} else {
			h = min(-1, h);
		}
		if(w >= 0){
			w = max(1, w);
		} else {
			w = min(-1, w);
		}
		for(x = 0; x < numSample; x++){
			var point = getPointN(pStart, pEnd, x, numSample);
			var pixel = canvas.getImageData(point.x, point.y, 1, 1);
			var data = pixel.data;
			var idx = pos2idx(x, y, 0, numSample);
			var gray = Math.round((data[0] * 299 + data[1] * 587 + data[2] * 114) / 1000);
			grayImage.data[idx + 0] = gray;
			grayImage.data[idx + 1] = gray;
			grayImage.data[idx + 2] = gray;
			grayImage.data[idx + 3] = 255;
		}
	}
	return grayImage;
}

function getBinImage(imgData, clrThreshold){/*
	imgDataの画像をclrThresholdに従って2値化する。
*/
	var w = imgData.width;
	var h = imgData.height;
	var binImg = new ImageData(imgData.width, imgData.height);
	for( y = 0; y < h; y++){
		for( x = 0; x < w; x++){
			var idx = pos2idx(x, y, 0, w);
			var num = 0;
			if(imgData.data[idx + 0] > clrThreshold.r){
				num++;
			}
			if(imgData.data[idx + 1] > clrThreshold.g){
				num++;
			}
			if(imgData.data[idx + 2] > clrThreshold.b){
				num++;
			}
			if(num >= 2){
				binImg.data[idx + 0] = 255;
				binImg.data[idx + 1] = 255;
				binImg.data[idx + 2] = 255;
			} else {
				binImg.data[idx + 0] = 0;
				binImg.data[idx + 1] = 0;
				binImg.data[idx + 2] = 0;
			}
			binImg.data[idx + 3] = 255;
		}
	}
	return binImg;
}
function sharpenImageGray(grayImageData) {/*
	先鋭化フィルタを入れる。
	var w = grayImageData.width;
	var h = grayImageData.height;
	var image = new ImageData(w, h);
	for(y = 0; y < h; y++){
		idx = pos2idx(0, y, 0, w);
		image.data[idx + 0] = grayImageData.data[idx + 0];
		image.data[idx + 1] = grayImageData.data[idx + 1];
		image.data[idx + 2] = grayImageData.data[idx + 2];
		image.data[idx + 3] = grayImageData.data[idx + 3];
*/
}
function getLengthFinderPattern(binImage, posPattern) {
	// ファインダーパターンの長さを求める。
	// binImage 2値化したQRコードの画像
	// posPattern 開始位置。1:左上, 2:右上, 3:左下
	var mode = 0;
	var sumLength = 0;
	var width = binImage.width;
	for(i = 0; i < width; i++) {
		var index = 0;
		if (posPattern == 1) {/*左上から右下に移動*/
			index = (i + i * width ) * 4; /*(i,i)*/
		} 
		else if (posPattern == 2) {/*右上から左下に移動*/
			index = ( (width - i) + i * width) * 4;/*(width-i,i)*/
		}
		else {/*左下から右上に移動*/
			index = (i + (width - i) * width) * 4;/*(i,width-i)*/
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

