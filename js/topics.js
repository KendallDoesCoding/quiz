const toggleHidde = (containerId) => {
  // removes one & adds the other
  document.getElementById(containerId).classList.toggle("hide");
  document.getElementById(containerId).classList.toggle("show");
};

document
  .getElementById("technology")
  .addEventListener("click", () => toggleHidde("technologyMore"));

document
  .getElementById("games")
  .addEventListener("click", () => toggleHidde("gamesMore"));

document
  .getElementById("festivals")
  .addEventListener("click", () => toggleHidde("festivalsMore"));

document
  .getElementById("general")
  .addEventListener("click", () => toggleHidde("generalMore"));

document
  .getElementById("youtube")
  .addEventListener("click", () => toggleHidde("youtubeMore"));

document
  .getElementById("others")
  .addEventListener("click", () => toggleHidde("othersMore"));

document.querySelector(".go-back").addEventListener("click", () => {
  window.history.back();
});
