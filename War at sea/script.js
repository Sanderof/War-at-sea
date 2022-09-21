
//------------------------------------------------------------------------------

//---
function mainMenu() {
  playAudio.pause();
  gameOverAudio.pause();
  victoryAudio.pause();
  menuAudio.currentTime = 0;
  menuAudio.volume = music;
  if (audioPlay === true) {
    menuAudio.play();
  }
  if (menuAudio.ended) {
    menuAudio.currentTime = 0;
    menuAudio.play();
  }

  fhipd1 = new Date();
  time1fhip = fhipd1.getTime();
  ship = [], heli = [], jet = [];
  timeShip(); timeHeli(); timeJet();

  updateMenu();

  backgroundMovement();

  canvas.style.cursor = "default";
  document.onkeydown = keyDownMenu;
  canvas.onmousemove = mouseOverButton;
  canvas.onclick = clickStart;
}

//---
function mouseOverButton(evt) {
  var mouseX, mouseY, canvasRect;

  canvasRect = canvas.getBoundingClientRect();
  mouseX = evt.clientX - canvasRect.left;
  mouseY = evt.clientY - canvasRect.top;

  if (gameStatus === "mainMenu") {
    if (mouseX > buttonFrame.x - 10 && mouseX < buttonFrame.x + buttonFrame.w - 22 &&
        mouseY > buttonFrame.y - 7 && mouseY < buttonFrame.y + buttonFrame.h - 5) {
          canvas.style.cursor = "pointer";
          mouseOver = true;
    } else if (mouseX > buttonFrame.x - 10 && mouseX < buttonFrame.x + buttonFrame.w - 22 &&
        mouseY > buttonFrameS.y - 7 && mouseY < buttonFrameS.y + buttonFrame.h - 5) {
          canvas.style.cursor = "pointer";
          mouseOverS = true;
    } else {
      canvas.style.cursor = "default";
      mouseOver = false;
      mouseOverS = false;
    }
  } else if (gameStatus === "volumeSettings") {
    if (mouseX > buttonFrame.x - 10 && mouseX < buttonFrame.x + buttonFrame.w - 22 &&
        mouseY > buttonFrame.y - 7 && mouseY < buttonFrame.y + buttonFrame.h - 5) {
          canvas.style.cursor = "pointer";
          mouseOverV = true; mouseOver = true;
    } else {
      canvas.style.cursor = "default";
      mouseOverV = false; mouseOver = true;
    }
    if (mouseX > thumb.x - 20 && mouseX < thumb.x + thumb.w - 12 &&
        mouseY > thumb.y - 10 && mouseY < thumb.y + thumb.h - 7) {
      canvas.style.cursor = "pointer";
    } else if (mouseX > thumbS.x - 20 && mouseX < thumbS.x + thumb.w - 12 &&
        mouseY > thumbS.y - 10 && mouseY < thumbS.y + thumb.h - 7) {
      canvas.style.cursor = "pointer";
    }
  }
}

function clickStart(evt) {
  var mouseX, mouseY, canvasRect;

  canvasRect = canvas.getBoundingClientRect();
  mouseX = evt.clientX - canvasRect.left;
  mouseY = evt.clientY - canvasRect.top;

  if (gameStatus === "mainMenu") {
    if (mouseX > buttonFrame.x - 10 && mouseX < buttonFrame.x + buttonFrame.w - 22 &&
        mouseY > buttonFrame.y - 7 && mouseY < buttonFrame.y + buttonFrame.h - 5) {
          gameStatus = "play"; updateWave1(); render();
    } else if (mouseX > buttonFrame.x - 10 && mouseX < buttonFrame.x + buttonFrame.w - 22 &&
        mouseY > buttonFrameS.y - 7 && mouseY < buttonFrameS.y + buttonFrame.h - 5) {
          gameStatus = "volumeSettings";
    }
  } else if (gameStatus === "volumeSettings") {
    if (mouseX > buttonFrame.x - 10 && mouseX < buttonFrame.x + buttonFrame.w - 22 &&
        mouseY > buttonFrame.y - 7 && mouseY < buttonFrame.y + buttonFrame.h - 5) {
          gameStatus = "mainMenu";
    }
  }
}

//---
function mouseDown(evt) {
  canvasRect = canvas.getBoundingClientRect();
  mouseX = evt.clientX - canvasRect.left;
  mouseY = evt.clientY - canvasRect.top;

  if (mouseX > thumb.x - 20 && mouseX < thumb.x + thumb.w - 12 &&
      mouseY > thumb.y - 10 && mouseY < thumb.y + thumb.h - 7) {
        canvas.onmousemove = changeMusic;
        canvas.onmouseup = mouseUp;
  } else if (mouseX > thumbS.x - 20 && mouseX < thumbS.x + thumb.w - 12 &&
      mouseY > thumbS.y - 10 && mouseY < thumbS.y + thumb.h - 7) {
        canvas.onmousemove = changeSoundEffect;
        canvas.onmouseup = mouseUp;
  }
}

//---
function changeMusic(evt) {
  canvasRect = canvas.getBoundingClientRect();
  mousex = evt.clientX - canvasRect.left;
  if (thumb.x + 5 >= sliderFrame.x && thumb.x + thumb.w - 5 <= sliderFrame.x + sliderFrame.w) {
    thumb.x = mousex + 7;
  }
  if (thumb.x + 5 < sliderFrame.x) {
      thumb.x = sliderFrame.x - 5;
  } else if (thumb.x + thumb.w - 5 > sliderFrame.x + sliderFrame.w) {
             thumb.x = sliderFrame.x + sliderFrame.w - 5;
  }
  music = (thumb.x + 5 - sliderFrame.x) / (sliderFrame.w);
}

