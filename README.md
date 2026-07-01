# Clover Next Fullstack Assessment

This repository contains my implementation of the Clover Next fullstack assessment.

The goal of the project was to extend an existing monorepo with a small **Expense and Income Diary** application, while keeping the implementation pragmatic, maintainable, and aligned with the structure already provided by the template.

The final application allows an authenticated user to manage personal finance transactions and view a small dashboard with balance, income, expenses, transaction history, and transaction trends.

---

## Tech Stack

- Node.js
- Express
- MongoDB / Mongoose
- React
- Vite
- Ant Design
- Tailwind CSS
- Jest / Supertest
- Docker Compose
- GitHub Actions

---

## Run Locally

### Requirements

- Node.js 20.x
- npm
- Docker

### Setup

Install dependencies in both application folders:

```bash
cd Api
npm ci

cd ../FrontEnd
npm ci
```

Start the full stack from the repository root:

```bash
docker-compose up
```

Seed the database from the `Api` folder:

```bash
cd Api
npm run seed
```

The seed creates the test user and demo transactions used by the dashboard.

Login credentials:

| Field    | Value              |
| -------- | ------------------ |
| Email    | `test@meblabs.com` |
| Password | `testtest`         |

The frontend is available at [http://localhost](http://localhost).

---

## Useful Commands

### API

```bash
cd Api
npm run lint
npm run format:check
npm test
```

### Frontend

```bash
cd FrontEnd
npm run lint
npm run format:check
npm run build
```

---

## Project Structure

```text
.
├─ Api        # Express API, MongoDB models, routes, controllers, tests and seed data
├─ FrontEnd   # React SPA built with Vite, Ant Design and Tailwind CSS
├─ DBData     # Local database-related data used by the original template
├─ docs       # Roadmap, backlog and architecture decision notes
└─ .github    # CI workflow
```

The project is a monorepo: backend and frontend live in the same repository but remain separated into dedicated application folders.

---

## Assessment Scope

The original requirement was to create an application to track daily expenses and incomes, with CRUD operations exposed through a backend API and consumed by a frontend application.

The implemented feature focuses on:

- user-scoped transactions
- fixed transaction categories
- transaction listing, creation, deletion and detail view
- dashboard summaries derived from transactions
- transaction trend chart
- seed data for immediate evaluation
- backend tests for the main transaction flows
- lightweight frontend UI refinement on top of the existing Ant Design setup

---

## Architectural Principles

The implementation follows a few guiding principles.

### 1. Pragmatic Integration Over Refactoring

The existing codebase already provided an Express backend, a React frontend, authentication, middleware, helper utilities and several UI components.

Instead of replacing those foundations, the new feature was integrated into the existing structure. This keeps the assessment focused on understanding and extending a real codebase rather than rewriting it.

Main consequences:

- no broad backend or frontend refactor
- existing middleware and response patterns reused
- Ant Design kept as the primary UI system
- new abstractions added only where they supported the finance feature directly

---

### 2. Backend Extension

The backend was extended using the same general flow already present in the API:

```text
Route -> Middleware -> Request validation -> Controller -> Mongoose model -> Response helper
```

The transaction feature adds the data model, request validation, routes, controller logic, RBAC permissions and tests needed for the finance domain.

Transactions are scoped to the authenticated user. This keeps each user isolated and avoids introducing unnecessary admin-level behavior for a personal finance feature.

Categories are intentionally fixed in code. For this assessment, categories behave like business constants rather than user-managed records, so adding database persistence and full category CRUD would have added complexity without clear value.

---

### 3. Request Validation and Domain Rules

The backend keeps the existing validation approach:

- request shape is validated before reaching the controller
- Mongoose schema validation remains the persistence-level safety net
- transaction-specific consistency checks are kept lightweight

For category/type compatibility, a small pure helper was introduced instead of adding a full service layer or relying only on a custom Mongoose validator.

This was a deliberate middle ground:

- more explicit than hiding the rule inside persistence
- smaller than introducing a complete domain/service layer for one feature
- easy to test and reuse in create/update flows

---

### 4. Frontend Foundation

The frontend keeps Ant Design as the base UI system and adds a small finance-oriented layer on top of it.

The goal was not to build a full custom design system, but to improve consistency and presentation enough to support the assessment feature.

The frontend work includes:

- theme/token refinements on top of Ant Design
- finance-specific domain components
- small formatting and aggregation helpers
- translations for the new UI
- a small data layer around the existing Axios helper and auth interceptor

This keeps the feature organized without detaching it from the original frontend architecture.

---

### 5. Data Layer and Mapping

The existing frontend already exposed a configured Axios instance with interceptors for authentication and refresh-token behavior.

Rather than replacing that setup, the finance feature adds a small wrapper/data layer on top of it. The purpose is to keep API calls for transactions in one place and normalize remote responses before they reach the UI.

This provides a cleaner boundary between:

| Concern      | Responsibility                            |
| ------------ | ----------------------------------------- |
| Axios helper | transport, auth interceptor, refresh flow |
| API layer    | transaction-specific HTTP calls           |
| Mappers      | remote-to-domain normalization            |
| Aggregators  | frontend-derived finance summaries        |
| Pages        | orchestration and user interaction        |
| Components   | presentation and reusable UI composition  |

The implementation remains intentionally lightweight because the project is JavaScript-based and does not currently use a server-state library.

---

### 6. Frontend-Derived Summaries

Balance, income, expenses, chart data, recurring expenses and top transactions are derived on the frontend from the transaction list.

Dedicated backend summary endpoints were intentionally not added. For the current dataset size and assessment scope, deriving these values client-side keeps the backend simpler and avoids premature API expansion.

If the application grew, these aggregations could move to backend endpoints or a dedicated analytics layer.

---

### 7. Testing Strategy

The testing strategy is pragmatic and focused on the highest-value area introduced by the assessment: the backend transaction API.

Backend tests cover the main transaction flows, including authenticated access, validation, user ownership and soft-delete behavior.

Frontend tests were left as a future improvement because the available time was better spent completing the full end-to-end feature and keeping the UI connected to real backend data.

---

## CI Pipeline

A GitHub Actions workflow was added to provide lightweight continuous integration.

The pipeline runs on pull requests and pushes targeting `main` and `release/v1-beta`.

It verifies:

| Area     | Checks                                        |
| -------- | --------------------------------------------- |
| API      | install, format check, lint, automated tests  |
| Frontend | install, format check, lint, production build |

Draft pull requests are skipped, and concurrent runs on the same branch are cancelled to avoid redundant checks.

---

## Main Tradeoffs

### JavaScript Instead of TypeScript

The template is JavaScript-based. TypeScript would improve contracts between backend and frontend, but migrating the project would have been outside the practical scope of the assessment.

### No Full Backend Service Layer

A richer backend could introduce controllers, services, repositories and domain validators. For this project, that would have been disproportionate. The implementation stays close to the existing Express/Mongoose style while isolating only the transaction-specific rule that needed reuse.

### Local State Instead of TanStack Query

The frontend uses local page state and `useEffect` for API loading. A server-state library such as TanStack Query would improve caching, invalidation and error handling, but introducing it late in the assessment would have expanded the scope.

### Ant Design First

The UI is customized, but Ant Design remains the primary component system. This avoids replacing the frontend foundation and keeps the project consistent with the original template.

### No `.env` Cleanup

The repository includes environment values in the template. In a production project this should be replaced with `.env.example` and local secrets, but in this assessment the provided values make the project immediately runnable for reviewers.

### Static Demo Seed Data

Seeded transactions are static and intentionally simple. Their purpose is to make the dashboard useful immediately after setup, not to simulate a production data generation process.

---

## Known Follow-ups

Given the assessment timeframe, the following improvements were intentionally left out or deferred:

### Backend

- Introduce TypeScript or a shared contract strategy to make backend/frontend data boundaries safer.
- Return more detailed validation errors, especially for domain-level validation such as category/type compatibility.
- Add centralized mapping for Mongoose errors, so unexpected persistence validation issues can be translated into consistent API responses instead of falling back to generic server errors.
- Consider a service/domain validation layer if backend business rules grow beyond simple controller-level orchestration.
- Consider dedicated summary/reporting endpoints if transaction volume increases or if dashboard aggregations become more complex.

### Frontend Architecture

- Evolve the small data layer into a more complete API boundary with richer error normalization, clearer remote/domain mapping and reusable error handling.
- Consider TanStack Query or a similar server-state layer for caching, invalidation, retries and request lifecycle management.
- Add a more complete frontend error strategy, including runtime error boundaries, route-level fallbacks and user-facing global notifications.
- Reorganize frontend folders into clearer areas for API, hooks, contexts/providers, domain components and shared UI utilities.
- Introduce TypeScript on the frontend to make component props, API payloads and mapped domain models more explicit.

### UI / UX

- Improve mobile responsiveness and pixel-level polish, especially spacing, truncation and compact layouts.
- Add richer skeleton/loading states and more explicit empty/error states.
- Add the frontend edit flow for transactions.
- Improve accessibility and keyboard UX across custom dashboard interactions.

### Testing and Tooling

- Expand frontend tests around dashboard, wallet and form interactions.
- Add Storybook or another isolated component workflow if the domain component set grows.
- Keep broad test additions focused on meaningful user flows rather than coverage percentage alone.

---

## Documentation

Additional planning and architecture notes are available in:

- [Architecture Decisions](docs/ARCHITECTURE_DECISIONS.md)
- [Roadmap](docs/ROADMAP.md)
- [Backlog](docs/BACKLOG.md)

These documents were used to keep the work incremental and to document the reasoning behind the most important choices.
