var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

//var particles = [];
var plinkos = [];
var divisions = [];

var divisionHeight = 300;
var score = 0;
var particle;
var turn = 0;

var gameState;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width / 2, height, width, 20);

  for (var k = 0; k <= width; k = k + 80) {
    divisions.push(new Divisions(k, height - divisionHeight / 2, 10, divisionHeight));
  }

  for (var j = 75; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 75));
  }
  for (var j = 50; j <= width - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 175));
  }
  for (var j = 75; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 275));
  }
  for (var j = 50; j <= width - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 375));
  }

  gameState = "play";
  mousePressed();
}

function draw() {
  background("darkBlue");
  textSize(20)
  //text("Score : "+score,20,30);
  Engine.update(engine);

  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }

  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  ground.display();

  if (particle !== null) {
    particle.display();
    var pos=particle.body.position
    if (pos.x <= 250 && pos.y > 700) {
      score = score + 500;
      particle=null;
    }
    if (pos.x >= 716 && pos.y > 700) {
      score = score + 500;
      particle=null;
    }
    if (pos.x >= 251 && pos.x <= 410 && pos.y >700) {
      score = score + 200;
      particle=null;
    }
    if (pos.x >= 411 && pos.x <= 715 && pos.y >700) {
      score = score + 100;
      particle=null;
    }
  }

  //console.log(particle.body.position.y);


  if (turn > 6) {
    gameState = "end";
    particle = null;
  }
  if (gameState === "end") {
    fill("green")
    textSize(45);
    text("GAME OVER", width / 2 - 110, height / 2-50);
  }

  fill("pink");
  textSize(20);
  text("500", 25, 520);
  text("500", 105, 520);
  text("500", 185, 520);
  text("200", 265, 520);
  text("200", 345, 520);
  text("100", 425, 520);
  text("100", 505, 520);
  text("100", 585, 520);
  text("500", 665, 520);
  text("500", 745, 520);
  text("score: " + score, 50, 50)
}

function mousePressed() {
  if (gameState !== "end") {
    particle = new Particle(mouseX, 15, 15);
    turn = turn + 1;
  }
}

