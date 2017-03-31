if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function() {

        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {

                window.setTimeout(callback, 1000 / 60);

            };

    })();
}

var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;





var spaceImg = new Image();
spaceImg.src = "img/space.png";

var earthImg = new Image();
earthImg.src = "img/earth.png";



function drawEarth() {
    ctx.drawImage(earthImg, -150, -150);
}


function drawSpace() {
    ctx.drawImage(spaceImg, 0, 0);
}

var astronauts = [];

$(document).ready(function() {
    getAstronauts();
});

function drawAstronauts() {
    var i = 20;
    ctx.fillStyle = 'white';
    ctx.font ="10px Verdana"
    astronauts.forEach(function(astronauts) {
        ctx.fillText('Name: ' + astronauts.name + ' | SpaceShip: ' + astronauts.craft, -50, i);
        i += 10;
    });
}

var i = 0;
var redraw = function() {
    ctx.save();

    // paint bg
    drawSpace();

    ctx.translate(w / 2, h / 2);

    // draw earth
    drawEarth();

    // rotate + move along x
    ctx.rotate(i / 100);

    ctx.translate(220, 0);
    // circle('gray', 10);

    ctx.rotate(i / -100);
    drawAstronauts();



    ctx.restore();

    i++;

    window.requestAnimationFrame(redraw);

};

window.requestAnimationFrame(redraw);


function getAstronauts() {
    $.ajax({
        url: "http://api.open-notify.org/astros.json",
        success: function(res) {
            astronauts = res.people;
            for (var i = 0; i < astronauts.length; i++) {}
        }
    });
}































// var canvas = document.getElementById('mycanvas');
// var ctx = canvas.getContext('2d');
// var w = canvas.width;
// var h = canvas.height;
//
//
//
// var spaceImg = new Image();
// spaceImg.src = "img/space.png";
//
// var earthImg = new Image();
// earthImg.src = "img/earth.png";
//
//
// function drawSpace() {
//     ctx.drawImage(spaceImg, 0, 0);
// }
// function drawEarth(){
//     ctx.drawImage(earthImg,0,0)
// }
//
//
//
//
// function getAstronauts() {
//     $.ajax({
//         url: "http://api.open-notify.org/astros.json",
//         success: function(res) {
//             astronauts = res.people;
//             for (var i = 0; i < astronauts.length; i++) {}
//         }
//     });
// }
