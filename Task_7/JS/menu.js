function new_session() {
  check_name();
  init();
}

function change_status() {
  if (!bGame) {
    bGame = true;
    start_pause.value = "Pause";
    restart.disabled = true;
    change_player.disabled = true;
    section.disabled = true;
    game_timer = setInterval("play();", 1);
    return;
  }

  if (bGame) {
    bGame = false;
    start_pause.value = "Play";
    restart.disabled = false;
    change_player.disabled = false;
    section.disabled = false;
    clearInterval(game_timer);
    return;
  }
}

function change_section() {
  if (dir == "info") {
    dir = "game";
    start_pause.disabled = false;
    restart.disabled = false;
    change_player.disabled = false;
    section.value = "Rules&Records";
    info.style.display = "none";
    game.style.display = "block";
    return;
  }
  if (dir == "game") {
    dir = "info";
    start_pause.disabled = true;
    restart.disabled = true;
    change_player.disabled = true;
    section.value = "Game";
    info.style.display = "block";
    game.style.display = "none";
    display_table();
    return;
  }
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
