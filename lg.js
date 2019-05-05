//lg.js
//lifegame動作関係
'use strict'
const ALIVE = true;
const DEAD = false;
function getNextGeneration(space) {
	var nextSpace = {}
	nextSpace.width = space.width;
	nextSpace.height = space.height;
	var states = [];
	for (let y = 0; y < space.height; y++) {
		for (let x = 0; x < space.width; x++) {
			let index = x + space.width * y;
			states[index] = getNextState(x, y, space); 
		}
	}
	nextSpace.states = states;
	nextSpace.generation = space.generation + 1;
	return nextSpace;
}
function getNextState(px, py, space){
	var north = py - 1;
	if (north < 0) {
		north = space.height - 1;
	}
	var west = px - 1;
	if (west < 0) {
		west = space.width - 1;
	}
	var south = py + 1;
	if (south >= space.height) {
		south = 0;
	}
	var east = px + 1;
	if (east >= space.width) {
		east = 0;
	}
	var countLive = 0;
	[north, py, south].forEach(function(y) {
		 [west, px, east].forEach(function(x) {
			let index = x + space.width * y;
			if ( (!( (px == x) && (py == y) ) ) && (space.states[index] == ALIVE) ) {
				/*自セル以外で生きている数を数える。*/
				countLive++;
			}
		 });
	});
	var pindex = px + space.width * py;
	if (space.states[pindex] == DEAD) {
		if (countLive == 3) {
			return ALIVE;
		} else {
			return DEAD;
		}
	} else {
		if (countLive <= 1 || countLive >= 4) {
			return DEAD;
		} else {
			return ALIVE;
		}
	}
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
	space.generation = 0;
	return space;
}

