import { loadDB,saveToDatabase,createWorkout,deleteWorkout as eliminarWorkout, updateWorkout } from "../database/ficheros";
import { Filtros, Workout } from "../types/workout";
import {v4 as uuid} from "uuid";
import { toHttpError } from "../utils/httpError";

export function getAllWorkouts(){
try {
        return loadDB().workouts;
    } catch (error) {
        throw toHttpError(error);
    }}
    
export function getWorkout(id:string){
    try{
    return loadDB().workouts.find((workout) => workout.id == id) ?? null;
    }catch(error){
        throw toHttpError(error);
    }
}

export function postWorkout(workout:Workout){
    try{
    const id:string = uuid();
    const fechaCreacion = Date.now();
    const fechaActualizacion = Date.now();
    workout.id = id;
    workout.createdAt = fechaCreacion.toString();
    workout.updatedAt = fechaActualizacion.toString();
    return createWorkout(workout);
    }catch(error){
        throw toHttpError(error);
    }
}
export function patchWorkout(workout:Workout){
    try{
        const workoutAnt = getWorkout(workout.id);
        if (workoutAnt == null) return false;

        const workoutActualizado:Workout = {
            id: workoutAnt.id,
            name: workout.name ?? workoutAnt.name,
            mode: workout.mode ?? workoutAnt.mode,
            equipment: workout.equipment ?? workoutAnt.equipment,
            exercises: workout.exercises ?? workoutAnt.exercises,
            createdAt: workoutAnt.createdAt,
            updatedAt: Date.now().toString(),
            trainerTips: workout.trainerTips ?? workoutAnt.trainerTips
        };

        return updateWorkout(workoutActualizado);
    } catch(error){
        throw toHttpError(error);
    }
}


export function deleteWorkout(id:string){
    try{
    return eliminarWorkout(id);
    }catch(error){
        throw toHttpError(error);
    }
}
