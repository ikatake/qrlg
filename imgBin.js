//imgBin.js
//画像の2値化関係の関数をまとめる。
function getColorThresholed(imgData){
	/*
	2値化するためのしきい値を求める。
	imgData: canvasのコンテキストオブジェクト
	戻り値:color(r, g, b)
	*/
	var r = getOneThresholed(imgData, 0);
	var g = getOneThresholed(imgData, 1);
	var b = getOneThresholed(imgData, 2);
	var color = {r:r, g:g, b:b};
	return color;
}
function getOneThresholed(imgData, numClr){
	/*
	2値化するためのしきい値を求める。
	imgData: ImageDataオブジェクト
	numClr: 0:Red 1:Green 2:Blue 3:Alpha
	戻り値:thresholed
	*/
	var hist = new Array(256);
	hist.fill(0); //0で初期化する。
	w = imgData.width;
	h = imgData.height;
	//ヒストグラムを作成する。
	for(y = 0; y < h; y++){
		for(x = 0; x < w; x++){
			var idx = pos2idx(x ,y, numClr, w);
			var c = imgData.data[idx];
			hist[Math.round(c)]++;
		}
	}
	var tMaxVarBC = getMaxVarianceBetweenClass(hist);
	return tMaxVarBC;
}
function getMaxVarianceBetweenClass(histgram){/*
ヒストグラムから最大のクラス間分散となる閾値tを返す。
histgram: 単色のヒストグラムを示す整数型配列(要素数256個)
*/
	//判別分析法を用いてしきい値を求める。
	var maxVarBC = 0.0; //最大のクラス間分散
	var tMaxVarBC = 0;
	for(t = 0; t < 256; t++){
		var w1 = 0;//画素数ω
		var w2 = 0;
		var sum1 = 0;//合計値
		var sum2 = 0;
		var m1 = 0.0;//平均
		var m2 = 0.0;
		for(i = 0; i < t; i++){
			w1 += histgram[i];
			sum1 += histgram[i] * i;
		}
		if(w1 == 0){
			continue;
		}
		m1 = sum1 / w1;
		for(i = t; i < 256; i++){
			w2 += histgram[i];
			sum2 += histgram[i] * i
		}
		if(w2 == 0){
			continue;
		}
		m2 = sum2 /w2;
		/*クラス間分散σbの分子を求める。本来のクラス間分散σbは
		σb = 2×ω1×ω2×(m1-m2)^2 ÷ (ω1+ω2) であるが、ω1+ω2は全画素数
		であり、tによらず一定。よって比較には以下の項で十分である。*/
		var varBetweenClass = w1 * w2 * (m1 - m2) * (m1 - m2);
		if( maxVarBC < varBetweenClass ) {
			maxVarBC = varBetweenClass;
			tMaxVarBC = t;
		}
	}
	return tMaxVarBC;
}
