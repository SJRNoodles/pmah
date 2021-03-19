// this is my minecraft v5 project. i used it to test p5 js
var levelData = [];
var inChoose = 0;
var terrainX = 1;
var terrainY = 1;
var health = 10;
var title = 1;
var handAnimDone = 1;
var inventoryNew = [];
var terrainShowing = createGroup();
var chunk=0;
// crafting will be added soon
var blockList = [
  "grass",
  "leaves",
  "rock",
  "planks",
  "wood",
  "cow",
  "door"
  ];
function checkIf(block){
  var blockThere = false;
  for (var o4 = 0; o4 < blockList.length; o4++) {
    if(blockList[o4] == block){
      blockThere=true;
    }
  }
  return(blockThere);
}
function removeCraft(block,amount){
  var blocksRemoved = 0;
  for (var o3 = 0; o3 < inventoryNew.length; o3++) {
    if(blocksRemoved <= amount){
      if(inventoryNew[o3].type == block){
        if(inventoryNew[o3].amount >= 1){
         inventoryNew[o3].amount--;
        }else{
         inventoryNew.splice(o3,1);
        }
      }
    }
  }
}
function amountOf(block){
  //check the amount of blocks
  var reCount = 0;
  for (var b2 = 0; b2 < inventoryNew.length; b2++) {
    if(inventoryNew[b2].type == block){
      reCount=reCount+inventoryNew[b2].amount;
    }
  }
  return(reCount);
}
function blockExists(block){
  var there = false;
  for (var s1 = 0; s1 < inventoryNew.length; s1++) {
    if(inventoryNew[s1].type != null){
      if(inventoryNew[s1].type == block){
        there = true;
      }
    }
  }
  return(there);
}
function invGet(block){
  for (var s2 = 0; s2 < inventoryNew.length; s2++){
    if(inventoryNew[s2].type != null){
      if(inventoryNew[s2].type == block){
        return(s2);
      }
    }
  }
}
function craft(item){
  // check what item it is
  if(item == "door"){
    console.log("crafting door");
    if(amountOf("planks") >= 6){
      removeCraft("planks",6);
      // adds items
      if(blockExists("door") == false){
      inventoryNew.push({type:"door",amount:3});
      }else{
      inventoryNew[invGet("door")].amount = inventoryNew[invGet("door")].amount + 3;
      }
    }
  }
  if(item == "planks"){
    console.log("crafting planks");
    if(amountOf("wood") >= 1){
      removeCraft("wood",1);
      // adds items
      if(blockExists("planks") == false){
      inventoryNew.push({type:"planks",amount:4});
      }else{
      inventoryNew[invGet("planks")].amount = inventoryNew[invGet("planks")].amount + 4;
      }
    }
  }
  if(item == "stick"){
    console.log("crafting sticks");
    if(amountOf("planks") >= 2){
      removeCraft("planks",2);
      // adds items
      if(blockExists("stick") == false){
      inventoryNew.push({type:"stick",amount:4});
      }else{
      inventoryNew[invGet("stick")].amount = inventoryNew[invGet("stick")].amount + 4;
      }
    }
  }
  if(item == "wood_pick"){
    console.log("crafting a wooden pick");
    if(amountOf("stick") >= 2 && amountOf("planks") >= 3){
      removeCraft("stick",2);
      removeCraft("planks",3);
      // adds items
      inventoryNew.push({type:"wood_pick",amount:""});
      }
  }
}
World.frameRate = 60;
textFont("Arial");
textSize(8);
fill(rgb(0,0,0))
var mobs = createGroup();
var plr = createSprite(500,500);
plr.setAnimation("player");
var plr_arm = createSprite(plr.x,plr.y+16);
plr_arm.setAnimation("player_arm");
var plr_head = createSprite(plr.x,plr.y+16);
plr_head.setAnimation("player_headR");
var plr_leg1 = createSprite(plr.x,plr.y+16);
plr_leg1.setAnimation("player_leg");
var plr_leg2 = createSprite(plr.x,plr.y+16);
plr_leg2.setAnimation("player_leg");
var inventory = [];
var crafting = 0;
function handAnimation(){
  handAnimDone=0;
  if(plr_head.rotation < 90){
  plr_arm.rotation = -105;
  }else{
  plr_arm.rotation = 111;
  }
}
function walkAnim(){
  if(plr_leg1.rotation == 0){
  plr_leg1.rotation = -45;
  plr_leg2.rotation = 45;
  }
  plr_leg1.x = plr_leg1.x+45;
  plr_leg2.x = plr_leg2.x-45;
}
function lD(){
  levelData.push(terrain.get(terrain.length - 1).x);
  levelData.push(terrain.get(terrain.length - 1).y);
  levelData.push(terrain.get(terrain.length - 1).blockType);
  levelData.push(terrain.get(terrain.length - 1).blockID+1);
}
function tilePos(n) {
  return (n * 64);
}
var terrain = createGroup();
function setBH(block){
  if(block == "leaves"){
    terrain.get(terrain.length - 1).blockHealth = 2;
  }
  if(block == "rock"){
    terrain.get(terrain.length - 1).blockHealth = 20;
  }
  if(block == "grass"){
    terrain.get(terrain.length - 1).blockHealth = 3;
  }
  if(block == "wood"){
    terrain.get(terrain.length - 1).blockHealth = 7;
  }
  if(block == "planks"){
    terrain.get(terrain.length - 1).blockHealth = 7;
  }
  if(block == "cow"){
    terrain.get(terrain.length - 1).blockHealth = 1;
  }
  if(block == "door"){
    terrain.get(terrain.length - 1).blockHealth = 7;
  }
}
function tileSound(block){
  playSound(block + ".mp3", false);
  if(block == "planks"){
    playSound("wood.mp3", false);
  }
  if(block == "leaves"){
    playSound("grass.mp3", false);
  }
}
function build(){
  if(inventoryNew[inChoose]!=null){
  if(inventoryNew[inChoose].type!=null){
    if(checkIf(inventoryNew[inChoose].type)!=false){
  console.log(Math.round(levelData.length / 4));
    terrain.add(createSprite(tilePos(Math.round(camera.mouseX / 64)),tilePos(Math.round(camera.mouseY / 64))));
    console.log(inventory);
    console.log(terrain.get(terrain.length-1));
    terrain.get(terrain.length-1).setAnimation(inventoryNew[inChoose].type);
    terrain.get(terrain.length-1).blockType = inventoryNew[inChoose].type;
    terrain.get(terrain.length - 1).blockID=levelData.length - 1;
    lD();
    console.log(levelData.length);
     
    console.log(terrain.get(terrain.length - 1));
    tileSound(terrain.get(terrain.length - 1).blockType);
    setBH(terrain.get(terrain.length - 1).blockType);
    if(inventoryNew[inChoose].amount >= 1){
      inventoryNew[inChoose].amount--;
    }else{
    inventoryNew.splice(inChoose,1);
    }
  }
  }
  if(inventoryNew[inChoose]!=null){
  if(inventoryNew[inChoose].type == "beef"){
    if(inventoryNew[inChoose].amount >= 1){
      inventoryNew[inChoose].amount--;
      if(health <=10){
      health=health+3;
      }
    }else{
    inventoryNew.splice(inChoose,1);
          if(health <=10){
      health=health+3;
      }
    }
    }
  }
  }
}
function createMob(type){
  if(type=="cow"){
    mobs.add(createSprite(tilePos(randomNumber(1,8)),tilePos(8)));
    mobs.get(mobs.length - 1).setAnimation("cow");
    mobs.get(mobs.length - 1).mobBehavior = "friendly";
    mobs.get(mobs.length - 1).mobType = "cow";
  }
  if(type=="zombie"){
    mobs.add(createSprite(tilePos(randomNumber(1,8)),tilePos(8)));
    mobs.get(mobs.length - 1).setAnimation("zombie");
    mobs.get(mobs.length - 1).mobBehavior = "hostile";
    mobs.get(mobs.length - 1).mobType = "zombie";
  }
}
function createTerrain(){
  // spawns some cows
  createMob("cow");
  createMob("cow");
for (var i = 0; i < 16; i++) {
  
  terrainX++;
  terrainY = 20;
  for (var ro = 0; ro < 5; ro++) {
    terrain.add(createSprite(tilePos(terrainX),tilePos(terrainY)));
    terrainY--;
    terrain.get(terrain.length - 1).setAnimation("rock");
    terrain.get(terrain.length - 1).blockType="rock";
    terrain.get(terrain.length - 1).blockID=levelData.length - 1;
    lD();
    setBH(terrain.get(terrain.length - 1).blockType);
  }
  for (var o = 0; o < randomNumber(1, 3); o++) {
    terrain.add(createSprite(tilePos(terrainX),tilePos(terrainY)));
    terrainY--;
    terrain.get(terrain.length - 1).setAnimation("grass");
    terrain.get(terrain.length - 1).blockType="grass";
    terrain.get(terrain.length - 1).blockID=levelData.length - 1;
    lD();
    setBH(terrain.get(terrain.length - 1).blockType);
  }
  
  if(randomNumber(1,7)==3){
    for (var t = 0; t < 3; t++) {
      terrain.add(createSprite(tilePos(terrainX),tilePos(terrainY)));
      terrainY--;
      terrain.get(terrain.length - 1).setAnimation("wood");
      terrain.get(terrain.length - 1).blockType="wood";
      terrain.get(terrain.length - 1).blockID=levelData.length - 1;
      lD();
      setBH(terrain.get(terrain.length - 1).blockType);
    }
    var treX=-1;
    for (var w = 0; w < 3; w++) {
    for (var u = 0; u < 3; u++) {
     terrain.add(createSprite(tilePos(terrainX+treX),tilePos(terrainY)));
     terrainY--;
     terrain.get(terrain.length - 1).setAnimation("leaves");
     terrain.get(terrain.length - 1).blockType="leaves";
     terrain.get(terrain.length - 1).blockID=levelData.length-1;
     lD();
     setBH(terrain.get(terrain.length - 1).blockType);
    }
    treX++;
    terrainY=terrainY+3;
    }
  }
}
}
createTerrain();
var makeTerrain=0;
var hX = 0;
var iX = 1;
var ii = 0;
var timePos = 255;
var time = "day";
var iS = createGroup();
var hG = createGroup();
var but1 = createSprite(200,230);
but1.setAnimation("Splash_select");
var gameLogo = createSprite(200,100);
gameLogo.setAnimation("logo");
var cMC = 0;
var displayCra = createGroup();
function draw() {
  if(title==1){
    background("#b5f1ff");
    if(keyWentDown("ENTER")){
      title=0;
      plr.x = tilePos(5);
      plr.y = tilePos(1);
      but1.destroy();
      gameLogo.destroy();
    }
    drawSprites();
    textSize(20);
    text("Enter to start",140,235);
    textSize(9);
    text("Z to place blocks \n Click and hold on a block to break it \n E to go into the crafting menu \n A, D, and space to move \n X makes a flat world for you to build on! \n 1 for logs \n 2 for stone \n 3 for planks \n 4 for leaves \n Hopefully you can still enjoy Flat Minecraft! Have fun! ~galligoo13 \n MINECRAFT IS OWNED BY MOJANG.", camera.x-190,camera.y+60);
  }
  if(title==0){
  if(keyWentDown("e")){
    console.log("KR");
    console.log(crafting);
    if(crafting==0){
      crafting=1;
      displayCra.destroyEach();
    }else{
      crafting=0;
      displayCra.destroyEach();
    }
  }
  if(crafting==1){
    background("#fff");
    var cm = ["planks","stick","wood_pick"]; // things to craft
    plr.velocityY=0;
    textFont("Arial");
    textSize(50);
    text("Crafting",camera.x-190,camera.y-130);
    textSize(30);
    text("left and right to choose, Q to select",camera.x-190,camera.y-100);
    var yOffset = 0;
    var chooseC = cMC * 64;
    if(keyWentDown("d")){
      if(cMC >= cm.length - 2){
        cMC--;
      }else{
        cMC=0;
      }
    }
    if(keyWentDown("a")){
      if(cMC <= cm.length - 2){
        cMC++;
      }else{
        cMC=0;
      }
    }
    if(keyWentDown("q")){
      if(cm[cMC] != null){
        craft(cm[cMC]);
        crafting=0;
      }
    }
    camera.x = 0;
    camera.y = 5000;
    console.log("test");
    displayCra.destroyEach();
    displayCra.clear();
      for (var o4 = 0; o4 < 5; o4++) {
        if(cm[o4] != null){
        displayCra.add(createSprite(camera.x-yOffset + chooseC,camera.y + 10));
        displayCra.get(displayCra.length - 1).setAnimation(cm[o4]);
        if(o4 == cMC){
          displayCra.get(displayCra.length - 1).width = 70;
          displayCra.get(displayCra.length - 1).height = 70;
        }else{
          displayCra.get(displayCra.length - 1).width = 64;
          displayCra.get(displayCra.length - 1).height = 64;
        }
        yOffset=yOffset+64;
        }
      }
      drawSprites();
  }
  if(crafting==0){
     for (var ab = 0; ab < mobs.length; ab++) {
       if(mobs.get(ab).mobType == "zombie"){
         if(time=="day"){
           mobs.get(ab).destroy();
         }
       }
       if(mobs.get(ab).mobBehavior == "hostile"){
         mobs.get(ab).pointTo("plr");
        if(mobs.get(ab).overlap(plr)){
           plr.bounceOff(mobs.get(ab));
           plr.velocityY=-5;
           health--;
         }
         if(mobs.get(ab).getDirection() == 90){
           mobs.get(ab).x = mobs.get(ab).x + 5;
         }
         if(mobs.get(ab).getDirection() == -90){
           mobs.get(ab).x = mobs.get(ab).x - 5;
         }
       }
       if(mobs.get(ab).collide(terrain) == false){
         mobs.get(ab).velocityY++;
       }else{
         mobs.get(ab).velocityY = 0;
         if(randomNumber(1,3) == 3){
           mobs.get(ab).velocityY = -5;
         }
         if(mobs.get(ab).mobBehavior == "hostile"){
           mobs.get(ab).velocityY = -10;
         }
       }
       if(mobs.get(ab).mobBehavior == "friendly"){
       if(randomNumber(1,3) == 2){
       mobs.get(ab).x=mobs.get(ab).x+5;
       }else{
       if(randomNumber(1,3) == 1){
       mobs.get(ab).x=mobs.get(ab).x-5;
       }
       }
       }
       if(mouseIsOver(mobs.get(ab))){
         if (mouseDown("leftButton")){
          if(mobs.get(ab).mobType == "cow"){
            if(blockExists("beef") == false){
              inventoryNew.push({type:"beef",amount:1});
            }else{
              inventoryNew[invGet("beef")].amount = inventoryNew[invGet("beef")].amount + 1;
            }
           }
           mobs.get(ab).destroy();
         }
       }
     }
    background(rgb(timePos/2,timePos,timePos));
    if(time == "day"){
      timePos=timePos-0.1;
      if(timePos < 10){
        time = "night";
        createMob("zombie");
        createMob("zombie");
        createMob("zombie");
      }
    }
    if(time == "night"){
      timePos=timePos+0.1;
      if(timePos > 254){
        time = "day";
        createMob("cow");
      }
    }
    
  plr_head.x = plr.x;
  plr_head.y = plr.y - 64;
  plr_arm.x = plr.x;
  plr_arm.y = plr.y-32;
  plr_leg1.x = plr.x;
  plr_leg1.y = plr.y+15;
  plr_leg2.x = plr.x;
  plr_leg2.y = plr.y+15;
  makeTerrain=0;
  if(makeTerrain==1){
    createTerrain();
  }
  if(plr_arm.rotation>= 0){
    plr_arm.rotation = (plr_arm.rotation - 15);
  }else{
    handAnimDone=1;
  }
  if(plr_arm.rotation<= -5){
    plr_arm.rotation = (plr_arm.rotation + 15);
  }else{
    handAnimDone=1;
  }
  if(plr_leg1.rotation>= 0){
    plr_leg1.rotation = (plr_leg1.rotation - 5);
  }
  if(plr_leg1.rotation<= 0){
    plr_leg1.rotation = (plr_leg1.rotation + 5);
  }
  if(plr_leg2.rotation>= -5){
    plr_leg2.rotation = (plr_leg2.rotation - 5);
  }
  if(plr_leg2.rotation<= -5){
    plr_leg2.rotation = (plr_leg2.rotation + 5);
  }
  
  ix=25;
  ii=0;
  iS.destroyEach();
  var hX = 25;
  iS.clear();
  hG.destroyEach();
  hG.clear();
  for (var a1 = 0; a1 < health; a1++) {
    hG.add(createSprite(camera.x - 200 + hX,camera.y - 180));
    hG.setAnimationEach("heart");
    hG.setWidthEach(16);
    hG.setHeightEach(16);
    hX=hX+15;
  }
  for (var a = 0; a < inventoryNew.length; a++) {
    iS.add(createSprite(camera.x - 200 + ix,camera.y + 180));
    iS.get(iS.length-1).setAnimation(inventoryNew[ii].type);
    iS.get(iS.length-1).width = 32;
    iS.get(iS.length-1).height = 32;
    if(iS.length-1 == inChoose){
    iS.get(iS.length-1).width = 35;
    iS.get(iS.length-1).height = 35;
    }
        ii=ii+1;
    ix=ix+32;
  }
  drawSprites();
  ii=0;
  ix=15;
  for (var a = 0; a < inventoryNew.length; a++) {
    textSize(16);
    fill(rgb(255,255,255));
    textFont("Arial");
    text(inventoryNew[ii].amount,camera.x - 200 + ix,camera.y + 190);
    ii=ii+1;
    ix=ix+32;
  }
  camera.x = ((camera.mouseX-50+plr.x+50)/2);
  camera.y = ((camera.mouseY-50+plr.y+50)/2);
  plr_head.pointTo(camera.mouseX,camera.mouseY);
  if(plr_head.rotation < 90){
    plr_head.setAnimation("player_headR");
  }else{
    plr_head.setAnimation("player_headL");
  }
  if(plr_head.rotation < -90){plr_head.setAnimation("player_headL");}
  camera.zoom=1;
  if (plr.overlap(terrain) == false){
    plr.velocityY++;
  }else{
    if(plr.velocityY >= 18){
      console.log("RE");
      health=health-plr.velocityY / 8;
      health=Math.round(health);
    }
    plr.velocityY = 1;
    plr.collide(terrain);
    if(keyDown("space")){plr.velocityY=-15;}
  }
  if(health <=9){
    health=health+.05;
  }
  if(keyDown("a")){plr.x=plr.x-5;walkAnim();}
  if(keyWentDown("Z")){
    if(inventoryNew.length != 0){
    var blockThere=0;
    for (var i2 = 0; i2 < terrain.length - 1; i2++) {
      if (mouseIsOver(terrain.get(i2))) {
         blockThere=1;
      }
    }
    if(blockThere!=1){
      build();
      handAnimation();
    }
    }
  }
  if(keyDown("d")){plr.x=plr.x+5;walkAnim();}
  if(keyWentDown("7")){
      if(blockExists("cow") == false){
      inventoryNew.push({type:"cow",amount:99});
      }else{
      inventoryNew[invGet("cow")].amount = 99;
      }
  }
  if(keyWentDown("c")){
      if(blockExists("wood") == false){
      inventoryNew.push({type:"wood",amount:99});
      }else{
      inventoryNew[invGet("wood")].amount = 99;
      }
      if(blockExists("planks") == false){
      inventoryNew.push({type:"planks",amount:99});
      }else{
      inventoryNew[invGet("planks")].amount = 99;
      }
      if(blockExists("rock") == false){
      inventoryNew.push({type:"rock",amount:99});
      }else{
      inventoryNew[invGet("rock")].amount = 99;
      }
      if(blockExists("grass") == false){
      inventoryNew.push({type:"grass",amount:99});
      }else{
      inventoryNew[invGet("grass")].amount = 99;
      }
      if(blockExists("leaves") == false){
      inventoryNew.push({type:"leaves",amount:99});
      }else{
      inventoryNew[invGet("leaves")].amount = 99;
      }
  }
  if(keyWentDown("f")){
    inChoose++;
    if(inChoose>=inventoryNew.length){
      inChoose=0;
    }
  }
  if(health <=1){
    health = 10;
  }
  if (mouseDown("leftButton")) {
    handAnimation();
  for (var i = 0; i < terrain.length; i++) {
    terrain.get(i).setAnimation(terrain.get(i).blockType);
    if (mouseIsOver(terrain.get(i))) {
      if(terrain.get(i).blockHealth<=1){
        if(inventoryNew.length <= 9){
              if(blockExists(terrain.get(i).blockType) == false){
                inventoryNew.push({type:terrain.get(i).blockType,amount:1});
              }else{
                inventoryNew[invGet(terrain.get(i).blockType)].amount = inventoryNew[invGet(terrain.get(i).blockType)].amount + 1;
              }
        }
        tileSound(terrain.get(i).blockType);
        levelData.splice(terrain.get(i).blockID,4);
        terrain.get(i).destroy();
        for (var a2 = 0; a2 < levelData.length/4; a2=a2+4) {
          levelData[a2+3] = a2;
        }
      }else{
      terrain.get(i).blockHealth=terrain.get(i).blockHealth-1;
      if(inventoryNew[inChoose]!=null){
      if(terrain.get(i).blockType=="rock" && inventoryNew[inChoose].type == "wood_pick"){
        terrain.get(i).blockHealth=terrain.get(i).blockHealth-3;
      }
      }
    }
    }
    }
  }
  if(keyWentDown("x")){
    terrain.destroyEach();
    levelData = [];
    terrainX = 0;
    terrainY = 0;
    plr.y = -180;
    for (var a3 = 0; a3 < 64; a3++) {
     terrain.add(createSprite(tilePos(terrainX),tilePos(terrainY)));
     terrainX++;
     terrain.get(terrain.length - 1).setAnimation("grass");
     terrain.get(terrain.length - 1).blockType="grass";
     terrain.get(terrain.length - 1).blockID=levelData.length-1;
     lD();
     setBH(terrain.get(terrain.length - 1).blockType);
    }
  }
  //opThin();
  }
  }
}

function opThin(){

}


