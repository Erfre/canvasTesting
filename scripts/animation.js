// loads the spritesheet and goes through the sprites
//offlimit decides where on the spritesheet the spirtes are
function SpriteSheet(path,frameWidth, frameHeight){
  this.image = new Image();
  this.image.src = path;
};

function Animation(spritesheet, offLimitX, offLimitY, width, height, frameSpeed, endFrame){
  var currentFrame = 0;
  var counter = 0;

  this.update = function(){
    if (counter == (frameSpeed - 1)) {
      currentFrame = (currentFrame + 1) % endFrame;
    }
    //update the counter
    counter = (counter + 1) % frameSpeed;
  }
  this.draw = function(x, y) {
    //abs value if the picture is turned, so it runs the correct way
    var absW = Math.abs(width);
    //draws the image for the currentFrame
    ctx.drawImage(
      spritesheet.image,
      currentFrame * width + offLimitX, offLimitY,
      absW, height,
      x, y,
      absW, height);
  }

}

function animatePlayer(x,y,direction,jump){
  // walking to the right
  // the default should just be last direction whitout update
  if (jump) {
    switch (direction) {
    case 'left':
      //draw at the player positions
      leftJump.draw(x,y);
      break;
    case 'right':
      //draw at the player positions
      rightJump.draw(x,y);
      break;
    default:

    }
  }
  else
  {
    switch (direction)
    {
      case 'right':
      // ctx.clearRect((x-28),(y-32), 150, 150);
        rightRun.update();
        //draw at the player positions
        rightRun.draw(x,y);
        break;
      case 'left':
      // ctx.clearRect((x-28),(y-32), 150, 150);
        leftRun.update();
        //draw at the player positions
        leftRun.draw(x,y);
        break;
      default:
        idle.update();
        idle.draw(x,y);
    }
  }
}


//getting the sprites
// first two values control what sprite to start at
// somehow not load the same image on each, maybe it's possible to just rotate it in the script. Would it be faster though??
starWarsSprite = new SpriteSheet('images/Game Gear - Star Wars - Luke Leia and Han.png',368,504);
starWarsSpriteRev = new SpriteSheet('images/Game Gear - Star Wars - Luke Leia and Han reverse.png',368,504);
//try and only load this sprite sheet
rightRun = new Animation(starWarsSprite, 0, 287, 26, 32, 9, 5);
leftRun = new Animation(starWarsSpriteRev, 342, 287, -26, 32, 9, 5);
leftJump = new Animation(starWarsSpriteRev, 300, 328, 28, 32, 1, 1);
rightJump = new Animation(starWarsSprite, 32, 328, 28, 32, 1, 1);
idle = new Animation(starWarsSpriteRev, 60, 328, 28, 32, 50, 2);
falling = new Animation(starWarsSprite,286, 328, 28, 32,1,1);
//
enemyRight = new Animation(starWarsSprite,9,368,32,40,1,1);
