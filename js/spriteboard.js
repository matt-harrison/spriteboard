/*
TODO: 
- manuals over platforms?
- fliptricks with body varials out of grinds? (long swipe to spin + flip without windup? would override 360 flip and laserflip)
- ramps?
- 360s?
*/
$(function() {
	function advanceTutorial() {
		if (tutorialStep < tutorial.length - 1) {
			tutorialStep++;
			$('#hud').html(tutorial[tutorialStep][0]);
			advance = false;
		}
	}
	
	function animate() {
		if (!gameOver) {
			if (mode == 'game') {
				for (var i=0; i<obstacles.length; i++) {
					obstacles[i].update();
				}
				if (player.status != 'crash') {
					for (var i=0; i<obstacles.length; i++) {
						obstacles[i].draw();
					}
				}
				bg.update();
				bg.draw();
			}
			if (obstacles.length > 0) {
				var lastObs = obstacles[obstacles.length - 1];
				if (lastObs.x + lastObs.width < 0) {
					for (var i=0; i<obstacles.length; i++) {
						obstacles[i].x = obstacles[i].defaultX;
					}
				}
			}
			player.update();
			board.update();
			player.draw();
			board.draw();
			$('#debug').html(player.status);
		}
		timer++;
		animInt = setTimeout(animate, 1000/frameRate);
	}

	function bail() {
		speed = 0;
		player.status = 'crash';
		if (player.stance == 'goofy') {
			player.stance = 'regular';
			player.switchStance = !player.switchStance;
		}
		player.trick = 'Bail';
		if (currentObstacle.class == 'Platform') {
			player.y = currentObstacle.y - player.height;
		} else {
			player.y = ground - player.height;
		}
		setFrame(player);
	}
	
	function checkStumblePosition(obj) {
		var collision = false;
		//offset hit area since board is narrower than the full sprite
		if (player.x + player.width > obj.x && player.x + pixelScale*2 < obj.x + obj.width) {
			if (player.y + player.height > obj.y && player.y < obj.y + obj.height) {
				collision = true;
			}
		}
		return collision;
	}
	
	function checkObstaclePosition(obj) {
		var playerLeftEdge = player.x + pixelScale * 2;
		var playerRightEdge = player.x + player.width;
		var boxLeftEdge = obj.x;
		var boxRightEdge = obj.x + obj.width;
		var collision = (playerRightEdge > boxLeftEdge && playerLeftEdge < boxRightEdge);
		return collision;
	}
	
	function perform(dir, longSwipe) {
		if (gameOver) {
			if (dir == '') {//tap to reset
				gameOver = false;
				resetPlayer();
			}
		} else {
			if (player.status == 'ride') {
				if (['NW', 'N', 'NE'].indexOf(dir) != -1) {
					gravity = 0 - popStrength;
					player.status = 'ollie';
					player.trick = 'Ollie';
					snap = true;
				} else if (dir == 'E') {
					if (longSwipe) {
						setNollie(!player.nollie);
					} else {
						player.status = 'powerslide';
					}
				} else if (dir == 'SE') {
					player.status = 'crouch';
					player.spin = 'bs';
					player.trick = 'Backside 180';
				} else if (dir == 'S') {
					player.status = 'crouch';
					player.trick = 'Ollie';
				} else if (dir == 'SW') {
					player.status = 'crouch';
					player.spin = 'fs';
					player.trick = 'Frontside 180';
				} else if (dir == 'W') {
					setNollie(false);
					player.status = 'pushing';
					var speedInc = (longSwipe) ? speedIncrement * 2 : speedIncrement;
					if (speed === 0) {
						speed = speedInc;
					} else if (speed + speedInc < speedMax) {
						speed += speedInc;
					} else {
						speed = speedMax;
					}
				}
				setFrame(player);
			} else if (player.status == 'crouch' || player.status == 'grind') {
				if (player.status == 'grind') {
					player.snapOut = true;
					if (['Nosegrind', 'Noseslide', 'Noseblunt', 'Crooked'].indexOf(player.trick) != -1) {
						player.nollie = true;
					}
				}
				player.status = 'trick';
				if (player.spin == '') {
					if (dir == 'N') {
						player.trick = 'Frontside Shuvit';
					} else if (dir == 'NE') {
						if (longSwipe) {
							player.trick = 'Laserflip';
						} else {
							player.trick = 'Varial Heelflip';
						}
					} else if (dir == 'E') {
						if (longSwipe) {
							player.spin = 'fs';
							player.trick = 'Frontside 180';
							board.trick = 'Frontside 180';
						} else {
							player.trick = 'Heelflip';
						}
					} else if (dir == 'SE') {
						player.trick = 'Inward Heelflip';
					} else if (dir == 'S') {
						player.trick = 'Backside Shuvit';
					} else if (dir == 'SW') {
						player.trick = 'Hardflip';
					} else if (dir == 'W') {
						if (longSwipe) {
							player.spin = 'bs';
							player.trick = 'Backside 180';
							board.trick = 'Backside 180';
						} else {
							player.trick = 'Kickflip';
						}
					} else if (dir == 'NW') {
						if (longSwipe) {
							player.trick = '360 flip';
						} else {
							player.trick = 'Varialflip';
						}
					} else {//tap only
						player.status = 'ollie';
						player.trick = 'Ollie';
					}
				} else {
					//add fliptrick to a spin
					if (dir == 'N') {
						board.trick = 'Frontside Shuvit';
					} else if (dir == 'NE') {
						if (longSwipe) {
							board.trick = 'Laserflip';
						} else {
							board.trick = 'Varial Heelflip';
						}
					} else if (dir == 'E') {
						board.trick = 'Heelflip';
					} else if (dir == 'SE') {
						board.trick = 'Inward Heelflip';
					} else if (dir == 'S') {
						board.trick = 'Frontside Shuvit';
					} else if (dir == 'SW') {
						board.trick = 'Hardflip';
					} else if (dir == 'W') {
						board.trick = 'Kickflip';
					} else if (dir == 'NW') {
						if (longSwipe) {
							board.trick = '360 flip';
						} else {
							board.trick = 'Varialflip';
						}
					} else {//tap only
						if (player.spin == 'fs') {
							board.trick = 'Frontside 180';
						} else if (player.spin == 'bs') {
							board.trick = 'Backside 180';
						}
					}
					if (player.spin == 'fs') {
						player.trick = 'Frontside 180';
					} else if (player.spin == 'bs') {
						player.trick = 'Backside 180';
					}
				}
				gravity = 0 - popStrength;
				snap = true;
				setFrame(player);
				setFrame(board);
			} else if (player.status == 'ollie' || player.status == 'catch') {
				player.trick = 'none';
				if (currentObstacle == '' || currentObstacle.class == 'Platform') {
					player.status = 'trick';
					if (dir == 'N') {
						player.trick = 'Frontside Shuvit';
					} else if (dir == 'NE') {
						if (longSwipe) {
							player.trick = 'Laserflip';
						} else {
							player.trick = 'Varial Heelflip';
						}
					} else if (dir == 'E') {
						player.trick = 'Heelflip';
					} else if (dir == 'SE') {
						player.trick = 'Inward Heelflip';
					} else if (dir == 'S') {
						player.trick = 'Backside Shuvit';
					} else if (dir == 'SW') {
						player.trick = 'Hardflip';
					} else if (dir == 'W') {
						player.trick = 'Kickflip';
					} else if (dir == 'NW') {
						if (longSwipe) {
							player.trick = '360 flip';
						} else {
							player.trick = 'Varialflip';
						}
					}
				} else if (currentObstacle.class == 'Ledge') {//prepare for grind
					player.status = 'pose';
					if (dir == 'N') {
						if (longSwipe) {
							player.trick = 'Bluntslide';
							grindOffset = pixelScale;
						} else {
							player.trick = 'Noseslide';
							grindOffset = pixelScale * 2.5;
						}
					} else if (dir == 'NE') {
						if (longSwipe) {
							player.trick = 'Crooked';
							grindOffset = pixelScale * 0.5;
						} else {
							player.trick = 'Feeble Grind';
							grindOffset = pixelScale;
						}
					} else if (dir == 'E') {
						player.trick = 'Nosegrind';
						grindOffset = pixelScale * 0.5;
					} else if (dir == 'SE') {
						player.trick = 'Smith Grind';
						grindOffset = pixelScale * 2;
					} else if (dir == 'S') {
						if (longSwipe) {
							player.trick = 'Noseblunt';
							grindOffset = pixelScale;
						} else {
							player.trick = 'Tailslide';
							grindOffset = pixelScale * 2.5;
						}
					} else if (dir == 'SW') {
						player.trick = 'Lipslide';
						grindOffset = pixelScale;
					} else if (dir == 'W') {
						player.trick = '5-0 Grind';
						grindOffset = pixelScale * 0.5;
					} else if (dir == 'NW') {
						if (longSwipe) {
							player.trick = 'Crooked';
							grindOffset = pixelScale * 0.5;
						} else  {
							player.trick = 'Boardslide';
							grindOffset = pixelScale;
						}
					} else if (dir == '') {
						player.trick = '50-50 Grind';
						grindOffset = pixelScale * 0.5;
					}
				}
				if (player.trick != '') {
					setFrame(player);
				}
			}
		}
	}
	
	function playerOn(obj) {
		var inPosition = false;
		if (gravity >= 0 && player.y + player.height <= obj.y && player.y + player.height + gravity + gravityIncrement >= obj.y) {
			inPosition = true;
		}
		return inPosition;
	}
	
	function preload(slot) {
		var image = new Image();
		image.src = sprites[slot];
		image.onload = function() {
			var percentage = Math.floor((slot / sprites.length) * 100);
			$('#percentage').html(percentage + '%');
			if (slot < sprites.length - 1) {
				slot++;
				preload(slot);
			} else {
				$('#loading').addClass('hide');
				$('#title').removeClass('hide');
				$('#stage').removeClass('hide');
			}
		}; 
	}
	
	function quitGame() {
		gameOver = true;
		mode = 'menu';
		resetPlayer();
		player.update();
		board.update();
		player.draw();
		board.draw();
		$('#hud').addClass('hide').html('');
		$('#title').removeClass('hide');
	}
	
	function resetPlayer() {
		player.status = 'ride';
		player.trick = 'none';
		player.spin = '';
		player.combo = false;
		player.snapOut = false;
		player.y = ground - player.height;
		speed = 0;
		snap = true;
		currentObstacle = '';
		if (player.switchStance) {
			if (player.stance == 'regular') {
				player.stance = 'goofy';
			} else {
				player.stance = 'regular';
			}
			player.switchStance = false;
		}
		setFrame(player);
		setNollie(false);
		
		//Remove obstacles
		if (obstacles.length > 0) {
			for (var i=0; i<obstacles.length; i++) {
				obstacles[i].selector.remove();
			}
			obstacles.splice(0);
		}
		
		//Re-distribute obstacles
		for (var i=0; i<level.obstacles.length; i++) {
			var obstacle = level.obstacles[i];
			if (obstacle.type.class == 'Block') {
				var block = new Block(obstacle.type.name, 360 + obstacle.xPosition);
			} else if (obstacle.type.class == 'Ledge') {
				var ledge = new Ledge(obstacle.type.name, 360 + obstacle.xPosition);
			} else if (obstacle.type.class == 'Platform') {
				var platform = new Platform(obstacle.type.name, 360 + obstacle.xPosition);
			}
		}
		
		bg.init(level.bg);
		$('#hud').html('');
	}
	
	function setFrame(obj) {
		//TRIGGER ANIMATION
		if (['ride', 'land', 'crouch', 'catch'].indexOf(player.status) != -1) {
			row = 0;
			col = tricks[obj.trick];
			if (player.stance == 'goofy') {
				col += 5;
			}
		} else if (player.status == 'dragging') {
			row = 14;
			col = 2;
			if (player.stance == 'goofy') {
				row++;
			}
		} else if (player.status == 'pose' || player.status == 'grind') {
			row = grinds[obj.trick];
			col = 8;
			if (player.stance == 'goofy') {
				col++;
			}
		} else if (player.status == 'powerslide') {
			col = 0;
			row = 16;
			if (player.stance == 'goofy') {
				row++;
			}
			waitFrame = true;
		} else if (player.status == 'pushing') {
			col = 0;
			row = 14;
			if (player.stance == 'goofy') {
				row++;
			}
			waitFrame = true;
		} else {
			col = 0;
			row = tricks[obj.trick];
			if (player.stance == 'goofy') {
				col += 4;
			}
			waitFrame = true;
		}
		obj.spriteX = 0 - obj.width * col;
		obj.spriteY = 0 - obj.height * row;
		
		//DISPLAY TRICK NAME
		if (mode == 'game' && obj == player) {
			if (['crouch', 'powerslide', 'ollie'].indexOf(player.status) != -1) {
				clearTimeout(waitInt);
				$('#hud').html('');
			}
			if (player.status == 'land') {
				waitInt = setTimeout(function() {$('#hud').html('')}, 1000);
			} else if (player.status == 'powerslide') {
				$('#hud').html('<span class="txtWhite">Powerslide</span>');
			} else if (player.status == 'ollie' || player.status == 'trick') {
				var modifier = '';
				if (player.combo || player.snapOut) {
					$('#hud').append('<br/> <span class="txtGray">+</span> ');
				}
				if (player.combo && !player.snapOut) {
					$('#hud').append('<span class="txtGreen">Late</span> ');
				}
				if (player.nollie) {
					if (player.switchStance) {
						modifier = '<span class="txtGreen">Fakie </span> ';
					} else {
						modifier = '<span class="txtGreen">Nollie </span> ';
					}
				} else {
					if (player.switchStance) {
						modifier = '<span class="txtGreen">Switch </span> ';
					}
				}
				if (player.spin == '') {
					if (player.nollie) {
						if (player.trick == 'Ollie') {
							$('#hud').append(modifier);//No such thing as a "Nollie Ollie"
						} else {
							$('#hud').append(modifier + ' ' + obj.trick);
						}
					} else {
						$('#hud').append(modifier + obj.trick);
					}
				} else if (player.spin == 'fs') {
					if (board.trick == 'Hardflip') {
						$('#hud').append('Frontside Flip');
					} else if (board.trick == 'Inward Heelflip') {
						$('#hud').append('Frontside Heelflip');
					} else if (board.trick == '360 flip') {
						$('#hud').append('Bigflip');
					} else if (board.trick == 'Laserflip') {
						$('#hud').append('Big Heelflip');
					} else if (board.trick == 'Frontside 180' || (board.trick == 'Frontside Shuvit') && obj.trick == 'Frontside 180') {
						if (player.nollie) {
							$('#hud').append('Frontside Half Cab');
						} else {
							$('#hud').append(modifier + 'Frontside 180');
						}
					} else {
						$('#hud').append(board.trick + '<br/><span class="txtGray">+</span> <span class="txtGreen">Frontside Body Varial</span>');
					}
				} else if (player.spin == 'bs') {
					if (board.trick == 'Varialflip') {
						$('#hud').append('Backside Flip');
					} else if (board.trick == 'Inward Heelflip') {
						$('#hud').append('Backside Heelflip');
					} else if (board.trick == '360 flip') {
						$('#hud').append('Bigflip');
					} else if (board.trick == 'Laserflip') {
						$('#hud').append('Big Heelflip');
					} else if ((board.trick == 'Backside 180' || board.trick == 'Backside Shuvit') && obj.trick == 'Backside 180') {
						if (player.nollie) {
							$('#hud').append('Half Cab');
						} else {
							$('#hud').append(modifier + 'Backside 180');
						}
					} else {
						$('#hud').append(board.trick + '<br/><span class="txtGray">+</span> <span class="txtGreen">Backside Body Varial</span>');
					}
				}
			} else if (player.status == 'grind') {
				var grindName = obj.trick;
				if (player.combo || player.snapOut) {
					$('#hud').append('<br/> <span class="txtGray">+</span> ');
				}
				$('#hud').append(grindName);
			}
		} else if (mode == 'tutorial') {
			if (player.status == tutorial[tutorialStep][3] && advance) {
				advanceTutorial();
			}
		}
	}

	function setNollie(isNollie) {
		if (isNollie) {
			player.nollie = true;
			player.selector.addClass('nollie');
			board.selector.addClass('nollie');
		} else {
			player.nollie = false;
			player.selector.removeClass('nollie');
			board.selector.removeClass('nollie');
		}
	}
	
	function swipeEnd(endX, endY) {
		var shortSwipe = 30;
		var longSwipe = 200;
		
		var isLongSwipe = false;
		var swipe = '';
		var swipeHoriz = '';
		var swipeVert = '';
		
		var leftLength = startX - endX;
		var rightLength = endX - startX;
		var upLength = startY - endY;
		var downLength = endY - startY;
		
		if (leftLength >= shortSwipe) {
			swipeHoriz = 'left';
		} else if (rightLength >= shortSwipe) {
			swipeHoriz = 'right';
		}
		if (upLength >= shortSwipe) {
			swipeVert = 'up';
		} else if (downLength >= shortSwipe) {
			swipeVert = 'down';
		}
		if (swipeHoriz == 'left') {
			if (swipeVert == 'up') {
				swipe = 'NW';
			} else if (swipeVert == 'down') {
				swipe = 'SW';
			} else {
				swipe = 'W';
			}
		} else if (swipeHoriz == 'right') {
			if (swipeVert == 'up') {
				swipe = 'NE';
			} else if (swipeVert == 'down') {
				swipe = 'SE';
			} else {
				swipe = 'E';
			}
		} else if (swipeHoriz == '') {
			if (swipeVert == 'up') {
				swipe = 'N';
			} else if (swipeVert == 'down') {
				swipe = 'S';
			}
		}
		
		if (swipe == 'N') {
			if (upLength > longSwipe) {
				isLongSwipe = true;
			}
		} else if (swipe == 'NE') {
			if (upLength > longSwipe && rightLength > longSwipe) {
				isLongSwipe = true;
			}
		} else if (swipe == 'E') {
			if (rightLength > longSwipe) {
				isLongSwipe = true;
			}
		} else if (swipe == 'SE') {
			if (downLength > longSwipe && rightLength > longSwipe) {
				isLongSwipe = true;
			}
		} else if (swipe == 'S') {
			if (downLength > longSwipe) {
				isLongSwipe = true;
			}
		} else if (swipe == 'SW') {
			if (downLength > longSwipe && leftLength > longSwipe) {
				isLongSwipe = true;
			}
		} else if (swipe == 'W') {
			if (leftLength > longSwipe) {
				isLongSwipe = true;
			}
		} else if (swipe == 'NW') {
			if (upLength > longSwipe && leftLength > longSwipe) {
				isLongSwipe = true;
			}
		}
		
		if (mode == 'game') {
			perform(swipe, isLongSwipe);
		} else if (mode == 'tutorial') {
			performTutorial(swipe, isLongSwipe);
		}
	}
	
	function performTutorial(dir, length) {
		//check if input matches next tutorial requirement
		if (dir == tutorial[tutorialStep][1]) {
			advance = true;
			if (tutorial[tutorialStep][2] == 'TAP') {
				advanceTutorial();
			} else if (tutorial[tutorialStep][2] == 'END') {
				quitGame();
			} else {
				$('#hud').html('');
				perform(dir);
			}
		}
	}

	//Prevent mobile windows from dragging and scrolling
	document.body.addEventListener('touchstart', function(e) {
		e.preventDefault();
	});
	
	pixelScale = 10;
	frameRate = 12;
	timer = 0;
	gravity = 0;
	gravityIncrement = 8;
	speed = 0;
	speedIncrement = 10;
	speedMax = 50;
	popStrength = 30;
	ground = 400;
	waitInt = 0;
	waitFrame = false;
	snap = false;
	holding = false;
	gameOver = true;
	currentObstacle = '';
	mode = 'menu';
	level = parkingLot;
	debugMode = String(location.search).indexOf('debug') !== - 1;
	
	preload(0);
	
	//Check for debug mode
	if (debugMode) {
		$('#game, #stage').css('height', '465px');
		$('#debug').removeClass('hide');
	}
	
	//Declare obstacle classes
	var Block = function(type, defaultX) {
		this.id = obstacles.length;
		this.class = 'Block';
		this.type = type;
		
		$('#obstacles').append('<div id="' + this.type + this.id + '" class="' + this.type + ' abs"/>');
		this.selector = $('#' + this.type + this.id);
		
		this.width = this.selector.width();
		this.height = this.selector.height();
		this.x = defaultX;
		this.y = ground - this.height;
		this.defaultX = defaultX;
		
		this.selector.css('left', this.x).css('top', this.y).css('width', this.width).css('height', this.height);
		obstacles.push(this);
			
		this.update = function() {
			if (player.status != 'crash' && player.y != (ground - player.height) && checkStumblePosition(this)) {
				bail();
			}
			this.x -= speed;
		};
		this.draw = function() {
			this.selector.css('left', this.x);
		};
	};
	
	var Ledge = function(type, defaultX) {
		this.id = obstacles.length;
		this.class = 'Ledge';
		this.type = type;
		
		$('#obstacles').append('<div id="' + this.type + this.id + '" class="' + this.type + ' abs"/>');
		this.selector = $('#' + this.type + this.id);
		
		this.width = this.selector.width();
		this.height = this.selector.height();
		this.x = defaultX;
		this.y = ground - this.height;
		this.defaultX = defaultX;
		
		this.selector.css('left', this.x).css('top', this.y).css('width', this.width).css('height', this.height);
		obstacles.push(this);
		
		this.update = function() {
			if (currentObstacle == '') {
				if (checkObstaclePosition(this) && player.status != 'grind') {//Prevent automatic transfers between objects
					currentObstacle = this;
				}
			} else if (currentObstacle == this) {
				if (!checkObstaclePosition(this)) {
					currentObstacle = '';
				}
			}
			this.x -= speed;
		};
		this.draw = function() {
			this.selector.css('left', this.x);
		};
	};
	
	var Platform = function(type, defaultX) {
		this.id = obstacles.length;
		this.class = 'Platform';
		this.type = type;
		
		$('#obstacles').append('<div id="' + this.type + this.id + '" class="' + this.type + ' abs"/>');
		this.selector = $('#' + this.type + this.id);
		
		this.width = this.selector.width();
		this.height = this.selector.height();
		this.x = defaultX;
		this.y = ground - this.height;
		this.defaultX = defaultX;
		
		this.selector.css('left', this.x).css('top', this.y).css('width', this.width).css('height', this.height);
		obstacles.push(this);
		
		this.update = function() {
			if (currentObstacle == '') {
				if (checkObstaclePosition(this) && player.status != 'grind') {//Prevent automatic transfers between objects
					currentObstacle = this;
				}
			} else if (currentObstacle == this) {
				if (!checkObstaclePosition(this)) {
					currentObstacle = '';
					if (playerOn(this)) {
						if (['ride', 'crouch', 'land'].indexOf(player.status) != -1) {
							player.status = 'catch';
							player.spin = '';
							player.trick = 'Kickflip';
							setFrame(player);
						} else {
							bail();
						}
					}
				}
			}
			this.x -= speed;
		};
		this.draw = function() {
			this.selector.css('left', this.x);
		};
	};
	
	//Declare game objects
	player = {
		id: 'player', 
		selector: $('#player'),
		character: 'matt', 
		width: 120, 
		height: 140, 
		x: 130, 
		y: 260, 
		spriteW: 1000, 
		spriteH: 2650, 
		spriteX: 0, 
		spriteY: 0, 
		status: 'ride', 
		stance: 'regular', 
		switchStance: false, 
		nollie: false, 
		spin: '', 
		trick: '', 
		combo: false, 
		snapOut: false, 
		init: function() {
			this.selector.attr('class', this.character + ' abs').css('left', this.x + 'px');
		}, 
		update: function() {
			if ((player.status == 'ride' || player.status == 'dragging') && holding) {
				if (timer - holdStart > 4) {
					if (this.status != 'dragging') {
						this.status = 'dragging';
						setFrame(this);
					}
					if (speed > 0) {
						if ((timer - holdStart) % 4 == 0) {
							speed -= speedIncrement;
						}
					} 
				}
			}
			if (waitFrame) {
				//if pose was set by user input, preserve it for one animation loop cycle
				waitFrame = false;
				if (this.status == 'ollie') {
					this.combo = true;
				}
				if (this.nollie) {
					setNollie(true);
				}
			} else {
				if (this.status == 'ollie' || this.status == 'trick') {//advance frame
					if ((this.stance == 'regular' && this.spriteX > 0 - (this.width * 3)) || (this.stance == 'goofy' && this.spriteX > 0 - (this.width * 7))) {
						this.spriteX -= this.width;
					} else {
						if (this.status == 'trick') {
							this.status = 'catch';
							this.trick = 'Kickflip';
							this.combo = true;
							setFrame(this);
						}
						if (this.spin != '') {
							if (this.stance == 'regular') {
								this.spriteX = 0 - (this.width * 7);
								this.spriteY = 0;
								this.stance = 'goofy';
							} else if (this.stance == 'goofy') {
								this.spriteX = 0 - (this.width * 4);
								this.spriteY = 0;
								this.stance = 'regular';
							}
							this.switchStance = !this.switchStance;
							this.spin = '';
							setFrame(this);
						}
						this.trick = 'none';
					}
				}
				if (['ollie', 'trick', 'catch', 'pose'].indexOf(this.status) != -1) {//increment gravity
					if (snap) {
						snap = false;
					} else {
						gravity += gravityIncrement;
					}
					var inPosition = playerOn(currentObstacle);
					if (inPosition && currentObstacle.class == 'Ledge' && this.status == 'pose') {
						this.y = currentObstacle.y - this.height + grindOffset;
						this.status = 'grind';
						gravity = 0;
						setFrame(this);
					} else if (inPosition && currentObstacle.class == 'Platform') {
						if (this.status == 'trick') {
							bail();
						} else {
							this.y = currentObstacle.y - this.height;
							this.status = 'land';
							gravity = 0;
							setFrame(this);
						}
					} else {//above ground
						if (this.y + this.height + gravity < ground) {
							this.y += gravity;
							console.log(gravity);
						} else {
							gravity = 0;
							this.y = ground - this.height;
							if (this.status == 'trick') {
								bail();
							} else {
								this.status = 'land';
								this.trick = 'none';
								setFrame(this);
							}
						}
					}
				}
				if (this.status == 'pushing') {
					if (this.spriteX > 0 - (this.width * 5)) {
						this.spriteX -= this.width;
					} else {
						this.status = 'ride';
						this.trick = 'none';
						setFrame(this);
					}
				} else if (this.status == 'powerslide') {
					if (this.spriteX > 0 - (this.width * 5)) {
						this.spriteX -= this.width;
					} else {
						this.status = 'land';
						if (this.stance == 'regular') {
							this.stance = 'goofy';
						} else if (this.stance == 'goofy') {
							this.stance = 'regular';
						}
						this.switchStance = !this.switchStance;
						this.trick = 'none';
						setFrame(this);
					}
					if (this.status == 'ride') {
						this.trick = 'none';
						setFrame(this);
					}
				} else if (this.status == 'grind') {
					if (currentObstacle == '') {
						this.status = 'catch';
						this.trick = 'Kickflip';
						this.combo = true;
						setFrame(this);
					}
				} else if (this.status == 'crash') {
					//extra long animation
					if (this.spriteX > 0-(this.width*6)) {
						this.spriteX -= this.width;
					} else {
						gameOver = true;
						this.combo = false;
						this.snapOut = false;
						$('#hud').html('Tap to reset.');
					}
				} else if (this.status == 'land') {
					this.status = 'ride';
					this.trick = 'none';
					this.combo = false;
					this.snapOut = false;
					setFrame(this);
				}
				if (this.nollie && ['catch', 'land', 'pose'].indexOf(this.status) != -1) {
					setNollie(false);
				}
			}
		}, 
		draw: function() {
			this.selector.css('background-position', (this.spriteX) + 'px ' + (this.spriteY) + 'px').css('top', this.y);
		}
	}
	
	board = {
		id: 'board', 
		selector: $('#board'), 
		width: 100, 
		height: 140, 
		x: 130, 
		y: 260, 
		spriteW: 1000, 
		spriteH: 2650, 
		spriteX: 0, 
		spriteY: 0, 
		trick: '', 
		init: function() {
			this.selector.attr('class', this.model + ' abs').css('left', this.x + 'px');
		}, 
		update: function() {
			this.x = player.x;
			this.y = player.y;
			this.spriteX = player.spriteX;
			if (player.spin == '') {
				this.spriteY = player.spriteY;
			}
		}, 
		draw: function() {
			this.selector.css('background-position', (this.spriteX) + 'px ' + (this.spriteY) + 'px').css('top', this.y);
		}
	}
	
	bg = {
		selector1: $('#bg1'),
		selector2: $('#bg2'),
		level: 'pavement', 
		x: 0,
		width: 360,
		init: function(bg) {
			this.level = bg.img;
			this.width = bg.width;
			this.x = 0;
			this.selector1.attr('class', this.level + ' abs').css('left', this.x + 'px');
			this.selector2.attr('class', this.level + ' abs').css('left', (this.x + this.width) + 'px');
		},
		update: function() {
			if (this.x + this.width - speed <= 0) {
				this.x = 0;
			} else {
				this.x -= speed;
			}
		},
		draw: function() {
			this.selector1.css('left', this.x + 'px');
			this.selector2.css('left', (this.x + this.width) + 'px');
		}
	}
	
	//INTERFACE
	//Main menu	
	$('#btnPlay').bind('mouseup touchend', function() {
		gameOver = false;
		mode = 'game';
		resetPlayer();
		$('#title').addClass('hide');
		$('#hud').addClass('txtWhite').removeClass('hide');
	});
	$('#btnOptions').bind('mouseup touchend', function() {
		$('#title').addClass('hide');
		$('#options').removeClass('hide');
	});
	$('#btnTutorial').bind('mouseup touchend', function() {
		gameOver = false;
		mode = 'tutorial';
		tutorialStep = 0;
		player.stance = 'regular';
		player.spriteX = 0;
		$('#title').addClass('hide');
		$('#hud').removeClass('txtWhite').removeClass('hide').html(tutorial[tutorialStep][0]);
	});
	
	//Options menu
	$('#btnCharacterSelect').bind('mouseup touchend', function() {
		$('#options').addClass('hide');
		$('#characterSelect').removeClass('hide');
	});
	$('#btnLevelSelect').bind('mouseup touchend', function() {
		$('#options').addClass('hide');
		$('#levelSelect').removeClass('hide');
	});
	$('#btnStance').bind('mouseup touchend', function() {
		if (player.stance == 'regular') {
			player.stance = 'goofy';
			player.spriteX = 0 - (player.width * 5);
		} else {
			player.stance = 'regular';
			player.spriteX = 0;
		}
		player.draw();
	});
	$('#btnMainMenu').bind('mouseup touchend', function() {
		$('#options').addClass('hide');
		$('#title').removeClass('hide');
	});
	
	//Character Select menu
	$('#btnCharacterMatt').bind('mouseup touchend', function() {
		player.character = 'matt';
		board.model = 'red';
		player.init();
		board.init();
	});
	$('#btnCharacterLaura').bind('mouseup touchend', function() {
		player.character = 'laura';
		board.model = 'blue';
		player.init();
		board.init();
	});
	$('#btnCharacterMarty').bind('mouseup touchend', function() {
		player.character = 'marty';
		board.model = 'hoverboard';
		player.init();
		board.init();
	});
	$('#btnCharacterBart').bind('mouseup touchend', function() {
		player.character = 'bart';
		board.model = 'green';
		player.init();
		board.init();
	});
	$('#characterSelect #btnBackToOptions').bind('mouseup touchend', function() {
		$('#characterSelect').addClass('hide');
		$('#options').removeClass('hide');
	});
	
	//Level Select menu
	$('#btnParkingLot').bind('mouseup touchend', function() {
		level = parkingLot;
		bg.init(level.bg);
	});
	$('#btnInterstate').bind('mouseup touchend', function() {
		level = interstate;
		bg.init(level.bg);
	});
	$('#btnGaps').bind('mouseup touchend', function() {
		level = gaps;
		bg.init(level.bg);
	});
	$('#levelSelect #btnBackToOptions').bind('mouseup touchend', function() {
		$('#levelSelect').addClass('hide');
		$('#options').removeClass('hide');
	});

	//
	$('.button').bind('mouseup touchend', function() {
		var buttonSet = $(this).data('buttonset');
		if (buttonSet != undefined) {
			$('[data-buttonset="' + buttonSet + '"]').removeClass('selected');
			$(this).addClass('selected');
		}
	});
	
	//Keyboard listeners
	$('body').keydown(function(event) {
		//alert('event: ' + event.which);
		if (event.which == 13) {//ENTER
			if (frameRate == 0) {
				frameRate = 12;
				animate();
			} else {
				frameRate = 0;
				clearInterval(animInt);
			}
			$('#debug').html('framerate: ' + frameRate);
		}
		if (event.which == 38) {//UP ARROW
			frameRate++;
			$('#debug').html('framerate: ' + frameRate);
		}
		if (event.which == 40) {//DOWN ARROW
			frameRate--;
			$('#debug').html('framerate: ' + frameRate);
		}
		if (event.which == 81 || event.which == 27) {//Q or ESCAPE
			quitGame();
		}
	});
	
	//Mouse/touchscreen listeners
	$('#stage').bind('mousedown', function(e) {
		holding = true;
		holdStart = timer;
		startX = e.clientX;
		startY = e.clientY;
	})
	.bind('mouseup', function(e) {
		holding = false;
		if (player.status == 'dragging') {
			holdStart = null;
			player.status = 'ride';
			setFrame(player);
		} else {
			swipeEnd(e.clientX, e.clientY);
		}
	})
	.bind('touchstart', function(e) {
		holding = true;
		holdStart = timer;
		if (e.originalEvent.touches.length > 1) {
			quitGame();
		} else {
			startX = e.originalEvent.touches[0].pageX;
			startY = e.originalEvent.touches[0].pageY;
		}
	})
	.bind('touchend', function(e) {
		endX = e.originalEvent.changedTouches[0].pageX;
		endY = e.originalEvent.changedTouches[0].pageY;
		holding = false;
		if (player.status == 'dragging') {
			holdStart = null;
			player.status = 'ride';
			setFrame(player);
		} else {
			swipeEnd(endX, endY);
		}
	});

	animate();
});
