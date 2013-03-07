/*
* =================================================
*
* Gauntless.js
*
* =================================================
*/

// functions with a global scope should go here


// functions with a scope restricted to the window load go here
window.onload = function() {

  // zoom target
  var $stage = document.getElementById('stage');
  var $zoomLess = document.getElementsByClassName('less')[0];
  var $zoomMore = document.getElementsByClassName('more')[0];
  var zoomScale = parseInt($stage.style.zoom);

  // cheat zoom
  if (document.getElementsByClassName('less')[0]){
    $zoomLess.onclick = function(){
      // make the stage 200% smaller on each click until it's minimum 100% of original scale
      if (zoomScale == 1){
        // do nowt
      } else {
        zoomScale -= 1;
        $stage.style.zoom = zoomScale;
      }
      return false;
    }
  }

  if (document.getElementsByClassName('more')[0]){

    $zoomMore.onclick = function(){
      // make the stage 200% bigger on each click until it's maximum 600% of original scale
      if (zoomScale >= 7){
        // do nowt
      } else {
        zoomScale += 1;
        $stage.style.zoom = zoomScale;
      }
      console.log(zoomScale);
      return false;
    }
  }

  // Canvas context crap
  var c=document.getElementById("stage");
  var ctx=c.getContext("2d");
  var y = 0;

  // map parser
  var map = "\
1111111111111111111111111111111111111111111111111111111111111111\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1111111111111111111111111113333331111111111111111111111111111111\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000F00000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000004000000400004000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1111111111111111111111111111111111111111111111111111111111111111\n";

  var $colours = [
    "#000000",
    "#ffffff",
    "#aaaaaa",
    "#555555",
    "#ffff55",
    "#aa5500",
    "#ff5555",
    "#aa0000",
    "#55ff55",
    "#00aa00",
    "#55ffff",
    "#00aaaa",
    "#5555ff",
    "#0000aa",
    "#ff55ff",
    "#aa00aa"
  ];

	$mapArray = mapParse(map);

	function colourLookup(x,y) {
		colourCode = $colours[parseInt($mapArray[y][x],16)];
		return colourCode;
	}

	function mapParse(map){
	  var mapArray = [];
	  var tmpArray = map.split("\n");
	  for(var i = 0; i < tmpArray.length; i++) {
	    mapArray.push(tmpArray[i].split(""));
	  }
		return mapArray;
	}

  function renderScreen() {
    for(y = 0; y < $mapArray.length; y++) {
      for(var x = 0; x < $mapArray[y].length; x++) {
        ctx.fillStyle = colourLookup(x,y);
        ctx.fillRect(x,y,1,1);
      }
    }
  }

  // player movement functions
  var moving = {};

  function movePlayerUp() {
    stopMoving();
    moving['up'] = setInterval(function()  {
      goUp();
    }, 50);
  }
  function movePlayerDown() {
    stopMoving();
    moving['down'] = setInterval(function()  {
      goDown();
    }, 50);
  }
  function movePlayerLeft() {
    stopMoving();
    moving['left'] = setInterval(function()  {
      goLeft();
    }, 50);
  }
  function movePlayerRight() {
    stopMoving();
    moving['right'] = setInterval(function()  {
      goRight();
    }, 50);
  }

  function goUp() {
    for(var y = 0; y < $mapArray.length; y++) {
      for(var x = 0; x < $mapArray[y].length; x++) {
        if ($mapArray[y][x] === "F") {
          var playerX = x;
          var playerY = y;
          break;
        }
      }
    }
    nextPos = (playerY-1);
    if ($mapArray[nextPos][playerX] != 1) {
      $mapArray[nextPos][playerX] = "F";
      $mapArray[playerY][playerX] = 0;
    }
  }

  function goDown() {
    for(var y = 0; y < $mapArray.length; y++) {
      for(var x = 0; x < $mapArray[y].length; x++) {
        if ($mapArray[y][x] === "F") {
          var playerX = x;
          var playerY = y;
          break;
        }
      }
    }
    nextPos = (playerY+1);
    if ($mapArray[nextPos][playerX] != 1) {
      $mapArray[nextPos][playerX] = "F";
      $mapArray[playerY][playerX] = 0;
    }
  }

  function goLeft() {
    for(var y = 0; y < $mapArray.length; y++) {
      for(var x = 0; x < $mapArray[y].length; x++) {
        if ($mapArray[y][x] === "F") {
          var playerX = x;
          var playerY = y;
          break;
        }
      }
    }
    nextPos = (playerX-1);
    if ($mapArray[playerY][nextPos] != 1) {
      $mapArray[playerY][nextPos] = "F";
      $mapArray[playerY][playerX] = 0;
    }
  }

  function goRight() {
    for(var y = 0; y < $mapArray.length; y++) {
      for(var x = 0; x < $mapArray[y].length; x++) {
        if ($mapArray[y][x] === "F") {
          var playerX = x;
          var playerY = y;
          break;
        }
      }
    }
    nextPos = (playerX+1);
    if ($mapArray[playerY][nextPos] != 1) {
      $mapArray[playerY][nextPos] = "F";
      $mapArray[playerY][playerX] = 0;
    }
  }

  function stopMoving() {
		var directions = ['up','down','left','right'];
		for(var i = 0; i < 4; i++) {
    	clearInterval(moving[directions[i]]);
		}
  }
	
	// Not sure why but if I call these with arguments or with empty brackets
	// they evaluate on load and never again or I'd one function with a direction
	// argument
	//
	// Here so that when you lift up on the non-active direction it doesn't
	// stop you from travelling in the active one.
	function stopMovingLeft() {
		clearInterval(moving['left']);
	}
	function stopMovingRight() {
		clearInterval(moving['right']);
	}
	function stopMovingUp() {
		clearInterval(moving['up']);
	}
	function stopMovingDown() {
		clearInterval(moving['down']);
	}

  // move player
  setHandler("Left", movePlayerLeft, stopMovingLeft);
  setHandler("Right", movePlayerRight, stopMovingRight);
  setHandler("Up", movePlayerUp, stopMovingUp);
  setHandler("Down", movePlayerDown, stopMovingDown);

  var z = 1
  // main game loop, redraws every 50 milliseconds
  setInterval(function() {
    renderScreen();

    // this is a test element
    // OMG IT BLINKS!!
    ctx.fillStyle = $colours[z];
    ctx.fillRect(5,5,1,1);
    if(z==16){
      z = 1;
    } else {
      z++;
    }

  }, 50);
}

// functions with a scope restricted to the window unload go here - I'm thinking any sort of clean up at this stage
window.unload = function(){
  // hammer away at the keys here
}
