//Mon formulaire
let form = document.querySelector("form");

//Corps du tableau
let tbody = document.querySelector("table tbody");

//Tableau qui contiendra la liste d'objets représentant les tâches
let tacheArray = [];

//Ajout de l'écouteur d'evenement submit sur le formulaire d'ajout des tâches
form.addEventListener('submit', function(event){
    //On bloque le comportementpar défaut du formulaire i.e le rafraichissement de la page après sa soumission
    event.preventDefault();

    //Objet FormData pour permettre de recuperer les inputs
    let data = new FormData(event.target);
    
    //On vérifie pour qu'il n'ait pas de tâche sans description
    if (data.get('tache').trim().length !== 0) {
        let tache = {
            'description' : data.get('tache'),
            'etat' : 'Non terminé'
        };
    
        tacheArray.push(tache);
        form.reset();
        totalTaches();
        afficher();
    }
    else{
        alert('Une tâche ne peut pas être ajoutée sans description');
    }
});

function afficher(){
    tbody.innerHTML = '';

    for(let i = 0; i < tacheArray.length; i++) {
        let ligne = `<tr>
            <td class="first-td">${tacheArray[i].description}</td>
            <td><button type="button" onclick="supprimer(${i})">Supprimer</button></td>
            <td><button type="button" onclick="modifier(${i})">Modifier</button></td>
            <td><button type="button" onclick="terminer(${i})">Terminer</button></td>
        </tr>`

        tbody.innerHTML += ligne;
    }
}

function supprimer(index) {
    tacheArray.splice(index, 1);
    totalTaches();
    afficher();
}

function terminer(index) {
    if (tacheArray[index].etat === "Non terminé") {
        tacheArray[index].etat = "Terminé"; 
    }
    else{
        alert('Cette tâche est déjà terminée');
    }
    afficher();
}

function modifier(index) {
    let input = document.querySelector('input');
    input.value = tacheArray[index].description;
    supprimer(index);
    afficher();
}

function totalTaches(){
    let total = tacheArray.length;
    if (total > 1) {
        document.querySelector('h4').textContent = "Vous avez " + total + " tâches";
    }
    else{
        document.querySelector('h4').textContent = "Vous avez " + total + " tâche";
    }
}
totalTaches();