import express from "express";
import {
  uploadModuleJSON,
  uploadModuleRequirementJSON,
  uploadStaffListJSON,
} from "../controllers/upload.controller.js";
import { ROLES_LIST } from "../config/roleList.js";
import { verifyRoles } from "../middlewares/verifyRoles.js";

const router = express.Router();

router.post(
  "/modules",
  verifyRoles(ROLES_LIST.admin, ROLES_LIST.admin_support),
  uploadModuleJSON
); // old_route: /api/reports/upload/excel/ controller: uploadFileJSON

router.post(
  "/stafflist",
  verifyRoles(ROLES_LIST.admin, ROLES_LIST.admin_support),
  uploadStaffListJSON
); // old_route: /api/stafflist/upload/excel/ controller: uploadStaffFileJSON

router.post(
  "/module_requirements",
  verifyRoles(ROLES_LIST.admin, ROLES_LIST.admin_support),
  uploadModuleRequirementJSON
); // old_route: /api/modrequirement/upload/excel controller: uploadModRequireFileJSON

export default router;
