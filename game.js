var buttonColour = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isGameStarted = false;
var level = 0;


// Game start after player press any key

$(document).keypress(function() {
    if (!isGameStarted) {
        nextSequence();
        isGameStarted = true;
        $("#level-title").text("Level "+ level);
    }
})


// Next random button in the game pattern

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColour[randomNumber];
    gamePattern.push(randomChosenColour);

    animatePress(randomChosenColour);
    playSound(randomChosenColour);

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+ level);
}


//Click on one of the buttons and add it to the user pattern

$(".btn").click(function(event) {
    var userChosenColour = $(this).attr('id');
    playSound(userChosenColour);
    animatePress(userChosenColour);

    userClickedPattern.push(userChosenColour);

     if (checkAnswer(userClickedPattern.length - 1)) {
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
     }
     else {
        gameOver();
     }
})


// Checking answer

function checkAnswer(currentLevel) {
    return (userClickedPattern[currentLevel] == gamePattern[currentLevel]);
}


// Animation of pressed button

function animatePress(buttonColour) {
    $("#"+buttonColour).addClass("pressed");

    setTimeout(function() {
        $("#"+buttonColour).removeClass("pressed");
    }, 100)
}


// Playing sound of pressed button

function playSound(soundName) {
    console.log("sounds/"+soundName);
    var audio = new Audio("sounds/"+soundName+".mp3");
    audio.play();
}


// Game Over

function gameOver() {
    level = 0;
    gamePattern = [];
    isGameStarted = false;
    $("#level-title").text("Game Over, Press Any Key to Restart");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);

}