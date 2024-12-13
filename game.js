let allColors = [];
let gameColors = [];
let gamePattern = [];
let userPattern = [];
let gameActive = false;
let level = 1;

// show user next sequence
const nextSequence = () => {
  $("h1").text(`Level ${level}`);
  const randomNumber = Math.floor(Math.random() * gameColors.length);
  const randomColor = gameColors[randomNumber];
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
    };
  });
};

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
    };
  } else {
    // playSound("wrong");
    playGameOverSound();
    $("h1").text(`Game Over!`);
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 400);
    startOver();
  };
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
  }, 1000);
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
  let buttonSize = "";
  switch (difficulty) {
    case 'normal':
      maxRows = 2;
      maxPerRow = 2;
      gameColors = allColors.slice(0, 4);
      buttonSize = "button-medium";
      break;

    case 'hard':
      maxRows = 2;
      maxPerRow = 3;
      gameColors = allColors.slice(0, 6);
      buttonSize = "button-medium";
      break;

    case 'extreme':
      maxRows = 3;
      maxPerRow = 3;
      gameColors = allColors;
      buttonSize = "button-small";
      break;

    default:
      console.log(`selected difficulty: ${difficulty}`);
      break;
  };

  // while loop creates necessary rows
  while ($(".buttons > div").length < maxRows) {
    $(".buttons").append("<div></div>");
  };

  // add buttons to rows
  let selectedRow = 1;
  gameColors.forEach((color) => {
    const newButton = `<div id="${color}" class="${color} button ${buttonSize}"></div>`;
    if ($(`.buttons > div:nth-child(${selectedRow}) > *`).length < maxPerRow) {
      addButton(selectedRow, newButton);
    } else {
      selectedRow++;
      addButton(selectedRow, newButton);
    };
  });
  addEventListenersToButtons();
};

// add button Element
const addButton = (row, button) => {
  $(`.buttons > div:nth-child(${row})`).append(button);
};

// default to render normal difficulty buttons
renderButtons('normal');

const playGameOverSound = () => {
  sound = "wrong";
  if (level >= 5) {
    sound = "spongebob";
  }
  if (level >= 8) {
    sound = "pac-man";
  }
  if (level >= 12) {
    sound = "gta-v";
  }
  const audio = new Audio(`./sounds/${sound}.mp3`);
  audio.play();
};

// create random color order
const createRandomColorOrder = () => {
  allColors = [];
  const colors = ["yellow", "green", "red", "blue", "cyan", "purple", "coral", "darkred", "darkseagreen"];
  for (let i=0; i < 9; i++) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    allColors.push(colors[randomIndex]);
    colors.splice(randomIndex, 1);
  };
  clearButtons();
  const selectDifficultyElement = $("#difficulty-select");
  const difficulty = selectDifficultyElement[0].value;
  renderButtons(difficulty);
};
createRandomColorOrder();

// event listener for createRandomColorOrder()
$("#changeColorOrder").on("click", () => {
  createRandomColorOrder();
});