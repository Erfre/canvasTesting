(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 1200,
    height = 200,
    // player class
    player = {
        health: 100,
        x: width / 2,
        y: height - 15,
        width: 20,
        height: 32,
        speed: 3,
        velX: 0,
        velY: 0,
        jumping: false,
        grounded: false,
        dead: false,
        drawHealth: function(){

        }
    },
    keys = [],
    friction = 0.8,
    gravity = 0.3;

    // enemy = {
    // x: 0,
    // y: 160,
    // width: 28,
    // height: 40,
    // speed: 2,
    // draw: function(){
    //         enemyRight.draw(this.x,this.y);
    //     },
    // brain: function(playerx){
    //         var distance = playerx - this.x;
    //         if (distance < 0) {
    //             return this.x += (-this.speed);
    //         }
    //         else
    //         {
    //             return this.x += (this.speed);
    //         }
    //     }
    // }

//game board atm
var boxes = [];
// dimensions
boxes.push({
    x: 0,
    y: 0,
    width: 10,
    height: height
});
boxes.push({
    x: 0,
    y: height - 2,
    width: width,
    height: 50
});
boxes.push({
    x: width - 10,
    y: 0,
    width: 50,
    height: height
});

var direction;
var enemyList = [];

enemyList.push({
    x: 0,
    y: 160,
    width: 28,
    height: 40,
    speed: 2,
    dead: false,
    draw: function(){
            enemyRight.draw(this.x,this.y);
        },
    brain: function(playerx){
            var distance = playerx - this.x;
            if (distance < 0) {
                return this.x += (-this.speed);
            }
            else
            {
                return this.x += (this.speed);
            }
        }
    });

enemyList.push({
    x: 1000,
    y: 160,
    width: 28,
    height: 40,
    speed: 2,
    dead: false,
    draw: function(){
            enemyRight.draw(this.x,this.y);
        },
    brain: function(playerx){
            var distance = playerx - this.x;
            if (distance < 0) {
                return this.x += (-this.speed);
            }
            else
            {
                return this.x += (this.speed);
            }
        }
    });

enemyList.push({
    x: 800,
    y: 160,
    width: 28,
    height: 40,
    speed: 2,
    dead: false,
    draw: function(){
            enemyRight.draw(this.x,this.y);
        },
    brain: function(playerx){
            var distance = playerx - this.x;
            if (distance < 0) {
                return this.x += (-this.speed);
            }
            else
            {
                return this.x += (this.speed);
            }
        }
    });


canvas.width = width;
canvas.height = height;

function update() {
    // check keys

    if (keys[38] || keys[87] || keys[32]) {
        // up arrow or space
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            player.grounded = false;
            player.velY = -player.speed * 2;
        }
    }
    if (keys[39] || keys[68]) {
        // right arrow
        if (player.velX < player.speed) {
            player.velX++;
        }
        direction = 'right';
    }
    if (keys[37] || keys[65]) {
        // left arrow
        if (player.velX > -player.speed) {
            player.velX--;
        }
        direction = 'left';
    }


    player.velX *= friction;
    player.velY += gravity;
    //clears the board
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "black";
    ctx.beginPath();

    player.grounded = false;

    //draws the boxes and checks the collision with player and boxes
    for (var i = 0; i < boxes.length; i++) {
        ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);

        var dir = colCheck(player, boxes[i]);

        if (dir === "l" || dir === "r") {
            player.velX = 0;
            player.jumping = false;
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
        } else if (dir === "t") {
            player.velY *= -1;
        }
    }

    if(player.grounded)
    {
        player.velY = 0;
    }

    //draw all the eniemes
    for (var i = 0; i < enemyList.length; i++) {
        if (enemyList[i].dead === false) {
            //draws and starts the brain
            enemyList[i].draw();
            enemyList[i].brain(player.x);

            var hit = colCheck(player, enemyList[i]);

            if (hit ==='b') {
                //the monster should die
                enemyList[i].dead = true;
            }
            else if(hit === 't'||
                    hit === 'l'||
                    hit === 'r'){
                //player should die
                player.dead = true;
            }
        }
    };

    player.x += player.velX;
    player.y += player.velY;
    //finding the player and start to chase him
    // enemy.brain(player.x);

    // enemyCol(player,enemy);
    // //draws enemy
    // enemy.draw();
    //draws the player
    if (!player.dead) {
        animatePlayer(player.x, player.y,direction, player.jumping);
    }
    //fills the block after player to avoid the white screen around the player

    ctx.fill();
    //runs the loop again
    requestAnimationFrame(update);
}

//continue after playing around with it some more


function colCheck(shapeA, shapeB) {
    // checking the distance from the middle to side
    // compares this distance with the distance between the both shapes(from half x/y)
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;

    // if the x and y vector are less than the half width or half height, they must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});


window.addEventListener("load", function () {
    update();
});
