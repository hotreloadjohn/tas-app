import { pool } from "../database.js";

export const getNavBySingleRole = async (role_id) => {
  try {
    const [rows] = await pool.query(
      `SELECT items.tab,items.nav_item,items.nav_link from new_nav_items items INNER JOIN nav_privilege np on np.nav_item_id = items.ID where np.role_id = ? ORDER BY items.tab DESC, length(items.nav_item) DESC`,
      [role_id]
    );
    return rows;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getNavByMultiRoles = async (wheres, role_ids) => {
  try {
    const [rows] = await pool.query(
      `SELECT DISTINCT items.tab,items.nav_item,items.nav_link from new_nav_items items INNER JOIN nav_privilege np on np.nav_item_id = items.ID where ${wheres}`,
      role_ids
    );
    return rows;
  } catch (error) {
    console.log(error);
    return error;
  }
};
