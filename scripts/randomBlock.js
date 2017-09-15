
class block {
    constructor(x,y,width,height,speed, passed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.passed = passed;
    }

    collision(){
        var dir = colCheck(player, this);

        if (dir === "l" || dir === "r") {
            player.velX = 0;
            player.jumping = false;
            return true;
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
        } else if (dir === "t") {
            player.velY *= -1;
            return true;
        }

    }
}

class blockCtrl {
    constructor(){
        this.blocks = [],
        this.speedLvl = 4;
    }

    spawn(leftSpawn) {
        var x = 1300,
            height =  ((Math.random() * 58) + 5),
            y =  200 - height,
            width = ((Math.random() * 50) + 10),
            speed = ((Math.random() * this.speedLvl) + 2 )*-1,
            passed = false;


        if (leftSpawn) {
            var x = 1,
                speed = Math.abs(speed);
        }

        var randomBlock = new block(x,y,width,height, speed,passed);


        return this.blocks.push(randomBlock);
    }

    speedCtrl(){
        //Check player level and increase speed.
        if (player.score % 5) {
            this.speedLvl += 2;
        }
    }

    update(ctx) {

        for (var i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].x > 0) {
                if (!this.blocks[i].passed) {
                    if (player.x > this.blocks[i].x &&      player.x < this.blocks[i].x + this.blocks[i].width) {
                        player.score += 1;
                        this.blocks[i].passed = true;
                    }
                }

                this.blocks[i].x += this.blocks[i].speed;

                ctx.rect(this.blocks[i].x,
                         this.blocks[i].y,
                         this.blocks[i].width,
                         this.blocks[i].height);

                if (this.blocks[i].collision()) {
                    player.dead = true;
                }//this.blocks[i].collision();

            }
            else if(this.blocks[i].x < 0 ||
                    this.blocks[i].x > 1300) {
                this.blocks.splice(i,1);
            }
        }
    }
}


// max jump is 58 pixel high
