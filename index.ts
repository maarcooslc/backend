import express from "express";
import type { Express } from "express";
import swaggerUi from "swagger-ui-express";
import { env } from "./src/config/env";
import v1Router from "./src/v1/routes";
import { swaggerSpec } from "./src/v1/swagger";
import cors from "cors";

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", v1Router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec as swaggerUi.JsonObject));
app.get("/api-docs.json", (_request, response) => response.json(swaggerSpec));

app.listen(env.port, () => console.log(`Servidor en el puerto ${env.port}`));
