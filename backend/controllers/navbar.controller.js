import {
  getNavBySingleRole,
  getNavByMultiRoles,
} from "../services/navbar.service.js";

export const getNavByRole = async (req, res) => {
  try {
    let role_ids = req.body.role;
    if (role_ids.length == 1) {
      let results = await getNavBySingleRole(role_ids);
      return res.status(200).json(results);
    } else if (role_ids.length >= 2) {
      let wheres = "";
      for (let i = 0; i < role_ids.length; i++) {
        wheres +=
          i == role_ids.length - 1 ? " np.role_id = ?" : " np.role_id = ? OR";
      }
      let results = await getNavByMultiRoles(wheres, role_ids);
      return res.status(200).json(results);
    } else {
      throw "No roles were given";
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Invalid role Provided To /Navbar API" });
  }
};
