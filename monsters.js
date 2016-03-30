function Monster() {
    this.radius = randint(20, 40);
    this.dead = false;
    this.coin = false;
    this.speedup = false;
    this.speeddown = false;
    this.reverser = false;
    this.powerup = false;
    this.imagenum = randint(1, themelength);
    this.side = randint(1, 4);
    //line shaped monsters and coins
    var specialDeciderThing = randint(0, 8);
    if (specialDeciderThing == 0) {
        this.line = true;
        this.radius = randint(50, 250); //radius is length
        if (randint(0, 1) == 0) {
            this.horizontal = true;
            this.side = randint(3, 4);
        } else {
            this.horizontal = false;
            this.side = randint(1, 2);
        }
    } else if (specialDeciderThing == 1) {
        this.powerup = true;
        this.coin = true;
        this.radius = 12;
    } else if (specialDeciderThing == 2) {
        this.powerup = true;
        this.radius = 12;
        var specialDeciderThing = randint(0, 2);

        if (specialDeciderThing == 0) {
            this.speedup = true
        } else if (specialDeciderThing == 1) {
            this.speeddown = true
        } else {
            this.reverser = true
        }
    }
    //1 in 4 will start on left side
    if (this.side == 1) {
        this.dx = randint(1, 5);
        this.dy = randint(-2, 2);
        this.x = 0 - this.radius*2;
        this.y = randint(0, HEIGHT);
    //1 in 4 will start on right side
    } else if (this.side == 2) {
        this.dx = randint(-5, -1);
        this.dy = randint(-2, 2);
        this.x = WIDTH + this.radius*2;
        this.y = randint(0, HEIGHT);
    //1 in 4 will start on bottom side
    } else if (this.side == 3) {
        this.dx = randint(-2, 2);
        this.dy = randint(1, 5);
        this.x = randint(0, WIDTH);
        this.y = 0 - this.radius*2;
    //1 in 4 will start on top side
    } else if (this.side == 4) {
        this.dx = randint(-2, 2);
        this.dy = randint(-5, -1);
        this.x = randint(0, WIDTH);
        this.y = HEIGHT + this.radius*2;
    }
}

Monster.prototype.moveMonster = function() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x > WIDTH + this.radius*2 || this.x < 0 - this.radius*2
    || this.y > HEIGHT + this.radius*2 || this.y < 0 - this.radius*2) {
        this.dead = true;
    }
}

Monster.prototype.drawMonster = function() {
    if (theme == "StarWars" || this.coin) {
        ctx.fillStyle = "rgb(230, 230, 40)";
    } else if (this.speedup) {
        ctx.fillStyle = "rgb(40, 230, 40)";
    } else if (this.speeddown) {
        ctx.fillStyle = "rgb(230, 40, 40)";
    } else if (this.reverser) {
        ctx.fillStyle = "rgb(230, 40, 230)";
    } else {
        ctx.fillStyle = "rgb(30, 0, 80)";
    }
    if (this.line) {
        if (this.horizontal) {
            rect(this.x-this.radius, this.y-7, this.radius*2, 14);
        } else {
            rect(this.x-7, this.y-this.radius, 14, this.radius*2);
        }
    } else {
        circle(this.x, this.y, this.radius);
        if (!this.powerup) {
            ctx.drawImage(monsterImgs[this.imagenum-1], this.x-this.radius+2, this.y-this.radius+2, this.radius*2-4, this.radius*2-4);
        }
    }
}

Monster.prototype.drawShadow = function() {
    ctx.fillStyle = "rgb(120, 120, 120)";
    if (this.line) {
        if (this.horizontal) {
            rect(this.x-this.radius+8, this.y-7+8, this.radius*2, 14);
        } else {
            rect(this.x-7+8, this.y-this.radius+8, 14, this.radius*2);
        }
    } else {
        circle(this.x+8, this.y+8, this.radius);
    }
}

Monster.prototype.isCollide = function(playerx, playery, playerRadius) {
    if (this.line) {
        if (this.horizontal) {
            if (Math.abs(playerx - this.x) < playerRadius + this.radius && Math.abs(playery - this.y) < playerRadius + 14) {
                deathmonster = [this.x, this.y, this.radius, true, true];
                return true;
            }
        } else {
            if (Math.abs(playerx - this.x) < playerRadius + 14 && Math.abs(playery - this.y) < playerRadius + this.radius) {
                deathmonster = [this.x, this.y, this.radius, true, false];
                return true;
            }
        }
    } else {
        if (Math.abs(playerx - this.x) < playerRadius + this.radius + 10 && Math.abs(playery - this.y) < playerRadius + this.radius + 10) {
            var horizontalDistance = Math.abs(this.x-playerx);
            var verticalDistance = Math.abs(this.y-playery);
            var distance = Math.sqrt(Math.pow(horizontalDistance, 2.0) + Math.pow(verticalDistance, 2.0))

            if (distance < playerRadius + this.radius) {
                deathmonster = [this.x, this.y, this.radius, false, false];
                return true;
            }
        }
    }
    return false;
}
