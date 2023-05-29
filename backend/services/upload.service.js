import { pool } from "../database.js";

export const uploadModuleJSONSvc = async (prepvalues, data) => {
  try {
    const [rows] = await pool.query(
      `INSERT INTO module (mod_code, year_offered, mod_stage, mod_name, mod_abbrv, mod_dlt, mod_lecture, mod_tutorial, mod_practical, credit_unit, prereq, module_type, type,total_hours, remarks,fk_semester_code, fk_course_id)
        VALUES ${prepvalues}
        ON DUPLICATE KEY UPDATE 
        mod_code=VALUES(mod_code),
        year_offered=VALUES(year_offered),
        mod_stage=VALUES(mod_stage),
        mod_name=VALUES(mod_name),
        mod_abbrv=VALUES(mod_abbrv),
        mod_dlt=VALUES(mod_dlt),
        mod_lecture=VALUES(mod_lecture),
        mod_tutorial=VALUES(mod_tutorial),
        mod_practical=VALUES(mod_practical),
        credit_unit=VALUES(credit_unit),
        prereq=VALUES(prereq),
        module_type=VALUES(module_type),
        type=VALUES(type),
        total_hours=VALUES(total_hours),
        remarks=VALUES(remarks),
        fk_semester_code=VALUES(fk_semester_code),
        fk_course_id=VALUES(fk_course_id);`,
      data
    );
    return rows;
  } catch (error) {
    console.log(error);
    return error;
  }
};
