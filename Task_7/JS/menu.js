function new_game() {
  check_name();
  init();
}

function change_status() {
  if (!bGame) {
    bGame = true;
    start_pause.value = "Pause";
    restart.disabled = true;
    change_name.disabled = true;
    section.disabled = true;
    globalTimer = setInterval("play();", 1);
    return;
  }

  if (bGame) {
    bGame = false;
    start_pause.value = "Play";
    restart.disabled = false;
    change_name.disabled = false;
    section.disabled = false;
    clearInterval(globalTimer);
    return;
  }
}

function change_table() {
  if (dir == "info") {
    dir = "game";
    start_pause.disabled = false;
    restart.disabled = false;
    change_name.disabled = false;
    section.value = "Rules&Records";
    info.style.display = "none";
    game.style.display = "block";
    return;
  }
  if (dir == "game") {
    dir = "info";
    start_pause.disabled = true;
    restart.disabled = true;
    change_name.disabled = true;
    section.value = "Game";
    info.style.display = "block";
    game.style.display = "none";
    display_table();
    return;
  }
}

function draw_info() {
  ctx.fillStyle = "red";
  ctx.font = "30px Verdana";
  ctx.fillText(get_hp(), 10, 40);
  ctx.fillStyle = "#77004a";
  ctx.font = "30px Verdana";
  ctx.fillText("Score: " + score, 15, 70);
}

function check_name() {
  firstName = prompt("Как Вас зовут?");
  if (Boolean(firstName)) {
    name = firstName;
    alert("Приятной игры, " + firstName);
  } else {
    check_name();
  }
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

function end_game() {
  alert("GAME OVER");
  localStorage.setItem(name, score);
  change_status();
  change_table();
}
