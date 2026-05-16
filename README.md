# Bookstore

Aplicación web de gestión de librería con arquitectura frontend/backend separados en un monorepo.

## Estructura del proyecto

```
bookstore/
├── ror_bookstore/              # Backend - API REST (Rails 8)
│   ├── app/                    # Controllers, models, services
│   ├── config/                 # Configuración de Rails
│   ├── db/                     # Migraciones y seeds
│   ├── spec/                   # Tests (RSpec)
│   └── swagger/                # Documentación API (Rswag)
└── ror_bookstore_frontend/     # Frontend - SPA (React + Vite)
    ├── src/                    # Componentes, hooks, stores
    └── public/                 # Assets estáticos
```

## Stack tecnológico

### Backend
- **Rails 8.1** con PostgreSQL
- **Devise + JWT** para autenticación
- **Pundit** para autorización
- **Sidekiq + Redis** para jobs asíncronos
- **Solid Queue / Solid Cache / Solid Cable** para infraestructura Rails
- **Rswag** para documentación API (Swagger)
- **RSpec** para testing

### Frontend
- **React 19** con TypeScript
- **Vite** como bundler
- **Tailwind CSS 4** para estilos
- **React Query** para data fetching
- **Zustand** para state management
- **React Router** para routing
- **Lucide React** para iconos

## Requisitos

- Ruby 3.3.3 (ver `ror_bookstore/.ruby-version`)
- Node.js 20+
- PostgreSQL 14+
- Redis 7+

## Configuración inicial

### Backend

```bash
cd ror_bookstore

# Instalar dependencias
bundle install

# Configurar base de datos
cp config/database.yml.example config/database.yml  # si existe
bin/rails db:create db:migrate db:seed

# Generar master.key si no existe
bin/rails credentials:edit

# Iniciar servidor
bin/rails server
```

### Frontend

```bash
cd ror_bookstore_frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## Variables de entorno

### Backend (`ror_bookstore/.env`)

```
DATABASE_URL=postgresql://localhost/bookstore_development
REDIS_URL=redis://localhost:6379/0
RAILS_MASTER_KEY=<tu_clave_maestra>
```

### Frontend (`ror_bookstore_frontend/.env`)

```
VITE_API_URL=http://localhost:3000
```

## Comandos útiles

### Backend

```bash
# Ejecutar tests
cd ror_bookstore && bundle exec rspec

# Linting
bundle exec rubocop

# Generar documentación Swagger
bin/rails rswag:specs:swaggerize

# Consola Rails
bin/rails console
```

### Frontend

```bash
# Build para producción
npm run build

# Linting
npm run lint

# Preview del build
npm run preview
```

## Deploy

El proyecto está configurado para deploy en plataformas como Railway o Render usando la estructura de monorepo:

- **Backend**: Root directory `ror_bookstore/`
- **Frontend**: Root directory `ror_bookstore_frontend/`, output `dist/`

## Licencia

MIT
