# Event Photo Platform — Teaching Capstone

A learning repository for evolving a multi-tenant photo platform for professional event photographers.

## Product concept

Each photographer manages their own photo collections and may publish selected images in a public showcase. Clients can access only the collections explicitly shared with them, and a client may work with more than one photographer. The platform may offer AI editing tools: professional tools for photographers and simpler tools for clients, with each photographer controlling which client tools are available. Clients can select photographs for albums and print products.

## What it models
- Photographers (tenants)
- Events and galleries
- Client-facing gallery views
- Photographer-configured service options
- Client photo selections for editing / albums / printing / special printing

## Repository status

This is a **requirements-and-design with starter code scaffold**, not a working application. 

## Working documents
- `SD_docs/product-brief.md` — product context and boundaries
- `SD_docs/decision-log.md` — assumptions, decisions and unresolved questions

## Stack
- Node.js + TypeScript
- Express HTTP API
- Vitest + Supertest for tests
- In-memory repository for the first lessons (no database setup required)

## Run
Requires Node.js 20+.

```bash
npm install
npm run dev
```

In another terminal:
```bash
curl http://localhost:3000/health
curl -H "x-photographer-id: studio-amber" http://localhost:3000/api/events
curl -H "x-photographer-id: studio-amber" http://localhost:3000/api/events/event-100/gallery
curl -X POST http://localhost:3000/api/events/event-100/selections \
  -H "content-type: application/json" \
  -H "x-client-id: client-100" \
  -d '{"photoIds":["photo-1"],"requestedServices":["retouching","print-10x15"]}'
```

## Important limitations (intentional)
1. `x-photographer-id` and `x-client-id` are demo identity headers, **not authentication**.
2. The in-memory store resets when the server restarts.
3. Validation is intentionally incomplete.
4. Selection requests currently accept service names without checking whether the event's photographer enabled them. This is a useful issue for a requirements/review/security lesson.
5. Tenant filtering is shown in event lookup, but students should test every endpoint for cross-tenant access.
6. There is no real photo binary storage, payment flow, editing pipeline, or print-lab integration.

Do not deploy this scaffold with real client data.


