import {
  getAllWorkouts as obtenerWorkouts,
  getWorkout as obtenerWorkout,
  createWorkout,
  deleteWorkout as eliminarWorkout,
  updateWorkout
} from "../database/mysql";
import type { Workout } from "../types/workout";
import { v4 as uuid } from "uuid";
import { toHttpError } from "../utils/httpError";

export async function getAllWorkouts() {
  try {
    return await obtenerWorkouts();
  } catch (error) {
    throw toHttpError(error);
  }
}

export async function getWorkout(id: string) {
  try {
    return await obtenerWorkout(id);
  } catch (error) {
    throw toHttpError(error);
  }
}

export async function postWorkout(workout: Workout) {
  try {
    const id: string = uuid();
    const fechaCreacion = Date.now();
    const fechaActualizacion = Date.now();
    workout.id = id;
    workout.createdAt = fechaCreacion.toString();
    workout.updatedAt = fechaActualizacion.toString();
    return await createWorkout(workout);
  } catch (error) {
    throw toHttpError(error);
  }
}

export async function patchWorkout(workout: Workout) {
  try {
    const workoutAnt = await getWorkout(workout.id);
    if (workoutAnt == null) return false;

    const workoutActualizado: Workout = {
      id: workoutAnt.id,
      name: workout.name ?? workoutAnt.name,
      mode: workout.mode ?? workoutAnt.mode,
      equipment: workout.equipment ?? workoutAnt.equipment,
      exercises: workout.exercises ?? workoutAnt.exercises,
      createdAt: workoutAnt.createdAt,
      updatedAt: Date.now().toString(),
      trainerTips: workout.trainerTips ?? workoutAnt.trainerTips
    };

    return await updateWorkout(workoutActualizado);
  } catch (error) {
    throw toHttpError(error);
  }
}

export async function deleteWorkout(id: string) {
  try {
    return await eliminarWorkout(id);
  } catch (error) {
    throw toHttpError(error);
  }
}
