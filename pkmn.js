function setup() {
  createCanvas(800,400);
  var plr = createSprite(400,200,50,70);
}

function draw() {
  background(255,255,255);  
  drawSprites();
  // player movements
  if(keyDown(LEFT_ARROW)){
  plr.position.x-=5;
  }
  if(keyDown(RIGHT_ARROW)){
  plr.position.x+=5;
  }
  if(keyDown(UP_ARROW)){
  plr.position.y+=5;
  }
  if(keyDown(DOWN_ARROW)){
  plr.position.y-=5;
  }
}
