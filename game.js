var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var continueGame = false;
var started = false;
var level = 0;
var i;

$(document).keypress(function () {
    if (!started) {
        nextSequence();
        started = true;
    }
})

$(".btn").click(function () {
    if (started) {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        console.log(userClickedPattern);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    }

})



function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence()
            }, 1000)
            userClickedPattern = [];
        }
    } else {
        wrongAnswer();
    }
}

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#" + randomChosenColour).fadeOut(100, function () {
        playSound(randomChosenColour)
    }).fadeIn(100);
}

function wrongAnswer() {
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over")
    }, 200)
    var music = new Audio("sounds/wrong.mp3");
    music.play();
    $("#level-title").text("Game Over, Press Any Key to Restart")
    level = 0;
    started = false;
    gamePattern = [];
    userClickedPattern = [];
}

function playSound(name) {
    var music = new Audio("sounds/" + name + ".mp3");
    music.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed")
    setTimeout(function () {
        $("." + currentColour).removeClass("pressed")
    }, 100);
}