fetch('characters.json')
  .then(response => response.json())
  .then(data => {
    const characterSelect = document.getElementById('characterSelect');
    const cardSelect = document.getElementById('cardSelect');
    const switchBtn = document.getElementById('switchBtn');

    // Populate characterSelect with character cards (hidden initially)
    data.characters.forEach(character => {
      const charDiv = document.createElement('div');
      charDiv.innerHTML = `<img src="${character.image}" alt="${character.name}" data-charid="${character.id}" style="width:100px;cursor:pointer"><p>${character.name}</p>`;
      characterSelect.appendChild(charDiv);
    });

    // Initially hide character and card selects
    characterSelect.classList.add('hidden');
    cardSelect.classList.add('hidden');

    // Toggle characters when switch button is clicked
    switchBtn.addEventListener('click', () => {
      // Toggle visibility of characterSelect
      if (characterSelect.classList.contains('hidden')) {
        characterSelect.classList.remove('hidden');
        cardSelect.classList.add('hidden');  // Hide cards if open
      } else {
        characterSelect.classList.add('hidden');
        cardSelect.classList.add('hidden');
      }
    });

    // When a character image is clicked, show their cards
    characterSelect.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        const charId = e.target.dataset.charid;
        const character = data.characters.find(c => c.id === charId);

        // Clear previous cards
        cardSelect.innerHTML = '';

        character.cards.forEach(card => {
          const cardDiv = document.createElement('div');
          cardDiv.innerHTML = `
            <img src="${card.thumbnail}" alt="${card.title}" data-charid="${character.id}" data-cardid="${card.id}" style="width:150px;cursor:pointer">
            <p>${card.title}</p>
          `;
          cardSelect.appendChild(cardDiv);
        });

        cardSelect.classList.remove('hidden');
        characterSelect.classList.add('hidden'); // Hide characters while cards show
      }
    });

    // When a card is clicked, save selection and redirect
    cardSelect.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        const selectedCharId = e.target.dataset.charid;
        const selectedCardId = e.target.dataset.cardid;

        localStorage.setItem('selectedCharacter', selectedCharId);
        localStorage.setItem('selectedCard', selectedCardId);

        window.location.href = 'home.html';
      }
    });
  })
  .catch(err => console.error('Error loading characters.json:', err));
