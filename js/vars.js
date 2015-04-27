obstacles = [];

sprites = [];
sprites.push('img/characters/matt.png');
sprites.push('img/characters/laura.png');
sprites.push('img/characters/marty.png');
sprites.push('img/characters/bart.png');

sprites.push('img/btnBG.png');
sprites.push('img/boards/red.png');
sprites.push('img/boards/blue.png');
sprites.push('img/boards/green.png');
sprites.push('img/boards/hoverboard.png');

sprites.push('img/levels/pavement.png');
sprites.push('img/levels/sidewalk.png');
sprites.push('img/levels/street.png');

sprites.push('img/obstacles/barrier.png');
sprites.push('img/obstacles/box.png');
sprites.push('img/obstacles/cone.png');
sprites.push('img/obstacles/crate.png');
sprites.push('img/obstacles/guard-rail.png');
sprites.push('img/obstacles/rail.png');
sprites.push('img/obstacles/ramp.png');
sprites.push('img/obstacles/stage.png');

tricks = [];
tricks['none'] = 				0;
tricks['Ollie'] = 				1;
tricks['Frontside 180'] = 		2;
tricks['Backside 180'] = 		3;
tricks['Kickflip'] =			4;
tricks['Heelflip'] = 			5;
tricks['Backside Shuvit'] = 	6;
tricks['Frontside Shuvit'] = 	7;
tricks['Varialflip'] = 			8;
tricks['Varial Heelflip'] = 	9;
tricks['Hardflip'] = 			10;
tricks['Inward Heelflip'] = 	11;
tricks['360 flip'] = 			12;
tricks['Laserflip'] = 			13;
tricks['Pedal'] = 				14;
tricks['Pedal'] = 				15;
tricks['Powerslide'] = 			16;
tricks['Powerslide'] = 			17;
tricks['Bail'] = 				18;

grinds = [];
grinds['none'] = 				0;
grinds['50-50 Grind'] = 		1;
grinds['5-0 Grind'] = 			2;
grinds['Nosegrind'] = 			3;
grinds['Smith Grind'] = 		4;
grinds['Feeble Grind'] = 		5;
grinds['Crooked'] = 			6;
grinds['Noseslide'] = 			7;
grinds['Tailslide'] = 			8;
grinds['Boardslide'] = 			9;
grinds['Lipslide'] = 			10;
grinds['Bluntslide'] = 			11;
grinds['Noseblunt'] = 			12;

//Backgrounds
pavement = {
	'img': 'pavement',
	'width': 360
};

sidewalk = {
	'img': 'sidewalk',
	'width': 360
};

street = {
	'img': 'street',
	'width': 1800
};

//Obstacles
barrier = {
	'name': 'barrier',
	'class': 'Ledge',
	'width': 250,
	'height': 60
}

box = {
	'name': 'box',
	'class': 'Ledge',
	'width': 300,
	'height': 40
};

cone = {
	'name': 'cone',
	'class': 'Block',
	'width': 50,
	'height': 70
};

crate = {
	'name': 'crate',
	'class': 'Block',
	'width': 60,
	'height': 60
};

guardRail = {
	'name': 'guard-rail',
	'class': 'Ledge',
	'width': 630,
	'height': 40
};

stage40 = {
	'name': 'stage40',
	'class': 'Platform',
	'width': 300,
	'height': 40
};

stage80 = {
	'name': 'stage80',
	'class': 'Platform',
	'width': 300,
	'height': 80
};

stage120 = {
	'name': 'stage120',
	'class': 'Platform',
	'width': 300,
	'height': 120
};

//Levels
parkingLot = {
	'bg': pavement,
	'obstacles': [
		{
			'type': crate,
			'xPosition': 100
		},
		{
			'type': box,
			'xPosition': 460
		},
		{
			'type': box,
			'xPosition': 810
		}
	]
};

gaps = {
	'bg': sidewalk,
	'obstacles': [
		{
			'type': stage40,
			'xPosition': 0
		},
		{
			'type': stage80,
			'xPosition': 475
		},
		{
			'type': stage120,
			'xPosition': 950
		}
	]
};

