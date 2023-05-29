import { pool } from "../database.js";

export const checkIfUserExists = async (email) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows.length > 0 ? true : false;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (email, password, username, name) => {
  try {
    await pool.query(
      "INSERT INTO users (email, password, username, name) VALUES (?, ?, ?, ?)",
      [email, password, username, name]
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getStaffInfo = async (staff_id) => {
  try {
    const [rows] = await pool.query(
      "SELECT t1.*,t4.* FROM staff_information t1  INNER JOIN designation t4 ON t4.designation_id=t1.fk_designation_id WHERE t1.staff_id = ?",
      [staff_id]
    );

    if (rows.length > 0) {
      const [privilegesRows] = await pool.query(
        `SELECT t1.*,t2.* FROM staff_privileges t1 INNER JOIN system_roles t2 ON t1.fk_role_id = t2.role_id WHERE fk_staff_id = ?;`,
        [staff_id]
      );
      const roleData = privilegesRows.map((item) => {
        return {
          role_id: item.role_id,
          role_name: item.role_name,
          remarks: item.remarks,
        };
      });
      rows[0].roles = roleData;
    }

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// [
//   {
//     staff_id: '123456',
//     staff_name: 'Admin',
//     staff_abbrv: 'AD',
//     fk_designation_id: 1,
//     staff_email: '',
//     staff_number: '',
//     staff_mobile: '',
//     staff_remarks: '',
//     staff_password: '$2a$10$ND8n36.8QXoEhVT1iSJN8O2Vbr/P0Q1BeiiF1W/QiogWWw1Rh3mga',
//     fk_staff_type: 'FT',
//     fk_schedule_id: 'PET',
//     last_login: null,
//     staff_status: 'Active',
//     prefix: 'DESIG',
//     designation_id: 1,
//     designation_name: 'Admin',
//     fk_course_id: 'SOC',
//     section_name: 'Admin Support',
//     roles: [Array]
//   }
// ]
