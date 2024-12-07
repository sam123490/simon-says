const buttonColors = ["yellow", "green", "red", "blue"];
let gamePattern = [];
let userPattern = [];
let gameActive = false;
let level = 1;

const nextSequence = () => {
  $("h1").text(`Level ${level}`);
  const randomNumber = Math.floor(Math.random() * 4);
  const randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  playSound(randomColor);
  $(`.${randomColor}`).fadeOut(200).fadeIn(200);
  level++;
};

$(".button").on("click", (event) => {
  if (gameActive) {
    const userChosenColor = event.target.id;
    userPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userPattern.length - 1);
  }
});

const playSound = (color) => {
  const audio = new Audio(`./sounds/${color}.mp3`);
  audio.play();
};

const animatePress = (color) => {
  $(`#${color}`).addClass("pressed");
  setTimeout(() => {
    $(`#${color}`).removeClass("pressed");
  }, "200");
};

$("#start").on("click", () => {
  gameActive = true;
  nextSequence();
  $("#start").addClass("invisible");
});

const checkAnswer = (currentLevel) => {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    console.log("correct");
    if (gamePattern.length === userPattern.length) {
      setTimeout(() => {
        userPattern = [];
        nextSequence();
      }, "1000");
    }
  } else {
    playSound("wrong");
    $("h1").text(`Game Over!`);
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 400);
    startOver();
  }
};

const startOver = () => {
  level = 1;
  gamePattern = [];
  userPattern = [];
  gameActive = false;
  $("#start").removeClass("invisible");
};