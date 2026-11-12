import { Router } from "express";
import apicache from "apicache";
import { getAllWorkouts, getWorkouts, postWorkout, patchWorkout, deleteWorkout } from "../../controller/controller";

const router: Router = Router();
const cache = apicache.middleware;

/**
 * @swagger
 * /workouts:
 *   get:
 *     tags: [Entrenamientos]
 *     summary: Listar entrenamientos
 *     description: Requiere la API key. Permite filtrar los resultados.
 *     operationId: getAllWorkouts
 *     security:
 *       - ApiKeyQuery: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema: { type: string }
 *         description: Filtra por coincidencia en el nombre.
 *       - in: query
 *         name: mode
 *         schema: { type: string }
 *         description: Filtra por modalidad.
 *       - in: query
 *         name: equipment
 *         schema: { type: string }
 *         description: Filtra por equipamiento.
 *       - in: query
 *         name: updatedAt
 *         schema: { type: string }
 *         description: Filtra por fecha exacta de actualización.
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 0 }
 *         description: Número máximo de resultados.
 *     responses:
 *       '200':
 *         description: Entrenamientos encontrados.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/WorkoutListResponse' }
 *       '401':
 *         description: API key ausente o no válida.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/UnauthorizedResponse' }
 *   post:
 *     tags: [Entrenamientos]
 *     summary: Crear entrenamiento
 *     description: El servidor genera id, createdAt y updatedAt.
 *     operationId: postWorkout
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/WorkoutInput' }
 *     responses:
 *       '201':
 *         description: Entrenamiento creado.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ResourceResponse' }
 *       '400':
 *         description: Faltan campos obligatorios.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 */
router.get("/", cache("1 minutes"), getAllWorkouts);
router.get("/:id", getWorkouts);
router.post("/", postWorkout);
router.patch("/:id", patchWorkout);
router.delete("/:id", deleteWorkout);

/**
 * @swagger
 * /workouts/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema: { type: string, format: uuid }
 *       description: Identificador del entrenamiento.
 *   get:
 *     tags: [Entrenamientos]
 *     summary: Obtener entrenamiento
 *     operationId: getWorkout
 *     security:
 *       - ApiKeyQuery: []
 *     responses:
 *       '200':
 *         description: Entrenamiento encontrado o null si no existe.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ResourceResponse' }
 *       '401':
 *         description: API key ausente o no válida.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/UnauthorizedResponse' }
 *   patch:
 *     tags: [Entrenamientos]
 *     summary: Actualizar parcialmente un entrenamiento
 *     description: No permite enviar id ni createdAt. Conserva los campos omitidos y actualiza updatedAt.
 *     operationId: patchWorkout
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/WorkoutPatch' }
 *     responses:
 *       '201':
 *         description: Actualización procesada; data es false si no existe el entrenamiento.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ResourceResponse' }
 *       '400': { description: Solicitud no válida. }
 *       '500': { description: Error interno al guardar el entrenamiento. }
 *   delete:
 *     tags: [Entrenamientos]
 *     summary: Eliminar entrenamiento
 *     operationId: deleteWorkout
 *     responses:
 *       '200':
 *         description: Resultado de la eliminación.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/BooleanResponse' }
 */

export default router;
