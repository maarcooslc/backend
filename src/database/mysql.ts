import mysql from "mysql2/promise";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { env } from "../config/env";
import type { Workout, WorkoutRecord } from "../types/workout";
import { toHttpError } from "../utils/httpError";

const pool = mysql.createPool({
  host: env.dbHost,
  port: env.dbPort,
  user: env.dbUser,
  password: env.dbPassword,
  database: env.dbName
});

const parseList = (value: unknown): string[] => {
  if (typeof value === "string") return JSON.parse(value);
  return Array.isArray(value) ? value : [];
};

const mapWorkout = (row: RowDataPacket): Workout => ({
  id: row.id,
  name: row.name,
  mode: row.mode,
  equipment: parseList(row.equipment),
  exercises: parseList(row.exercises),
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
  trainerTips: parseList(row.trainerTips)
});

export const getAllWorkouts = async (): Promise<Workout[]> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM workouts");
    return rows.map(mapWorkout);
  } catch (error) {
    throw toHttpError(error);
  }
};

export const getWorkout = async (id: string): Promise<Workout | null> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM workouts WHERE id = ?", [id]);
    if (rows.length === 0) return null;
    return mapWorkout(rows[0]);
  } catch (error) {
    throw toHttpError(error);
  }
};

export const createWorkout = async (workout: Workout): Promise<boolean> => {
  try {
    await pool.query<ResultSetHeader>(
      "INSERT INTO workouts (id, name, mode, equipment, exercises, createdAt, updatedAt, trainerTips) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        workout.id,
        workout.name,
        workout.mode,
        JSON.stringify(workout.equipment),
        JSON.stringify(workout.exercises),
        workout.createdAt,
        workout.updatedAt,
        JSON.stringify(workout.trainerTips)
      ]
    );
    return true;
  } catch (error) {
    throw toHttpError(error);
  }
};

export const updateWorkout = async (workout: Workout): Promise<boolean> => {
  try {
    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE workouts SET name = ?, mode = ?, equipment = ?, exercises = ?, createdAt = ?, updatedAt = ?, trainerTips = ? WHERE id = ?",
      [
        workout.name,
        workout.mode,
        JSON.stringify(workout.equipment),
        JSON.stringify(workout.exercises),
        workout.createdAt,
        workout.updatedAt,
        JSON.stringify(workout.trainerTips),
        workout.id
      ]
    );
    return result.affectedRows > 0;
  } catch (error) {
    throw toHttpError(error);
  }
};

export const deleteWorkout = async (id: string): Promise<boolean> => {
  try {
    const [result] = await pool.query<ResultSetHeader>("DELETE FROM workouts WHERE id = ?", [id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw toHttpError(error);
  }
};

export const getAllRecords = async (): Promise<WorkoutRecord[]> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM records");
    return rows as WorkoutRecord[];
  } catch (error) {
    throw toHttpError(error);
  }
};

export const getWorkoutRecord = async (id: string): Promise<WorkoutRecord | null> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM records WHERE id = ?", [id]);
    if (rows.length === 0) return null;
    return rows[0] as WorkoutRecord;
  } catch (error) {
    throw toHttpError(error);
  }
};

export const createWorkoutRecord = async (record: WorkoutRecord): Promise<boolean> => {
  try {
    await pool.query<ResultSetHeader>(
      "INSERT INTO records (id, workout, record, memberId, member) VALUES (?, ?, ?, ?, ?)",
      [record.id, record.workout, record.record, record.memberId ?? null, record.member ?? null]
    );
    return true;
  } catch (error) {
    throw toHttpError(error);
  }
};

export const updateWorkoutRecord = async (record: WorkoutRecord): Promise<boolean> => {
  try {
    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE records SET workout = ?, record = ?, memberId = ?, member = ? WHERE id = ?",
      [record.workout, record.record, record.memberId ?? null, record.member ?? null, record.id]
    );
    return result.affectedRows > 0;
  } catch (error) {
    throw toHttpError(error);
  }
};

export const deleteWorkoutRecord = async (id: string): Promise<boolean> => {
  try {
    const [result] = await pool.query<ResultSetHeader>("DELETE FROM records WHERE id = ?", [id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw toHttpError(error);
  }
};
