# Meriam Wachene — Portfolio Angular

Portfolio personnel converti en application Angular 17 (Standalone Components).

## Prérequis

- Node.js 18+ 
- npm 9+

## Installation & Lancement

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm start
# ou
ng serve
```

Ouvrez http://localhost:4200 dans votre navigateur.

## Build Production

```bash
ng build
# Les fichiers seront dans dist/meriam-portfolio/
```

## Structure du projet

```
src/
├── app/
│   ├── components/
│   │   ├── cursor/          # Curseur personnalisé
│   │   ├── network-canvas/  # Animation réseau de nœuds (canvas)
│   │   ├── navbar/          # Navigation fixe
│   │   ├── hero/            # Section héro + barre de contact
│   │   ├── skills/          # Grille des compétences
│   │   ├── education/       # Timeline formation
│   │   ├── experience/      # Expériences professionnelles
│   │   ├── certifications/  # Certifications
│   │   ├── languages/       # Langues
│   │   ├── contact/         # Formulaire de contact
│   │   └── footer/          # Pied de page
│   └── app.component.ts     # Composant racine
├── styles.scss              # Variables CSS globales + animations
└── index.html
```

## Photo de profil

Placez votre photo dans `src/assets/photo.jpg`.  
Si le fichier est absent, un placeholder "M.W." s'affiche à la place.

## Personnalisation

Toutes les données (expériences, compétences, certifications, etc.) sont dans les fichiers de chaque composant sous forme de tableaux TypeScript — facile à modifier.

Les couleurs sont définies via des variables CSS dans `src/styles.scss` :
- `--navy` : couleur de fond principale
- `--gold` : couleur accentuée (bleu clair)
- `--gold-light` : accentuation plus claire
