//drawStates.js
//lifegameの描画関係
'use strict'

function drawCanvas(space, canvas, sizeCell) {
	for (let y = 0; y < space.height; y++) {
		var py = y * sizeCell;
		for (let x = 0; x < space.width; x++) {
			var px = x * sizeCell;
			var index = x + y * space.width;
			if (space.states[index] == ALIVE) {
				var clr = 0;
			} else {
				var clr = 255;
			}
			canvas.fillStyle = "rgba(" + clr + ","  + clr + "," + clr + ",1)";
			canvas.fillRect(px, py, sizeCell, sizeCell);
		}
	}
}
