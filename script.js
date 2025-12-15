/* ========================================
   EXERCICE : DEEZER API + DOM MANIPULATION
   ======================================== */

// const { createElement } = require("react");

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
// Bien regarder comment est construit le code HTML

// TODO: Sélectionner le bouton de recherche avec getElementById
const searchBtn = document.getElementById("search-btn");
const artistInput = document.getElementById("artist-input");
const resultsContainer = document.getElementById("results-container");
const audioPlayer = document.getElementById("audio-player");

// TODO: Sélectionner l'input de recherche

// TODO: Sélectionner le conteneur des résultats

// TODO: Sélectionner l'élément audio pour jouer la musique

// ===== ÉTAPE 2 : CRÉER UN EVENT LISTENER =====

// TODO: Ajouter un addEventListener "click" sur le bouton
searchBtn.addEventListener("click", () => {
   // Quand on clique sur le bouton, on appelle la fonction searchArtist()
   searchArtist();
});




//* ===== ÉTAPE 3 : FONCTION POUR CHERCHER UN ARTISTE =====
function searchArtist() {
   // 1. Vider le conteneur avant d'afficher les nouveaux résultats
   resultsContainer.innerHTML = "";

   // 2. Récupérer ce que l'utilisateur a tapé dans l'input
   let artistNameSearch = artistInput.value;

   // 3. Vérifier si artistName est vide
   if (artistNameSearch == "") {
      //    - Si oui : afficher un message dans le conteneur
      resultsContainer.innerHTML = "Cherche l'artiste.";
      //    - Puis faire "return;" pour arrêter la fonction
      return;
   }


   // 4. Construire l'URL de l'API avec le nom de l'artiste
   const API_URL = `https://corsproxy.io/?https://api.deezer.com/search?q=${artistNameSearch}`;


   //**! PAS TOUCHE!!! */
   fetch(API_URL)
      .then(response => response.json())
      .then(data => {
         console.log('Données récupérées avec succès :', data);

         // data.data = tableau de morceaux (tracks)
         // TODO: Parcourir data.data avec forEach
         data.data.forEach(track => {
            // Pour chaque track, appeler la fonction afficherTrack(track)
            afficherTrack(track);
         });

      })
      .catch(error => console.error('Erreur lors de la récupération des données :', error));
   //**! FIN FETCH */
}


// ===== ÉTAPE 4 : CRÉER UNE CARTE POUR CHAQUE CHANSON =====
function afficherTrack(track) {
   // track = un objet qui représente une chanson
   // Exemple : track.title, track.artist.name, track.album.cover_medium, track.preview

   // 1. Vérifier que track.preview existe (certains morceaux n'ont pas de preview)
   if (!track.preview) {
      //    Si pas de preview, on ne crée pas de carte.
      return;
   }

   // 2. Créer un élément div pour la carte
   const trackCard = document.createElement("div");

   //    - lui ajouter la classe "track-card"
   trackCard.classList.add("track-card");

   // 3. Ajouter dans le HTML de la carte dans la div avec innerHTML :

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

   // 4. Ajouter un événement "click" sur la carte
   trackCard.addEventListener("click", function () {
      //      - changer la source de l'audio (audio.src = track.preview)
      audioPlayer.src = track.preview
      //      - lancer la lecture (audio.play())
      audioPlayer.play();
   });

   // 5. Ajouter la carte dans le conteneur des résultats
   resultsContainer.appendChild(trackCard);
}



// ===== BONUS : AJOUTER DES AMÉLIORATIONS (OPTIONNEL) =====
// - Mettre en surbrillance (classe CSS) la carte en cours de lecture
// - Permettre de lancer une recherche en appuyant sur la touche "Entrée" dans l'input
// - Possibilté de mettre pause sur la preview de la musique.