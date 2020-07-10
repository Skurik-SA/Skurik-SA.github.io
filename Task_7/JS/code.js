var canvas, ctx;

var dir,
  start_pause,
  restart,
  change_name,
  section,
  game,
  info,
  bGame,
  x_f,
  y_f;

var name = "",
  score,
  hpspec,
  lvl = 1;
var ArrEnemy = [],
  ArrBullet = [];

var cannon, cannon_x, cannon_y;
var angle, draw_angle;
var FPS;

var image = new Image(900, 600);
image.src = "neon1.jpg";

var enemy1 = new Image(200, 200);
enemy1.src = "ufoRed.png";

var enemy2 = new Image(150, 150);
enemy2.src = "ufoBlue.png";

var enemy3 = new Image(150, 150);
enemy3.src = "Ship1.png";

var enemy4 = new Image(150, 150);
enemy4.src = "Ship2.png";

var globalTimer;

function init() {
  dir = "game";
  canvas = document.getElementById("canvas");
  cannon = new Cannon();
  cannon_x = 50;
  cannon_y = canvas.height - 50;
  score = 0;
  hp = 5;
  spec = 3;
  lvl = 1;
  angle = toRad(45);
  draw_angle = toRad(45);
  FPS = 0;
  ArrEnemy = [];
  ArrBullet = [];
  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
    drawBack(ctx, canvas.width, canvas.height);
    x_f = canvas.getBoundingClientRect().left;
    y_f = canvas.getBoundingClientRect().top;
  }
  start_pause = document.getElementById("btn1");
  restart = document.getElementById("btn2");
  change_name = document.getElementById("btn3");
  section = document.getElementById("btn4");
  game = document.getElementById("game");
  info = document.getElementById("info");
  bGame = false;
}

function shoot() {
  if (bGame && FPS >= 150) {
    FPS = 0;
    ArrBullet.push(new Bullet(angle));
  }
}

function SuperSkill() {
  if (score >= 600) {
    score -= 600;
    ArrEnemy = [];
    ArrBullet = [];
  }
}

function rotate(event) {
  if (bGame) {
    let dx = event.x - x_f - cannon_x;
    let dy = canvas.height + y_f - event.y - 50;
    if (dy >= 0 && dx >= 0) {
      angle = Math.atan2(dy, dx);
      draw_angle = Math.atan2(dx, dy);
    }
  }
}

function drawBack(ctx, w, h) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0);
  draw_info();
  for (i = 0; i < ArrBullet.length; i++) ArrBullet[i].draw(ctx);
  for (i = 0; i < ArrEnemy.length; i++) ArrEnemy[i].draw(ctx);
  cannon.draw(ctx);
}

function play() {
  if (hp > 0) {
    drawBack(ctx, canvas.width, canvas.height);
    FPS++;
    lvl = score / 500 + 1;
    en_amount = 3 + lvl * 2;

    for (i = 0; i < ArrBullet.length; i++) {
      if (ArrBullet[i].posX + ArrBullet[i].size >= canvas.width)
        ArrBullet.splice(i--, 1);
    }

    for (i = 0; i < ArrBullet.length; i++) {
      for (j = 0; j < ArrEnemy.length; j++) {
        if (clash(ArrBullet[i], ArrEnemy[j])) {
          score += ArrEnemy[j].points;
          ArrEnemy.splice(j--, 1);
        }
      }
    }

    for (j = 0; j < ArrEnemy.length; j++) {
      if (ArrEnemy[j].posX <= 0) {
        ArrEnemy.splice(j--, 1);
        hp--;
      }
    }

    for (j = 0; j < ArrEnemy.length; j++) {
      ArrEnemy[j].posX -= ArrEnemy[j].speed;
    }

    while (ArrEnemy.length < en_amount) get_enemy();
  } else {
    end_game();
  }
}

EnemyInfo = [
  {
    size: 200,
    speed: (2 * lvl) / 5,
    points: 10,
    img: enemy1,
  },
  {
    size: 150,
    speed: (2 * lvl + 2) / 5,
    points: 20,
    img: enemy2,
  },
  {
    size: 150,
    speed: (2 * lvl + 3) / 5,
    points: 30,
    img: enemy3,
  },
  {
    size: 150,
    speed: (2 * lvl + 4) / 5,
    points: 50,
    img: enemy4,
  },
];

function clash(figure1, figure2) {
  clashX = false;
  clashY = false;
  if (
    figure1.posX - figure2.size / 2 <= figure2.posX &&
    figure1.posX + figure2.size / 2 >= figure2.posX
  )
    clashX = true;
  if (
    figure1.posY - figure2.size / 2 <= figure2.posY &&
    figure1.posY + figure2.size / 2 >= figure2.posY
  )
    clashY = true;
  return clashX && clashY;
}
