var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;



var spaceImg = new Image();
spaceImg.src = "img/space.png";

var earthImg = new Image();
earthImg.src = "img/earth.png";


function drawSpace() {
    ctx.drawImage(spaceImg, 0, 0);
}
function drawEarth(){
    ctx.drawImage(earthImg,0,0)
}




function getAstronauts() {
    $.ajax({
        url: "http://api.open-notify.org/astros.json",
        success: function(res) {
            astronauts = res.people;
            for (var i = 0; i < astronauts.length; i++) {}
        }
    });
}
