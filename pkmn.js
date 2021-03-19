function setup() {
  createCanvas(800,400);
  var plr = createSprite(400,200,50,70);
}

function draw() {
  background(255,255,255);  
  drawSprites();
  // player movements
  if(keyWentDown("KeyD")){
  plr.x=plr.x+5;
  }
  if(keyWentDown("KeyA")){
  plr.x=plr.x-5;
  }
  if(keyWentDown("KeyW")){
  plr.y=plr.y+5;
  }
  if(keyWentDown("KeyS")){
  plr.y=plr.y-5;
  }
}
