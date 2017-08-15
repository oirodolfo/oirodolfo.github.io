console.warn("pontoon.js | from gist <3");


var h = document.getElementById("main-menu");
var stuck = false;
var stickPoint = getDistance();

function getDistance() {
  var topDist = h.offsetTop;
  return topDist;
}
 h.classList.add('animated')
window.onscroll = function(e) {
  var distance = getDistance() - window.pageYOffset;
  var offset = window.pageYOffset;
  
  if ( (distance <= 0) && !stuck) {
    h.classList.remove('header-static')
    h.classList.add('header-fixed')
    //h.classList.remove('slideDown')
    //h.classList.add('slideUp')
    
    stuck = true;
  } else if (stuck && (offset <= stickPoint)){
    stuck = false;
         h.classList.add('header-static')
    h.classList.remove('header-fixed')
    h.classList.remove('slideUp')
    h.classList.add('slideDown')
  }
}