//---
function changeSoundEffect(evt) {
  canvasRect = canvas.getBoundingClientRect();
  mousex = evt.clientX - canvasRect.left;

  if (thumbS.x + 5 >= sliderFrame.x && thumbS.x + thumb.w - 5 <= sliderFrame.x + sliderFrame.w) {
    thumbS.x = mousex + 7;
  }
  if (thumbS.x + 5 < sliderFrame.x) {
      thumbS.x = sliderFrame.x - 5;
  } else if (thumbS.x + thumb.w - 5 > sliderFrame.x + sliderFrame.w) {
             thumbS.x = sliderFrame.x + sliderFrame.w - 5;
  }
  soundEffect = (thumbS.x + 5 - sliderFrame.x) / (sliderFrame.w);
}

//---
function mouseUp() {
  canvas.onmousemove = mouseOverButton;
}




//------------------------------------------------------------------------------

//--- Draws the different elements that are to be shown on the screen
function render() {
  if (gameStatus === "play") {
  requestAnimationFrame(render);
  canvas.style.cursor = "none";
  playAudio.volume = music;
  if (playAudio.ended) {
    playAudio.currentTime = 0;
    playAudio.play();
  }

  waves();
  createImage(imgSky, "Images/" + images[7], 0, 0, 800, 550,
              0, 0, canvas.width, (canvas.height / 10) * 7.7, "rgb(104, 137, 221)"); // Sky
  createImage(imgSea, "Images/" + images[8], 0, 0, 800, 54,
              0, (canvas.height / 10) * 7.7, canvas.width, canvas.height / 7, "#3053ad"); // Sea
  createRect(0, (canvas.height / 10) * 9, canvas.width, canvas.height / 10, "rgb(49, 51, 53)"); // Toolbar
  createRect(0, (canvas.height / 10) * 9, canvas.width, canvas.height / 200, "#000"); // Toolbar division line
  createImage(imgPlane, plane.img, plane.sx, plane.sy, plane.sw, plane.sh,
              (canvas.width / 100) * 17, (canvas.height / 100) * 93.5, plane.w - 5, plane.h - 5);
  createImage(imgHelo, helo.img, helo.sx, helo.sy, helo.sw, helo.sh,
              (canvas.width / 100) * 29, (canvas.height / 100) * 93.5, helo.w - 5, helo.h - 3);
  createImage(imgRocket, "Images/" + images[3], 0, 0, 32, 32,
  (canvas.width / 100) * 72, (canvas.height / 100) * 92.5, 32, 32);
  createImage(imgCanon, "Images/" + images[4], 0, 0, 32, 32,
  (canvas.width / 100) * 77, (canvas.height / 100) * 92.5, 32, 32);

  createImage(imgShip, player.img, player.sx, player.sy, player.sw, player.sh,
              player.x, player.y, player.w, player.h); // Player
  createText("Score " + score, (canvas.width / 100) * 6, (canvas.height / 100) * 96.7, "24px Serif", "rgb(173, 51, 46)"); // Score
  createText("Wave " + wave, (canvas.width / 100) * 90, (canvas.height / 100) * 96.7, "24px Serif", "rgb(173, 51, 46)"); // Wave

  rocket = {
    img: "Images/" + images[5],
    sx: 12,
    sy: 8,
    sw: 8,
    sh: 15,
    x: player.x + (player.w / 2) - 4,
    y: player.y - 5,
    w: 8,
    h: 15,
    xs: 0.14 * stepL,
    ys: 4.5,
    s: 1
  }

  bullet = {
    x: player.x + (player.w / 2),
    y: player.y - 5,
    r: 2,
    c: "#000",
    xs: 0.14 * stepL,
    ys: 4.5,
    s: 1
  }

  pRocket = {
    img: "Images/" + images[6],
    sx: 12,
    sy: 8,
    sw: 8,
    sh: 15,
    x: 0,
    y: plane.y + 8,
    w: 12,
    h: 20,
    ys: -5,
    s: 1
  }

  hRocket = {
    img: "Images/" + images[6],
    sx: 12,
    sy: 8,
    sw: 8,
    sh: 15,
    x: 0,
    y: helo.y + 8,
    w: 8,
    h: 15,
    ys: -5,
    s: 1
  }

    animate();

  }
}


