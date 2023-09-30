var path,mainNinja;
var player1,player2,player3;
var pathImg,mainNinjaImg;
var ninjaRedImg;
var ninjaBlueImg;
var ninjaGreenImg;
var gameOverImg;
var coinAnimation = [], coinSpriteData, coinSpriteSheet, coin, coinGroup, coinFrames;

var redNG,blueNG,greenNG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("Road.png");
  mainNinjaImg = loadAnimation("mainNinja1.png","mainNinja2.png");  
  ninjaRedImg = loadAnimation("ninjaRed1.png","ninjaRed2.png");  
  ninjaBlueImg = loadAnimation("ninjaBlue1.png","ninjaBlue2.png");  
  ninjaGreenImg = loadAnimation("ninjaGreen1.png","ninjaGreen2.png");  
  coinSpriteData = loadJSON("coin.json");
  coinSpriteSheet = loadImage("coin.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  
createCanvas(1200,300);
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

mainNinja  = createSprite(70,150);
mainNinja.addAnimation("Running",mainNinjaImg);
mainNinja.scale=0.35;
  
mainNinja.setCollider("rectangle",0,0,40,40,50);
  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  

coinFrames = coinSpriteData.frames; 
for (var i=0; i<coinFrames.length;i++){
  var pos = coinFrames[i].coin+i+png.frame; 
  var img = coinSpriteSheet.get(pos.x, pos.y, pos.w, pos.h)
  coinAnimation.push(img);
}

redNG = new Group();
blueNG = new Group();
greenNG = new Group();
coinGroup = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainNinja.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainNinja .collide(edges);
  
  if(path.x < 0 ){
    path.x = width/2;
  }
  
  var select_oppPlayer = Math.round(random(1,10));

  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      redNinjas();
    } else if (select_oppPlayer == 2) {
      blueNinjas();
    } else if (select_oppPlayer == 3) {
      greenNinjas();
    } else{
      powerCoins()
    }
    
  }
  
   if(redNG.isTouching(mainNinja)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",ninjaRedImg);
    }
    
    if(blueNG.isTouching(mainNinja)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",ninjaBlueImg);
    }
    
    if(greenNG.isTouching(mainNinja)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",ninjaGreenImg);
    }

  //  if(coinGroup.isTouching(mainNinja)){
   //   coin
   // }
    
}else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
  
    path.velocityX = 0;
    mainNinja.velocityY = 0;
  
    redNG.setVelocityXEach(0);
    redNG.setLifetimeEach(-1);
  
    blueNG.setVelocityXEach(0);
    blueNG.setLifetimeEach(-1);
  
    greenNG.setVelocityXEach(0);
    greenNG.setLifetimeEach(-1);

     if(keyDown("UP_ARROW")) {
       reset();
     }
}
}

function redNinjas(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.35;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",ninjaRedImg);
        player1.setLifetime=170;
        redNG.add(player1);
}

function blueNinjas(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.35;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",ninjaBlueImg);
        player2.setLifetime=170;
        blueNG.add(player2);
}

function greenNinjas(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.35;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",ninjaGreenImg);
        player3.setLifetime=170;
        greenNG.add(player3);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainNinja.addAnimation("Running",mainNinjaImg);
  
  redNG.destroyEach();
  blueNG.destroyEach();
  greenNG.destroyEach();
  
  distance = 0;
 }

 function powerCoins(){
  coin = createSprite(1100,Math.round(random(50, 250)));
  coin.scale =0.35;
  coin.addAnimation("coinImg", coinAnimation[0],coinAnimation[1],coinAnimation[2]);
  console.log(coinAnimation);
  coin.setLifetime=170;
  coinGroup.add(coin);
}
