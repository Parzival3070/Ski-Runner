var skier, skierImage;

var skier1, skier2Image, skier3Image, skier1Image, skier1Group;

var run, runImage;

var snowflake, snowflakeImage, snowflakeGroup;

var PLAY = 1;

var END = 0;

var gameState = PLAY;

var tree, treeImage, treeGroup;

var x;

var score;

var gameOver, gameOverImage;

function preload() {

  snowflakeImage = loadImage('snowflake.png');  
  skierImage = loadImage('skier.png');
  skier1Image = loadImage('skier1.png');
  treeImage = loadImage('tree.png');
  skier2Image = loadImage('skier2.png');
  skier3Image = loadImage('skier3.png');
  gameOverImage = loadImage('gameover.png');

}

function setup() {

  createCanvas(windowWidth, windowHeight);

  skier = createSprite(windowWidth / 2, windowHeight / 4, 40, 40);
  skier.addImage(skierImage);
  skier.scale = 0.1;

  run = createSprite(windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  run.shapeColor = 'lightblue';
  run.depth = skier.depth - 1;

  gameOver = createSprite(windowWidth/2, windowHeight/2);
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;

  score = 0;

  snowflakeGroup = new Group();
  powderpitGroup = new Group();
  treeGroup = new Group();
  skier1Group = new Group();

}

function draw() {

  background('white');

  if (gameState === PLAY) {

    stroke('black');
    fill('black');
    text('Score:  ' + score, windowWidth / 2, 0);

    if (snowflakeGroup.isTouching(skier)) {

      score = score + 1;
      snowflakeGroup.destroyEach();

    }

    if (treeGroup.isTouching(skier) || skier1Group.isTouching(skier)) {

      gameState = END;

    }

    if (keyDown(RIGHT_ARROW)) {

      skier.x = skier.x + score + 40;

    }

    if (keyDown(LEFT_ARROW)) {

      skier.x = skier.x - score - 40;

    }

    if (frameCount % 100 === 0) {

      flake();

    }

    if (frameCount % 150 === 0) {

      tree1();

    }

    if (frameCount % 200 === 0) {

      skier2();

    }

  }

  if (gameState === END) {

    skier.destroy();
    snowflakeGroup.destroyEach();
    powderpitGroup.destroyEach();
    treeGroup.destroyEach();
    skier1Group.destroyEach();

    gameOver.visible = true;

  }

  drawSprites();

}


function flake() {

  snowflake = createSprite(windowWidth / 2, windowHeight + 50);
  snowflake.x = Math.round(random(0, windowWidth));
  snowflake.addImage(snowflakeImage);
  snowflake.velocityY = -score - 10;
  snowflake.scale = 0.03;
  snowflakeGroup.add(snowflake);

}


function tree1() {

  tree = createSprite(windowWidth / 2, windowHeight + 50);
  tree.x = Math.round(random(0, windowWidth));
  tree.addImage(treeImage);
  tree.velocityY = -score - 10;
  tree.scale = 0.06;
  treeGroup.add(tree);

}


function skier2() {

  skier1 = createSprite(windowWidth / 2, windowHeight + 50);
  skier1.x = Math.round(random(0, windowWidth));
  skier1.addImage(skier1Image);
  skier1.velocityY = -score - 10;
  skier1.scale = 0.4;

  var x = Math.round(random(1, 3));

  if (x = 1) {

    skier1.addImage(skier1Image);

  }

  else if (x = 2) {

    skier1.addImage(skier2Image);

  }

  else {

    skier1.addImage(skier3Image);

  }

  
  skier1Group.add(skier1);

}