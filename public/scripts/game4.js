function startGame4() {
	var game4Header = document.getElementById('game4Header');
	var clickMe4 = document.getElementById('clickMe4');
	var scoreHeader4 = document.getElementById('scoreHeader4');
	var score4 = document.getElementById('score4');
	var divGameStage4 = document.getElementById('divGameStage4');
	var btnGame4 = document.getElementById('btnGame4');
	var gameOver4 = document.getElementById('gameOver4');

	spec = {
		width: 800,
		height: 600,
		bg: {
			src: "/img/game4/sweet-drop-bg.png"
		},
		structures: [{
			name: "tent",
			slices: [{
				name: "inactive",
				src: "/img/game4/tent.png"
			}, {
				name: "active",
				src: "/img/game4/tent-hit.png"
			}, {
				name: "broken",
				src: "/img/game4/tent-broken.png"
			}]
		}],
		popsicles: [{
			name: "creamsicle",
			slices: [{
				name: "falling",
				src: "/img/game4/creamsicle.png"
			}, {
				name: "crashed",
				src: "/img/game4/creamsicle-broken.png"
			}]
		}, {
			name: "bombpop",
			slices: [{
				name: "falling",
				src: "/img/game4/bomb-pop.png"
			}, {
				name: "crashed",
				src: "/img/game4/bomb-pop-broken.png"
			}]
		}, {
			name: "popsicle",
			slices: [{
				name: "falling",
				src: "/img/game4/popsicle.png"
			}, {
				name: "crashed",
				src: "/img/game4/popsicle-broken.png"
			}]
		}, {
			name: "pushUp",
			slices: [{
				name: "falling",
				src: "/img/game4/push-up.png"
			}, {
				name: "crashed",
				src: "/img/game4/push-up-broken.png"
			}]
		}]
	};

	game4Header.style.display = 'none';
	clickMe4.style.display = 'none';
	btnGame4.style.display = 'none';
	scoreHeader4.style.display = 'block';
	divGameStage4.style.display = 'block';
	game = BLOCKS.game(spec);
	game.prepare = function () {

		var score4 = 0;
		var bg,
			index = 0,
			structure,
			structures = [],
			popsicles = [],
			ground = game.height - 20,

			gameTapped = function (point) {

				var i;

				for (i = 0; i < popsicles.length; i += 1) {

					if (popsicles[i].isPointInside(point)) {
						score4 = score4 + 20;
						document.getElementById("score4").innerHTML = score4;
						popsicles[i].removeMotors();
						game.addMotor("alpha", {
							object: popsicles[i],
							duration: 500,
							amount: -1
						});
						game.addTicker(destroyPopsicle, 500, popsicles[i]);
					}
				}
			},

			destroyStructure = function (structure) {

				var i;

				for (i = 0; i < structures.length; i += 1) {
					if (structure === structures[i]) {
						structures.splice(i, 1);
						break;
					}
				}
				game.stage.removeView(structure);
				structure.destroy();
				structure = null;
			},

			spawnStructure = function () {

				structure = BLOCKS.block(spec.structures[0]);
				structure.layer = game.layers[1];
				game.stage.addView(structure);

				structure.x = Math.random() * (game.width - structure.width * 2) + structure.width / 2;
				structure.y = ground;
				structure.numHits = 0;

				game.addMotor("y", {
					object: structure,
					duration: 500,
					amount: -structure.height,
					easing: "easeOut"
				});

				structure.cropHeight = 0;
				game.addMotor("cropHeight", {
					object: structure,
					duration: 500,
					amount: structure.height,
					easing: "easeOut"
				});

				structures.push(structure);
			},

			destroyPopsicle = function (popsicle) {

				var i;
				for (i = 0; i < popsicles.length; i += 1) {
					if (popsicle === popsicles[i]) {
						popsicles.splice(i, 1);
						break;
					}
				}
				game.stage.removeView(popsicle);
				popsicle.destroy();
				popsicle = null;
			},

			destroyAllPopsicles = function (popsicles) {

				var i;
				for (i = 0; i < popsicles.length; i += 1) {
					if (popsicle === popsicles[i]) {
						popsicles.splice(i, 1);
						break;
					}
				}
				game.stage.removeView(popsicles);
				popsicles.destroy();
				popsicles = null;
			},

			dropPopsicle = function () {

				var popsicle,

					melt = function () {

						game.addMotor("alpha", {
							object: popsicle,
							duration: 800,
							amount: -1,
							easing: "easeIn",
							callback: function () {
								destroyPopsicle(popsicle);
							}
						});

						popsicle.cropHeight = popsicle.height;
						game.addMotor("cropHeight", {
							object: popsicle,
							duration: 1000,
							amount: -popsicle.height,
							easing: "easeIn"
						});

						game.addMotor("y", {
							object: popsicle,
							duration: 1000,
							amount: popsicle.height,
							easing: "easeIn"
						});
					};

				popsicle = BLOCKS.block(spec.popsicles[Math.floor(Math.random() * spec.popsicles.length)]);
				popsicle.layer = game.layers[2];
				game.stage.addView(popsicle);
				popsicles.push(popsicle);

				popsicle.x = Math.random() * (game.width - popsicle.width);
				popsicle.y = -popsicle.height;
				game.addMotor("y", {
					object: popsicle,
					duration: 3000,
					amount: ground,
					easing: "easeIn",
					callback: function () {

						var i,
							resetStructure = function (structure) {
								if (structure.getSlice().name === "active") {
									structure.setSlice("inactive");
								}
							};

						popsicle.setSlice("crashed");
						game.addTicker(melt, 2000);
						// Update score
						score4 = score4 - 10;
						document.getElementById("score4").innerHTML = score4;
						for (i = 0; i < structures.length; i += 1) {
							if (popsicle.isRectInside(structures[i])) {

								structures[i].numHits += 1;

								if (structures[i].numHits === 1) {
									structures[i].setSlice("active");

									game.addTicker(resetStructure, 2500, structures[i]);
								} else if (structures[i].numHits === 2) {

									structures[i].setSlice("broken");

									game.addTicker(destroyStructure, 3500, structures[i]);
									alert("Game Over");
									game.destroy();									
									divGameStage4.style.display = 'none';
									btnGame4.style.display = 'block';
									gameOver4.style.display = 'block';
									scoreHeader4.style.display = 'none';
								}
								
							}
						}
					}
				});

				game.addTicker(dropPopsicle, 3000);
			};

		bg = BLOCKS.slice(spec.bg);
		bg.layer = game.layers[0];
		game.stage.addView(bg);

		game.controller.addEventListener("tap", gameTapped);

		spawnStructure();

		dropPopsicle();
	};
}