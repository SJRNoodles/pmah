var plr;
var plrAnimation;
var level;
var levelThere = 0;
var levelSpecify;
function tilePos(input){
  return(input * 64);
}
function setup() {
  createCanvas(800,400);
  plr = createSprite(400,200,50,70);
  plrAnimation = loadImage('tex/player.png');
  plr.addImage(plrAnimation);
  level = createGroup();
  levelSpecify = 0;
}
function draw() {
  if(levelThere==0){
  levelThere=1;
  if(levelSpecify==0){
  level.add(createSprite(tilePos(0),tilePos(0),64,64));
  level.get(level.length - 1).addImage(loadImage('tex/wall.png'););
  level.add(createSprite(tilePos(1),tilePos(0),64,64));
  level.get(level.length - 1).addImage(loadImage('tex/wall.png'););
  level.add(createSprite(tilePos(2),tilePos(1),64,64));
  level.get(level.length - 1).addImage(loadImage('tex/wall.png'););
  }
  }
  background(0,0,0);
  // player movements
  if(keyDown(LEFT_ARROW)){
  plr.position.x-=5;
  }
  if(keyDown(RIGHT_ARROW)){
  plr.position.x+=5;
  }
  if(keyDown(UP_ARROW)){
  plr.position.y-=5;
  }
  if(keyDown(DOWN_ARROW)){
  plr.position.y+=5;
  }
  drawSprites();
}
