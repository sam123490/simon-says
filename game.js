const buttonColors = ["yellow", "green", "red", "blue", "cyan", "purple"];
let colors = [];
let gamePattern = [];
let userPattern = [];
let gameActive = false;
let level = 1;

// show user next sequence
const nextSequence = () => {
  $("h1").text(`Level ${level}`);
  const randomNumber = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomNumber];
  gamePattern.push(randomColor);
  playSound(randomColor);
  $(`.${randomColor}`).fadeOut(200).fadeIn(200);
  level++;
};

// add event listener to game buttons
const addEventListenersToButtons = () => {
  $(".button").on("click", (event) => {
    if (gameActive) {
      const userChosenColor = event.target.id;
      userPattern.push(userChosenColor);
      playSound(userChosenColor);
      animatePress(userChosenColor);
      checkAnswer(userPattern.length - 1);
    }
  });
}

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
  // $("#hard-mode").addClass("hidden");
  $(".settings").addClass("hidden");
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
  $(".settings").removeClass("hidden");
  }, 1000)
};

// select difficulty
$("#difficulty-select").on("change", () => {
  const selectDifficultyElement = $("#difficulty-select");
  const difficulty = selectDifficultyElement[0].value;
  renderButtons(difficulty);
});

// empty all buttons
const clearButtons = () => {
  $(".buttons").empty();
};

// render buttons based off difficulty
const renderButtons = (difficulty) => {
  clearButtons();
  let maxRows = 0;
  let maxPerRow = 0;
  switch (difficulty) {
    case 'normal':
      maxRows = 2;
      maxPerRow = 2;
      colors = buttonColors.slice(0, 4);
      break;

    case 'hard':
      maxRows = 2;
      maxPerRow = 3;
      colors = buttonColors;
      break;

    default:
      console.log(`selected difficulty: ${difficulty}`)
      break;
  }

  // while loop creates necessary rows
  while ($(".buttons > div").length < maxRows) {
    $(".buttons").append("<div></div>");
  }

  // add buttons to rows
  let selectedRow = 1;
  colors.forEach((color) => {
    const newButton = `<div id="${color}" class="${color} button"></div>`;
    if ($(`.buttons > div:nth-child(${selectedRow}) > *`).length < maxPerRow) {
      addButton(selectedRow, newButton);
    } else {
      selectedRow++;
      addButton(selectedRow, newButton);
    }
  })
  addEventListenersToButtons();
};

// add button Element
const addButton = (row, button) => {
  $(`.buttons > div:nth-child(${row})`).append(button);
};

// default to render normal difficulty buttons
renderButtons('normal');