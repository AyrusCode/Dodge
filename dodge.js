var canvas;
var ctx;
var framerate = 60;
var speed = 5;
var reversed = false;
var dx = 0;
var dy = 0;
var count = 1;
var WIDTH;
var HEIGHT;
var x;
var y;
var radius = 15;
var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var monsters = []
var gameover = false;
var interval;
var deathmonster = [];
var diagonalSlow = false;

// Important starting function
function init() {
    canvas = document.getElementById("game");
    canvas.width = window.innerWidth-20;
    canvas.height = window.innerHeight-20;
    ctx = game.getContext("2d");

    WIDTH = canvas.width;
    HEIGHT = canvas.height;
    x = WIDTH/2;
    y = HEIGHT/2;

    interval = setInterval(frame, 1000/framerate);
}

function randint(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

function circle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.fill();
}

function rect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function move() {
    dx = 0;
    dy = 0;
    if (upPressed) {
        dy -= speed;
    } if (downPressed) {
        dy += speed;
    } if (leftPressed) {
        dx -= speed;
    } if (rightPressed) {
        dx += speed;
    }
    if (Math.abs(dx) + Math.abs(dy) > speed && diagonalSlow) {
        dx /= 2;
        dy /= 2;
        if (dx > 0) {
            dx += 1;
        } else {
            dx -= 1;
        } if (dy > 0) {
            dy += 1;
        } else {
            dy -= 1;
        }
    }
    y += dy;
    x += dx;
    if (y < radius) {
        y = radius;
    } if (x < radius) {
        x = radius;
    } if (y > HEIGHT - radius) {
        y = HEIGHT - radius;
    } if (x > WIDTH - radius) {
        x = WIDTH - radius;
    }

    for (var i = monsters.length-1; i >= 0; i--) {
        if (!monsters[i].dead) {
            monsters[i].moveMonster();
        } else {
            monsters.splice(i, 1);
        }
    }
}

function gameoverScreen() {
    clearInterval(interval);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "rgb(0, 0, 0)";
    rect(0 ,0, WIDTH, HEIGHT);

    ctx.fillStyle = "rgb(150, 30, 30)";
    circle(x, y, radius);

    if (deathmonster[3]) {
        if (deathmonster[4]) {
            rect(deathmonster[0] - deathmonster[2], deathmonster[1] - 7, deathmonster[2] * 2, 14);
        } else {
            rect(deathmonster[0] - 7, deathmonster[1] - deathmonster[2], 14, deathmonster[2] * 2);
        }
    } else {
        circle(deathmonster[0], deathmonster[1], deathmonster[2]);
    }

    ctx.textAlign = "center";
    ctx.font = "36px Arial Black";
    ctx.fillStyle = "rgb(240, 240, 240)";
    ctx.fillText("Press the space bar to play again", WIDTH/2, HEIGHT/2+40);
    ctx.font = "96px Arial Black";
    ctx.fillStyle = "rgb(240, 240, 240)";
    ctx.fillText("Game Over " + "(" + count.toString() + ")", WIDTH/2, HEIGHT/2-20);
}

function restart() {
    gameover = false;
    x = WIDTH/2;
    y = HEIGHT/2;
    monsters = [];
    count = 1;
    speed = 5;
    reversed = false;
    var upPressed = false;
    var downPressed = false;
    var leftPressed = false;
    var rightPressed = false;
    interval = setInterval(frame, 1000/framerate);
}

function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    if (theme == "StarWars") {
        ctx.fillStyle = "rgb(0, 0, 0)";
    } else {
        ctx.fillStyle = "rgb(240, 240, 240)";
    }

    //Gridlines
    ctx.strokeStyle = "rgba(120, 120, 120, 0.3)";
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    for (var i = 0; i < WIDTH/40; i++) {
        rect(i*40, 0, 20, HEIGHT);
        rect(0, i*40, WIDTH, 20);
    }

    rect(0 ,0, WIDTH, HEIGHT);
    ctx.fillStyle = "rgb(120, 120, 120)";
    circle(x+8, y+8, radius)
    ctx.fillStyle = "rgb(80, 0, 30)";
    circle(x, y, radius);
    ctx.drawImage(playerImg, x-radius+2, y-radius+2, radius*2-4, radius*2-4);

    for (var i = 0; i < monsters.length; i++) {
        monsters[i].drawShadow();
    }
    ctx.fillStyle = "rgb(30, 0, 80)";
    for (var i = 0; i < monsters.length; i++) {
        if (monsters[i].isCollide(x, y, 10) == true) {
            if (monsters[i].powerup) {
                if (monsters[i].coin) {
                    count += 100;
                } else if (monsters[i].speedup) {
                    speed += 1;
                } else if (monsters[i].speeddown) {
                    speed -= 1;
                } else if (monsters[i].reverser) {
                    speed *= -1;
                    reversed = !reversed;
                }
                monsters[i].dead = true;
            } else {
                gameover = true;
            }
        }
        monsters[i].drawMonster();
    }

    ctx.fillStyle = "rgb(30, 0, 80)";
    ctx.font = "42px Arial Black";
    ctx.fillText(count, WIDTH/2-(15*count.toString().length), 40);
    if (gameover) {
        gameoverScreen();
    }
}

function frame() {
    if (count % 8 == 0) {
        monsters.push(new Monster());
    }
    move();
    draw();
    count++;
    if (reversed && count % 2 == 0) {
        count++;
    }
}

// Main part of program
init();
window.addEventListener('keydown', keyDown, true);
window.addEventListener('keyup', keyUp, true);
