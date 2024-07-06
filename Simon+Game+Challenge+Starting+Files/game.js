var buttonColors=["red", "blue", "green", "yellow"]
var gamePattern = []
var userChosenPattern = []
var level = 0
var gameStarted = false


$(document).keypress(function() {
    if(!gameStarted){
        gameStarted = true
        nextSequence()
        $("#level-title").text("Level " + level)
    }
})

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed")
    setTimeout(function () {
        $("#"+currentColor).removeClass("pressed")
    }, 100)
}

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id")
    userChosenPattern.push(userChosenColor)
    playSound(userChosenColor)
    animatePress(userChosenColor)
    checkAnswer(userChosenPattern.length-1)
})

function nextSequence(){
    userChosenPattern = [];
    level++
    $("#level-title").text("Level " + level)
    var randomNumber = Math.floor(Math.random()*4)
    var randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor)
}
    
function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play()
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userChosenPattern[currentLevel]){
        console.log("success")
        if(gamePattern.length === userChosenPattern.length){
            setTimeout(function () {
                nextSequence()
            }, 1000)
        }
    } else {
        $("#level-title").text("Game Over, Press Any Key to Restart")
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200)
        $(document). keypress(startOver())
    }
}

function startOver() {
    level = 0
    gamePattern = []
    gameStarted = false
}