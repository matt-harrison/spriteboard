tricks = new Array();
tricks.push('none');
tricks.push('Ollie');
tricks.push('Frontside 180');
tricks.push('Backside 180');
tricks.push('Kickflip');
tricks.push('Heelflip');
tricks.push('Backside Shuvit');
tricks.push('Frontside Shuvit');
tricks.push('Varialflip');
tricks.push('Varial Heelflip');
tricks.push('Hardflip');
tricks.push('Inward Heelflip');
tricks.push('360 flip');
tricks.push('Laserflip');
tricks.push('Pedal');
tricks.push('Pedal');
tricks.push('Powerslide');
tricks.push('Powerslide');
tricks.push('Bail');

grinds = new Array();
grinds.push('none');
grinds.push('50-50 Grind');
grinds.push('5-0 Grind');
grinds.push('Nosegrind');
grinds.push('Smith Grind');
grinds.push('Feeble Grind');
grinds.push('Crooked');
grinds.push('Noseslide');
grinds.push('Tailslide');
grinds.push('Boardslide');
grinds.push('Lipslide');
grinds.push('Bluntslide');
grinds.push('Noseblunt');

obstacles = new Array();

advance = false;
tutorial = new Array();
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