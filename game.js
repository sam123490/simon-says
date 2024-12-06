const buttonColors = ["yellow", "green", "red", "blue"];
const gamePattern = [];
const userPattern = [];

const nextSequence = () => {
  const randomNumber = Math.floor(Math.random() * 4);
  const randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  playSound(randomColor);
  $(`.${randomColor}`).fadeOut(200).fadeIn(200);
};

$(".button").on("click", (event) => {
  const userChosenColor = event.target.id;
  userPattern.push(userChosenColor);
  playSound(userChosenColor);
});

const playSound = (color) => {
  const audio = new Audio(`./sounds/${color}.mp3`);
  audio.play();
}