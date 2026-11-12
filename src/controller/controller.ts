import type{Request,Response} from "express";
import * as workoutService from "../services/workoutService.ts";
import * as recordService from "../services/recordService.ts";
import type { Filtros, Workout, WorkoutRecord } from "../types/workout.ts";


export function getAllWorkouts(request:Request,response:Response){
    const {mode} = request.query;
    const {equipment} = request.query;
    const {name} = request.query;
    const {updatedAt } = request.query;
    const {limit } = request.query;
    const {apiKey} = request.query;
    let workouts:Workout[] = workoutService.getAllWorkouts();
    let filtros:Filtros = {mode, equipment, name, updatedAt, limit, apiKey} as Filtros;
    if (filtros.apiKey != 'marcos1234') {
        response.status(401).send({
            Autorizado: 'No autorizado, se necesita Api Key',
            ConsultarURL: 'http://localhost:3002/api/v1/apiKey/'
        });
        return;
    }
    if (filtros.name != undefined) workouts = workouts.filter((workout) => workout.name.includes(filtros.name));
    if (filtros.mode != undefined) workouts = workouts.filter((workout) => workout.mode.toLowerCase() == filtros.mode.toLowerCase());
    if (filtros.equipment != undefined && filtros.equipment.length > 0) workouts =  workouts.filter((workout) => workout.equipment.some((equipment) => equipment == filtros.equipment));
    if (filtros.equipment != undefined && filtros.equipment.length > 0) workouts =  workouts.filter((workout) => workout.equipment.some((equipment) => equipment == filtros.equipment));
    if (filtros.limit != undefined) workouts = workouts.slice(0, Number(filtros.limit));
    if (filtros.updatedAt != undefined) workouts = workouts.filter((workout) => workout.updatedAt == updatedAt);    
    response.send({
    status: 'ok',
    data: workouts
    });
}

export function getWorkouts(request:Request,response:Response){
    const {apiKey} = request.query;
    let filtros:Filtros = {apiKey} as Filtros;
    if (filtros.apiKey != 'marcos1234') {
        response.status(401).send({
            Autorizado: 'No autorizado, se necesita Api Key',
            ConsultarURL: 'http://localhost:3002/api/v1/apiKey/'
        });
        return;
    }
    const id = request.params.id;
    if (id == undefined){
        response.status(400).send({
            status: 'fail',
            data: 'Bad request'
        });
    }else {
        response.send({
            status:200,
            data: workoutService.getWorkout(id.toString())
        });
    }
    
}

export function postWorkout(request:Request,response:Response){
    const body:Workout = request.body ?? {};
    if (body.name == null || body.exercises == null ||  body.equipment == null || body.mode == null || body.trainerTips == null) {
        response.status(400).send({
            status: 'fail',
            data: 'Bad request'
        });
    } else {
    response.status(201).send({
        status: 'ok',
        data: workoutService.postWorkout(body)
    });
}
}

export function patchWorkout(request:Request,response:Response){
    const id = request.params.id;
    if (id == undefined){
        response.status(400).send({
            status: 'fail',
            data: 'Bad request'
        });
    } else{
        const body:Workout = request.body ?? {};
        if (body.id != null || body.createdAt != null){
            response.status(400).send({
            status: 'fail',
            data: 'Bad request'
            });
        } else {
            body.id = id.toString();
            response.status(201).send({
                status: 'ok',
                data: workoutService.patchWorkout(body)
            });
        }
    }
}
export function deleteWorkout(request:Request,response:Response){
    const id = request.params.id;
    if (id == undefined){
        response.status(400).send({
            status: 'fail',
            data: 'Bad request'
        });
    } else{
        response.send({
            status:200,
            data: workoutService.deleteWorkout(id.toString())
        });
    }
}

export function getAllRecords(request:Request,response:Response){
    const {record} = request.query;
    const {apiKey} = request.query;
    let records:WorkoutRecord[] = recordService.getAllRecords();
    let filtros:Filtros = {record, apiKey} as Filtros;
    if (filtros.apiKey != 'marcos1234') {
        response.status(401).send({
            Autorizado: 'No autorizado, se necesita Api Key',
            ConsultarURL: 'http://localhost:3002/api/v1/apiKey/'
        });
        return;
    }
    if (filtros.record != undefined) records = records.filter((record) => record.record.includes(filtros.record));
    response.send({
    status: 'ok',
    data: records
    });
}

export function getWorkoutRecord(request:Request,response:Response){
    const {apiKey} = request.query;
    let filtros:Filtros = {apiKey} as Filtros;
    if (filtros.apiKey != 'marcos1234') {
        response.status(401).send({
            Autorizado: 'No autorizado, se necesita Api Key',
            ConsultarURL: 'http://localhost:3002/api/v1/apiKey/'
        });
        return;
    }
    const id = request.params.id;
    if (id == undefined){
        response.status(400).send({
            status: 'fail',
            data: 'Bad request'
        });
    }else {
        response.send({
            status:200,
            data: recordService.getWorkoutRecord(id.toString())
        });
    }
    
}

export function postWorkoutRecord(request:Request,response:Response){
    const body:WorkoutRecord = request.body ?? {};
    if (body.id == null || body.workout == null ||  body.record == null || body.memberId == null || body.member == null) {
        response.status(400).send({
            status: 'fail',
            data: 'Bad request'
        });
    } else {
    response.status(201).send({
        status: 'ok',
        data: recordService.postWorkoutRecord(body)
    });
}
}

export function patchWorkoutRecord(request:Request,response:Response){
    const id = request.params.id;
    if (id == undefined){
        response.status(400).send({
            status: 'fail',
            data: 'Bad request'
        });
    } else{
        const body:WorkoutRecord = request.body ?? {};
        if (body.id != null){
            response.status(400).send({
            status: 'fail',
            data: 'Bad request'
            });
        } else {
            body.id = id.toString();
            response.status(201).send({
                status: 'ok',
                data: recordService.patchWorkoutRecord(body)
            });
        }
    }
}
export function deleteWorkoutRecord(request:Request,response:Response){
    const id = request.params.id;
    if (id == undefined){
        response.status(400).send({
            status: 'fail',
            data: 'Bad request'
        });
    } else{
        response.send({
            status:200,
            data: recordService.deleteWorkoutRecord(id.toString())
        });
    }
}


export function getApi(request:Request,response:Response){
   response.send({
    ApiKey: 'marcos1234'
    });
}
