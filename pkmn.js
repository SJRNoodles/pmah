function setup() {
  createCanvas(800,400);
  var plr = createSprite(400,200,50,70);
}

function draw() {
  background(255,255,255);  
  drawSprites();
  // player movements
  if(keyDown('d')){
  plr.x=plr.x+5;
  }
  if(keyDown('a')){
  plr.x=plr.x-5;
  }
  if(keyDown('w')){
  plr.y=plr.y+5;
  }
  if(keyDown('s')){
  plr.y=plr.y-5;
  }
}
