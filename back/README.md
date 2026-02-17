<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# 📋 Todo List Application

Une application simple de gestion de tâches construite avec **NestJS** (backend), **React** (frontend) et **Material-UI** (UI).



## Architecture

- **Framework**: NestJS 11
- **ORM**: TypeORM
- **Base de données**: SQLite
- **Port**: 3000


## Installation

### Prérequis
- Node.js >= 20.0.0
- npm >= 10.0.0

### Backend

```bash
# Installer les dépendances
npm install --legacy-peer-deps

# Démarrer en mode développement
npm run start:dev

# Ou démarrer en mode production
npm run build
npm run start:prod
```

Le backend sera disponible à `http://localhost:3000`


## Endpoints API

### Tâches

- **GET** `/tasks` - Récupérer toutes les tâches
- **GET** `/tasks/:id` - Récupérer une tâche spécifique
- **POST** `/tasks` - Créer une nouvelle tâche
  ```json
  {
    "title": "Ma tâche",
    "description": "Description de la tâche",
    "date": "2024-02-20"
  }
  ```
- **PATCH** `/tasks/:id` - Modifier une tâche
- **DELETE** `/tasks/:id` - Supprimer une tâche

## Features

### Task Entity
Chaque tâche contient:
- `id` - UUID unique
- `title` - Titre de la tâche
- `description` - Description complète
- `date` - Date de la tâche
- `createdAt` - Date de création (auto)
- `updatedAt` - Date de dernière modification (auto)

## 📝 License

MIT
