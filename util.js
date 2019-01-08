// util.js

function pos2idx(x, y, numRGBA, width){/*
x, yの座標からImageDataのdata配列インデックスを返す。
*/
	return ( ( y * width + x ) * 4 + numRGBA );
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
	var x = Math.round( p0.x + dx * ( i / ( n - 1 ) ) );
	var y = Math.round( p0.y + dy * ( i / ( n - 1 ) ) );
	var p = {x:x, y:y};
	return p;
}
function copyElements(src, dst, idxSrc, idxDst, len){/*
src:コピー元の配列　dst:コピー先の配列
idxSrc:コピー元の配列の基準インデックス
idxDst:コピー先の配列の基準インデックス
len:長さ
*/
	for( i = 0; i < len; i++){
		if(dst[i + idxDst] == undefined || src[i + idxSrc] == undefined){
			continue;
		}
		dst[i + idxDst] = src[i + idxSrc];
	}
	return i;
}
function writeElements(val, dst, idxDst, len){/*
val:書込む値　dst:書込み先の配列
idxDst:書込み先の配列の基準インデックス
len:長さ
*/
	for( i = 0; i < len; i++){
		if(dst[i + idxDst] == undefined){
			continue;
		}
		dst[i + idxDst] = val;
	}
	return i;
}

