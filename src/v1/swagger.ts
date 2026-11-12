import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.1.0",
    info: {
      title: "API REST Gym",
      version: "1.0.0",
      description: "Documentación de la API REST Gym generada desde los comentarios @swagger de las rutas.",
    },
    servers: [
      { url: "http://localhost:3002/api/v1", description: "Servidor local (puerto predeterminado)" },
      { url: "/api/v1", description: "Servidor actual" },
    ],
    tags: [
      { name: "Entrenamientos", description: "Gestión de entrenamientos." },
      { name: "Récords", description: "Gestión de récords de entrenamiento." },
      { name: "Acceso", description: "Obtención de la API key." },
    ],
  },
  apis: ["./src/v1/routes/*.ts"],
});
