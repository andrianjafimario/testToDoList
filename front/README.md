

# 📋 Todo List Application

Une application simple de gestion de tâches construite avec **NestJS** (backend), **React** (frontend) et **Material-UI** (UI).

## 🎯 Fonctionnalités

- ✅ Ajouter une tâche
- ✅ Afficher toutes les tâches
- ✅ Modifier une tâche
- ✅ Supprimer une tâche
- ✅ Interface utilisateur moderne avec Material-UI

## 🛠️ Architecture

- **Framework**: React 18
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **HTTP Client**: Axios
- **Port**: 5173

## 📦 Installation

### Prérequis
- Node.js >= 20.0.0
- npm >= 10.0.0



Le backend sera disponible à `http://localhost:3000`

### Frontend

```bash
# Naviguer dans le dossier front
cd front

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Ou construire pour la production
npm run build
```

Le frontend sera disponible à `http://localhost:5173`

## Features

### Task Entity
Chaque tâche contient:
- `id` - UUID unique
- `title` - Titre de la tâche
- `description` - Description complète
- `date` - Date de la tâche
- `createdAt` - Date de création (auto)
- `updatedAt` - Date de dernière modification (auto)

## Interface Utilisateur

L'interface utilise Material-UI et inclut:
- Une barre d'en-tête avec titre et bouton "Ajouter"
- Une grille de cartes pour afficher les tâches
- Un formulaire de dialogue pour créer/modifier les tâches
- Icônes pour modifier et supprimer
- Gestion des erreurs avec messages d'alerte

## License

MIT
