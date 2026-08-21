# Hub Dashboard

Tableau de bord personnel pour développeur : gestion de tâches, de projets, d'un agenda et de notes, le tout centralisé dans une seule interface.

## Fonctionnalités

- **Tasks** : gestion de tâches (création, édition, suppression)
- **Projects** : suivi de projets avec statut, avancement, échéance — vue Kanban (drag & drop) et vue tableau
- **Agenda** : calendrier mensuel, rendez-vous manuels, échéances de projets fusionnées automatiquement
- **Notes** : bloc-notes libre + post-its colorés
- **Dashboard** : vue d'ensemble (tâches du jour, projets en cours, météo locale, mini-calendrier)
- **Authentification** : connexion par mot de passe (bcrypt) + session JWT, toutes les routes protégées

## Stack technique

**Frontend** : React (Vite), React Router, Lucide React (icônes)
**Backend** : Node.js, Express, better-sqlite3, JWT, bcrypt

## Installation en local

Prérequis : Node.js.

### Backend

```bash
cd backend
npm install
```

Crée un fichier `.env` dans `backend/` avec :
```
PORT=3000
JWT_SECRET=une_valeur_secrete_de_ton_choix
```

Puis lance le serveur :
```bash
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Améliorations futures

- Agent intelligent de relecture/correction de code (code review automatisé)

## À propos

Projet portfolio développé en autodidacte, pensé comme un outil que j'utiliserais réellement au quotidien pour organiser mon travail de développeuse.
