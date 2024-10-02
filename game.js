var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

function playSound(currentColour){
    var audio = new Audio("sounds/" + currentColour + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed")
      }, 100);
}

function startOver(){
        level = 0;
        userClickedPattern = [];
        gamePattern = [];
}

function gameOver(){
    gameStarted = false;
    $("body").addClass("game-over");            
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();           
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(() => {
        $("body").removeClass("game-over");
      }, 200);
    startOver();
}

function checkAnswer(currentLevel){
    if(userClickedPattern.length === currentLevel + 1){
        if(gamePattern.toString() === userClickedPattern.toString()){
            level++;
            userClickedPattern = [];
            setTimeout(() => {
                nextSequence();
              }, 1000);
        }else{
           gameOver();
        }
    }
}

function nextSequence(){
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click(function(event){
    if(gameStarted){
        var userChosenColour = event.target.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(level);
    }
});


$(document).keydown(function(){  
    if(!gameStarted){
        gameStarted = true;
        nextSequence();
    } 
});




