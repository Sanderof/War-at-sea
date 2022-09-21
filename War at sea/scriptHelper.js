var canvas, ctx;
var player, imgShip = new Image(), imgPlane = new Image(), imgHelo = new Image();
var imgRocket = new Image(), imgCanon = new Image(), imgRock = new Image();
var imgMirrorRocket = new Image(), imgSky = new Image(), imgSea = new Image();
var imgMainMenu = new Image(), imgHeloM = new Image(), imgPlaneM = new Image();
var playAudio = new Audio(), menuAudio = new Audio(), gameOverAudio = new Audio();
var victoryAudio = new Audio(), enemyDownAudio = new Audio(), bulletAudio = new Audio();
var rocketAudio = new Audio();
var images = ["ship.png", "plane.png", "helo.png", "rocketSymbol.png",
"canonSymbol.png", "rocket.png", "mirrorRocket.png", "sky.jpg", "sea.jpg",
"wallpaperMainMenu.jpg", "mirrorHelo.png", "mirrorPlane.png"];
var audio = ["neonStreets.mp3", "Anova.mp3", "mortyGameOver.mp3", "victory.mp3",
"gunLoud.mp3", "mp5Bullets.mp3", "rocketLaunch.mp3"];
var soundEffect = 0.5, music = 0.5, mouseOverS = false, mouseOver = false, mouseOverV = false;
var weapon, bulletCount, planeDown, heloDown, victor, audioPlay = true;
var rockets = [], bullets = [], planes = [], helos = [], ship = [], heli = [], jet = [];
var pRockets = [], hRockets = [], pseudoPlanes = [], pseudoHelos = [];
var stepL, radius = 0.6, speed = 0.02;
var pd1, pd2, time1p, time2p, hd1, hd2, time1h, time2h;
var rd1, rd2, time1r, time2r, bd1, bd2, time1b, time2b;
var rand1, rand2, time1ran, time2ran, rand3, rand4, time3ran, time4ran;
var wd1, wd2, time1w, time2w, shipd1, shipd2, time1ship, time2ship;
var fhipd1, fhipd2, time1fhip, time2fhip, helod1, helod2, time1heli, time2heli;
var jetd1, jetd2, time1jet, time2jet;
var ranPlane, ranHelo;
var score, wave, lim, gameStatus = "mainMenu";
var buttonFrame, buttonFrameS, sliderFrame;

var leftPressed, rightPressed;
var turnLeft, turnRight;
var fireRocket, fireCanon;
var bTimeStart;


//------------------------------------------------------------------------------

window.onload = winInit;

//--- Main function
function winInit() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  menuAudio.src = "Audio/" + audio[1];
  mainMenu();
  playAudio.src = "Audio/" + audio[0];
  gameOverAudio.src = "Audio/" + audio[2];
  victoryAudio.src = "Audio/" + audio[3];
  enemyDownAudio.src = "Audio/" + audio[4];
  bulletAudio.src = "Audio/" + audio[5];
  rocketAudio.src = "Audio/" + audio[6];
  document.documentElement.style.overflow = "hidden";
  document.body.scroll = "no";

}

//------------------------------------------------------------------------------

