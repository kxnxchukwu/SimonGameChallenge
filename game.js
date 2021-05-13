let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let soundsURL = 'sounds/';
let level = 0;
let started = false

function playSound(name) {
    let sound = new Audio(soundsURL+name+'.mp3');
    sound.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass('pressed')
    setTimeout(function(){
        $("#"+currentColour).removeClass('pressed')
}, 100);
}

$("div.btn").on('click', function (event){
    let userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.indexOf(userChosenColour));
});

function startOver(){
    started = false;
    level = 0;
    gamePattern = [];
}

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    userClickedPattern = []
    gamePattern.push(randomChosenColour);
    $('#'+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level = level + 1;
    $("h1#level-title").text("Level "+level)
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
        }, 1000);
        }
    }
    else {
        playSound("wrong");
        $('body').addClass("game-over");
        setTimeout(function(){
            $('body').removeClass('game-over')
        }, 2000);
        $("h1#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

$(document).keypress(function(e) {
        if (!started) {
            $("h1#level-title").text("Level "+level)
            started = true;
            nextSequence();
        }
});