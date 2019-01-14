//imgResamp.js
//画像の再標本化関係の関数をまとめる。
function getColorBicubic(imgData4x4, x, y, a){/*
	imgData: 元画像の近傍4x4のimageData
	a: バイキュービック補間の係数a(標準:-1.0) 
	戻り値:color(r, g, b)
	*/
	const r = getOneBicubic(imgData4x4, x, y, a, 0);
	const g = getOneBicubic(imgData4x4, x, y, a, 1);
	const b = getOneBicubic(imgData4x4, x, y, a, 2);
	const color = {r:r, g:g, b:b};
	return color;
}
function getGrayBicubic(imgData4x4, x, y, a){/*
	imgData: 元画像の近傍4x4のimageData
	a: バイキュービック補間の係数a(標準:-1.0) 
	戻り値:color(r, g, b)
	*/
	const gray = getOneBicubic(imgData4x4, x, y, a, 0);
	return gray;
}
function getOneBicubic(imgData4x4, px, py, a, clr){
	/*
	imgData: 元画像の近傍4x4のimageData
	戻り値:clrに指定されたRGBのうち1色のバイキュービック補間値
	*/
	const xFrac = px - Math.floor(px);
	const yFrac = py - Math.floor(py);
	const xArr = [1 + xFrac, xFrac, 1 - xFrac, 2 - xFrac];
	//var yArr = [1 + yFrac, yFrac, 1 - yFrac, 2 - yFrac];
	//バイキュービック補間の式でyは北+であるが、jsは南+なので書き換える。
	const yArr = [2 - yFrac, 1 - yFrac, yFrac, 1 + yFrac];
	let result = 0.0;
	for(let x = 0;  x < 4; x++){
		let resultY = 0.0;
		for(let y = 0; y < 4; y++){
			//idx = pos2idx(x, y, clr, 4);
			let idx = pos2idx(x, 3 - y, clr, 4);
			resultY += imgData4x4.data[idx] * getH(yArr[y], a);
		}
		resultY *= getH(xArr[x], a);
		result += resultY;
	}
	return Math.round(result);
}
function getH(t, a){/*
	バイキュービック補間のh(t)を求める。
	なお、aの値を引数で調整できるように一般化した式とする。
	t :求める座標と各画素の座標の距離
	a :近似式の係数(標準的にはa=-1とのこと。)
	*/
	const t_abs = Math.abs(t);
	if(t_abs > 2.0){
		return 0;
	}
	const t2 = t_abs * t_abs;
	const t3 = t2 * t_abs;
	if(t_abs <= 1.0){
		return ( (a + 2.0) * t3 ) - ( (a + 3.0) * t2 ) + 1.0;
	}
	return (a * t3) - (5.0 * a * t2) + (8.0 * a * t_abs) - (4.0 * a);
}