//--- Makes the objects on screen move
function animate() {
  document.onkeydown = keyDown;
  document.onkeyup = keyUp;

  createLine(arrow.x1, arrow.y1, arrow.x2, arrow.y2, arrow.lw, arrow.c); // Direction Arrow

  wd2 = new Date();
  time2w = wd2.getTime();

  if (time2w - time1w <= 3900 && wave === 1) {
    createRect(0, 0, canvas.width, (canvas.height / 10) * 9, "rgba(36, 40, 38, .5)");
    createText("Wave 1", (canvas.width / 2), (canvas.height / 2),
               "100px Serif", "rgba(196, 91, 39, .8)"); // Game Over Header
  }

  if (time2w - time1w <= 5900 && wave !== 1) {
    createRect(0, 0, canvas.width, (canvas.height / 10) * 9, "rgba(36, 40, 38, .5)");
    createText("Wave " + wave, (canvas.width / 2), (canvas.height / 2),
               "100px Serif", "rgba(196, 91, 39, .8)"); // Game Over Header
  }

//--------------------------------- Ship / Player

  if (leftPressed === true && player.x > 16) {
    player.x -= 3; arrow.x1 -= 3; arrow.x2 -= 3;
  }
  else if (rightPressed === true && player.x < canvas.width - (player.w + 16)) {
    player.x += 3; arrow.x1 += 3; arrow.x2 += 3;
  }

//--------------------------------- Fire weapons

  if (time2r - time1r >= 800 && fireRocket === true) {
    if (audioPlay === true) {
      rocketAudio.currentTime = 0;
      rocketAudio.play();
      rocketAudio.volume = soundEffect * (2/5);
    }
    rockets.push({ img: rocket.img, sx: rocket.sx, sy: rocket.sy,
                  sw: rocket.sw, sh: rocket.sh,
                  x: rocket.x, y: rocket.y, w: rocket.w, h: rocket.h,
                  xs: rocket.xs, ys: rocket.ys, s: rocket.s });
    timeR();
  }

  if (time2b - time1b >= 10000 && fireCanon === true) {
    bullets.push({ x: bullet.x, y: bullet.y, r: bullet.r, c: bullet.c,
                   xs: bullet.xs, ys: bullet.ys, s: bullet.s });
                   if (audioPlay === true) {
                    if (bulletAudio.ended) {
                       bulletAudio.currentTime = 0;
                    } else {
                      bulletAudio.play();
                      bulletAudio.volume = soundEffect * (3/5);
                    }
                   }
    if (bullets.length - bulletCount === 50) {
      timeB();
      bulletCount = bullets.length;
    }
  }

//--------------------------------- Turn Arrow

  if (turnLeft === true && stepL !== 52) {
    arrow.x1 -= radius * Math.cos(speed * stepL);
    arrow.y1 += radius * Math.sin(speed * stepL);
    stepL++;
   }
  else if (turnRight === true && stepL !== -52) {
    arrow.x1 += radius * Math.cos(speed * stepL);
    arrow.y1 -= radius * Math.sin(speed * stepL);
    stepL--;
   }

//--------------------------------- Rockets / Bullets / Weapons

  for (var h = 0; h < rockets.length; h++) {
    if (rockets[h].s === 1) {
      createImage(imgRock, rockets[h].img,
                  rockets[h].sx, rockets[h].sy, rockets[h].sw, rockets[h].sh,
                  rockets[h].x, rockets[h].y, rockets[h].w, rockets[h].h);
    }
    rockets[h].y -= rockets[h].ys; rockets[h].x -= rockets[h].xs;
    if (rockets[rockets.length - 1].y < -10) { rockets.shift(); }
  }

  rd2 = new Date(); time2r = rd2.getTime();

  for (var i = 0; i < bullets.length; i++) {
    if (bullets[i].s === 1) {
      createArc(bullets[i].x, bullets[i].y, bullets[i].r, bullets[i].c);
    }
    bullets[i].y -= bullets[i].ys; bullets[i].x -= bullets[i].xs;
  }

  bd2 = new Date(); time2b = bd2.getTime();

//--------------------------------- Enemy firing weapons

  rand2 = new Date();
  time2ran = rand2.getTime();

  for (var l = 0; l < pRockets.length; l++) {
    if (pRockets[l].s === 1) {
      createImage(imgMirrorRocket, pRockets[l].img,
                  pRockets[l].sx, pRockets[l].sy, pRockets[l].sw, pRockets[l].sh,
                  pRockets[l].x, pRockets[l].y, pRockets[l].w, pRockets[l].h);
    }
    pRockets[l].y -= pRockets[l].ys;
    if (pRockets[l].y >= player.y + (player.h - 13) && pRockets[l].y <= player.y + (player.h + 60)) {
        pRockets[l].s = 0;
        pRockets[l].ex = 1;
    } else if (pRockets[l].y > player.y + (player.h + 60)) {
        pRockets[l].ex = 0;
    }
    if (pRockets[l].ex === 1) {
        createRect(pRockets[l].x - 12.5 - (player.w / 2), player.y + (player.h),
                   50 + player.w, 4, "orange");
    }
  }

  rand4 = new Date();
  time4ran = rand4.getTime();

  for (var m = 0; m < hRockets.length; m++) {
    if (hRockets[m].s === 1) {
      createImage(imgMirrorRocket, hRockets[m].img,
                  hRockets[m].sx, hRockets[m].sy, hRockets[m].sw, hRockets[m].sh,
                  hRockets[m].x, hRockets[m].y, hRockets[m].w, hRockets[m].h);
    }
    hRockets[m].y -= hRockets[m].ys;
    if (hRockets[m].y >= player.y + (player.h - 13) && hRockets[m].y <= player.y + (player.h + 60)) {
        hRockets[m].s = 0;
        hRockets[m].ex = 1;
    } else if (hRockets[m].y > player.y + (player.h + 60)) {
        hRockets[m].ex = 0;
    }
    if (hRockets[m].ex === 1) {
        createRect(hRockets[m].x - 12.5 - (player.w / 2), player.y + (player.h),
                   50 + player.w, 4, "orange");
    }
  }


//--------------------------------- Timing of the helos' and planes' arrivals

  pd2 = new Date();
  time2p = pd2.getTime();

  if (time2p - time1p >= plane.interval && helos.length < lim) {
    planes.push({ img: plane.img, sx: plane.sx, sy: plane.sy, sw: plane.sw, sh: plane.sh,
                  x: plane.x, y: plane.y, w: plane.w, h: plane.h, s: plane.s, health: plane.health });
    pseudoPlanes.push({ x: plane.x, y: plane.y, w: plane.w, h: plane.h, s: plane.s });
    if (wave === 1) {
      plane.interval = Math.floor(Math.random() * 12000) + 8000;
    } else if (wave === 2) {
      plane.interval = Math.floor(Math.random() * 11500) + 7500;
    } else if (wave === 3) {
      plane.interval = Math.floor(Math.random() * 11000) + 7000;
    } else if (wave === 4) {
      plane.interval = Math.floor(Math.random() * 10500) + 6500;
    } else if (wave === 5) {
      plane.interval = Math.floor(Math.random() * 10000) + 6000;
    }
    timeP();
  }

  hd2 = new Date();
  time2h = hd2.getTime();

  if (time2h - time1h >= helo.interval && helos.length < lim) {
    helos.push({ img: helo.img, sx: helo.sx, sy: helo.sy, sw: helo.sw, sh: helo.sh,
                  x: helo.x, y: helo.y, w: helo.w, h: helo.h, s: helo.s, health: helo.health });
    pseudoHelos.push({ x: helo.x, y: helo.y, w: helo.w, h: helo.h, s: helo.s});
    if (wave === 1) {
      helo.interval = Math.floor(Math.random() * 8000) + 5000;
    } else if (wave === 2) {
      helo.interval = Math.floor(Math.random() * 6000) + 3000;
    } else if (wave === 3) {
      helo.interval = Math.floor(Math.random() * 4500) + 1500;
    } else if (wave === 4) {
      helo.interval = Math.floor(Math.random() * 3500) + 1000;
    } else if (wave === 5) {
      helo.interval = Math.floor(Math.random() * 2000) + 500;
    }
    timeH();
  }

  for (var n = 0; n < pseudoPlanes.length; n++) {
    pseudoPlanes[n].x -= plane.speed;
    if (time2ran - time1ran >= plane.ranInt && pseudoPlanes[n].x > 20
        && pseudoPlanes[n].x < canvas.width - 20 - plane.w) {
      ranPlane = Math.floor(Math.random() * pseudoPlanes.length);
      pRockets.push({ img: pRocket.img, sx: pRocket.sx,
                      sy: pRocket.sy, sw: pRocket.sw, sh: pRocket.sh,
                      x: pseudoPlanes[ranPlane].x + (pseudoPlanes[n].w / 2) - 6, y: pRocket.y,
                      w: pRocket.w, h: pRocket.h, s: pRocket.s, ys: pRocket.ys });
      if (wave < 4) {
        plane.ranInt = Math.floor(Math.random() * 8000) + 6000;
      } else if (wave === 4) {
        plane.ranInt = Math.floor(Math.random() * 7000) + 5000;
      } else if (wave === 5) {
        plane.ranInt = Math.floor(Math.random() * 6000) + 4000;
      }
      timeRan();
    }
    if (pseudoPlanes[n].x < 0) {
      pseudoPlanes.shift();
    }
  }

  for (var o = 0; o < pseudoHelos.length; o++) {
    pseudoHelos[o].x -= helo.speed;
    if (time4ran - time3ran >= helo.ranInt && pseudoHelos[o].x > 20
        && pseudoHelos[o].x < canvas.width - 20 - helo.w) {
      ranHelo = Math.floor(Math.random() * pseudoHelos.length);
      hRockets.push({ img: hRocket.img, sx: hRocket.sx,
                      sy: hRocket.sy, sw: hRocket.sw, sh: hRocket.sh,
                        x: pseudoHelos[ranHelo].x + (pseudoHelos[o].w / 2) - 4, y: hRocket.y,
                        w: hRocket.w, h: hRocket.h, s: hRocket.s, ys: hRocket.ys });
      if (wave <= 4) {
        helo.ranInt = Math.floor(Math.random() * 5000) + 1000;
      } else if (wave === 5) {
        helo.ranInt = Math.floor(Math.random() * 2000) + 100;
      }
      timeRan2();
    }
    if (pseudoHelos[o].x < 0) {
      pseudoHelos.shift();
    }
  }

  //--------------------------------- Planes / Helicopters / Enemies

    for (var j = 0; j < planes.length; j++) {
      if (planes[j].s === 1) {
        createImage(imgPlane, planes[j].img, planes[j].sx, planes[j].sy, planes[j].sw, planes[j].sh,
                    planes[j].x, planes[j].y, planes[j].w, planes[j].h);
        healthBarPlane(planes, j, plane);
      }
      planes[j].x -= plane.speed;
    }

    for (var k = 0; k < helos.length; k++) {
      if (helos[k].s === 1) {
        createImage(imgHelo, helos[k].img, helos[k].sx, helos[k].sy, helos[k].sw, helos[k].sh,
                    helos[k].x, helos[k].y, helos[k].w, helos[k].h);
        healthBarHelo(helos, k, helo);
      }
      helos[k].x -= helo.speed;
    }

//--------------------------------- Toolbar

//----- Weapon Loading Symbol

  if (time2b - time1b < 10000) {
    createRect((canvas.width / 100) * 77, ((canvas.height / 100) * 92.5) + 32,
                32, - ((time2b - time1b) / 10000) * 32, "rgba(160, 44, 44, .5)");
  } else if (time2b - time1b >= 10000) {
    createRect((canvas.width / 100) * 77,
              (canvas.height / 100) * 92.5, 32, 32, "rgba(76, 163, 82, .5)");
  }

  if (time2r - time1r < 800) {
    createRect((canvas.width / 100) * 72, ((canvas.height / 100) * 92.5) + 32,
                32, - ((time2r - time1r) / 800) * 32, "rgba(160, 44, 44, .5)");
  } else if (time2r - time1r >= 800) {
    createRect((canvas.width / 100) * 72,
              (canvas.height / 100) * 92.5, 32, 32, "rgba(76, 163, 82, .5)");
  }

  if (weapon === "rocket") {
    createStrokeRect((canvas.width / 100) * 72, ((canvas.height / 100) * 92.5) + 32,
                32, 6, "rgb(96, 147, 229)", "#000", 1);
    createStrokeRect((canvas.width / 100) * 77, ((canvas.height / 100) * 92.5) + 32,
                      32, 6, "rgb(114, 118, 124)", "#000", 1);
  } else {
    createStrokeRect((canvas.width / 100) * 77, ((canvas.height / 100) * 92.5) + 32,
                32, 6, "rgb(96, 147, 229)", "#000", 1);
    createStrokeRect((canvas.width / 100) * 72, ((canvas.height / 100) * 92.5) + 32,
                      32, 6, "rgb(114, 118, 124)", "#000", 1);
  }

//----- Enemies taken down
  createText(planeDown, (canvas.width / 100) * 15, (canvas.height / 100) * 96.5,
             "24px Serif", "rgb(173, 51, 46)");
  createText(heloDown, (canvas.width / 100) * 27, (canvas.height / 100) * 96.5,
             "24px Serif", "rgb(173, 51, 46)");

//--------------------------------- Other

  healthBarPlayer();
  collision();

  if (player.health <= 0) {
    pRockets = hRockets = [];
    gameStatus = "gameOver"; gameOver();
  } else if (victor === true) {
    gameStatus = "victory"; victory();
  }

}

