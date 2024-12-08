const buttonColors = ["yellow", "green", "red", "blue"];
let gamePattern = [];
let userPattern = [];
let gameActive = false;
let level = 1;

// show user next sequence
const nextSequence = () => {
  $("h1").text(`Level ${level}`);
  const randomNumber = Math.floor(Math.random() * buttonColors.length);
  const randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  playSound(randomColor);
  $(`.${randomColor}`).fadeOut(200).fadeIn(200);
  level++;
};

// add event listener to game buttons
$(".button").on("click", (event) => {
  if (gameActive) {
    const userChosenColor = event.target.id;
    userPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userPattern.length - 1);
  }
});

// play sound and animate on user click
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

// start game
$("#start").on("click", () => {
  gameActive = true;
  nextSequence();
  $("#start").addClass("hidden");
  $("#hard-mode").addClass("hidden");
});

// check user sequence against game sequence
const checkAnswer = (currentLevel) => {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    console.log("correct");
    if (gamePattern.length === userPattern.length) {
      setTimeout(() => {
        if (gameActive) {
          userPattern = [];
          nextSequence();
        }
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

// reset game on loss
const startOver = () => {
  level = 1;
  gamePattern = [];
  userPattern = [];
  gameActive = false;
  setTimeout(() => {
    $("#start").removeClass("hidden");
  }, 1000)
};

// activate hard mode
$("#hard-mode").on("click", () => {
  $("#hard-mode").addClass("hidden");
  $(".buttons").append(`
    <div>
      <div id="cyan" class="cyan button"></div>
      <div id="purple" class="purple button"></div>
    </div>
    `);
  buttonColors.push("cyan", "purple");
  $(".cyan, .purple").on("click", (event) => {
    if (gameActive) {
      const userChosenColor = event.target.id;
      userPattern.push(userChosenColor);
      playSound(userChosenColor);
      animatePress(userChosenColor);
      checkAnswer(userPattern.length - 1);
    }
  })
});

// deactivate hard mode
const deactivateHardMode = () => {
  // remove event handlers on extra buttons
  $("#cyan, #purple").off();
  // remove div containing extra buttons
  $(".buttons div:nth-child(3)").remove();
  // remove extra colors from buttonColors
  buttonColors.pop();
  buttonColors.pop();
};