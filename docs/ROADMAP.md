# ROADMAP

## Overview

Roadmap grezza per l'implementazione dell'assessment Clover Next.

L'obiettivo è procedere in modo incrementale, partendo da miglioramenti tecnici a basso rischio, per poi passare alla feature principale e chiudere con testing e review finale.

---

## Milestone 1 - Project Setup Improvements

### Obiettivo

Introdurre miglioramenti tecnici iniziali, rapidi e a basso rischio, utili per rendere il progetto più professionale e mantenibile.

### Scope

- Sistemare la gestione delle variabili d'ambiente
- Creare un file `.env.example`
- Aggiungere `.env` al `.gitignore`
- Aggiornare la documentazione di setup
- Documentare la creazione del file `.env` locale a partire da `.env.example`
- Verificare che il progetto sia avviabile seguendo esclusivamente la documentazione
- Aggiungere una pipeline CI base
- Verificare lint/build/check disponibili per backend e frontend

### Note

Questa milestone serve anche per prendere ulteriore confidenza con la struttura del progetto prima di entrare nella feature principale.

---

## Milestone 2 - Backend Feature Implementation

### Obiettivo

Implementare la parte backend della feature di personal finance dashboard, mantenendosi il più possibile aderenti alla struttura già presente nella codebase.

### Scope

- Aggiungere il supporto alle transazioni finanziarie
- Definire il modello dati necessario
- Creare lo schema Mongoose
- Aggiungere le route Express dedicate
- Aggiungere controller/middleware solo se coerenti con la struttura esistente
- Gestire recupero, creazione ed eventuale modifica/eliminazione delle transazioni

### Note

L'obiettivo non è rifattorizzare pesantemente il backend, ma integrarsi in modo pulito con i pattern già presenti.

---

## Milestone 3 - Mini Design System & Frontend Foundation

### Obiettivo

Preparare una base frontend più ordinata prima di implementare la dashboard vera e propria.

### Scope

- Valutare la struttura frontend esistente
- Definire un mini design system sopra Ant Design
- Centralizzare eventuali token visivi base
- Uniformare spacing, tipografia, colori e pattern ricorrenti
- Creare componenti riutilizzabili solo dove realmente utili
- Preparare layout e componenti base per la dashboard

### Note

Questa milestone deve rimanere pragmatica: il design system deve aiutare l'implementazione, non diventare un progetto separato.

---

## Milestone 4 - Frontend Feature Implementation

### Obiettivo

Implementare la dashboard finanziaria lato frontend collegandola alla parte backend sviluppata nella milestone precedente.

### Scope

- Creare la schermata principale della dashboard
- Mostrare il total balance
- Mostrare income ed expenses summary
- Mostrare la transaction history
- Aggiungere form/modal per creare una nuova transazione
- Integrare la comunicazione con le API backend
- Aggiungere un grafico basato sulle transazioni esistenti
- Gestire loading, empty state ed error state dove necessario

### Note

La UI dovrà essere semplice, leggibile e curata, con uno stile coerente con il mini design system definito nella milestone precedente.

---

## Milestone 5 - Testing

### Obiettivo

Validare le parti principali introdotte durante l'assessment.

### Scope

- Analizzare la strategia di testing già presente nel progetto
- Aggiungere test minimali dove apportano valore
- Priorità alla parte backend
- Valutare eventuali test frontend sulle parti più significative
- Garantire che i flussi principali della nuova feature siano verificabili

### Possibili test

#### Backend

- Creazione transazione
- Recupero transazioni
- Validazione input

#### Frontend

- Rendering dashboard
- Visualizzazione dati principali
- Comportamento dei componenti più importanti

### Note

Focus sulla qualità e sulla copertura delle parti introdotte, non sulla copertura totale della codebase.

---

## Milestone 6 - Final Review, Polish & Documentation

### Obiettivo

Chiudere il lavoro con una revisione complessiva della qualità del progetto.

### Scope

- Verificare il flusso completo backend/frontend
- Pulire codice e naming dove necessario
- Controllare lint/build
- Aggiornare README o documentazione se necessario
- Verificare che il progetto sia avviabile da zero
- Preparare eventuali note finali su scelte tecniche e tradeoff

### Note

Questa milestone serve a trasformare l'implementazione in una consegna ordinata e leggibile per chi valuterà l'assessment.
