let charactersData = null;
let selectedCharacter = null;

document.getElementById("switchBtn").addEventListener("click", () => {
  if (!charactersData) {
    fetch("characters.json")
      .then(res => res.json())
      .then(data => {
        charactersData = data;
        showCharacters();
      })
      .catch(err => {
        console.error("Failed to load data.json", err);
      });
  } else {
    showCharacters();
  }
});

function showCharacters() {
  const container = document.getElementById("characterSelect");
  container.innerHTML = "";
  container.classList.remove("hidden");
  document.getElementById("cardSelect").classList.add("hidden");

  charactersData.characters.forEach(character => {
    const charDiv = document.createElement("div");
    charDiv.innerHTML = `
      <img src="${character.image}" alt="${character.name}" />
      <p>${character.name}</p>
    `;
    charDiv.addEventListener("click", () => {
      selectedCharacter = character;
      showCards(character);
    });
    container.appendChild(charDiv);
  });
}

function showCards(character) {
  const cardContainer = document.getElementById("cardSelect");
  cardContainer.innerHTML = "";
  cardContainer.classList.remove("hidden");
  document.getElementById("characterSelect").classList.add("hidden");

  character.cards.forEach(card => {
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
      <img src="${card.thumbnail}" alt="${card.title}" />
      <p>${card.title}</p>
    `;
    cardDiv.addEventListener("click", () => {
      showVideoOnFrontPage(card.video);
    });
    cardContainer.appendChild(cardDiv);
  });
}

function showVideoOnFrontPage(videoSrc) {
  const videoElement = document.getElementById("luke");
  const sourceElement = videoElement.querySelector("source");

  sourceElement.src = videoSrc;
  videoElement.load();
  videoElement.play();
}

function showVideoOnFrontPage(videoSrc) {
    localStorage.setItem("selectedVideo", videoSrc);

    window.location.href = "home.html";
  }
  