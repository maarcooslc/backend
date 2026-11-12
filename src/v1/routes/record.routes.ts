import { Router } from "express";
import apicache from "apicache";
import { getAllRecords, getWorkoutRecord, patchWorkoutRecord, deleteWorkoutRecord } from "../../controller/controller";
import { postWorkoutRecord } from "../../services/recordService";

const router: Router = Router();
const cache = apicache.middleware;

/**
 * @swagger
 * /records:
 *   get:
 *     tags: [Récords]
 *     summary: Listar récords
 *     description: Requiere la API key. Puede filtrar por el texto del récord.
 *     operationId: getAllRecords
 *     security:
 *       - ApiKeyQuery: []
 *     parameters:
 *       - in: query
 *         name: record
 *         schema: { type: string }
 *         description: Filtra por coincidencia en el texto del récord.
 *     responses:
 *       '200':
 *         description: Récords encontrados.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/RecordListResponse' }
 *       '401':
 *         description: API key ausente o no válida.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/UnauthorizedResponse' }
 *   post:
 *     tags: [Récords]
 *     summary: Crear récord
 *     description: El servicio genera nuevos valores para id, workout, record, memberId y member.
 *     operationId: postWorkoutRecord
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/RecordInput' }
 *     responses:
 *       '201':
 *         description: Récord creado.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ResourceResponse' }
 */
router.get("/", cache("1 minutes"), getAllRecords);
router.get("/:id", getWorkoutRecord);
router.post("/", postWorkoutRecord);
router.patch("/:id", patchWorkoutRecord);
router.delete("/:id", deleteWorkoutRecord);

/**
 * @swagger
 * /records/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema: { type: string, format: uuid }
 *       description: Identificador del récord.
 *   get:
 *     tags: [Récords]
 *     summary: Obtener récord
 *     operationId: getWorkoutRecord
 *     security:
 *       - ApiKeyQuery: []
 *     responses:
 *       '200':
 *         description: Récord encontrado o null si no existe.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ResourceResponse' }
 *       '401':
 *         description: API key ausente o no válida.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/UnauthorizedResponse' }
 *   patch:
 *     tags: [Récords]
 *     summary: Actualizar parcialmente un récord
 *     description: No permite enviar id. Conserva los campos omitidos.
 *     operationId: patchWorkoutRecord
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/RecordPatch' }
 *     responses:
 *       '201':
 *         description: Actualización procesada; data es false si no existe el récord.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ResourceResponse' }
 *       '400': { description: Solicitud no válida. }
 *       '500': { description: Error interno al guardar el récord. }
 *   delete:
 *     tags: [Récords]
 *     summary: Eliminar récord
 *     operationId: deleteWorkoutRecord
 *     responses:
 *       '200':
 *         description: Resultado de la eliminación.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/BooleanResponse' }
 */

export default router;