//--- Sets the starting values for the objects and variables
function updateWave1() {
  menuAudio.pause();
  if (audioPlay === true) {
    playAudio.currentTime = 0;
    playAudio.play();
    playAudio.volume = music;
  }
  timeWave();
  timeP();
  timeH();
  timeB();
  timeR();
  timeRan();
  timeRan2();

  player = {
    img: "Images/" + images[0],
    sx: 3,
    sy: 11,
    sw: 28,
    sh: 13,
    x: (canvas.width / 2) - 30,
    y: (canvas.height / 5) * 4,
    w: 76,
    h: 33,
    health: 100
  }

  arrow = {
    x1: player.x + (player.w / 2),
    y1: player.y - 30,
    x2: player.x + (player.w / 2),
    y2: player.y - 6,
    lw: 3,
    c: "#999"
  }

  plane = {
    img: "Images/" + images[1],
    sx: 0,
    sy: 9,
    sw: 30,
    sh: 14,
    x: canvas.width - 30,
    y: 50,
    w: 70,
    h: 33,
    s: 1,
    speed: 1.5,
    bDamage: 50,
    cDamage: 100,
    pDamage: 30,
    health: 100,
    scoreAug: 5,
    interval: Math.floor(Math.random() * 8000) + 3000,
    ranInt: Math.floor(Math.random() * 10000) + 10000
  }

  helo = {
    img: "Images/" + images[2],
    sx: 0,
    sy: 8,
    sw: 30,
    sh: 16,
    x: canvas.width - 30,
    y: 150,
    w: 44,
    h: 24,
    s: 1,
    speed: 0.5,
    bDamage: 35,
    cDamage: 55,
    pDamage: 15,
    health: 100,
    scoreAug: 3,
    interval: 5000,
    ranInt: Math.floor(Math.random() * 6000) + 4000,
  }

  ranPlane = Math.floor(Math.random() * pseudoPlanes.length);
  ranHelo = Math.floor(Math.random() * pseudoHelos.length);
  lim = 5, score = 0, wave = 1;
  weapon = "rocket";
  leftPressed = rightPressed = turnLeft = turnRight = fireRocket = fireCanon = bTimeStart = false;
  stepL = 0, bulletCount = 0, planeDown = 0, heloDown = 0, victor = false;
  helos = [], planes = [], bullets = [], rockets = [];
  pRockets = [], hRockets = [], pseudoPlanes = [], pseudoHelos = [];


}

function updateWave2() {
    plane.interval = Math.floor(Math.random() * 11500) + 7500;
    plane.speed = 1.6;
    plane.pDamage = 40;
    plane.health = 125;
    plane.scoreAug = 10;

    helo.interval = 6000;
    helo.speed = 0.6;
    helo.pDamage = 20;
    helo.health = 125;
    helo.scoreAug = 6;
    lim = 10;
}

function updateWave3() {
    plane.interval = Math.floor(Math.random() * 11000) + 7000;
    plane.speed = 1.7;
    plane.pDamage = 50;
    plane.health = 150;
    plane.scoreAug = 15;

    helo.interval = 6000;
    helo.speed = 0.7;
    helo.pDamage = 25;
    helo.health = 150;
    helo.scoreAug = 9;
    lim = 15;
}

function updateWave4() {
    plane.interval = Math.floor(Math.random() * 10500) + 6500;
    plane.speed = 1.8;
    plane.pDamage = 60;
    plane.health = 175;
    plane.scoreAug = 20;

    helo.interval = 6000;
    helo.speed = 1.8;
    helo.pDamage = 30;
    helo.health = 175;
    helo.scoreAug = 12;
    lim = 20;
}

function updateWave5() {
    plane.interval = Math.floor(Math.random() * 10000) + 6000;
    plane.speed = 1.9;
    plane.pDamage = 75;
    plane.health = 200;
    plane.scoreAug = 25;

    helo.interval = 6000;
    helo.speed = 1.9;
    helo.pDamage = 35;
    helo.health = 200;
    helo.scoreAug = 15;
    lim = 25;
}

function updateMenu() {
  buttonFrame = {
    x: (canvas.width / 2) - ((canvas.width / 10) * 5) / 2,
    y: (canvas.height / 10) * 1.7,
    w: (canvas.width / 10) * 5,
    h: 70,
    c: "rgba(36, 40, 38, .75)",
    s: "rgb(197, 210, 219)"
  }

  buttonFrameS = {
    y: (canvas.height / 10) * 3.5
  }

  sliderFrame = {
    x: (canvas.width / 2) - ((canvas.width / 10) * 5) / 2,
    y: (canvas.height / 10) * 4.4,
    w: (canvas.width / 10) * 5,
    h: 20,
    c: "rgba(36, 40, 38, .75)",
    s: "rgb(197, 210, 219)"
  }

  sliderFrameS = {
    y: (canvas.height / 10) * 6
  }

  thumb = {
    x: sliderFrame.x + (sliderFrame.w - 5) * music,
    y: (canvas.height / 10) * 4.3,
    w: 10,
    h: 30,
    c: "rgba(36, 40, 38, .9)",
    s: "rgb(206, 141, 43)"
  }

  thumbS = {
    x: sliderFrame.x + (sliderFrame.w - 10) * soundEffect,
    y: (canvas.height / 10) * 5.9,
  }

  player = {
    img: "Images/" + images[0],
    sx: 3,
    sy: 11,
    sw: 28,
    sh: 13,
    x: (canvas.width) + 80,
    y: (canvas.height / 5) * 4,
    w: 76,
    h: 33,
    speed: 1.2
  }

  plane = {
    img: "Images/" + images[1],
    imgM: "Images/" + images[11],
    sx: 0,
    sy: 9,
    sw: 30,
    sh: 14,
    x: canvas.width + 80,
    y: 50,
    w: 70,
    h: 33,
    speed: 1.5,
    interval: Math.floor(Math.random() * 8000) + 3000,
    ranInt: Math.floor(Math.random() * 10000) + 10000
  }

  helo = {
    img: "Images/" + images[2],
    imgM: "Images/" + images[10],
    sx: 0,
    sy: 8,
    sw: 30,
    sh: 16,
    x: canvas.width + 80,
    y: 150,
    w: 44,
    h: 24,
    s: 1,
    speed: 1,
    interval: 5000,
    ranInt: Math.floor(Math.random() * 6000) + 4000,
  }

}

