/* ========================================
   EXERCICE : DEEZER API + DOM MANIPULATION
   ======================================== */

// OBJECTIFS :
// 1. Sélectionner des éléments du DOM
// 2. Créer un eventListener sur le bouton
// 3. Récupérer des données depuis l'API Deezer
// 4. Créer dynamiquement des cartes pour chaque chanson
// 5. Ajouter une interaction pour jouer un extrait audio


//  CONSEILS :
//  - Testez chaque étape avec console.log()
//  - Regardez dans la console du navigateur pour voir les erreurs
//  - L'API Deezer retourne toujours 25 résultats maximum



// ===== ÉTAPE 1 : SÉLECTIONNER LES ÉLÉMENTS DU DOM =====
const searchBtn = document.getElementById("search-btn");
const artistInput = document.getElementById("artist-input");
const resultsContainer = document.getElementById("results-container");
const audioPlayer = document.getElementById("audio-player");

// ===== ÉTAPE 2 : CRÉER UN EVENT LISTENER =====

searchBtn.addEventListener("click", () => {
   searchArtist();
});

//* ===== ÉTAPE 3 : FONCTION POUR CHERCHER UN ARTISTE =====
function searchArtist() {
   resultsContainer.innerHTML = "";

   let artistNameSearch = artistInput.value;

   if (artistNameSearch == "") {
      resultsContainer.innerHTML = "Cherche l'artiste.";
      return;
   }


   // 4. Construire l'URL de l'API avec le nom de l'artiste
   const API_URL = `https://corsproxy.io/?https://api.deezer.com/search?q=${artistNameSearch}`;


   //**! PAS TOUCHE!!! */
   fetch(API_URL)
      .then(response => response.json())
      .then(data => {
         console.log('Données récupérées avec succès :', data);

         data.data.forEach(track => {
            displayTrack(track);
         });

      })
      .catch(error => console.error('Erreur lors de la récupération des données :', error));
   //**! FIN FETCH */
}


// ===== ÉTAPE 4 : CRÉER UNE CARTE POUR CHAQUE CHANSON =====
function displayTrack(track) {

   // 1. Vérifier que track.preview existe (certains morceaux n'ont pas de preview)
   if (!track.preview) {
      return;
   }

   const trackCard = document.createElement("div");

   trackCard.classList.add("track-card");

   trackCard.innerHTML = `
     <div class="cover-container">
        <img src="${track.album.cover_medium}" class="cover-image">
        <div class="play-overlay">
           <span class="play-icon">▶️</span>
        </div>
     </div>
     <h3>${track.title}</h3>
     <p>${track.artist.name}</p>
   `;

   trackCard.addEventListener("click", function () {
      audioPlayer.src = track.preview
      audioPlayer.play();
   });

   resultsContainer.appendChild(trackCard);
}



// ===== BONUS : AJOUTER DES AMÉLIORATIONS (OPTIONNEL) =====
// - Mettre en surbrillance (classe CSS) la carte en cours de lecture
// - Permettre de lancer une recherche en appuyant sur la touche "Entrée" dans l'input
// - Possibilté de mettre pause sur la preview de la musique.