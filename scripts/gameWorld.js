
class world {
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.walls = [];
        this.level = 0;
    }

    setup (){
        //I need to create a block for each of the corners of the world
        var leftBlock = new block(0,0,1,this.height),
        rightBlock = new block(this.width, 0, 10, this.height),
        botBlock = new block(0,this.height,this.width,40);

        this.walls.push(leftBlock,rightBlock,botBlock);
    }

    update (){
        for (var i = 0; i < this.walls.length; i++) {
            this.walls[i].collision();
        }
    }

    gameOver(ctx){
        ctx.fillText("GAME OVER", 600, 100);
        var score = "YOUR FINAL SCORE: ", count = 0;

        setInterval(function(){
            if (count < score.length) {
                ctx.fillText(score[count], 550 + (count*10), 120);
                count++;
            }
            else {
                ctx.fillText(player.score,630,140);
            }
        },100);
    }


}
