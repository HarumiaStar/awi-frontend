# Frontend du projet AWI pour la gestion de bénévole pour des évènements


## Installation

### Prérequis

- NodeJS
- npm

### Installation

```bash
npm install
```

## Lancement

```bash
npm start
```


## Création d'une nouvelle page

Pour créer une nouvelle page, il est possible d'utiliser le script newPage.py qui va créer les fichiers nécessaires à la création d'une nouvelle page.

```bash
python3 newPage.py <nom de la page>
```

**Description du script :**

- Création de la hiérarchie suivante dans le dossier src/Pages ainsi que d'y ajouter du code de base :

```text
src/Pages
└── <nom de la page>
    ├── <nom de la page>.tsx
    ├── <nom de la page>.module.css
    └── index.tsx
```

- Modification du fichier src/Pages/index.tsx pour ajouter la nouvelle page dans la liste des pages

