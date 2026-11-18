# Backend Workouts - API REST Gym

API REST desarrollada con Node.js, Express y TypeScript para la gestión de entrenamientos (`workouts`) y récords (`records`) de CrossFit, con persistencia en MySQL y documentación interactiva con Swagger.

- Repositorio: `https://github.com/maarcooslc/backend`
- Despliegue en Render: `https://backend-entrenamientos.onrender.com`
- Documentación Swagger: `https://backend-entrenamientos.onrender.com/api-docs`

## Tecnologías

- Node.js + TypeScript (`tsx`)
- Express 5
- MySQL (`mysql2`)
- Swagger (`swagger-jsdoc` + `swagger-ui-express`)
- `apicache`, `cors`, `uuid`

## Estructura del proyecto

```text
ApiRestGym/
├── data/
│   ├── db.json
│   └── db.sql
├── src/
│   ├── config/
│   │   ├── .env
│   │   └── env.ts
│   ├── controller/
│   │   └── controller.ts
│   ├── database/
│   │   ├── ficheros.ts
│   │   └── mysql.ts
│   ├── services/
│   │   ├── recordService.ts
│   │   └── workoutService.ts
│   ├── types/
│   │   └── workout.ts
│   ├── utils/
│   │   └── httpError.ts
│   └── v1/
│       ├── routes/
│       │   ├── index.ts
│       │   ├── record.routes.ts
│       │   └── workout.routes.ts
│       └── swagger.ts
├── index.ts
├── package.json
└── package-lock.json
```

## Instalación y configuración en local

1. Instalar las dependencias:

```bash
npm install
```

2. Importar la base de datos MySQL usando el script `data/db.sql` (crea la base de datos `apirestgym` y las tablas `workouts`, `members` y `records` con los datos iniciales):

```bash
mysql -u root < data/db.sql
```

3. Configurar las variables de entorno en `src/config/.env` (o en el entorno del sistema / Render):

```env
PORT=3024
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=apirestgym
```

Si no se definen, `src/config/env.ts` usa por defecto el puerto `3002`, host `localhost`, puerto MySQL `3306`, usuario `root`, contraseña vacía y base de datos `apirestgym`.

4. Arrancar el servidor:

```bash
# Desarrollo (con recarga automática)
npm run dev

# Producción
npm start
```

En local, la API queda disponible en `http://localhost:3002/api/v1` y Swagger en `http://localhost:3002/api-docs`.

## Despliegue en Render

- Build Command: `npm install`
- Start Command: `npm start`
- Variables de entorno necesarias si se conecta a un MySQL remoto: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.

## Autenticación con API Key

Los endpoints `GET` de entrenamientos y récords requieren el parámetro de consulta `apiKey=marcos1234`.

Se puede consultar en:

```http
GET /api/v1/apiKey/
```

## Endpoints

Base URL local: `http://localhost:3002/api/v1`  
Base URL Render: `https://backend-entrenamientos.onrender.com/api/v1`

### Acceso y documentación

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `GET` | `/api/v1/apiKey/` | Devuelve la API key (`marcos1234`) |
| `GET` | `/api-docs` | Interfaz Swagger UI |
| `GET` | `/api-docs.json` | Especificación OpenAPI en JSON |

### Entrenamientos (`/api/v1/workouts`)

| Método | Ruta | Query params | Descripción |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/workouts` | `apiKey` (obligatorio), `name`, `mode`, `equipment`, `updatedAt`, `limit` | Lista entrenamientos con filtros opcionales |
| `GET` | `/api/v1/workouts/:id` | `apiKey` (obligatorio) | Obtiene un entrenamiento por su `id` |
| `POST` | `/api/v1/workouts` | - | Crea un entrenamiento nuevo |
| `PATCH` | `/api/v1/workouts/:id` | - | Actualiza parcialmente un entrenamiento |
| `DELETE` | `/api/v1/workouts/:id` | - | Elimina un entrenamiento por su `id` |

### Récords (`/api/v1/records`)

| Método | Ruta | Query params | Descripción |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/records` | `apiKey` (obligatorio), `record` | Lista récords con filtro opcional |
| `GET` | `/api/v1/records/:id` | `apiKey` (obligatorio) | Obtiene un récord por su `id` |
| `POST` | `/api/v1/records` | - | Crea un récord nuevo |
| `PATCH` | `/api/v1/records/:id` | - | Actualiza parcialmente un récord |
| `DELETE` | `/api/v1/records/:id` | - | Elimina un récord por su `id` |

## Ejemplos de uso en Postman

### `GET` Listar entrenamientos filtrados

```http
GET https://backend-entrenamientos.onrender.com/api/v1/workouts?apiKey=marcos1234&mode=For Time&limit=5
```

### `POST /api/v1/workouts`

Body (`raw` -> `JSON`):

```json
{
  "name": "Entrenamiento Marcos",
  "mode": "For Time",
  "equipment": [
    "barbell",
    "pull-up bar"
  ],
  "exercises": [
    "20 pull-ups",
    "30 push-ups",
    "40 squats"
  ],
  "trainerTips": [
    "Mantener buen ritmo",
    "No arquear la espalda"
  ]
}
```

### `PATCH /api/v1/workouts/:id`

No incluir `id` ni `createdAt` en el cuerpo de la petición:

```json
{
  "mode": "AMRAP 20",
  "trainerTips": [
    "Mantener un ritmo constante"
  ]
}
```

### `POST /api/v1/records`

Body (`raw` -> `JSON`):

```json
{
  "id": "1",
  "workout": "7f8a12b4-5c91-492e-9821-3a4b9101c121",
  "record": "120 reps",
  "memberId": "12a410bc-849f-4e7e-bfc8-4ef283ee4b19",
  "member": "/members/12a410bc-849f-4e7e-bfc8-4ef283ee4b19"
}
```

### `PATCH /api/v1/records/:id`

No incluir `id` en el cuerpo de la petición:

```json
{
  "record": "145 reps"
}
```
