const buttonColors = ["yellow", "green", "red", "blue"];
const gamePattern = [];
const userPattern = [];

const nextSequence = () => {
  const randomNumber = Math.floor(Math.random() * 4);
  const randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  const audio = new Audio(`./sounds/${randomColor}.mp3`);
  audio.play();
  $(`.${randomColor}`).fadeOut(200).fadeIn(200);
};

$(".button").on("click", (event) => {
  const userChosenColor = event.target.id;
  userPattern.push(userChosenColor);
  console.log(userPattern);
});