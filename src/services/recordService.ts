import {
  getAllRecords as obtenerRecords,
  getWorkoutRecord as obtenerWorkoutRecord,
  createWorkoutRecord,
  deleteWorkoutRecord as eliminarWorkoutRecord,
  updateWorkoutRecord
} from "../database/mysql";
import type { WorkoutRecord } from "../types/workout";
import { v4 as uuid } from "uuid";
import { toHttpError } from "../utils/httpError";

export async function getAllRecords() {
  try {
    return await obtenerRecords();
  } catch (error) {
    throw toHttpError(error);
  }
}

export async function getWorkoutRecord(recordBuscado: string) {
  try {
    return await obtenerWorkoutRecord(recordBuscado);
  } catch (error) {
    throw toHttpError(error);
  }
}

export async function postWorkoutRecord(recordPost: WorkoutRecord) {
  try {
    const id: string = uuid();
    const workout: string = uuid();
    const record: string = uuid();
    const memberId: string = uuid();
    const member: string = uuid();
    recordPost.id = id;
    recordPost.workout = workout;
    recordPost.record = record;
    recordPost.memberId = memberId;
    recordPost.member = member;
    return await createWorkoutRecord(recordPost);
  } catch (error) {
    throw toHttpError(error);
  }
}

export async function patchWorkoutRecord(recordPatch: WorkoutRecord) {
  try {
    const recordAnt = await getWorkoutRecord(recordPatch.id);
    if (recordAnt == null) return false;

    const recordActualizado: WorkoutRecord = {
      id: recordAnt.id,
      workout: recordPatch.workout ?? recordAnt.workout,
      record: recordPatch.record ?? recordAnt.record,
      memberId: recordPatch.memberId ?? recordAnt.memberId,
      member: recordPatch.member ?? recordAnt.member
    };

    return await updateWorkoutRecord(recordActualizado);
  } catch (error) {
    throw toHttpError(error);
  }
}

export async function deleteWorkoutRecord(id: string) {
  try {
    return await eliminarWorkoutRecord(id);
  } catch (error) {
    throw toHttpError(error);
  }
}
