// Fonction pour filtrer les cartes
function filterCards(category) {
    const cards = document.querySelectorAll('.cardcert'); // Sélectionne toutes les cartes
    const container = document.querySelector('.container_cert'); // Sélectionne le conteneur

    // Vérifie si on affiche toutes les cartes
    if (category === 'TOUS') {
        cards.forEach(card => {
            card.classList.add('show'); // Affiche toutes les cartes
            card.style.display = 'block'; // Affiche la carte en la rendant visible
        });
    } else {
        // Masque toutes les cartes
        cards.forEach(card => {
            card.classList.remove('show');
            card.style.display = 'none'; // Cache la carte
        });

        // Sélectionne uniquement les cartes correspondantes
        const filteredCards = document.querySelectorAll('.cardcert.' + category);
        filteredCards.forEach(card => {
            card.classList.add('show');
            card.style.display = 'block'; // Affiche la carte correspondante
        });
    }
}
