# TaskFlow

TaskFlow es una aplicación full-stack para gestión de tareas personales.

## 1) Estructura de carpetas

```bash
taskflow/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   └── taskController.js
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   └── taskModel.js
│   │   ├── routes/
│   │   │   └── taskRoutes.js
│   │   └── utils/
│   │       └── validators.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   ├── TaskFilters.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskList.jsx
│   │   ├── context/
│   │   │   └── TaskContext.jsx
│   │   ├── services/
│   │   │   └── taskService.js
│   │   └── styles/
│   │       └── global.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── db/
│   └── init.sql
└── README.md
```

## 2) Backend (Node + Express + PostgreSQL)

### API REST (CRUD)

Base URL: `http://localhost:4000/api/tasks`

- `GET /` → listar tareas (filtros opcionales: `status`, `sortBy`, `order`)
- `POST /` → crear tarea
- `PUT /:id` → editar tarea
- `PATCH /:id/toggle` → marcar/desmarcar completada
- `DELETE /:id` → eliminar tarea

### Validaciones incluidas

- Título obligatorio con mínimo 3 caracteres.
- Prioridad válida: `low`, `medium`, `high`.
- Fecha límite con formato válido.
- Campo `completed` booleano en updates.

### Manejo de errores

- Respuestas 400 para payload inválido.
- Respuestas 404 para recursos no encontrados.
- Middleware global para errores no controlados.

## 3) Frontend (React + Vite)

### Funcionalidades

- Crear tarea (título, descripción, fecha límite, prioridad).
- Editar tarea.
- Eliminar tarea.
- Marcar como completada/reabrir.
- Filtrar por estado: todas, pendientes, completadas.
- Ordenar por fecha límite, prioridad o fecha de creación.

### Decisiones técnicas

- Hooks (`useState`, `useEffect`, `useMemo`).
- Estado global con Context API (`TaskContext`).
- Cliente API en `services/taskService.js`.
- Estilos con CSS simple sin librerías externas.

## 4) Script SQL para crear base de datos

Ejecuta el archivo `db/init.sql` en PostgreSQL. Crea base `taskflow`, tabla `tasks` e índices.

## 5) Instrucciones paso a paso para ejecutar en local

### Requisitos previos

- Node.js 18+
- PostgreSQL 14+

### Paso 1: crear base de datos

```bash
psql -U postgres -f db/init.sql
```

### Paso 2: configurar backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

> Verifica que `DATABASE_URL` en `.env` apunte a tu instancia local.

### Paso 3: configurar frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

### Paso 4: abrir la aplicación

- Frontend: `http://localhost:5173`
- Backend healthcheck: `http://localhost:4000/health`

---

## Ejemplos de payload

### Crear tarea

```json
{
  "title": "Preparar demo",
  "description": "Revisar diapositivas y entorno",
  "dueDate": "2026-12-01",
  "priority": "high"
}
```

### Editar tarea

```json
{
  "title": "Preparar demo final",
  "priority": "medium",
  "completed": false
}
```
