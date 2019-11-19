/* Attendre le chargement du DOM */
document.addEventListener('DOMContentLoaded', ()=>{

    /* Déclaration */
        let myNav = document.querySelector('nav ul');
        let myBurgerMenu = document.querySelector('nav button');
    //

    /* Méthodes/Fonctions */
        // Fonction pour gérer la navigation
        const loadNavData = () => {
            //Charger le fichier nav.json
            fetch('./data/nav.json')
            .then( data => {
                //vérifier si la requête à fonctionner
                if( data.ok){
                    return data.json();
                }
            })
            .then ( jsonData  => {
                displayNav( jsonData);
            })
            .catch( err => {
                console.error(err);
            });
        };

        // Fonction pour afficher la navigation 
        const displayNav = (navCollection) => {
            // Faire une boucle sur la collection
            for( let link of navCollection){
                //ajouter une balise <li> avec une balise <a> dans un nav ul
                myNav.innerHTML +=`
                    <li><a href="${link.href}">${link.content}</a></li>
                `;
            };
            toggleNavigation();
                //Capter le clic sur les <nav a>
                for( let link of document.querySelectorAll('nav a')){
                    link.addEventListener('click', (event) => {
                        // Bloquer le comportement naturel de la balise a
                        event.preventDefault();

                        //Afficher le contenu de la page
                        displayPage( link.getAttribute('href'));    
                    })
        }; 
        };

        // Fonction pour activer la navigation
        const toggleNavigation = () => {
            // Capter le clic sur myBurgerMenu
            myBurgerMenu.addEventListener('click', () => {
                // Ajouter ou supprimer la class open sur <nav ul>
                myNav.classList.toggle('open');
                myBurgerMenu.classList.toggle('open');
            })
        };

        // Fonction d'affichage du contenu des pages
        const displayPage = ( page ) => {
            // Charger le contenu de la page
            fetch(page)
            .then( data => {
                // Vérifier la requête
                if (data.ok){
                    return data.text();
                }
            })
            .then(text => {
                // Ajouter le conteu HTML dans le main
                document.querySelector('main').innerHTML = text;

                //Fermer la navigation
                myNav.classList.remove('open');
                myBurgerMenu.classList.remove('open');
            })
            .catch( err => {
                console.error(err);
            });
        }

    //

    /* Lancer L'IHM */
        //Charger la navigation
        loadNavData();
    //

});
//