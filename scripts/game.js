(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    keys = [],
    friction = 0.8,
    gravity = 0.3;
    // direction;

canvas.width = 1200;
canvas.height = 200;

var gameWorld = new world(canvas.width,canvas.height);
var player = new payer('player',0,0,20,32,3,'right');
var test = new blockCtrl;

gameWorld.setup();
test.spawn();

setInterval(function(){
    var chance = Math.random();
    if (chance > 0.5) {
        test.spawn(true);
    }
    else {
        test.spawn();
    }
}, 3000)


function update() {

    //clears the board

    if (!player.dead) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.beginPath();
        gameWorld.update();
        test.update(ctx);
        player.update();
    }
    else {
        gameWorld.gameOver(ctx);
    }
    ctx.fillText(player.score, 10,10);



    ctx.fill();
    //runs the loop again
    requestAnimationFrame(update);
}

//continue after playing around with it some more

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});


window.addEventListener("load", function () {
    update();
});
