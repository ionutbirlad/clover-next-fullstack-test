# ARCHITECTURE_DECISIONS

## Purpose

Questo documento raccoglie le decisioni architetturali prese durante lo sviluppo dell'assessment.

L'obiettivo è:

- tenere traccia delle motivazioni dietro alle scelte effettuate
- documentare tradeoff e vincoli
- fornire contesto per futuri sviluppi
- allineare eventuali AI agents (Codex, ChatGPT, ecc.) alle decisioni già prese

Le decisioni vengono aggiunte e aggiornate durante lo sviluppo.

---

# ADR-001 - Pragmatic Integration Over Refactoring

## Context

La codebase esistente presenta già una struttura backend Express e frontend React funzionante.

## Decision

Le nuove funzionalità dovranno integrarsi il più possibile con i pattern già presenti nella codebase.

## Rationale

L'obiettivo dell'assessment non è rifattorizzare l'intera applicazione, ma dimostrare capacità di lettura, comprensione ed estensione di un progetto esistente.

## Consequences

- Evitare refactor estesi non strettamente necessari.
- Preferire coerenza con il codice esistente.
- Introdurre nuove astrazioni solo quando apportano reale valore.

---

# ADR-002 - Minimal Backend Changes

## Context

L'applicazione utilizza già Express, MongoDB e una struttura consolidata per route e middleware.

## Decision

Aggiungere esclusivamente gli elementi necessari alla nuova feature.

## Rationale

Ridurre il rischio di regressioni e mantenere la codebase facilmente comprensibile.

## Consequences

- Nuovi middleware solo se realmente necessari.
- Nuovi controller solo se coerenti con la struttura esistente.
- Nessuna riorganizzazione architetturale ampia del backend.

---

# ADR-003 - Environment Configuration Standards

## Context

Il repository include un file `.env` versionato direttamente.

## Decision

Adottare una configurazione standard basata su `.env.example` e `.gitignore`.

## Rationale

Migliorare la maintainability del progetto e allinearsi alle pratiche comuni di sviluppo.

## Consequences

- Introduzione di `.env.example`.
- Aggiornamento della documentazione di setup.
- Setup leggermente più esplicito per nuovi sviluppatori.

---

# ADR-004 - Lightweight CI Strategy

## Context

Il repository non include una pipeline automatizzata di verifica.

## Decision

Introdurre una pipeline CI minimale focalizzata su controlli ad alto valore e basso costo.

## Rationale

Dimostrare attenzione alla qualità del codice senza introdurre complessità eccessiva.

## Consequences

- Lint automatico.
- Build verification.
- Possibile integrazione dei test introdotti durante l'assessment.

---

# ADR-005 - Ant Design First

## Context

Il frontend utilizza già Ant Design come libreria UI principale.

## Decision

Riutilizzare prioritariamente i componenti esistenti di Ant Design.

## Rationale

Evitare duplicazioni e mantenere coerenza visiva e tecnica.

## Consequences

- Nessuna sostituzione del design system esistente.
- Personalizzazioni solo dove necessario.
- Preferenza per composizione e configurazione rispetto alla riscrittura.

---

# ADR-006 - Mini Design System Layer

## Context

La UI attuale può essere migliorata in termini di consistenza e presentazione.

## Decision

Costruire un mini design system sopra Ant Design.

## Rationale

Dimostrare capacità di organizzazione frontend senza introdurre over-engineering.

## Consequences

- Possibili token condivisi.
- Pattern visivi coerenti.
- Componenti riutilizzabili solo quando utili.
- Nessuna creazione di un design system complesso o separato.

---

# ADR-007 - Feature Scope Selection

## Context

L'assessment richiede l'aggiunta di valore alla codebase esistente.

## Decision

Implementare una Personal Finance Dashboard come feature principale.

## Rationale

La feature permette di dimostrare competenze full stack su:
- database
- API
- React
- UX/UI
- visualizzazione dati

## Consequences

La feature includerà:

- Total Balance
- Income Summary
- Expenses Summary
- Transaction History
- Add Transaction
- Transaction Trend Chart

---

# ADR-008 - Testing Strategy

## Context

Il tempo disponibile è limitato e il progetto non nasce con un approccio TDD.

## Decision

Adottare una strategia pragmatica basata su implementazione prima e test successivamente.

## Rationale

Massimizzare il valore consegnato mantenendo una copertura significativa delle parti introdotte.

## Consequences

- Priorità alla realizzazione della feature.
- Test focalizzati sui flussi principali.
- Priorità ai test backend.
- Eventuali test frontend sulle parti a maggior valore.
