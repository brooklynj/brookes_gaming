function startGame2() {
    var numSquares = 6;
    var colors = [];
    var score2 = 600;
    var pickedColor;

    var squares = document.querySelectorAll(".square");
    var colorDisplay = document.querySelector("#colorDisplay");
    var messageDisplay = document.querySelector("#message");
    var resetButton = document.querySelector("#reset");
    var modeButtons = document.querySelectorAll(".mode");
    var easyButton = document.querySelector(".mode");
    var hardButton = document.querySelector(".mode");
    var game2Header = document.getElementById("game2Header");
    var clickMe2 = document.getElementById("clickMe2");
    var gameOver2 = document.getElementById("gameOver2");
    var divGameStage2 = document.getElementById("divGameStage2");
    var btnGame2 = document.getElementById("btnGame2");
    var btnGroup = document.querySelector(".btn-group");
    var scoreHeader2 = document.getElementById('scoreHeader2');

    game2Header.style.display = 'none';
    clickMe2.style.display = 'none';
    btnGroup.style.display = 'none';
    colorDisplay.style.display = 'block';
    divGameStage2.style.display = 'block';
    scoreHeader2.style.display = 'block';
    colorDisplay.textContent = pickedColor;
    setupSquares();
    setupMode();
    reset();


    resetButton.addEventListener("click", function () {
        reset();
    });

    function setupSquares() {
        for (var i = 0; i < squares.length; i++) {
            squares[i].style.backgroundColor = colors[i];
            squares[i].addEventListener("click", function () {
                var clickedColor = this.style.backgroundColor;
                if (clickedColor === pickedColor) {
                    messageDisplay.textContent = "Correct!";
                    changeColors(pickedColor);
                    alert("Correct!");

                    gameOver2.style.display = 'block';
                    btnGame2.style.display = 'block';
                    colorDisplay.style.display = 'none';
                    divGameStage2.style.display = 'none';
                    scoreHeader2.style.display = 'none';
                    messageDisplay.style.display = 'none';
                } else {
                    this.style.backgroundColor = "#232323";
                    score2 = score2 - 100;
                    document.getElementById('score2').innerHTML = score2;
                    messageDisplay.textContent = "Try Again";
                }

            });
        }
    }

    function setupMode() {
        for (var i = 0; i < modeButtons.length; i++) {
            modeButtons[i].addEventListener("click", function () {
                for (var i = 0; i < modeButtons.length; i++) {
                    modeButtons[i].classList.remove("selected");
                }
                this.classList.add("selected");
                if (this.textContent === "Easy") {
                    numSquares = 3;
                } else {
                    numSquares = 6;
                }
                reset();
            });
        }
    }

    function reset() {
        colors = genRandomColors(numSquares);
        pickedColor = chooseColor();
        colorDisplay.textContent = pickedColor;
        resetButton.textContent = "New Colors";
        messageDisplay.textContent = "";
        for (var i = 0; i < squares.length; i++) {
            if (colors[i]) {
                squares[i].style.display = "block";
                squares[i].style.backgroundColor = colors[i];
            } else {
                squares[i].style.display = "none";
            }
        }
    }

    function changeColors(color) {
        for (var i = 0; i < squares.length; i++) {
            squares[i].style.backgroundColor = color;
        }
    }

    function chooseColor() {
        var random = Math.floor(Math.random() * colors.length);
        return colors[random];
    }

    function genRandomColors(num) {
        var arr = [];
        for (var i = 0; i < num; i++) {
            arr.push(makeColor());
        }
        return arr;
    }

    function makeColor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}