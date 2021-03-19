function setup() {
  createCanvas(800,400);
  var plr = createSprite(400,200,50,70);
}

function draw() {
  background(255,255,255);  
  drawSprites();
  // player movements
  if(keyWentDown("d")){
  plr.x=plr.x+5;
  }
  if(keyWentDown("a")){
  plr.x=plr.x-5;
  }
  if(keyWentDown("w")){
  plr.y=plr.y+5;
  }
  if(keyWentDown("s")){
  plr.y=plr.y-5;
  }
}
