import {
  getAllSemestersByStatusSvc,
  getAllSemestersSvc,
} from "../services/semester.service.js";

export const getAllSemestersByStatus = async (req, res) => {
  let status = req.query.status;
  console.log("status: ", status);
  try {
    let results = await getAllSemestersByStatusSvc(status);
    if (results.errno) {
      throw "Database SQL Error";
    } else {
      console.log(new Date().toLocaleString(), "Fetched All Semester");
      return res.status(200).json(results);
    }
  } catch (error) {
    let message = "Server is unable to process your request. Error: " + error;
    return res.status(500).json({
      message: message,
    });
  }
};

export const getAllSemesters = async (req, res) => {
  console.log("Fetching Available Semesters");
  try {
    let results = await getAllSemestersSvc();
    return res.status(200).json(results);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Invalid Input" });
  }
};
