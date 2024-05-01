function getDataFromAPI() {
    fetch('http://127.0.0.1:5000/top14_stats')
        .then(response => response.json())
        .then(data => {
            // Manipulation des données reçues de l'API
           // Affiche les données dans la console
            data.forEach (joueur => {
                if (joueur.position === "1ère ligne") { 
                nom_joueur = joueur.player.name;
                document.getElementById('all_players').innerHTML += `<div id="joueur">
                <div id="photo"><img src="${joueur.player.image.original}" alt="" id="image"></div>
                <div id="nom"><p>${nom_joueur}</p></div>
               </div>`
               console.log(joueur)
            
            }
               
               
            })
            // Vous pouvez également manipuler les données ici pour les afficher d'une autre manière
        })
        .catch(error => console.error('Erreur :', error));
}

// Appel de la fonction pour récupérer les données lors du chargement de la page
getDataFromAPI();