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



var star = function() {
    this.x = Math.random() * 750;
    this.y = Math.random() * 600;
    this.speed = Math.random() * 3;
    this.radio = Math.random() * 2;
}

star.prototype.move = function() {
    if (this.x <= 1000)
        this.x += this.speed;
    else
        this.x = 0;
}

star.prototype.render = function() {
    ctx.fillStyle = 'white';

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI, true);
    ctx.closePath();

    ctx.fill();
    this.move();
}
var stars = [];
for (var i = 0; i < 300; i++) {
    stars.push(new star());
}

function drawStars() {
    stars.forEach(function(star) {
        star.render();
    });
}





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
    drawStars();
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
