# AGENTS.md - Contexto del proyecto

Este es un monorepo con dos aplicaciones separadas en la misma rama para permitir commits atómicos de features completos.

## Estructura

```
bookstore/
├── ror_bookstore/              # Backend API (Rails 8.1)
└── ror_bookstore_frontend/     # Frontend SPA (React 19 + TypeScript + Vite)
```

## Backend (ror_bookstore/)

### Stack
- Rails 8.1, Ruby 3.3.3
- PostgreSQL, Redis
- Devise + JWT (auth), Pundit (authz)
- Sidekiq (jobs), Solid Queue/Cache/Cable
- Rswag (Swagger docs), RSpec (tests)

### Comandos clave
```bash
cd ror_bookstore
bundle exec rspec           # Tests
bundle exec rubocop         # Linting
bin/rails server            # Dev server (puerto 3000)
bin/rails console           # Rails console
bin/rails db:migrate        # Migraciones
bin/rails credentials:edit  # Credenciales encriptadas
```

### Estructura importante
- `app/controllers/api/v1/` - Endpoints de la API
- `app/controllers/api/v1/admin/` - Endpoints de administración
- `app/models/` - Modelos (Author, Book, Genre, Publisher, User, JwtDenylist)
- `app/policies/` - Policies de Pundit
- `config/routes.rb` - Rutas de la API
- `spec/` - Tests RSpec
- `swagger/` - Documentación Swagger generada

## Frontend (ror_bookstore_frontend/)

### Stack
- React 19, TypeScript, Vite
- Tailwind CSS 4, Lucide React (iconos)
- React Query (data fetching), Zustand (state)
- React Router (routing), PWA plugin

### Comandos clave
```bash
cd ror_bookstore_frontend
npm run dev                 # Dev server (puerto 5173)
npm run build               # Build producción
npm run lint                # ESLint
npm run preview             # Preview del build
```

### Estructura importante
- `src/` - Código fuente
- `src/components/` - Componentes React
- `src/hooks/` - Custom hooks
- `src/stores/` - Stores de Zustand
- `src/services/` - Llamadas a la API
- `src/types/` - Tipos TypeScript

## Convenciones de commits

Usar **Conventional Commits** con emojis descriptivos:

| Tipo | Emoji | Formato | Ejemplo |
|------|-------|---------|---------|
| `feat` | ✨ | `feat(scope): descripción` | `✨ feat(auth): add JWT token refresh` |
| `fix` | 🐛 | `fix(scope): descripción` | `🐛 fix(books): fix pagination offset` |
| `docs` | 📝 | `docs: descripción` | `📝 docs: update setup instructions` |
| `style` | 💄 | `style(scope): descripción` | `💄 style: format code with prettier` |
| `refactor` | ♻️ | `refactor(scope): descripción` | `♻️ refactor(auth): simplify token validation` |
| `perf` | ⚡ | `perf(scope): descripción` | `⚡ perf(books): add database index` |
| `test` | 🧪 | `test(scope): descripción` | `🧪 test(auth): add login spec tests` |
| `chore` | 🔧 | `chore: descripción` | `🔧 chore: update dependencies` |
| `ci` | 🚀 | `ci: descripción` | `🚀 ci: add GitHub Actions workflow` |
| `security` | 🔒 | `security(scope): descripción` | `🔒 security: remove master.key from git` |

- **Commits atómicos**: Un solo commit por feature que afecte front y back
- **Scope**: usar `backend`, `frontend`, o el nombre del módulo afectado

## Convenciones de código

- **API**: RESTful con versionado `/api/v1/`
- **Auth**: JWT tokens vía headers
- **Tests**: RSpec para backend, aún por definir en frontend

## Variables de entorno

### Backend
- `RAILS_MASTER_KEY` - Clave para credentials.yml.enc
- `DATABASE_URL` - Conexión PostgreSQL
- `REDIS_URL` - Conexión Redis

### Frontend
- `VITE_API_URL` - URL del backend API

## Notas de seguridad

- `config/master.key` NUNCA debe commitearse
- Los archivos `.env` están en .gitignore
- Las credenciales se manejan vía `rails credentials:edit`