//------------------------------------------------------------------------------

//--- Some code is run as a result of a button being pressed down
function keyDown(evt) {
  if (evt.keyCode === 37) { leftPressed = true; }
  else if (evt.keyCode === 39) { rightPressed = true; }
  else if (evt.keyCode === 65) { turnLeft = true; }
  else if (evt.keyCode === 68) { turnRight = true; }
  else if (evt.keyCode === 87) {
    if (weapon === "rocket") {
      fireRocket = true;
    } else if (weapon === "canon") {
      fireCanon = true;
    }
  }
  else if (evt.keyCode === 49) { weapon = "rocket"; }
  else if (evt.keyCode === 50) { weapon = "canon"; }
  else if (evt.keyCode === 13) { gameStatus = "pause"; pause(); }
  else if (evt.keyCode === 27) { gameStatus = "mainMenu"; mainMenu(); }
  else if (evt.keyCode === 48) {
    if (audioPlay === false) {
      audioPlay = true;
      playAudio.play();
    } else {
      audioPlay = false;
      playAudio.pause();
    }
  }
}

//--- Buttons to be pushed while the game over screen is shown
function keyDownGameOver(evt) {
  if (evt.keyCode === 13) { gameStatus = "mainMenu"; mainMenu(); victor = false; }
  else if (evt.keyCode === 48) {
    if (audioPlay === false) {
      audioPlay = true;
      gameOverAudio.play();
    } else {
      audioPlay = false;
      gameOverAudio.pause();
    }
  }
}

