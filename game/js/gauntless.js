/*
* =================================================
*
* Gauntless.js
*
* =================================================
*/

// functions with a global scope should go here

$scale = 1;
$canvasSizeDefault = 64;
$grindcoreMode = false;

// functions with a scope restricted to the window load go here
window.onload = function() {

  // zoom target
  var $stage = document.getElementById('stage');
  var $zoomLess = document.getElementsByClassName('less')[0];
  var $zoomMore = document.getElementsByClassName('more')[0];
  //var zoomScale = parseInt($stage.style.zoom);

  // cheat zoom
  if (document.getElementsByClassName('less')[0]){
    $zoomLess.onclick = function(){
      // make the stage 200% smaller on each click until it's minimum 100% of original scale
      if ($scale != 1){
        $scale -= 1;
      }
      return false;
    };
  }

  if (document.getElementsByClassName('more')[0]){

    $zoomMore.onclick = function(){
      // make the stage 200% bigger on each click until it's maximum 600% of original scale
      if ($scale <= 7){
        $scale += 1;
      }
      console.log($scale);
      return false;
    };
  }

  // Canvas context crap
  var c=document.getElementById("stage");
  var ctx=c.getContext("2d");
  var y = 0;

  // map parser
  /*jshint multistr: true */
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
111111111111111111111111111DDDDDD1111111111111111111111111111111\n\
1000000000000000000010000000000000000000000000000000000000000001\n\
1000000000000000000010000000000000000000000000000000000000000001\n\
1000000000000000000010000000000000000000000000000000000000000001\n\
1000000000000000000010000000000000000000000000000000000000000001\n\
1000000000K00000000010000000000000000000000000000000000000000001\n\
10000000000000000000D0000000000000000000000000000000000000000001\n\
10000000000000000000D0000000000000000000000000000000000000000001\n\
1000000G000000000000D0000000000000000000000000000000000000000001\n\
10000000000000000000D0000000000000000000000000000000000000000001\n\
100000000000G000000010000000000000000000000000000000000000000001\n\
1000000000000000000010000000000000000000000000000000000000000001\n\
1000000000000000000010000000000000000000000000000000000000000001\n\
1111111111111111111110000000000000000000000000000000000000000001\n\
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
100000000000000G000000G0000G000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
1000000000000000000000000000000000000000000000000000000000000001\n\
10K0000000000000000000000000000000000000000000000000000000000001\n\
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
    if (bulletChars.indexOf($mapArray[y][x]) >= 0) {
        var colour = 2;
    } else if ($mapArray[y][x] === keyChar) {
      var colour = 4;
    } else if ($mapArray[y][x] === doorChar) {
      var colour = 3;
    } else if ($mapArray[y][x] === ghostChar) {
      var colour = 8;
    } else {
        var colour = parseInt($mapArray[y][x],16);
    }
    return $colours[colour];
  }

  function mapParse(map){
    var mapArray = [];
	var tmpArray = map.split("\n");
    for(var i = 0; i < tmpArray.length; i++) {
      mapArray.push(tmpArray[i].split(""));
	}
    return mapArray;
  }

  var fps = 60;
  function renderScreen() {
    setTimeout(function() {
    document.getElementById('health').innerHTML = playerHealth;
    document.getElementById('keys').innerHTML = playerKeys;
    document.getElementById('score').innerHTML = playerScore;
      ctx.clearRect(0, 0, c.width, c.height);
      requestAnimationFrame(renderScreen);
      for(var y = 0; y < $mapArray.length; y++) {
        for(var x = 0; x < $mapArray[y].length; x++) {
          ctx.fillStyle = colourLookup(x,y);
          ctx.fillRect($scale * x,$scale * y,$scale,$scale);
        }
      }
    }, 1000 / fps);
  }

  /**
   * char maps
   */
  var playerChar = "F";
  var bulletChars = [ "N", "E", "S", "W" ];
  var keyChar = "K";
  var ghostChar = "G";
  var doorChar = "D";

  /**
   * player movement functions
   * and status vars
   */
  var playerSpeed = 40;
  var playerHealth = 1000;
  var playerScore = 0;
  var playerKeys = 0;
  var facing = "N";
  var moving = {};

  function movePlayerUp() {
    facing = "N";
    moving['up'] = setInterval(function()  {
      goUp();
    }, playerSpeed);
  }

  function movePlayerDown() {
    facing = "S";
    moving['down'] = setInterval(function()  {
      goDown();
    }, playerSpeed);
  }

  function movePlayerLeft() {
    facing = "W";
    moving['left'] = setInterval(function()  {
      goLeft();
    }, playerSpeed);
  }

  function movePlayerRight() {
    facing = "E";
    moving['right'] = setInterval(function()  {
      goRight();
    }, playerSpeed);
  }

  function findPlayer() {
    for(var y = 0; y < $mapArray.length; y++) {
      for(var x = 0; x < $mapArray[y].length; x++) {
        if ($mapArray[y][x] === playerChar) {
          var playerX = x;
          var playerY = y;
          return([playerX, playerY]);
        }
      }
    }
  }

  // general function where we can add things to do on collision
  // like pick up key, remove health, open doors, or exit level
  function movePlayer(playerX, playerY, nextX, nextY) {
    // move to empty space
    if ($mapArray[nextY][nextX] == 0) {
      $mapArray[nextY][nextX] = playerChar;
      $mapArray[playerY][playerX] = 0;
    }

    // add key
    if ($mapArray[nextY][nextX] == keyChar) {
      $mapArray[nextY][nextX] = "0";
      playerKeys++;
    }

    // hit a door, use a key or stop
    if ($mapArray[nextY][nextX] == doorChar) {
      if (playerKeys > 0) {
        openDoor(nextX, nextY);
        playerKeys--;
      }
    }

    // hit a ghost, remove health
    if ($mapArray[nextY][nextX] == ghostChar) {
      playerHealth--;
      console.log(playerHealth);
    }
  }

  // holy shit, this is lame, its prolly too late to keep coding
  // this doesnt even make sense to me anymore
  function openDoor(doorX, doorY) {
    $mapArray[doorY][doorX] = "0";
    var nextLeft = doorX;
    var nextRight = doorX;
    var nextUp = doorY;
    var nextDown = doorY;
    var hasMoreX = true;
    var hasMoreY = true;
    while (hasMoreX) {
      var noMoreLeft = false;
      var noMoreRight = false;
      nextLeft++;
      if ($mapArray[doorY][nextLeft] == doorChar) {
        $mapArray[doorY][nextLeft] = 0;
      } else {
        noMoreLeft = true;
        nextRight--;
        if ($mapArray[doorY][nextRight] == doorChar) {
          $mapArray[doorY][nextRight] = 0;
        } else {
          noMoreRight = true;
        }
      }
      if (noMoreLeft && noMoreRight) {
        hasMoreX = false;
      }
    }
    while (hasMoreY) {
      var noMoreDown = false;
      var noMoreUp = false;
      nextDown++;
      if ($mapArray[nextDown][doorX] == doorChar) {
        $mapArray[nextDown][doorX] = 0;
      } else {
        noMoreDown = true;
        nextUp--;
        if ($mapArray[nextUp][doorX] == doorChar) {
          $mapArray[nextUp][doorX] = 0;
        } else {
          noMoreUp = true;
        }
      }
      if (noMoreUp && noMoreDown) {
        hasMoreY = false;
      }
    }
  }

  function goUp() {
    var playerPos = findPlayer();
    var playerX = playerPos[0];
    var playerY = playerPos[1];
    var nextY = (playerY-1);
    var nextX = playerX;
    movePlayer(playerX, playerY, nextX, nextY);
  }

  function goDown() {
    var playerPos = findPlayer();
    var playerX = playerPos[0];
    var playerY = playerPos[1];
    var nextY = (playerY+1);
    var nextX = playerX;
    movePlayer(playerX, playerY, nextX, nextY);
  }

  function goLeft() {
    var playerPos = findPlayer();
    var playerX = playerPos[0];
    var playerY = playerPos[1];
    var nextX = (playerX-1);
    var nextY = playerY;
    movePlayer(playerX, playerY, nextX, nextY);
  }

  function goRight() {
    var playerPos = findPlayer();
    var playerX = playerPos[0];
    var playerY = playerPos[1];
    var nextX = (playerX+1);
    var nextY = playerY;
    movePlayer(playerX, playerY, nextX, nextY);
  }

  function fire() {
    var playerPos = findPlayer();
    var playerX = playerPos[0];
    var playerY = playerPos[1];
    var bulletPos;
    if (facing === "N") {
      bulletPos = (playerY-1);
      if ($mapArray[bulletPos][playerX] != 1 && $mapArray[bulletPos][playerX] != doorChar) {
        $mapArray[bulletPos][playerX] = "N";
      }
    } else if (facing === "S") {
      bulletPos = (playerY+1);
      if ($mapArray[bulletPos][playerX] != 1 && $mapArray[bulletPos][playerX] != doorChar) {
        $mapArray[bulletPos][playerX] = "S";
      }
    } else if (facing === "E") {
      bulletPos = (playerX+1);
      if ($mapArray[playerY][bulletPos] != 1 && $mapArray[playerY][bulletPos] != doorChar) {
        $mapArray[playerY][bulletPos] = "E";
       }
    } else if (facing === "W") {
      bulletPos = (playerX-1);
      if ($mapArray[playerY][bulletPos] != 1 && $mapArray[playerY][bulletPos] != doorChar) {
        $mapArray[playerY][bulletPos] = "W";
      }
    }

  }

  function stopMoving() {
		var directions = ['up','down','left','right'];
		for(var d in directions) {
      var direction = directions[d];
      clearInterval(moving[direction]);
		}
  }

  // Not sure why but if I call these with arguments or with empty brackets
  // they evaluate on load and never again or I'd one function with a direction
  // argument
  //
  // Here so that when you lift up on the non-active direction it doesn't
  // stop you from travelling in the active one.
  function stopMovingLeft() {
	clearInterval(moving.left);
  }
  function stopMovingRight() {
	clearInterval(moving.right);
  }
  function stopMovingUp() {
	clearInterval(moving.up);
  }
  function stopMovingDown() {
	clearInterval(moving.down);
  }

  // move player key event handlers
  setHandler("Left", movePlayerLeft, stopMovingLeft);
  setHandler("Right", movePlayerRight, stopMovingRight);
  setHandler("Up", movePlayerUp, stopMovingUp);
  setHandler("Down", movePlayerDown, stopMovingDown);
  setHandler("Space", fire);
  /**
   * end player movement code
   */

  /**
   * bullet code
   */
  var bullets = [];
  function renderBullets() {
    for(var y = 0; y < $mapArray.length; y++) {
      for(var x = 0; x < $mapArray[y].length; x++) {
        if (bulletChars.indexOf($mapArray[y][x]) >= 0) {
          var bullet = {
            "direction": $mapArray[y][x],
            "x": x,
            "y": y
          };
          bullets.push(bullet);
        }
      }
    }

    // handler n bullet
    for (var b in bullets) {
      var bullet = bullets[b];

      if (bullet.direction == "N") {
        var nextY = (bullet.y-1);
        var nextX = bullet.x;
      }
      if (bullet.direction == "S") {
        var nextY = (bullet.y+1);
        var nextX = bullet.x;
      }
      if (bullet.direction == "E") {
        var nextY = bullet.y;
        var nextX = (bullet.x+1);
      }
      if (bullet.direction == "W") {
        var nextY = bullet.y;
        var nextX = (bullet.x-1);
      }

      moveBullet(bullet.x, bullet.y, nextX, nextY, bullet.direction);
    }
    bullets = [];
  }

  // add bullet collision dection here
  function moveBullet(bulletX, bulletY, nextX, nextY, bulletDirection) {
    // nothing hit, keep moving
    if ($mapArray[nextY][nextX] == 0) {
      $mapArray[nextY][nextX] = bulletDirection;
    }
    // hit a ghost
    if ($mapArray[nextY][nextX] == ghostChar) {
      $mapArray[nextY][nextX] = 0;
      addScore(50);
    }

    $mapArray[bulletY][bulletX] = 0;
  }

	function addScore(score) {
		playerScore += Math.floor(score/$scale);
	}

	function grind() {
		$colours.reverse();
	}

  var z = 1;
  // main game loop, redraws every 50 milliseconds
  setInterval(function() {
		c.height = $scale * $canvasSizeDefault;
		c.width = $scale * $canvasSizeDefault;
		if($grindcoreMode) { grind(); }
    renderBullets();
    renderScreen();

    // this is a test element
    // OMG IT BLINKS!!
    ctx.fillStyle = $colours[z];
    ctx.fillRect(5,5,1,1);
    if(z==16){ z = 1; } else { z++; }
  }, 10);

  // lawl - no resizing the screen you cheating bastards.
  setHandler("Ctrl", false);
  setHandler("+", false);
  setHandler("Mod", false);
};


// functions with a scope restricted to the window unload go here - I'm thinking any sort of clean up at this stage
window.unload = function(){
  // hammer away at the keys here
};
