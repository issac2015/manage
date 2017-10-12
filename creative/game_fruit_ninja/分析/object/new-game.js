/**
 * @source D:\hosting\demos\fruit-ninja\output\scripts\object\new-game.js
 */ 
define("scripts/object/new-game.js", function(exports){
	var rotate = require("scripts/factory/rotate");
	var tween = require("scripts/lib/tween");
	
	exports = rotate.create("images/new-game.png", 244, 231, 195, 195, 1e-5, tween.exponential.co, 500);;

	return exports;
});