interstate = {
	'bg': street,
	'obstacles': [
		{
			'type': barrier,
			'xPosition': 140
		},
		{
			'type': guardRail,
			'xPosition': 640
		},
		{
			'type': cone,
			'xPosition': 1340
		}
	]
};

advance = false;
tutorial = [];
//tutorial[x] = [message, swipe, trick, status];

tutorial.push(['Swipe <span class="txtBlue">LEFT</span> to <span class="txtWhite">Pedal</span>.', 'W', 'Pedal', 'ride']);
tutorial.push(['<span class="txtBlue">TAP</span> to <span class="txtWhite">Ollie</span>.', '', 'Ollie', 'land']);
tutorial.push(['Swipe <span class="txtBlue">DOWN</span> to crouch.', 'S', 'Ollie', 'crouch']);
tutorial.push(['While crouching, <span class="txtBlue">TAP</span> to <span class="txtWhite">Ollie</span>.', '', 'Ollie', 'land']);

tutorial.push(['You are riding <span class="txtGreen">Regular</span>.<br/><br/>Swipe <span class="txtBlue">RIGHT</span> to switch stances with a <span class="txtWhite">Powerslide</span>.', 'E', 'Powerslide', 'ride']);
tutorial.push(['You are now riding <span class="txtGreen">Switch</span>.<br/><br/><span class="txtBlue">TAP</span> to <span class="txtGreen">Switch</span> <span class="txtWhite">Ollie</span>.', '', 'Ollie', 'land']);
tutorial.push(['Swipe <span class="txtBlue">RIGHT</span> again to <span class="txtWhite">Powerslide</span> back.', 'E', 'Powerslide', 'ride']);

tutorial.push(['A <span class="txtWhite">Kickflip</span> rolls the board upside down.<br/><br/>Swipe <span class="txtBlue">DOWN</span> to crouch.', 'S', 'Ollie', 'crouch']);
tutorial.push(['While crouching, swipe <span class="txtBlue">LEFT</span> to <span class="txtWhite">Kickflip</span>.', 'W', 'Kickflip', 'land']);
tutorial.push(['A <span class="txtWhite">Heelflip</span> rolls the board upside down to the other side.<br/><br/>Swipe <span class="txtBlue">DOWN</span> to crouch.', 'S', 'Ollie', 'crouch']);
tutorial.push(['While crouching, swipe <span class="txtBlue">RIGHT</span> to <span class="txtWhite">Heelflip</span>.', 'E', 'Heelflip', 'land']);
tutorial.push(['A <span class="txtWhite">Backside Shuvit</span> or <span class="txtWhite">Varial</span> spins the board around.<br/><br/>Swipe <span class="txtBlue">DOWN</span> to crouch.', 'S', 'Ollie', 'crouch']);
tutorial.push(['While crouching, swipe <span class="txtBlue">DOWN</span> to <span class="txtWhite">Backside Shuvit</span>.', 'S', 'Backside Shuvit', 'land']);
tutorial.push(['A <span class="txtWhite">Frontside Shuvit</span> spins the board the other way.<br/><br/>Swipe <span class="txtBlue">DOWN</span> to crouch.', 'S', 'Ollie', 'crouch']);
tutorial.push(['While crouching, swipe <span class="txtBlue">UP</span> to <span class="txtWhite">Frontside Shuvit</span>.', 'N', 'Frontside Shuvit', 'land']);

