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
    if (($mapArray[y][x] === "N") ||
        ($mapArray[y][x] === "E") ||
        ($mapArray[y][x] === "S") ||
        ($mapArray[y][x] === "W")) {
        var colour = 3;
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

  function renderScreen() {
    for(var y = 0; y < $mapArray.length; y++) {
      for(var x = 0; x < $mapArray[y].length; x++) {
        ctx.fillStyle = colourLookup(x,y);
        ctx.fillRect(x,y,1,1);
      }
    }
  }

  /**
   * player movement functions
   * and status vars
   */
  var playerSpeed = 50;
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
        if ($mapArray[y][x] === "F") {
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
      $mapArray[nextY][nextX] = "F";
      $mapArray[playerY][playerX] = 0;
    }

    if ($mapArray[nextY][nextX] == 0) {
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
    if (facing === "N") {
      var bulletPos = (playerY-1);
      $mapArray[bulletPos][playerX] = "N"; 
    } else if (facing === "S") {
      var bulletPos = (playerY+1);
      $mapArray[bulletPos][playerX] = "S"; 
    } else if (facing === "E") {
      var bulletPos = (playerX+1);
      $mapArray[playerY][bulletPos] = "E"; 
    } else if (facing === "W") {
      var bulletPos = (playerX-1);
      $mapArray[playerY][bulletPos] = "W"; 
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
  var bulletChars = [ "N", "E", "S", "W" ];
  function renderBullets() {
    for(var y = 0; y < $mapArray.length; y++) {
      for(var x = 0; x < $mapArray[y].length; x++) {
        if (bulletChars.indexOf($mapArray[y][x]) >= 0) {
          var bullet = {
            "direction": $mapArray[y][x],
            "x": x,
            "y": y 
          }
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

      if ($mapArray[nextY][nextX] == 0) {
        // TODO check if we hit a player or enemy
        $mapArray[nextY][nextX] = bullet.direction;
        $mapArray[bullet.y][bullet.x] = 0;  
      } else {
        // bullet hit a wall
        $mapArray[bullet.y][bullet.x] = 0;  
      }
    }
    bullets = [];
  }

  var z = 1
  // main game loop, redraws every 50 milliseconds
  setInterval(function() {
    renderBullets();
    renderScreen();

    // this is a test element
    // OMG IT BLINKS!!
    ctx.fillStyle = $colours[z];
    ctx.fillRect(5,5,1,1);
    if(z==16){ z = 1; } else { z++; }
  }, 20);
  
  // lawl - no resizing the screen you cheating bastards.
  setHandler("Ctrl", false);
  setHandler("+", false);
  setHandler("Mod", false);
}


// functions with a scope restricted to the window unload go here - I'm thinking any sort of clean up at this stage
window.unload = function(){
  // hammer away at the keys here
}
