import { pool } from "../database.js";

export const getAllSemestersByStatusSvc = async (status) => {
  try {
    const [rows] = await pool.query(
      "SELECT semester_id, semester_code, remarks, latest_sem FROM semester_code WHERE latest_sem = ?",
      [status]
    );
    return rows;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllSemestersSvc = async () => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM semester_code ORDER BY created_at DESC"
    );
    return rows;
  } catch (error) {
    console.log(error);
    return error;
  }
};