tutorial.push(['The next 4 tricks combine fliptricks and shuvits.<br/><br/><span class="txtBlue">TAP</span> to continue.', '', 'TAP', 'ride']);
tutorial.push(['A <span class="txtWhite">Varialflip</span> combines a <span class="txtWhite">Backside Shuvit</span> and a <span class="txtWhite">Kickflip</span>.<br/><br/>Swipe <span class="txtBlue">DOWN</span> to crouch.', 'S', 'Ollie', 'crouch']);
tutorial.push(['While crouching, swipe to the <span class="txtBlue">TOP LEFT</span> to <span class="txtWhite">Varialflip</span>.', 'NW', 'Varialflip', 'land']);
tutorial.push(['A <span class="txtWhite">Varial Heelflip</span> combines a <span class="txtWhite">Frontside Shuvit</span> and a <span class="txtWhite">Heelflip</span>.<br/><br/>Swipe <span class="txtBlue">DOWN</span> to crouch.', 'S', 'Ollie', 'crouch']);
tutorial.push(['While crouching, swipe to the <span class="txtBlue">TOP RIGHT</span> to <span class="txtWhite">Varial Heelflip</span>.', 'NE', 'Varial Heelflip', 'land']);
tutorial.push(['An <span class="txtWhite">Inward Heelflip</span> combines a <span class="txtWhite">Backside Shuvit</span> and a <span class="txtWhite">Heelflip</span>.<br/><br/>Swipe <span class="txtBlue">DOWN</span> to crouch.', 'S', 'Ollie', 'crouch']);
tutorial.push(['While crouching, swipe to the <span class="txtBlue">BOTTOM RIGHT</span> to <span class="txtWhite">Inward Heelflip</span>.', 'SE', 'Inward Heelflip', 'land']);
tutorial.push(['A <span class="txtWhite">Hardflip</span> combines a <span class="txtWhite">Frontside Shuvit</span> and a <span class="txtWhite">Kickflip</span>.<br/><br/>Swipe <span class="txtBlue">DOWN</span> to crouch.', 'S', 'Ollie', 'crouch']);
tutorial.push(['While crouching, swipe to the <span class="txtBlue">BOTTOM LEFT</span> to <span class="txtWhite">Hardflip</span>.', 'SW', 'Hardflip', 'land']);

tutorial.push(['A <span class="txtWhite">Frontside 180</span> spins the board and the rider around forward in the air.<br/><br/>Swipe to the <span class="txtBlue">BOTTOM LEFT</span> to wind up for a <span class="txtWhite">Frontside 180</span>.', 'SW', 'Frontside 180', 'crouch']);
tutorial.push(['After winding up, <span class="txtBlue">TAP</span> to <span class="txtWhite">Frontside 180</span>.', '', 'Frontside 180', 'land']);
tutorial.push(['Swipe to the <span class="txtBlue">BOTTOM LEFT</span> to wind up for a <span class="txtGreen">Switch</span> <span class="txtWhite">Frontside 180</span>.', 'SW', 'Frontside 180', 'crouch']);
tutorial.push(['After winding up, <span class="txtBlue">TAP</span> to <span class="txtGreen">Switch</span> <span class="txtWhite">Frontside 180</span>.', '', 'Frontside 180', 'land']);
tutorial.push(['A <span class="txtWhite">Backside 180</span> spins the board and the rider around backward in the air.<br/><br/>Swipe to the <span class="txtBlue">BOTTOM RIGHT</span> to wind up for a <span class="txtWhite">Backside 180</span>.', 'SE', 'Backside 180', 'crouch']);
tutorial.push(['After winding up, <span class="txtBlue">TAP</span> to <span class="txtWhite">Backside 180</span> back.', '', 'Backside 180', 'land']);
tutorial.push(['Swipe to the <span class="txtBlue">BOTTOM RIGHT</span> to wind up for a <span class="txtGreen">Switch</span> <span class="txtWhite">Backside 180</span>.', 'SE', 'Backside 180', 'crouch']);
tutorial.push(['After winding up, <span class="txtBlue">TAP</span> to <span class="txtGreen">Switch</span> <span class="txtWhite">Backside 180</span> back.', '', 'Backside 180', 'land']);

