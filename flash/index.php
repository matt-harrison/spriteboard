<?php
$title = 'spriteboard';
$desc = 'prototype for a flash-based skateboarding game with old-school pixelated graphics, by matt harrison.';
?>
<?php include($_SERVER['DOCUMENT_ROOT'] . '/includes/header.php'); ?>
<?php
$iPod = stripos($_SERVER['HTTP_USER_AGENT'], 'iPod');
$iPhone = stripos($_SERVER['HTTP_USER_AGENT'], 'iPhone');
$iPad = stripos($_SERVER['HTTP_USER_AGENT'] , 'iPad');
$webOS = stripos($_SERVER['HTTP_USER_AGENT'], 'webOS');
?>
<?php if($iPod || $iPhone || $iPad || $webOS){ ?>
	<div id="flash" class="mAuto mb5 bdrLtBrown bdrRound p10 w800 txtC">
		<p class="fs48">flash is not available on this device.</p>
		<p class="fs48">go sit at a computer.</p>
		<p class="fs48">it's worth it.</p>
	</div>
<?php } else { ?>
	<div id="flash" class="mAuto mb5 txtC">
		<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="480" height="400" id="spriteboard">
			<param name="allowScriptAccess" value="sameDomain"/>
			<param name="allowFullScreen" value="false"/>
			<param name="movie" value="spriteboard.swf"/>
			<param name="quality" value="high"/>
			<embed src="spriteboard.swf" quality="high" width="480" height="400" name="spriteboard" align="middle" allowscriptaccess="sameDomain" allowfullscreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"/>
		</object>
	</div>
	<div class="mAuto mb5 bdrLtBrown bdrRound p10 w500 bgWhite monospace">
		<p class="mb5">
		<p class="mb5">------3</p>
		<p class="mb5">Q-W-E--</p>
		<p class="mb5">A-S-D--</p>
		<p class="mb5">Z-X-C-V</p>
	</div>
<?php } ?> 
<?php include($_SERVER['DOCUMENT_ROOT'] . '/includes/footer.php'); ?>