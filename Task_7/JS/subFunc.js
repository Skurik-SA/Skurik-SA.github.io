function toDeg(num) {
  //Радианы -> градусы
  return (num * 180) / Math.PI;
}

function toRad(num) {
  //Градусы -> радианы
  return (num * Math.PI) / 180;
}

function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

function get_enemy() {
    type = randomInt(0, 4);
    x = canvas.width + randomInt(100, 1000);
    y = randomInt(100, canvas.height - 100);
    data = enemy_data[type];
    enemy_list.push(
      new Enemy(x, y, data.size, data.speed, data.points, data.img)
    );
  }

function get_hp() {
    str = "";
    i = 0;
    while (i++ < hp) str += "❤";
    while (i++ <= 5) str += "♡";
    return str;
  }