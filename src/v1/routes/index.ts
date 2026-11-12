import { Router } from "express";
import { getApi } from "../../controller/controller";
import workoutRouter from "./workout.routes";
import recordRouter from "./record.routes";
import apicache from "apicache";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     ApiKeyQuery:
 *       type: apiKey
 *       in: query
 *       name: apiKey
 *       description: API key obtenida con GET /api/v1/apiKey/.
 *   schemas:
 *     Workout:
 *       type: object
 *       properties:
 *         id: { type: string, format: uuid }
 *         name: { type: string }
 *         mode: { type: string }
 *         equipment: { type: array, items: { type: string } }
 *         exercises: { type: array, items: { type: string } }
 *         createdAt: { type: string }
 *         updatedAt: { type: string }
 *         trainerTips: { type: array, items: { type: string } }
 *       required: [id, name, mode, equipment, exercises, createdAt, updatedAt, trainerTips]
 *     WorkoutInput:
 *       type: object
 *       properties:
 *         name: { type: string, example: Fran }
 *         mode: { type: string, example: For Time }
 *         equipment: { type: array, items: { type: string }, example: [barbell, pull-up bar] }
 *         exercises: { type: array, items: { type: string }, example: [21 thrusters, 21 pull-ups] }
 *         trainerTips: { type: array, items: { type: string } }
 *       required: [name, mode, equipment, exercises, trainerTips]
 *     WorkoutPatch:
 *       type: object
 *       properties:
 *         name: { type: string }
 *         mode: { type: string }
 *         equipment: { type: array, items: { type: string } }
 *         exercises: { type: array, items: { type: string } }
 *         updatedAt: { type: string }
 *         trainerTips: { type: array, items: { type: string } }
 *       minProperties: 1
 *     WorkoutRecord:
 *       type: object
 *       properties:
 *         id: { type: string, format: uuid }
 *         workout: { type: string }
 *         record: { type: string }
 *         memberId: { type: string }
 *         member: { type: string }
 *       required: [id, workout, record]
 *     RecordInput:
 *       type: object
 *       description: El servicio reemplaza estos valores por identificadores generados.
 *       properties:
 *         id: { type: string }
 *         workout: { type: string }
 *         record: { type: string }
 *         memberId: { type: string }
 *         member: { type: string }
 *     RecordPatch:
 *       type: object
 *       properties:
 *         workout: { type: string }
 *         record: { type: string }
 *         memberId: { type: string }
 *         member: { type: string }
 *       minProperties: 1
 *     ResourceResponse:
 *       type: object
 *       properties:
 *         status: { oneOf: [{ type: string }, { type: integer }] }
 *         data:
 *           oneOf:
 *             - $ref: '#/components/schemas/Workout'
 *             - $ref: '#/components/schemas/WorkoutRecord'
 *             - type: boolean
 *             - type: 'null'
 *     WorkoutListResponse:
 *       type: object
 *       properties:
 *         status: { type: string, example: ok }
 *         data: { type: array, items: { $ref: '#/components/schemas/Workout' } }
 *     RecordListResponse:
 *       type: object
 *       properties:
 *         status: { type: string, example: ok }
 *         data: { type: array, items: { $ref: '#/components/schemas/WorkoutRecord' } }
 *     BooleanResponse:
 *       type: object
 *       properties:
 *         status: { type: integer, example: 200 }
 *         data: { type: boolean }
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status: { type: string, example: fail }
 *         data: { type: string, example: Bad request }
 *     UnauthorizedResponse:
 *       type: object
 *       properties:
 *         Autorizado: { type: string, example: 'No autorizado, se necesita Api Key' }
 *         ConsultarURL: { type: string, example: 'http://localhost:3002/api/v1/apiKey/' }
 */

const router: Router = Router();
const cache = apicache.middleware;

router.use("/workouts", workoutRouter);
router.use("/records", recordRouter);
router.get("/apiKey/", cache("1 minutes"), getApi);

/**
 * @swagger
 * /apiKey/:
 *   get:
 *     tags: [Acceso]
 *     summary: Consultar API key
 *     description: Devuelve la clave que se utiliza en las operaciones protegidas.
 *     operationId: getApi
 *     responses:
 *       '200':
 *         description: API key disponible.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ApiKey: { type: string, example: marcos1234 }
 *               required: [ApiKey]
 */

export default router;
