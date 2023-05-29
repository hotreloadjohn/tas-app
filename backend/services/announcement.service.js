import { pool } from "../database.js";
export const getAllAnnouncementsSvc = async (order) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM announcement WHERE announcement_end > NOW() ORDER BY announcement_start ${order}`
    );
    return rows;
  } catch (error) {
    console.log(error);
    return error;
  }
};