function backgroundMovement() {
  if (gameStatus === "mainMenu" || gameStatus === "volumeSettings") {
    requestAnimationFrame(backgroundMovement);
    menuAudio.volume = music;

    createRect(0, 0, canvas.width, canvas.height, buttonFrame.c);
    createImage(imgMainMenu, "Images/" + images[9], 0, 0, 900, 700,
                0, 0, canvas.width, canvas.height, "#3053ad"); // Background Image

    if (mouseOver === false && mouseOverS === false && gameStatus === "mainMenu") {
    createStrokeRect(buttonFrame.x, buttonFrame.y, buttonFrame.w, buttonFrame.h,
                     buttonFrame.c, buttonFrame.s, 3);
    createText("Start Game", (canvas.width / 2), (canvas.height / 10) * 2.55,
               "46px Serif", "rgb(3, 153, 53)");
    createStrokeRect(buttonFrame.x, buttonFrameS.y, buttonFrame.w, buttonFrame.h,
                     buttonFrame.c, buttonFrame.s, 3);
    createText("Volume Settings", (canvas.width / 2), (canvas.height / 10) * 4.35,
               "46px Serif", "rgb(3, 153, 53)");
    } else if (mouseOver === true && gameStatus === "mainMenu") {
      createStrokeRect(buttonFrame.x, buttonFrame.y, buttonFrame.w,
                      buttonFrame.h, "rgba(36, 40, 38, .9)", "rgb(206, 141, 43)", 3);
      createText("Start Game", (canvas.width / 2), (canvas.height / 10) * 2.55,
                 "46px Serif", "rgb(95, 193, 77)");
      createStrokeRect(buttonFrame.x, buttonFrameS.y, buttonFrame.w, buttonFrame.h,
                       buttonFrame.c, buttonFrame.s, 3);
      createText("Volume Settings", (canvas.width / 2), (canvas.height / 10) * 4.35,
                 "46px Serif", "rgb(3, 153, 53)");
    } else if (mouseOverS === true && gameStatus === "mainMenu") {
      createStrokeRect(buttonFrame.x, buttonFrame.y, buttonFrame.w, buttonFrame.h,
                       buttonFrame.c, buttonFrame.s, 3);
      createText("Start Game", (canvas.width / 2), (canvas.height / 10) * 2.55,
                 "46px Serif", "rgb(3, 153, 53)");
      createStrokeRect(buttonFrame.x, buttonFrameS.y, buttonFrame.w,
                       buttonFrame.h, "rgba(36, 40, 38, .9)", "rgb(206, 141, 43)", 3);
      createText("Volume Settings", (canvas.width / 2), (canvas.height / 10) * 4.35,
                 "46px Serif", "rgb(95, 193, 77)");
    }

    if (gameStatus === "volumeSettings") {
      if (mouseOverV === false) {
        createStrokeRect(buttonFrame.x, buttonFrame.y, buttonFrame.w, buttonFrame.h,
                         buttonFrame.c, buttonFrame.s, 3);
        createText("Back to the main menu", (canvas.width / 2), (canvas.height / 10) * 2.55,
                   "46px Serif", "rgb(3, 153, 53)");
      } else if (mouseOverV === true) {
        createStrokeRect(buttonFrame.x, buttonFrame.y, buttonFrame.w,
                        buttonFrame.h, "rgba(36, 40, 38, .9)", "rgb(206, 141, 43)", 3);
        createText("Back to the main menu", (canvas.width / 2), (canvas.height / 10) * 2.55,
                   "46px Serif", "rgb(95, 193, 77)");
      }

      createText("Music", (canvas.width / 2), (canvas.height / 10) * 4,
                 "46px Serif", "rgb(3, 153, 53)");
      createRoundedRect(sliderFrame.x, sliderFrame.y, sliderFrame.w, sliderFrame.h,
                       sliderFrame.c, sliderFrame.s, 3);
      createRoundedRect(thumb.x, thumb.y, thumb.w, thumb.h,
                        thumb.c, thumb.s, 2);

      createText("Sound Effects", (canvas.width / 2), (canvas.height / 10) * 5.6,
                 "46px Serif", "rgb(3, 153, 53)");
      createRoundedRect(sliderFrame.x, sliderFrameS.y, sliderFrame.w, sliderFrame.h,
                       sliderFrame.c, sliderFrame.s, 3);
      createRoundedRect(thumbS.x, thumbS.y, thumb.w, thumb.h,
                        thumb.c, thumb.s, 2);

      canvas.onmousedown = mouseDown;
    }

   fhipd2 = new Date(); time2fhip = fhipd2.getTime();
   if (fhipd1 !== null) {
    if (time2fhip - time1fhip >= 4000) {
      ship.push({ x: player.x });
      fhipd1 = null;
      time1fhip = null;
    }
   }

    shipd2 = new Date(); time2ship = shipd2.getTime();
    if (time2ship - time1ship >= 28000) {
      ship.push({ x: player.x });
      timeShip();
    }

    for (var i = 0; i < ship.length; i++) {
      createImage(imgShip, player.img, player.sx, player.sy, player.sw, player.sh,
                ship[i].x, player.y, player.w, player.h); // Player
      ship[i].x -= player.speed;

        if (ship[i].x < -82) {
          ship.shift();
          player.x = -80;
          player.speed = -1.2;
        } else if (ship[i].x > canvas.width + 82) {
          ship.shift();
          player.x = canvas.width + 80;
          player.speed = 1.2;
        }
    }

    helid2 = new Date(); time2heli = helid2.getTime();
    if (time2heli - time1heli >= 42000) {
      heli.push({ x: helo.x });
      timeHeli();
    }

    for (var j = 0; j < heli.length; j++) {
      if (helo.speed > 0) {
        createImage(imgHelo, helo.img, 0, helo.sy, helo.sw, helo.sh,
                  heli[j].x, helo.y, helo.w, helo.h); // Helicopter
      } else {
        createImage(imgHeloM, helo.imgM, 2, helo.sy, helo.sw, helo.sh,
                  heli[j].x, helo.y, helo.w, helo.h); // Player
      }
      heli[j].x -= helo.speed;

        if (heli[j].x < -82) {
          heli.shift();
          helo.x = -80;
          helo.speed = -1;
        } else if (heli[j].x > canvas.width + 82) {
          heli.shift();
          helo.x = canvas.width + 80;
          helo.speed = 1;
        }
    }

    jetd2 = new Date(); time2jet = jetd2.getTime();
    if (time2jet - time1jet >= 34000) {
      jet.push({ x: plane.x });
      timeJet();
    }

    for (var j = 0; j < jet.length; j++) {
      if (plane.speed > 0) {
        createImage(imgPlane, plane.img, 0, plane.sy, plane.sw, plane.sh,
                jet[j].x, plane.y, plane.w, plane.h); // Plane
      } else {
        createImage(imgPlaneM, plane.imgM, 2, plane.sy, plane.sw, plane.sh,
                jet[j].x, plane.y, plane.w, plane.h); // Plane
      }
      jet[j].x -= plane.speed;

        if (jet[j].x < -82) {
          jet.shift();
          plane.x = -80;
          plane.speed = -1.5;
        } else if (jet[j].x > canvas.width + 82) {
          jet.shift();
          plane.x = canvas.width + 80;
          plane.speed = 1.5;
        }
    }
  }
}
