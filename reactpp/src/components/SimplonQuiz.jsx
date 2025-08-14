import React, { useState, useRef } from 'react';
import './SimplonQuiz.css';

// Fonction pour mélanger un tableau (Fisher-Yates)
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Ajoutez une propriété "isTrue" à chaque question (true = vraie, false = fausse)
const questionsData = [
  {
    question: "Que signifie HTML ?",
    options: [
      "HyperText Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyper Tool Multi Language"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle balise permet d’insérer une image en HTML ?",
    options: [
      "<img>",
      "<image>",
      "<pic>",
      "<src>"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle méthode JavaScript permet d’afficher un message dans la console ?",
    options: [
      "console.write()",
      "console.log()",
      "log.console()",
      "print()"
    ],
    answer: 1,
    isTrue: true
  },
  {
    question: "React est une librairie pour quel langage ?",
    options: [
      "Python",
      "Java",
      "JavaScript",
      "PHP"
    ],
    answer: 2,
    isTrue: true
  },
  {
    question: "Quel mot-clé permet de déclarer une variable constante en JavaScript ?",
    options: [
      "let",
      "var",
      "const",
      "static"
    ],
    answer: 2,
    isTrue: true
  },
  {
    question: "Quel attribut HTML est utilisé pour donner un identifiant unique à un élément ?",
    options: [
      "class",
      "id",
      "name",
      "unique"
    ],
    answer: 1,
    isTrue: true
  },
  {
    question: "Quelle extension de fichier est utilisée pour les feuilles de style CSS ?",
    options: [
      ".html",
      ".css",
      ".js",
      ".scss"
    ],
    answer: 1,
    isTrue: true
  },
  {
    question: "Quel est le bon sélecteur CSS pour cibler tous les éléments <p> ?",
    options: [
      "#p",
      ".p",
      "p",
      "*p"
    ],
    answer: 2,
    isTrue: true
  },
  {
    question: "Quelle méthode permet d’ajouter un élément à la fin d’un tableau en JavaScript ?",
    options: [
      "push()",
      "pop()",
      "add()",
      "append()"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel est le résultat de 2 + '2' en JavaScript ?",
    options: [
      "4",
      "'22'",
      "NaN",
      "undefined"
    ],
    answer: 1,
    isTrue: true
  },
  {
    question: "Quel est le rôle de la balise <head> en HTML ?",
    options: [
      "Afficher le titre de la page",
      "Contenir les métadonnées",
      "Afficher le contenu principal",
      "Créer des liens"
    ],
    answer: 1,
    isTrue: true
  },
  {
    question: "Quelle propriété CSS permet de changer la couleur du texte ?",
    options: [
      "background-color",
      "font-color",
      "color",
      "text-color"
    ],
    answer: 2,
    isTrue: true
  },
  {
    question: "Comment écrire un commentaire en JavaScript ?",
    options: [
      "// commentaire",
      "<!-- commentaire -->",
      "# commentaire",
      "** commentaire **"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel est le bon moyen d’importer React dans un fichier JS ?",
    options: [
      "import React from 'react';",
      "require('react')",
      "include React",
      "import 'react.js'"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle méthode permet de transformer une chaîne en majuscules en JS ?",
    options: [
      "toUpperCase()",
      "upperCase()",
      "capitalize()",
      "toCaps()"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel est le bon moyen de centrer un texte en CSS ?",
    options: [
      "text-align: center;",
      "align: center;",
      "center-text: true;",
      "margin: auto;"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel est le résultat de typeof [] en JavaScript ?",
    options: [
      "'object'",
      "'array'",
      "'list'",
      "'undefined'"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle balise HTML est utilisée pour les liens hypertextes ?",
    options: [
      "<a>",
      "<link>",
      "<href>",
      "<url>"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle propriété CSS permet de mettre une image en fond ?",
    options: [
      "background-image",
      "image-background",
      "img-src",
      "background-src"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel est le bon moyen de déclarer une fonction en JS ?",
    options: [
      "function maFonction() {}",
      "def maFonction() {}",
      "fonction maFonction() {}",
      "func maFonction() {}"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel est le résultat de 10 % 3 en JavaScript ?",
    options: [
      "1",
      "3",
      "0",
      "10"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle méthode React permet d’afficher du contenu à l’écran ?",
    options: [
      "render()",
      "display()",
      "show()",
      "output()"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel attribut HTML permet d’ouvrir un lien dans un nouvel onglet ?",
    options: [
      "target='_blank'",
      "new-tab='true'",
      "open='new'",
      "blank='yes'"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle propriété CSS permet de mettre du gras ?",
    options: [
      "font-weight",
      "font-bold",
      "bold",
      "weight"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel est le bon moyen de faire une boucle for en JS ?",
    options: [
      "for(let i=0; i<5; i++){}",
      "for i in 0..5 {}",
      "foreach(i=0; i<5; i++){}",
      "loop(i=0; i<5; i++){}"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle extension de fichier pour un composant React ?",
    options: [
      ".jsx",
      ".html",
      ".js",
      ".react"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel est le bon moyen d’ajouter une classe CSS en React ?",
    options: [
      "className='maClasse'",
      "class='maClasse'",
      "css='maClasse'",
      "style='maClasse'"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle méthode JS permet de convertir une chaîne en nombre ?",
    options: [
      "parseInt()",
      "toNumber()",
      "Number()",
      "parseFloat()"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel est le bon moyen d’importer un fichier CSS en React ?",
    options: [
      "import './App.css';",
      "require('App.css')",
      "include 'App.css'",
      "import-css 'App.css'"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel est le bon moyen de faire un commentaire en CSS ?",
    options: [
      "/* commentaire */",
      "// commentaire",
      "<!-- commentaire -->",
      "# commentaire"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel hook React est utilisé pour stocker les valeurs du formulaire dans AVATAR.jsx ?",
    options: [
      "useEffect",
      "useState",
      "useRef",
      "useReducer"
    ],
    answer: 1,
    isTrue: true
  },
  {
    question: "Quels champs sont présents dans le formulaire AVATAR.jsx ?",
    options: [
      "Prénom, Nom, Âge",
      "Nom, Email, Mot de passe",
      "Prénom, Email, Téléphone",
      "Nom, Prénom, Adresse"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel est le rôle de la fonction handleInputChange dans AVATAR.jsx ?",
    options: [
      "Envoyer le formulaire",
      "Mettre à jour les valeurs du formulaire",
      "Afficher un message d'erreur",
      "Changer la couleur du fond"
    ],
    answer: 1,
    isTrue: true
  },
  {
    question: "Quand l’avatar et le message de bienvenue s’affichent-ils dans AVATAR.jsx ?",
    options: [
      "Quand tous les champs sont remplis",
      "Dès que la page se charge",
      "Jamais",
      "Quand on clique sur un bouton"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle API est utilisée pour générer l’avatar dans AVATAR.jsx ?",
    options: [
      "https://i.pravatar.cc",
      "https://randomuser.me",
      "https://avatarapi.com",
      "https://ui-avatars.com"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel attribut HTML est utilisé pour lier un label à un input ?",
    options: [
      "htmlFor",
      "for",
      "label",
      "idFor"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel type d’input est utilisé pour le champ âge ?",
    options: [
      "text",
      "number",
      "date",
      "range"
    ],
    answer: 1,
    isTrue: true
  },
  {
    question: "Comment la classe CSS de l’input est-elle définie dans AVATAR.jsx ?",
    options: [
      "className='form-input'",
      "class='form-input'",
      "style='form-input'",
      "inputClass='form-input'"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel est le nom de la variable qui contient les valeurs du formulaire ?",
    options: [
      "formData",
      "user",
      "state",
      "data"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel composant est exporté par défaut dans AVATAR.jsx ?",
    options: [
      "App",
      "Avatar",
      "Form",
      "UserProfile"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel hook React est utilisé pour stocker la liste des tâches dans TodoList.jsx ?",
    options: [
      "useEffect",
      "useState",
      "useRef",
      "useReducer"
    ],
    answer: 1,
    isTrue: true
  },
  {
    question: "Quelle fonction permet de charger les tâches depuis une API dans TodoList.jsx ?",
    options: [
      "useEffect",
      "useState",
      "useCallback",
      "useMemo"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle URL est utilisée pour récupérer les tâches dans TodoList.jsx ?",
    options: [
      "https://jsonplaceholder.typicode.com/todos",
      "https://api.todo.com/tasks",
      "https://simplon.co/todos",
      "https://localhost:3000/todos"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel format de données est utilisé pour afficher chaque tâche dans TodoList.jsx ?",
    options: [
      "Objet",
      "Tableau",
      "Chaîne de caractères",
      "Nombre"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel composant HTML est utilisé pour afficher la liste des tâches ?",
    options: [
      "<ul>",
      "<table>",
      "<div>",
      "<section>"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel attribut est utilisé pour donner une clé unique à chaque tâche dans TodoList.jsx ?",
    options: [
      "key",
      "id",
      "className",
      "name"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle classe CSS est utilisée pour styliser chaque tâche lors du survol ?",
    options: [
      "hover:bg-blue-50",
      "hover:bg-green-50",
      "hover:bg-red-50",
      "hover:bg-yellow-50"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Que se passe-t-il en cas d’erreur lors du chargement des tâches ?",
    options: [
      "Un message d’erreur est affiché dans la console",
      "La page se recharge",
      "Une alerte s’affiche",
      "Rien ne se passe"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel est le nom du composant exporté par défaut dans TodoList.jsx ?",
    options: [
      "TodoList",
      "TaskList",
      "List",
      "Tasks"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel élément HTML contient le titre de la liste des tâches ?",
    options: [
      "<h2>",
      "<h1>",
      "<p>",
      "<span>"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel package est utilisé pour la validation de formulaire dans yup.jsx ?",
    options: [
      "formik",
      "yup",
      "validator",
      "joi"
    ],
    answer: 1,
    isTrue: true
  },
  {
    question: "Quel hook est utilisé pour gérer le formulaire dans yup.jsx ?",
    options: [
      "useState",
      "useForm",
      "useEffect",
      "useReducer"
    ],
    answer: 1,
    isTrue: true
  },
  {
    question: "Quelle méthode de yup valide le format d'un email ?",
    options: [
      "yup.string().required()",
      "yup.string().email()",
      "yup.string().min()",
      "yup.string().matches()"
    ],
    answer: 1,
    isTrue: true
  },
  {
    question: "Quelle règle de validation est appliquée au champ email dans yup.jsx ?",
    options: [
      "Doit contenir '@'",
      "Doit contenir un chiffre",
      "Doit être en majuscule",
      "Doit être vide"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle règle de validation est appliquée au mot de passe dans yup.jsx ?",
    options: [
      "Au moins 6 caractères",
      "Doit contenir '@'",
      "Doit être un nombre",
      "Doit être vide"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Que se passe-t-il après la soumission du formulaire si tout est valide ?",
    options: [
      "Un message d'erreur s'affiche",
      "Le formulaire est réinitialisé et une alerte s'affiche",
      "La page se recharge",
      "Rien ne se passe"
    ],
    answer: 1,
    isTrue: true
  },
  {
    question: "Quel message s'affiche si l'email n'est pas valide ?",
    options: [
      "Format d'email invalide",
      "Email incorrect",
      "Erreur email",
      "Email manquant"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel composant CSS est utilisé pour afficher les erreurs sous les champs ?",
    options: [
      "error-message",
      "form-input",
      "form-label",
      "form-group"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel texte motivant est affiché dans le formulaire ?",
    options: [
      "Le succès appartient à ceux qui se lèvent tôt et persévèrent.",
      "Travaillez dur, rêvez grand.",
      "Simplon, c'est la vie.",
      "Toujours plus haut !"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel est le nom du composant exporté par défaut dans yup.jsx ?",
    options: [
      "App",
      "UserProfile",
      "Form",
      "Login"
    ],
    answer: 1,
    isTrue: true
  },
  {
    question: "Quel hook React permet d’exécuter du code après le rendu du composant ?",
    options: [
      "useState",
      "useEffect",
      "useRef",
      "useCallback"
    ],
    answer: 1,
    isTrue: true
  },
  {
    question: "Quelle méthode JavaScript permet de filtrer un tableau ?",
    options: [
      "filter()",
      "map()",
      "reduce()",
      "sort()"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel mot-clé permet de créer une fonction fléchée en JavaScript ?",
    options: [
      "function",
      "=>",
      "arrow",
      "def"
    ],
    answer: 1,
    isTrue: true
  },
  {
    question: "Quelle extension de fichier est utilisée pour les fichiers de style Sass ?",
    options: [
      ".css",
      ".sass",
      ".scss",
      ".style"
    ],
    answer: 2,
    isTrue: true
  },
  {
    question: "Quel attribut HTML permet de rendre un champ obligatoire ?",
    options: [
      "required",
      "obligatoire",
      "must",
      "needed"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle méthode permet de transformer un objet JavaScript en JSON ?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "toJSON()",
      "parseJSON()"
    ],
    answer: 1,
    isTrue: true
  },
  {
    question: "Quel est le bon moyen d’importer un composant React nommé Button ?",
    options: [
      "import Button from './Button';",
      "require('./Button')",
      "import { Button } from './Button';",
      "import button from './Button';"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle balise HTML est utilisée pour créer un bouton ?",
    options: [
      "<input>",
      "<button>",
      "<a>",
      "<div>"
    ],
    answer: 1,
    isTrue: true
  },
  {
    question: "Quel opérateur logique permet de vérifier deux conditions en JavaScript ?",
    options: [
      "&&",
      "||",
      "==",
      "!="
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle méthode React permet de gérer les formulaires facilement ?",
    options: [
      "useForm",
      "useState",
      "useEffect",
      "useReducer"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle méthode JavaScript permet de supprimer le dernier élément d’un tableau ?",
    options: [
      "pop()",
      "shift()",
      "remove()",
      "delete()"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel attribut HTML permet de désactiver un bouton ?",
    options: [
      "disable",
      "disabled",
      "readonly",
      "inactive"
    ],
    answer: 1,
    isTrue: true
  },
  {
    question: "Quel est le résultat de '5' == 5 en JavaScript ?",
    options: [
      "true",
      "false",
      "undefined",
      "Erreur"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle balise HTML est utilisée pour les listes non ordonnées ?",
    options: [
      "<ul>",
      "<ol>",
      "<li>",
      "<list>"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle propriété CSS permet d’arrondir les coins d’un élément ?",
    options: [
      "border-radius",
      "corner",
      "round-corner",
      "radius"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel mot-clé permet de créer une variable modifiable en JavaScript ?",
    options: [
      "let",
      "const",
      "var",
      "static"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle méthode JS permet de fusionner deux tableaux ?",
    options: [
      "concat()",
      "merge()",
      "add()",
      "join()"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel est le bon moyen de faire une redirection en React Router ?",
    options: [
      "<Redirect />",
      "<Navigate />",
      "<Route />",
      "<Switch />"
    ],
    answer: 1,
    isTrue: true
  },
  {
    question: "Quelle méthode JS permet de transformer une chaîne en minuscules ?",
    options: [
      "toLowerCase()",
      "lowerCase()",
      "minuscule()",
      "toSmall()"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel est le bon moyen d’ajouter un commentaire en JSX ?",
    options: [
      "{/* commentaire */}",
      "// commentaire",
      "<!-- commentaire -->",
      "# commentaire"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle méthode JavaScript permet de vérifier si un tableau contient une valeur ?",
    options: [
      "includes()",
      "has()",
      "contains()",
      "find()"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel attribut HTML permet de donner un texte alternatif à une image ?",
    options: [
      "alt",
      "title",
      "desc",
      "caption"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle propriété CSS permet de mettre du texte en italique ?",
    options: [
      "font-style: italic;",
      "font-italic: true;",
      "text-style: italic;",
      "italic: yes;"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel est le résultat de typeof null en JavaScript ?",
    options: [
      "'object'",
      "'null'",
      "'undefined'",
      "'number'"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle balise HTML est utilisée pour les titres principaux ?",
    options: [
      "<h1>",
      "<title>",
      "<header>",
      "<main>"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel mot-clé permet de sortir d’une boucle en JavaScript ?",
    options: [
      "break",
      "stop",
      "exit",
      "return"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle méthode JS permet de trier un tableau ?",
    options: [
      "sort()",
      "order()",
      "arrange()",
      "setOrder()"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel est le bon moyen de déclarer une constante en ES6 ?",
    options: [
      "const x = 5;",
      "let x = 5;",
      "var x = 5;",
      "constant x = 5;"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle balise HTML est utilisée pour insérer une ligne horizontale ?",
    options: [
      "<hr>",
      "<line>",
      "<horizontal>",
      "<break>"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle propriété CSS permet de cacher un élément ?",
    options: [
      "display: none;",
      "visibility: hidden;",
      "opacity: 0;",
      "Toutes ces réponses"
    ],
    answer: 3,
    isTrue: true
  },
  {
    question: "Quelle méthode JavaScript permet de transformer un tableau en chaîne de caractères ?",
    options: [
      "join()",
      "split()",
      "toString()",
      "concat()"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel attribut HTML permet de rendre un champ non modifiable ?",
    options: [
      "readonly",
      "disabled",
      "static",
      "locked"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle propriété CSS permet de mettre du texte en gras ?",
    options: [
      "font-weight",
      "font-bold",
      "bold",
      "weight"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel est le résultat de 3 === '3' en JavaScript ?",
    options: [
      "true",
      "false",
      "undefined",
      "Erreur"
    ],
    answer: 1,
    isTrue: true
  },
  {
    question: "Quelle balise HTML est utilisée pour insérer une image ?",
    options: [
      "<img>",
      "<image>",
      "<src>",
      "<pic>"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel mot-clé permet de créer une fonction en JavaScript ?",
    options: [
      "function",
      "def",
      "fun",
      "proc"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle méthode JS permet de trouver l’index d’un élément dans un tableau ?",
    options: [
      "indexOf()",
      "findIndex()",
      "search()",
      "getIndex()"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel attribut HTML permet de spécifier la source d’une image ?",
    options: [
      "src",
      "href",
      "link",
      "source"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quelle propriété CSS permet de souligner du texte ?",
    options: [
      "text-decoration: underline;",
      "font-underline: true;",
      "underline: yes;",
      "text-style: underline;"
    ],
    answer: 0,
    isTrue: true
  },
  {
    question: "Quel est le résultat de typeof NaN en JavaScript ?",
    options: [
      "'number'",
      "'NaN'",
      "'undefined'",
      "'object'"
    ],
    answer: 0,
    isTrue: true
  }
];

// Mélangez les questions une seule fois au chargement du composant
const shuffledQuestions = shuffle(questionsData);

const Correction = ({ isTrue, correctOption, options }) => (
  <div style={{
    marginTop: 12,
    fontWeight: 'bold',
    color: isTrue ? '#059669' : '#dc2626',
    fontSize: '1.1em'
  }}>
    {isTrue ? 'Vrai !' : (
      <>
        Faux<br />
        <span style={{ color: "#6366f1" }}>
          Bonne réponse : <b>{options[correctOption]}</b>
        </span>
      </>
    )}
  </div>
);

const ProgressBar = ({ current, total }) => {
  const percent = Math.round(((current + 1) / total) * 100);
  return (
    <div style={{
      width: '100%',
      background: '#e5e7eb',
      borderRadius: 8,
      height: 16,
      margin: '16px 0 24px 0',
      overflow: 'hidden',
      boxShadow: '0 1px 4px #6366f122'
    }}>
      <div style={{
        width: `${percent}%`,
        background: 'linear-gradient(90deg, #6366f1 60%, #16a34a 100%)',
        height: '100%',
        transition: 'width 0.3s',
        borderRadius: 8
      }} />
    </div>
  );
};

const encouragement = (score, total) => {
  const ratio = score / total;
  if (ratio === 1) return "🎉 Parfait, tu es un(e) champion(ne) !";
  if (ratio >= 0.8) return "👏 Excellent travail !";
  if (ratio >= 0.5) return "👍 Pas mal, continue comme ça !";
  return "💪 Courage, tu vas progresser !";
};

const SimplonQuiz = () => {
  const [questions, setQuestions] = useState(shuffledQuestions);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showCorrection, setShowCorrection] = useState(false);
  const [lastAnswerTrue, setLastAnswerTrue] = useState(null);
  const [answers, setAnswers] = useState([]);
  const nextBtnRef = useRef();

  const handleAnswer = (idx) => {
    const isCorrect = idx === questions[current].answer;
    setLastAnswerTrue(isCorrect ? questions[current].isTrue : false);
    setShowCorrection(true);
    setAnswers([...answers, { 
      question: questions[current].question, 
      correct: isCorrect, 
      correctOption: questions[current].answer, 
      userOption: idx,
      options: questions[current].options
    }]);
    if (isCorrect) setScore(score + 1);

    setTimeout(() => {
      setShowCorrection(false);
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        nextBtnRef.current && nextBtnRef.current.focus();
      } else {
        setShowResult(true);
      }
    }, 1200);
  };

  const handleSkip = () => {
    setAnswers([...answers, { 
      question: questions[current].question, 
      correct: false, 
      correctOption: questions[current].answer, 
      userOption: null,
      options: questions[current].options
    }]);
    setShowCorrection(false);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      nextBtnRef.current && nextBtnRef.current.focus();
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    const newQuestions = shuffle(questionsData);
    setQuestions(newQuestions);
    setCurrent(0);
    setScore(0);
    setShowResult(false);
    setShowCorrection(false);
    setLastAnswerTrue(null);
    setAnswers([]);
  };

  return (
    <div className="form-container" style={{ maxWidth: 500 }}>
      <div className="form-content">
        <div className="welcome-message">Quiz Simplon - Culture Web</div>
        {!showResult ? (
          <>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>
              Question {current + 1} / {questions.length}
            </div>
            <ProgressBar current={current} total={questions.length} />
            <div style={{ marginBottom: 18, fontSize: "1.1em" }}>
              {questions[current].question}
            </div>
            <div>
              {questions[current].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  style={{
                    display: "block",
                    width: "100%",
                    margin: "8px 0",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1.5px solid #6366f1",
                    background: "#f3f4f6",
                    color: "#374151",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "background 0.2s"
                  }}
                  disabled={showCorrection}
                  ref={idx === 0 ? nextBtnRef : null}
                >
                  {opt}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="submit-button"
              style={{ marginTop: 8, background: "#eab308", color: "#222" }}
              onClick={handleSkip}
              disabled={showCorrection}
            >
              Passer
            </button>
            {showCorrection && (
              <Correction
                isTrue={lastAnswerTrue}
                correctOption={questions[current].answer}
                options={questions[current].options}
              />
            )}
            <div style={{ marginTop: 18, color: "#6366f1", fontWeight: 600 }}>
              Score actuel : {score} / {questions.length}
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.3em", fontWeight: "bold", marginBottom: 12 }}>
              Ton score final : {score} / {questions.length}
            </div>
            <div style={{ marginBottom: 12, fontSize: "1.1em" }}>
              {encouragement(score, questions.length)}
            </div>
            <div style={{ textAlign: "left", margin: "0 auto", maxWidth: 400 }}>
              <h3 style={{ color: "#6366f1" }}>Résumé :</h3>
              <ul>
                {answers.map((ans, idx) => (
                  <li key={idx} style={{ marginBottom: 6 }}>
                    <span style={{ color: ans.correct ? "#059669" : "#dc2626" }}>
                      {ans.correct ? "✔️" : "❌"}
                    </span>{" "}
                    <b>{ans.question}</b>
                    <br />
                    <span style={{ fontSize: "0.97em" }}>
                      {ans.userOption !== null
                        ? `Votre réponse : ${ans.options[ans.userOption]}`
                        : "Question passée"}
                      <br />
                      Bonne réponse : <b>{ans.options[ans.correctOption]}</b>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <button className="submit-button" onClick={restart} style={{ marginTop: 16 }}>
              Rejouer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimplonQuiz;