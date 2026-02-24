
---

# Jennah UI

## Overview

**Jennah UI** is a React-based cloud workload management dashboard for the Project Jennah distributed backend system.
It provides a user-friendly interface for submitting compute jobs, monitoring job execution status, and managing tenant workloads through a secure, authenticated web interface deployed on Google Cloud Run.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript (Vite) |
| API Transport | ConnectRPC (`@connectrpc/connect-web` v2) |
| Protobuf Codegen | Buf CLI + `@bufbuild/protobuf` v2 |
| Styling | Tailwind CSS v4 + shadcn/ui components |
| Icons | MUI Icons + Lucide React |
| Routing | React Router v7 |
| Containerization | Docker (multi-stage build) |
| Web Server | Nginx (SPA routing + API proxy) |
| Deployment | Google Cloud Run |
| Authentication | oauth2-proxy (GitHub OAuth) as a sidecar container |

---

## System Architecture

```
User Browser
    │
    ▼
oauth2-proxy :8080  (GitHub OAuth sidecar — validates session, forwards headers)
    │
    ▼
Nginx :3000  (serves SPA, proxies /api/* to Gateway)
    │
    ├── /* ──────────► React SPA (static files)
    │
    └── /api/* ──────► jennah-gateway (Cloud Run)
                           │
                           ▼
                       Worker Nodes → GCP Batch → Cloud Spanner
```

The Nginx configuration forwards `X-Forwarded-Email` and `X-Forwarded-User` headers from the proxy to the Gateway as `X-OAuth-Email` and `X-OAuth-UserId`.

---

## Features

- Job submission with GCP-compliant name validation
- Real-time job status dashboard (PENDING → SCHEDULED → RUNNING → COMPLETED/FAILED)
- Cancel and delete jobs
- View full job details (container image, machine type, env vars, created time)
- GCP Batch Console ID display (`job-name-xxxxxxxx` format)
- GitHub OAuth authentication with oauth2-proxy sidecar
- Tenant-scoped job listing (jobs filtered by authenticated tenant)
- Local development mode with mock auth bypass

---

## Project Structure

```
jennah-ui/
├── proto/
│   └── jennah.proto              # Source-of-truth protobuf definition
├── src/
│   ├── api/
│   │   ├── auth.ts               # OAuth2-proxy user info + DEV mock
│   │   ├── client.ts             # ConnectRPC client (with DEV auth interceptor)
│   │   ├── transport.ts          # ConnectRPC transport layer
│   │   └── hooks/
│   │       ├── useSubmitJob.ts
│   │       ├── useListJobs.ts
│   │       ├── useGetJob.ts
│   │       ├── useGetCurrentTenant.ts
│   │       ├── useCancelJob.ts
│   │       └── useDeleteJob.ts
│   ├── gen/proto/                # Auto-generated — do not edit by hand
│   │   ├── jennah_pb.ts          # Message types
│   │   └── jennah_connect.ts     # Service client
│   ├── components/               # Reusable UI components
│   ├── pages/                    # Route-level page components
│   ├── context/                  # AuthContext
│   └── App.tsx                   # Router + protected routes
├── buf.gen.yaml                  # Buf codegen configuration
├── vite.config.ts                # Vite + dev proxy config
├── nginx.conf                    # Nginx SPA + proxy config
├── Dockerfile                    # Multi-stage build
├── service.yaml                  # Cloud Run manifest template
└── service.resolved.yaml         # Resolved manifest (never commit)
```

---

## Development Setup

### Prerequisites

- Node.js 20+
- npm 10+
- [Buf CLI](https://buf.build/docs/installation) (for protobuf codegen)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create a `.env` file at the project root:

```env
# Dev mock auth — bypasses oauth2-proxy locally
VITE_DEV_EMAIL=you@example.com
VITE_DEV_USER_ID=dev-user-123

# API gateway (leave as /api — Vite proxy handles routing locally)
VITE_API_GATEWAY_URL=/api

# OAuth + deployment (required for service.yaml substitution only)
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
COOKIE_SECRET=...
REDIRECT_URL=https://YOUR_SERVICE_URL/oauth2/callback
```

> In `DEV` mode (`npm run dev`), the app automatically uses `VITE_DEV_EMAIL` and `VITE_DEV_USER_ID`
> instead of calling the oauth2-proxy `/oauth2/userinfo` endpoint.
> The Vite dev proxy forwards all `/api` requests to the live Gateway.

### 3. Regenerate protobuf clients (when proto changes)

```bash
npx buf generate
```

Generated files are written to `src/gen/proto/`. Never edit them manually.

### 4. Start the development server

## API Hooks

All API calls use ConnectRPC typed hooks located in `src/api/hooks/`.
The client injects `X-OAuth-Email`, `X-OAuth-UserId`, and `X-OAuth-Provider` headers automatically
in DEV mode via an interceptor in `src/api/client.ts`.

| Hook | RPC | Description |
|---|---|---|
| `useSubmitJob` | `SubmitJob` | Create and dispatch a new job |
| `useListJobs` | `ListJobs` | Fetch all jobs for the current tenant |
| `useGetJob` | `GetJob` | Fetch full details for a single job by ID |
| `useGetCurrentTenant` | `GetCurrentTenant` | Resolve calling tenant from auth headers |
| `useCancelJob` | `CancelJob` | Stop a running/pending job (data preserved) |
| `useDeleteJob` | `DeleteJob` | Remove a job from GCP Batch and the database |

### Job Name Constraints

Google Cloud Batch enforces strict naming rules. The job name input automatically:
- Converts to lowercase
- Replaces spaces with hyphens
- Strips all non-alphanumeric/hyphen characters
- Enforces a 54-character maximum (GCP limit is 63; Gateway appends `-xxxxxxxx`)

---

## Containerization

The app uses a **multi-stage Docker build**:

- **Stage 1** (`node:20-alpine`): Installs dependencies and compiles TypeScript → `dist/`
- **Stage 2** (`nginx:alpine`): Copies `dist/` into Nginx and applies `nginx.conf`

Nginx listens on `127.0.0.1:3000` and:
- Serves SPA assets with `try_files $uri /index.html` fallback
- Proxies `/api/*` to the Gateway with auth headers forwarded

Build the container:

```bash
docker build -t asia-docker.pkg.dev/labs-169405/asia.gcr.io/jennah-ui:vN .
```

Push to Artifact Registry:

```bash
docker push asia-docker.pkg.dev/labs-169405/asia.gcr.io/jennah-ui:vN
```

---

## Deployment to Cloud Run

### 1. Resolve the service manifest

```bash
set -a; source .env; set +a
envsubst < service.yaml > service.resolved.yaml
```

Or edit `service.resolved.yaml` directly to bump the image version tag.

### 2. Deploy

```bash
gcloud run services replace service.resolved.yaml --region asia-northeast1
```

### Deployed URLs

| Service | URL |
|---|---|
| Frontend | `https://jennah-ui-382915581671.asia-northeast1.run.app` |
| Gateway | `https://jennah-gateway-382915581671.asia-northeast1.run.app` |

---

## Authentication Flow

oauth2-proxy runs as a **sidecar container** alongside the UI:

```
Browser → oauth2-proxy :8080
              │ valid session?
              ├── No  → redirect to https://github.com/login/oauth/authorize
              └── Yes → forward request to localhost:3000 with headers:
                            X-Forwarded-Email: user@example.com
                            X-Forwarded-User:  github-user-id
```

Nginx passes these headers downstream to the Gateway as `X-OAuth-Email` / `X-OAuth-UserId`.
The Gateway resolves the calling tenant from those headers — no tenant ID is passed in request bodies.

**OAuth callback URL:**
```
https://jennah-ui-382915581671.asia-northeast1.run.app/oauth2/callback
```

**Routes that skip authentication:**
- `^/auth/`
- `^/oauth2/`
- `^/assets/`
- `GET ^/$`

---

## Security Notes

- HTTPS-only cookies enforced (`--cookie-secure=true`)
- CSRF protection enabled (`--cookie-csrf-per-request=true`)
- OAuth credentials and cookie secrets never stored in source code
- `service.resolved.yaml` is git-ignored
- Job names are sanitized client-side before submission to prevent GCP Batch name rejection

---

## Maintenance

| Task | Action |
|---|---|
| Deploy UI changes | Bump version tag in `service.resolved.yaml`, build + push image, run `gcloud run services replace` |
| Proto changes | Update `proto/jennah.proto`, run `npx buf generate`, update affected hooks/pages |
| Rotate OAuth secret | Update `.env`, re-resolve manifest, redeploy |
| View logs | Google Cloud Console → Cloud Run → `jennah-ui` → Logs |
| View jobs in GCP | GCP Console → Batch → Jobs → filter by `{job.name}-{jobId[:8]}` |

---