//--- Buttons to be pushed while the victory screen is shown
function keyDownVictory(evt) {
  if (evt.keyCode === 13) { gameStatus = "mainMenu"; mainMenu(); victor = false; }
  else if (evt.keyCode === 48) {
    if (audioPlay === false) {
      audioPlay = true;
      victoryAudio.play();
    } else {
      audioPlay = false;
      victoryAudio.pause();
    }
  }
}

//--- Buttons to be pushed while the main menu screen is shown
function keyDownMenu(evt) {
  if (evt.keyCode === 48) {
    if (audioPlay === false) {
      audioPlay = true;
      menuAudio.play();
    } else {
      audioPlay = false;
      menuAudio.pause();
    }
  }
}

//--- Buttons to be pushed while the pause screen is shown
function keyDownPause(evt) {
  if (evt.keyCode === 13) { gameStatus = "play"; render(); }
  else if (evt.keyCode === 27) { gameStatus = "mainMenu"; mainMenu(); }
  else if (evt.keyCode === 48) {
    if (audioPlay === false) {
      audioPlay = true;
      playAudio.play();
    } else {
      audioPlay = false;
      playAudio.pause();
    }
  }
}

//--- Some code is run when a button is released, resulting in canceling the code ran in the keyDown function
function keyUp(evt) {
  if (evt.keyCode === 37) { leftPressed = false; }
  else if (evt.keyCode === 39) { rightPressed = false; }
  else if (evt.keyCode === 65) { turnLeft = false; }
  else if (evt.keyCode === 68) { turnRight = false; }
  else if (evt.keyCode === 87) { fireRocket = false; fireCanon = false; }
}

//------------------------------------------------------------------------------

//--- Finds the time of day in milliseconds, belongs to planes
function timeP() {
  pd1 = new Date();
  time1p = pd1.getTime();
}

//--- Finds the time of day in milliseconds, belongs to helos
function timeH() {
  hd1 = new Date();
  time1h = hd1.getTime();
}

//--- Finds the time of day in milliseconds, belongs to rockets
function timeR() {
  rd1 = new Date();
  time1r = rd1.getTime();
}

//--- Finds the time of day in milliseconds, belongs to bullets
function timeB() {
  bd1 = new Date();
  time1b = bd1.getTime();
}

//--- Finds the time of day in milliseconds, belongs to plane.ranInt
function timeRan() {
  rand1 = new Date();
  time1ran = rand1.getTime();
}

//--- Finds the time of day in milliseconds, belongs to helo.ranInt
function timeRan2() {
  rand3 = new Date();
  time3ran = rand3.getTime();
}

//--- Finds the time of day in milliseconds, belongs to waves
function timeWave() {
  wd1 = new Date();
  time1w = wd1.getTime();
}

//--- Finds the time of day in milliseconds, belongs to ship
function timeShip() {
  shipd1 = new Date();
  time1ship = shipd1.getTime();
}

