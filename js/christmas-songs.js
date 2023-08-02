// Song URL
const songs = [
  "/music/christmas/AVeryMogulChristmas.mp3",
  "/music/christmas/FelizNavidad.mp3",
  "/music/christmas/DeckTheHalls.mp3",
  "/music/christmas/It'sThatTimeOfTheYear.mp3",
];

// Initialize DOM variables
let audioElement = document.getElementById("my_audio");
let musicOnButton = document.getElementById("musicOnButton");
let musicOffButton = document.getElementById("musicOffButton");

// Define the playMusic function, handling the music
const playMusic = () => {
  // Define the song and its URL
  let randomIndex = Math.floor(Math.random() * songs.length);
  let audioSource = document.getElementById("audio_source");

  // Load the song info into the audioElement
  audioSource.src = songs[randomIndex];
  audioElement.load();

  // Update the AudioElement to handle playing the song
  audioElement.addEventListener(
    "canplaythrough",
    () => {
      try {
        audioElement.play();
        musicOnButton.style.display = "none";
        musicOffButton.style.display = "block";
      } catch (err) {
        pauseMusic();
        throw err;
      }
    },
    { once: true }
  );

  // Update the AudioElement to handle pausing the song
  audioElement.addEventListener("pause", function () {
    musicOnButton.style.display = "block";
    musicOffButton.style.display = "none";
  });
};

// Define the pauseMusic function, handling the commands to stop the music
const pauseMusic = () => {
  audioElement.pause();
  musicOnButton.style.display = "block";
  musicOffButton.style.display = "none";
};

// Define the toggleMusic function, handling the commands to toggle
// the buttons "musicOnButton" and "musicOffButton"
const toggleMusic = () => {
  if (audioElement.paused) {
    playMusic();
  } else {
    pauseMusic();
  }
};

// Play music on page load
window.addEventListener("load", () => {
  playMusic();
});
