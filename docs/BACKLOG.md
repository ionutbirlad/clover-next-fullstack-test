# BACKLOG

## Features

### Personal Finance Dashboard

Implementare una dashboard finanziaria personale focalizzata sulla gestione delle entrate e delle uscite dell'utente.

#### Obiettivi

Fornire una panoramica immediata della situazione finanziaria dell'utente tramite:

- Total Balance
- Income Summary
- Expenses Summary
- Transaction History
- Add Transaction
- Transaction Trend Chart

#### Frontend

La dashboard dovrà includere:

##### Total Balance
- Saldo totale mostrato in evidenza nella parte superiore della pagina.
- Calcolato come differenza tra entrate e uscite.

##### Income / Expenses Summary
- Riepilogo sintetico delle entrate e delle uscite.
- Visualizzazione chiara e immediata dei valori aggregati.

##### Transaction History
- Elenco cronologico delle transazioni.
- Distinzione visiva tra entrate e uscite.
- Visualizzazione di:
  - nome transazione
  - importo
  - categoria/icona
  - tipologia (income/expense)

##### Add Transaction
- Pulsante principale per l'aggiunta di una nuova movimentazione.
- Form o modal dedicata all'inserimento dei dati.

##### Transaction Trend Chart
- Grafico basato sulle transazioni esistenti.
- Utilizzo di una libreria dedicata per la visualizzazione dei dati.
- Nessuna logica particolarmente complessa lato backend richiesta per questa funzionalità.

#### Backend

Sarà necessario introdurre il supporto alla gestione delle transazioni finanziarie.

Possibili operazioni:

- Recupero lista transazioni
- Creazione nuova transazione
- Eventuale eliminazione di una transazione
- Eventuale aggiornamento di una transazione

Il calcolo di balance, income ed expenses potrà inizialmente essere derivato dalle transazioni esistenti.

---

## Technical Improvements

### Basic CI/CD Pipeline

#### Contesto

Il progetto non include una pipeline automatizzata per verificare lo stato della codebase dopo ogni modifica.

#### Obiettivo

Aggiungere una pipeline leggera, principalmente orientata alla continuous integration, per eseguire controlli base su backend e frontend.

#### Intervento previsto

- Creare una GitHub Actions workflow file nella cartella `.github/workflows`
- Installare le dipendenze con `npm ci` per mantenere installazioni deterministiche
- Eseguire controlli base su backend e frontend
- Includere almeno lint/build dove disponibili
- Valutare eventuali controlli aggiuntivi già presenti negli script del progetto

#### Possibili controlli

- Backend lint
- Frontend lint
- Frontend build
- Eventuale backend test/build se supportato dalla codebase
- Verifica minima che le dipendenze siano installabili correttamente

#### Benefici

- Feedback automatico sulle modifiche
- Maggiore affidabilità durante lo sviluppo
- Dimostra attenzione al ciclo di sviluppo professionale
- Riduce il rischio di introdurre regressioni banali
- Valorizza l'uso ordinato di GitHub e del repository


---

### Mini Design System & UI Refinement

#### Contesto

L'applicazione utilizza già Ant Design come base UI. Prima dell'implementazione verrà verificato quanto sia realmente necessario intervenire e quali aree beneficerebbero maggiormente di una personalizzazione.

#### Obiettivo

Dimostrare capacità di organizzazione frontend, attenzione alla UX e conoscenza dei principi di design system senza introdurre complessità eccessiva.

#### Intervento previsto

- Definire un mini design system sopra Ant Design
- Centralizzare token e scelte visive principali
- Uniformare spaziature, tipografia e componenti ricorrenti
- Personalizzare la grafica delle nuove feature introdotte
- Migliorare la coerenza visiva generale dell'applicazione

#### Possibili elementi

- Color palette
- Typography scale
- Spacing tokens
- Reusable layout components
- Page sections e card patterns
- Utility component condivisi

#### Benefici

- UI più curata e professionale
- Maggiore consistenza visiva
- Codice frontend più organizzato
- Dimostra capacità di progettazione frontend oltre la semplice implementazione delle feature

#### Note

Da rivalutare durante la fase frontend per verificare quanto valore aggiunga rispetto al tempo disponibile per l'assessment.