//--- Finds the time of day in milliseconds, belongs to heli
function timeHeli() {
  helid1 = new Date();
  time1heli = helid1.getTime();
}

//--- Finds the time of day in milliseconds, belongs to jet
function timeJet() {
  jetd1 = new Date();
  time1jet = jetd1.getTime();
}

//------------------------------------------------------------------------------

//--- Makes an healthbar over the plane according to which wave it is
function healthBarPlane(array, index, helo) {
  if (wave === 1) {
    createHealthBar(array, index, helo, 0, 7.5, 3.5, 3);
  } else if (wave === 2) {
    createHealthBar(array, index, helo, 0, 7.5, 4, 3);
  } else if (wave === 3) {
    createHealthBar(array, index, helo, 0, 7.5, 4.5, 3);
  } else if (wave === 4) {
    createHealthBar(array, index, helo, 0, 7.5, 5, 3);
  } else if (wave === 5) {
    createHealthBar(array, index, helo, 0, 7.5, 5.5, 3);
  }
}

//--- Makes an healthbar over the helicopter according to which wave it is
function healthBarHelo(array, index, helo) {
  if (wave === 1) {
    createHealthBar(array, index, helo, 7.5, 24, 3.5, 3);
  } else if (wave === 2) {
    createHealthBar(array, index, helo, 7.5, 24, 4, 3);
  } else if (wave === 3) {
    createHealthBar(array, index, helo, 7.5, 24, 4.5, 3);
  } else if (wave === 4) {
    createHealthBar(array, index, helo, 7.5, 24, 5, 3);
  } else if (wave === 5) {
    createHealthBar(array, index, helo, 7.5, 24, 5.5, 3);
  }
}

//--- Creates the player's healthbar
function healthBarPlayer() {
  createStrokeRect((canvas.width / 100) * 42, (canvas.height / 100) * 92.5 + 10,
                  (canvas.width / 100) * 25, 16, "transparent", "rgb(191, 198, 204)", 1);

  createRect((canvas.width / 100) * 42 + 1, (canvas.height / 100) * 92.5 + 11,
            (((canvas.width / 100) * 25 - 2) / 100) * player.health, 14, "rgba(90, 188, 138, .9)");

  createText(player.health, (canvas.width / 100) * 40, (canvas.height / 100) * 95 + 10,
             "20px Serif", "rgb(173, 51, 46)"); // Health
}

//--- Run when the player has lost all health
function gameOver() {
  playAudio.pause();
  if (audioPlay === true) {
    gameOverAudio.currentTime = 0;
    gameOverAudio.play();
    gameOverAudio.volume = music;
  }
  if (gameOverAudio.ended) {
    gameOverAudio.currentTime = 0;
    gameOverAudio.play();
  }

  document.onkeydown = keyDownGameOver;
  document.onkeyup = null;
  document.onmousemove = null;
  document.onclick = null;
  leftPressed = rightPressed = turnLeft = turnRight = fireRocket = fireCanon = false;

    healthBarPlayer()
    createRect((canvas.width / 100) * 72,
              (canvas.height / 100) * 92.5, 32, 32, "rgba(36, 40, 38, .5)");
    createRect((canvas.width / 100) * 77,
              (canvas.height / 100) * 92.5, 32, 32, "rgba(36, 40, 38, .5)");
      createRect(0, 0, canvas.width, (canvas.height / 10) * 9, "rgba(36, 40, 38, .75)");
      createText("Game Over", (canvas.width / 2), (canvas.height / 10) * 4.5,
                 "100px Serif", "rgb(47, 183, 57)"); // Game Over Header
      createText("You managed to score " + score + " points", (canvas.width / 2),
                 (canvas.height / 10) * 5.8, "40px Serif", "rgb(47, 183, 57)"); // Points Scored
      createText("Press enter to restart the game", (canvas.width / 2),
                (canvas.height / 10) * 7, "40px Serif", "rgb(47, 183, 57)"); // Points Scored

}

//---
function pause() {
  playAudio.volume = music * (3/10);
  if (playAudio.ended) {
    playAudio.currentTime = 0;
    playAudio.play();
  }

  document.onkeydown = keyDownPause;
  document.onkeyup = null;
  document.onmousemove = null;
  document.onclick = null;

    healthBarPlayer()
    createRect((canvas.width / 100) * 72,
              (canvas.height / 100) * 92.5, 32, 32, "rgba(36, 40, 38, .5)");
    createRect((canvas.width / 100) * 77,
              (canvas.height / 100) * 92.5, 32, 32, "rgba(36, 40, 38, .5)");
      createRect(0, 0, canvas.width, (canvas.height / 10) * 9, "rgba(36, 40, 38, .75)");
      createText("The game is paused", (canvas.width / 2), (canvas.height / 10) * 4.5,
                 "100px Serif", "rgb(47, 183, 57)"); // Game Over Header
      createText("Score so far: " + score, (canvas.width / 2),
                 (canvas.height / 10) * 5.8, "42px Serif", "rgb(47, 183, 57)"); // Points Scored
      createText("Press enter to resume", (canvas.width / 2),
                (canvas.height / 10) * 7, "48px Serif", "rgb(47, 183, 57)"); // Points Scored
}

