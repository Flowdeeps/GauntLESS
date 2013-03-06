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

  // map parser
  
}

// functions with a scope restricted to the window unload go here - I'm thinking any sort of clean up at this stage
window.unload = function(){
  // hammer away at the keys here
}