tutorial.push(['You can also combine fliptricks and 180s.<br/><br/>Swipe to the <span class="txtBlue">BOTTOM LEFT</span> to wind up for a <span class="txtWhite">Frontside 180</span>.', 'SW', 'Frontside 180', 'crouch']);
tutorial.push(['After winding up, swipe <span class="txtBlue">LEFT</span> to <span class="txtWhite">Kickflip</span>.', 'W', 'Kickflip', 'land']);
tutorial.push(['The board did a <span class="txtWhite">Kickflip</span>, but the rider did a <span class="txtWhite">Frontside 180</span>.<br/><br/>This independent spin is called a <span class="txtGreen">Body Varial</span>.<br/><br/>Swipe <span class="txtBlue">RIGHT</span> to <span class="txtWhite">Powerslide</span> back.', 'E','Powerslide', 'ride']);

tutorial.push(['A <span class="txtWhite">Frontside Flip</span> combines a <span class="txtWhite">Frontside 180</span> and a <span class="txtWhite">Hardflip</span>.<br><br/>Swipe to the <span class="txtBlue">BOTTOM LEFT</span> to wind up for a <span class="txtWhite">Frontside 180</span>.', 'SW', 'Frontside 180', 'crouch']);
tutorial.push(['After winding up, swipe to the <span class="txtBlue">BOTTOM LEFT</span> to <span class="txtWhite">Frontside Flip</span>.', 'SW', 'Hardflip', 'land']);
tutorial.push(['Swipe <span class="txtBlue">RIGHT</span> again to <span class="txtWhite">Powerslide</span> back.', 'E', 'Powerslide', 'ride']);
tutorial.push(['A <span class="txtWhite">Backside Flip</span> combines a <span class="txtWhite">Backside 180</span> and a <span class="txtWhite">Varialflip</span>.<br><br/>Swipe to the <span class="txtBlue">BOTTOM RIGHT</span> to wind up for a <span class="txtWhite">Backside 180</span>.', 'SE', 'Backside 180', 'crouch']);
tutorial.push(['After winding up, swipe to the <span class="txtBlue">TOP LEFT</span> to <span class="txtWhite">Backside Flip</span>.', 'NW', 'Varialflip', 'land']);
tutorial.push(['Swipe <span class="txtBlue">RIGHT</span> again to <span class="txtWhite">Powerslide</span> back.', 'E', 'Powerslide', 'ride']);
tutorial.push(['A <span class="txtWhite">Frontside Heelflip</span> combines a <span class="txtWhite">Frontside 180</span> and a <span class="txtWhite">Varial Heelflip</span>.<br><br/>Swipe to the <span class="txtBlue">BOTTOM LEFT</span> to wind up for a <span class="txtWhite">Frontside 180</span>.', 'SW', 'Frontside 180', 'crouch']);
tutorial.push(['After winding up, swipe to the <span class="txtBlue">TOP RIGHT</span> to <span class="txtWhite">Frontside Heelflip</span>.', 'NE', 'Varial Heelflip', 'land']);
tutorial.push(['Swipe <span class="txtBlue">RIGHT</span> again to <span class="txtWhite">Powerslide</span> back.', 'E', 'Powerslide', 'ride']);
tutorial.push(['A <span class="txtWhite">Backside Heelflip</span> combines a <span class="txtWhite">Backside 180</span> and an <span class="txtWhite">Inward Heelflip</span>.<br><br/>Swipe to the <span class="txtBlue">BOTTOM RIGHT</span> to wind up for a <span class="txtWhite">Frontside 180</span>.', 'SE', 'Backside 180', 'crouch']);
tutorial.push(['After winding up, swipe to the <span class="txtBlue">BOTTOM RIGHT</span> to <span class="txtWhite">Backside Heelflip</span>.', 'SE', 'Inward Heelflip', 'land']);
tutorial.push(['Swipe <span class="txtBlue">RIGHT</span> again to <span class="txtWhite">Powerslide</span> back.', 'E', 'Powerslide', 'ride']);

tutorial.push(['Congrats, you have completed the tutorial.<br/><br/>Now <span class="txtBlue">TAP</span> to return to the <span class="txtGreen">Main Menu</span>.', '', 'END', 'ride']);