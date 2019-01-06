// Game 1
var myGamePiece;
var myObstacles = [];
var score1 = 0;
var clickMe = document.getElementById("clickMe1");
var controller = document.getElementById("controller");
var btnGame1 = document.getElementById("btnGame1");
var game1Header = document.getElementById("game1Header");
var divGameStage1 = document.getElementById("divGameStage1");
var gameOver1 = document.getElementById("gameOver1");
var scoreHeader1 = document.getElementById("scoreHeader1");

function startGame() {
    game1Header.style.display = 'none';
    clickMe.style.display = 'none';
    scoreHeader1.style.display = 'block';
    divGameStage1.style.display = 'block';
    controller.style.display = 'block';
    myGamePiece = new component(30, 30, "#c94f7c", 10, 120);
    myGamePiece.gravity = 0.05;
    score1 = 0;
    myGameArea.start();
}
    const myGameArea = {
        canvas: document.createElement("canvas"),
        start: function () {
            const div = document.getElementById("divGameStage1");
            this.canvas.width = 480;
            this.canvas.height = 270;
            this.canvas.style.backgroundColor = "#fff";
            this.context = this.canvas.getContext("2d");
            div.appendChild(this.canvas);
            this.frameNo = 0;
            this.interval = setInterval(updateGameArea, 20);
        },
        clear: function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    function component(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.gravity = 0;
        this.gravitySpeed = 0;
        this.update = function () {
            ctx = myGameArea.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);           
        }
        this.newPos = function () {
            this.gravitySpeed += this.gravity;
            this.x += this.speedX;
            this.y += this.speedY + this.gravitySpeed;
            this.hitBottom();
        }
        this.hitBottom = function () {
            var rockbottom = myGameArea.canvas.height - this.height;
            if (this.y > rockbottom) {
                this.y = rockbottom;
                this.gravitySpeed = 0;
            }
        }
        this.crashWith = function (otherobj) {
            var myleft = this.x;
            var myright = this.x + (this.width);
            var mytop = this.y;
            var mybottom = this.y + (this.height);
            var otherleft = otherobj.x;
            var otherright = otherobj.x + (otherobj.width);
            var othertop = otherobj.y;
            var otherbottom = otherobj.y + (otherobj.height);
            var crash = true;
            if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
                crash = false;
            }
            if (crash === true) {  
                gameOver1.style.display = 'block';
                btnGame1.style.display = 'block';     
            }
            return crash;
        }
    }

    function updateGameArea() {
        var x, height, gap, minHeight, maxHeight, minGap, maxGap;
        for (i = 0; i < myObstacles.length; i += 1) {
            if (myGamePiece.crashWith(myObstacles[i])) {
                controller.style.display = 'none';
                divGameStage1.style.display = 'none';              
                scoreHeader1.style.display = 'none';
                return;
            }
        }
        myGameArea.clear();
        myGameArea.frameNo += 1;
        if (myGameArea.frameNo == 1 || everyinterval(150)) {
            x = myGameArea.canvas.width;
            minHeight = 20;
            maxHeight = 200;
            height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
            minGap = 50;
            maxGap = 200;
            gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
            myObstacles.push(new component(10, height, "#5870cb", x, 0));
            myObstacles.push(new component(10, x - height - gap, "#5870cb", x, height + gap));
        }
        for (i = 0; i < myObstacles.length; i += 1) {
            myObstacles[i].x += -1;
            myObstacles[i].update();
        }
        document.getElementById("score1").innerHTML = myGameArea.frameNo;
        myGamePiece.newPos();
        myGamePiece.update();
    }

    function everyinterval(n) {
        if ((myGameArea.frameNo / n) % 1 == 0) {
            return true;
        }
        return false;
    }

    function accelerate(n) {
        myGamePiece.gravity = n;
    }