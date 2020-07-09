//interface
var dir, start_pause, restart, change_player, section;
var game, info;
var x_fault, y_fault;
//logic
var bGame;
//main field
var canvas, ctx;
//field background
var image = new Image(900, 600); //фон
image.src = "neon1.jpg"; //фон
//data
var name = ""; //имя игрока
var score; //счёт
var hp; //здоровья
var spec; //ульта
var level = 1;
var enemy_list = []; //враги
var bullet_list = []; //ядра
//obj
var gun; //пушка
var gun_x, gun_y; //координаты пушки
var angle; //начальный угол орудия
var draw_angle;
var tic;
//sprites
var enemy1 = new Image(200, 200);
enemy1.src = "ufoRed.png";

var enemy2 = new Image(150, 150);
enemy2.src = "ufoBlue.png";

var enemy3 = new Image(150, 150);
enemy3.src = "Ship1.png";

var enemy4 = new Image(150, 150);
enemy4.src = "Ship2.png";

//timers
var game_timer;

function init() {
  dir = "game";
  canvas = document.getElementById("canvas");
  gun = new Gun();
  gun_x = 50;
  gun_y = canvas.height - 50;
  score = 0;
  hp = 5;
  spec = 3;
  level = 1;
  angle = toRad(45);
  draw_angle = toRad(45);
  tic = 0;
  enemy_list = [];
  bullet_list = [];
  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
    drawBack(ctx, canvas.width, canvas.height);
    x_fault = canvas.getBoundingClientRect().left;
    y_fault = canvas.getBoundingClientRect().top;
  }
  start_pause = document.getElementById("btn1");
  restart = document.getElementById("btn2");
  change_player = document.getElementById("btn3");
  section = document.getElementById("btn4");
  game = document.getElementById("game");
  info = document.getElementById("info");
  bGame = false;
}

function drawBack(ctx, w, h) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0);
  draw_info();
  for (i = 0; i < bullet_list.length; i++) bullet_list[i].draw(ctx);
  for (i = 0; i < enemy_list.length; i++) enemy_list[i].draw(ctx);
  gun.draw(ctx);
}

function shoot() {
  if (bGame && tic >= 150) {
    tic = 0;
    bullet_list.push(new Bullet(angle));
  }
}

function SuperSkill() {
  if (score >= 500) {
    score -= 500;
    enemy_list = [];
    bullet_list = [];
  }
}

function rotate(event) {
  if (bGame) {
    let dx = event.x - x_fault - gun_x;
    let dy = canvas.height + y_fault - event.y - 50;
    if (dy >= 0 && dx >= 0) {
      angle = Math.atan2(dy, dx);
      draw_angle = Math.atan2(dx, dy);
    }
  }
}

function play() {
  if (hp > 0) {
    drawBack(ctx, canvas.width, canvas.height);
    tic++;
    level = score / 500 + 1;
    en_amount = 3 + level * 2;

    for (i = 0; i < bullet_list.length; i++) {
      if (bullet_list[i].posX + bullet_list[i].size >= canvas.width)
        bullet_list.splice(i--, 1);
    }

    for (i = 0; i < bullet_list.length; i++) {
      for (j = 0; j < enemy_list.length; j++) {
        if (clash(bullet_list[i], enemy_list[j])) {
          score += enemy_list[j].points;
          enemy_list.splice(j--, 1);
        }
      }
    }

    for (j = 0; j < enemy_list.length; j++) {
      if (enemy_list[j].posX <= 0) {
        enemy_list.splice(j--, 1);
        hp--;
      }
    }

    for (j = 0; j < enemy_list.length; j++) {
      enemy_list[j].posX -= enemy_list[j].speed;
    }

    while (enemy_list.length < en_amount) get_enemy();
  } else {
    end_game();
  }
}

//Enemies
enemy_data = [
  {
    size: 200,
    speed: (2 * level) / 5,
    points: 10,
    img: enemy1,
  },
  {
    size: 150,
    speed: (2 * level + 2) / 5,
    points: 20,
    img: enemy2,
  },
  {
    size: 150,
    speed: (2 * level + 3) / 5,
    points: 30,
    img: enemy3,
  },
  {
    size: 150,
    speed: (2 * level + 4) / 5,
    points: 50,
    img: enemy4,
  },
];

//info
function draw_info() {
  ctx.fillStyle = "red";
  ctx.font = "30px Verdana";
  ctx.fillText(get_hp(), 10, 40);
  ctx.fillStyle = "#77004a";
  ctx.font = "30px Verdana";
  ctx.fillText("Score: " + score, 15, 70);
}

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

function end_game() {
  alert("GAME OVER");
  localStorage.setItem(name, score);
  change_status();
  change_section();
}

function display_table() {
  let html = '<table id="gen"><th>ИМЯ</th><th>ОЧКИ</th>';
  for (let i = 0; i < localStorage.length && i < 15; i++) {
    html += '<tr aling="center">';
    for (let j = 0; j < 1; j++) {
      let key = localStorage.key(i);
      html += "<td>" + localStorage.key(i) + "</td>";
      html += "<td>" + localStorage.getItem(key) + "</td>";
    }
    html += "</tr>";
  }
  html += "</table>";

  document.getElementById("top").innerHTML = html;
}
