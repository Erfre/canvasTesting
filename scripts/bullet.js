class bullet {
    constructor(direction, speed,widht,height) {
        this.speed = speed;
        this.x = player.x + player.width/2;
        this.y = player.y + player.height/2;
        this.width = width;
        this.height = height;
        this.direction = direction;
    }
    collision(blocks,gun){
        for (var i = 0; i < blocks.length; i++) {
            var dir = colCheck(block[i], this);

            if (dir === "l"
             || dir === "r"
             || dir === "b"
             || dir === "t") {
                 player.score++;
            }
        }
    }

}

class gun {
    constructor(capacity) {
        this.bullets = [];
        this.capacity = capacity;
    }

    fire(){
        //fire a new bullet at
        if (this.bullets.length < this.capacity) {
            var bullet = new bullet(player.direction, 4,2,2);
            this.bullets.push(bullet);
        }
    }



    update(ctx){
        for (var i = 0; i < this.bullets.length; i++) {
            ctx.rect(this.bullets[i].x,
                     this.bullets[i].y,
                     this.bullets[i].width,
                     this.bullets[i].height);
        }
    }
}

var
//here we have the bullet class whichh will have the player pstion as starting point and then the speed