//---
function victory() {
  playAudio.pause();
  if (audioPlay === true) {
    victoryAudio.currentTime = 0;
    victoryAudio.play();
    victoryAudio.volume = music;
  }
  if (victoryAudio.ended) {
    victoryAudio.currentTime = 0;
    victoryAudio.play();
  }

  document.onkeydown = keyDownVictory;
  document.onkeyup = null;
  document.onmousemove = null;
  document.onclick = null;

    healthBarPlayer()
    createRect((canvas.width / 100) * 72,
              (canvas.height / 100) * 92.5, 32, 32, "rgba(36, 40, 38, .5)");
    createRect((canvas.width / 100) * 77,
              (canvas.height / 100) * 92.5, 32, 32, "rgba(36, 40, 38, .5)");
      createRect(0, 0, canvas.width, (canvas.height / 10) * 9, "rgba(36, 40, 38, .75)");
      createText("Victory", (canvas.width / 2), (canvas.height / 10) * 4.5,
                 "100px Serif", "rgb(47, 183, 57)"); // Game Over Header
      createText("You managed to score " + score + " points", (canvas.width / 2),
                 (canvas.height / 10) * 5.8, "42px Serif", "rgb(47, 183, 57)"); // Points Scored
      createText("Press enter to return to the main menu", (canvas.width / 2),
                (canvas.height / 10) * 7, "38px Serif", "rgb(47, 183, 57)"); // Points Scored
}

//--- Decided which wave the game is on
function waves() {
  if (wave === 1) {
    if (helos.length === lim) {
      if (pseudoHelos.length === 0) {
        wave = 2;
        timeP();
        timeH();
        timeWave();
        updateWave2();
        helos = [];
      }
    }
  } else if (wave === 2) {
    if (helos.length === lim) {
      if (pseudoHelos.length === 0) {
        wave = 3;
        timeP();
        timeH();
        timeWave();
        updateWave3();
        helos = [];
      }
    }
  } else if (wave === 3) {
    if (helos.length === lim) {
      if (pseudoHelos.length === 0) {
        wave = 4;
        timeP();
        timeH();
        timeWave();
        updateWave4();
        helos = [];
      }
    }
  } else if (wave === 4) {
    if (helos.length === lim) {
      if (pseudoHelos.length === 0) {
        wave = 5;
        timeP();
        timeH();
        timeWave();
        updateWave5();
        helos = [];
      }
    }
  } else if (wave === 5) {
    if (helos.length === lim) {
      if (pseudoHelos.length === 0) {
        helos = planes = bullets = rockets = pRockets = hRockets = [];
        leftPressed = rightPressed = turnLeft = turnRight = fireRocket = fireCanon = bTimeStart = false;
        victor = true;
      }
    }
  }
}

//------------------------------------------------------------------------------

//--- Detects collisions between projectiles and enemies & player
function collision() {
  var b, r, p, h, pp, ph, pr, hr;
  for (var i = 0; i < rockets.length; i++) {    // Rockets
    r = rockets[i];
    for (var j = 0; j < planes.length; j++) {   // Planes Rockets
      p = planes[j];
      for (var m = pseudoPlanes.length - 1; m >= 0; m--) {    // PseudoPlanes
        pp = pseudoPlanes[m];
        if (r.x + r.w > p.x - 4 && r.x + r.w < p.x + p.w + 4
          && r.y + r.h > p.y - 4 && r.y + r.h < p.y + p.h + 4
          && r.s !== 0 && p.s !== 0 && r.x + r.w > pp.x - 6 && r.x + r.w < pp.x + pp.w + 6) {
            rockets[i].s = 0;
            if (planes[j].health <= plane.cDamage) {
              if (audioPlay === true) {
                enemyDownAudio.currentTime = 0;
                enemyDownAudio.load();
                enemyDownAudio.play();
                enemyDownAudio.volume = soundEffect * (2/5);
              }
              planes[j].health = 0;
              planes[j].s = 0;
              pseudoPlanes.splice(m, 1);
              createArc(planes[j].x + (plane.w / 2), plane.y + (plane.h / 2),
                        plane.w + 14, "orange");
              score += plane.scoreAug;
              planeDown += 1;
            } else {
              planes[j].health -= plane.cDamage;
            }
          }
        }
      }
        for (var k = 0; k < helos.length; k++) {      // Helos Rockets
          h = helos[k];
          for (var l = pseudoHelos.length - 1; l >= 0; l--) {   // PseudoHelos
            ph = pseudoHelos[l];
            if (r.x + r.w > h.x - 4 && r.x + r.w < h.x + h.w + 4
              && r.y + r.h > h.y - 4 && r.y + r.h < h.y + h.h + 4
              && r.s !== 0 && h.s !== 0 && r.x + r.w > ph.x - 6 && r.x + r.w < ph.x + ph.w + 6) {
                rockets[i].s = 0;
                if (helos[k].health <= helo.cDamage) {
                  if (audioPlay === true) {
                    enemyDownAudio.currentTime = 0;
                    enemyDownAudio.load();
                    enemyDownAudio.play();
                    enemyDownAudio.volume = soundEffect * (2/5);
                  }
                  helos[k].health = 0;
                  helos[k].s = 0;
                  pseudoHelos.splice(l, 1);
                  createArc(helos[k].x + (helo.w / 2), helo.y + (helo.h / 2),
                            helo.w + 14, "orange");
                  score += helo.scoreAug;
                  heloDown += 1;
                } else {
                  helos[k].health -= helo.cDamage;
                }
              }
            }
          }
  }
  for (var i = 0; i < bullets.length; i++) {    // Bullets / Canon
    b = bullets[i];
    for (var j = 0; j < planes.length; j++) {   // Planes Canon
      p = planes[j];
      for (var m = pseudoPlanes.length - 1; m >= 0; m--) {    // PseudoPlanes
        pp = pseudoPlanes[m];
        if (b.x + b.r > p.x - 4 && b.x + b.r < p.x + p.w + 4
          && b.y + b.r > p.y - 4 && b.y + b.r < p.y + p.h + 4
          && b.s !== 0 && p.s !== 0 && b.x + b.r > pp.x - 6 && b.x + b.r < pp.x + pp.w + 6) {
            bullets[i].s = 0;
            if (planes[j].health <= plane.bDamage) {
              if (audioPlay === true) {
                enemyDownAudio.currentTime = 0;
                enemyDownAudio.load();
                enemyDownAudio.play();
                enemyDownAudio.volume = soundEffect * (2/5);
              }
              planes[j].health = 0;
              planes[j].s = 0;
              pseudoPlanes.splice(m, 1);
              createArc(planes[j].x + (plane.w / 2), plane.y + (plane.h / 2),
                        plane.w + 14, "orange");
              score += plane.scoreAug;
              planeDown += 1;
            } else {
              planes[j].health -= plane.bDamage;
            }
          }
        }
      }
        for (var k = 0; k < helos.length; k++) {    // Helos Canon
          h = helos[k];
          for (var l = pseudoHelos.length - 1; l >= 0; l--) {   // PseudoHelos
            ph = pseudoHelos[l];
            if (b.x + b.r > h.x - 4 && b.x + b.r < h.x + h.w + 4
              && b.y + b.r > h.y - 4 && b.y + b.r < h.y + h.h + 4
              && b.s !== 0 && h.s !== 0 && b.x + b.r > ph.x - 6 && b.x + b.r < ph.x + ph.w + 6) {
                bullets[i].s = 0;
                if (helos[k].health <= helo.bDamage) {
                  if (audioPlay === true) {
                    enemyDownAudio.currentTime = 0;
                    enemyDownAudio.load();
                    enemyDownAudio.play();
                    enemyDownAudio.volume = soundEffect * (2/5);
                  }
                  helos[k].health = 0;
                  helos[k].s = 0;
                  pseudoHelos.splice(l, 1);
                  createArc(helos[k].x + (helo.w / 2), helo.y + (helo.h / 2),
                            helo.w + 14, "orange");
                  score += helo.scoreAug;
                  heloDown += 1;
                } else {
                  helos[k].health -= helo.bDamage;
                }
              }
            }
          }
  }
  for (var n = 0; n < pRockets.length; n++) {
    pr = pRockets[n];
    if (pr.x + pr.w > player.x - 50 && pr.x + pr.w < player.x + player.w + 50
      && pr.y + pr.h > player.y + 14 && pr.y + pr.h < player.y + player.h
      && pr.s !== 0) {
        pr.s = 0;
        if (player.health >= plane.pDamage) {
          player.health -= plane.pDamage;
        } else {
          player.health = 0;
        }
    }
  }
  for (var o = 0; o < hRockets.length; o++) {
    hr = hRockets[o];
    if (hr.x + hr.w > player.x - 25 && hr.x + hr.w < player.x + player.w + 25
      && hr.y + hr.h > player.y + 14 && hr.y + hr.h < player.y + player.h
      && hr.s !== 0) {
        hr.s = 0;
        if (player.health >= helo.pDamage) {
          player.health -= helo.pDamage;
        } else {
          player.health = 0;
        }
    }
  }
}

