import { getAllCoursesSvc } from "../services/course.service.js";

export const getAllCourses = async (req, res) => {
  try {
    let results = await getAllCoursesSvc();
    return res.status(200).json(results);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Invalid Input" });
  }
};
