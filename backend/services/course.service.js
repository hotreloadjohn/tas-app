import { pool } from "../database.js";

export const getAllCoursesSvc = async () => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM course WHERE course_id != 'SOC';"
    );
    return rows;
  } catch (error) {
    console.log(error);
    return error;
  }
};
