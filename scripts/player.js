class character{
    constructor(name,x,y,width,height,speed, direction){
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.velX = 0;
        this.velY = 0;
        this.direction = direction;
        this.jumping = false;
        this.grounded = false;
        this.dead = false;
        this.score = 0;
    }

}


class payer extends character{
    isJumping(){
        if (!this.jumping && this.grounded) {
            this.jumping = true;
            this.grounded = false;
            this.velY = -this.speed * 2;
        }
    }

    update(friction, gravity){

        if (keys[38] || keys[87]) {
            // up arrow or space
            this.isJumping()
        }
        if (keys[32]) {
            a.fire();
        }
        if (keys[39] || keys[68]) {
            // right arrow
            if (this.velX < this.speed) {
                this.velX++;
            }
            this.direction = 'right';
        }
        else if (keys[37] || keys[65]) {
            // left arrow
            if (this.velX > -this.speed) {
                this.velX--;
            }
            this.direction = 'left';
        }
        else if(!this.jumping) {
            this.direction = 'idle';
        }
        else{
            this.direction = 'right';
        }


        this.velX *= 0.8;
        this.velY += 0.3;

        if(this.grounded)
        {
            this.velY = 0;
        }

        this.grounded = false;

        this.x += this.velX;
        this.y += this.velY;

        animatePlayer(this.x, this.y,this.direction, this.jumping);
    }
}