//------------------------------------------------------------------------------

//--- Draws a rectangle
function createRect(x, y, w, h, c) {
  ctx.beginPath();
    ctx.fillStyle = c;
    ctx.fillRect(x, y, w, h);
}

//--- Draws a rectangle with rounded corners
function createRoundedRect(x, y, w, h, c, s, lw) {
  ctx.beginPath();
    ctx.fillStyle = c;
    ctx.strokeStyle = s;
    ctx.lineWidth = lw;
    ctx.lineJoin = "round";
    ctx.rect(x, y, w, h);
    ctx.fill();
    ctx.stroke();
}

//--- Draws a rectangle
function createStrokeRect(x, y, w, h, c, s, lw) {
  ctx.beginPath();
    ctx.fillStyle = c;
    ctx.strokeStyle = s;
    ctx.lineWidth = lw;
    ctx.rect(x, y, w, h);
    ctx.fill();
    ctx.stroke();
}

//--- Draws an image
function createImage(im, ims, sx, sy, sw, sh, x, y, w, h) {
  ctx.beginPath();
  im.src = ims;
  ctx.drawImage(im, sx, sy, sw, sh, x, y, w, h);
}

//--- Draws a circle
function createArc(x, y, r, c) {
  ctx.beginPath();
    ctx.fillStyle = c;
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
}

//--- Draws a line
function createLine(x1, y1, x2, y2, lw, c) {
  ctx.beginPath();
    ctx.strokeStyle = c;
    ctx.lineWidth = lw;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  ctx.stroke();
}

//--- Draws a text that is centered onto the Canvas
function createText(t, x, y, f, c) {
  ctx.beginPath();
    ctx.font = f;
    ctx.fillStyle = c;
    ctx.textAlign = "center";
    ctx.fillText(t, x, y);
}

//--- Creates an healthbar
function createHealthBar(array, index, object, x, y, w, h) {
  createStrokeRect(((array[index].x + (array[index].w / 2)) - ((canvas.width / 100) * w) / 2) - x,
                  (canvas.height / 100) * y,
                  (canvas.width / 100) * w, h, "transparent", "rgb(191, 198, 204)", 1);
  createRect(((array[index].x + (array[index].w / 2)) - ((canvas.width / 100) * w) / 2) - x,
            (canvas.height / 100) * y,
            (((canvas.width / 100) * w) / object.health) * array[index].health, h, "rgba(90, 188, 138, .9)");
}

//------------------------------------------------------------------------------
