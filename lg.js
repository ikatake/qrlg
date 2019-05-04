//lg.js
//lifegame動作関係
'use strict'
const ALIVE = true;
const DEAD = false;
function getNextGeneration(space) {
	
}
function getInitialSpace(binaryMatrix) {
	var space = {};
	space.width = binaryMatrix.width;
	space.height = binaryMatrix.height;
	var states = [];
	for (let y = 0; y < binaryMatrix.height; y++) {
		for (let x = 0; x < binaryMatrix.width; x++) {
			var index = x + binaryMatrix.width * y;
			if (binaryMatrix.data[index] == 1) {
				states[index] = ALIVE;
			} else {
				states[index] = DEAD;
			}
		}
	}
	space.states = states;
	return space;
}

