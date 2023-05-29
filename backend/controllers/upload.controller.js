import { uploadModuleJSONSvc } from "../services/upload.service.js";

export const uploadModuleJSON = async (req, res) => {
  try {
    console.log("Entering Upload JSON");
    console.log("inside uploadModule controller", req.user);
    //in this case, req.body.data will send back the object array from the frontend.
    // console.log(req)
    let data = req.body.data.excelData;
    let course = req.body.data.course_id;
    let semester_code = req.body.data.semester_code;

    let dataArray = [];
    //push in order
    data.forEach((element) => {
      dataArray.push(element["Code"]);
      dataArray.push(element["Year"]);
      dataArray.push(element["Stage"]);
      dataArray.push(element["Name"]);
      dataArray.push(element["Abbrev"]);
      dataArray.push(element["DLT"]);
      dataArray.push(element["L"]);
      dataArray.push(element["T"]);
      dataArray.push(element["P"]);
      dataArray.push(element["CU"]);
      dataArray.push(element["Prerequisite (Pass/Taken)"]);
      dataArray.push(element["Module Type"]);
      dataArray.push(element["Type"]);
      dataArray.push(element["Total"]);
      dataArray.push(element["Remarks"]);
      dataArray.push(semester_code);
      dataArray.push(course);
    });
    let appendSQL = " ";
    for (let index = 0; index < data.length; index++) {
      appendSQL += ",(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    }

    let newStringConcat = appendSQL.replace(",", "");
    //console.log(newStringConcat)
    let result = await uploadModuleJSONSvc(newStringConcat, dataArray);
    // console.log(result)
    //console.log(stringConcat)
    if (result.affectedRows == 0) {
      return res.status(200).json({
        message:
          "Successfully Inserted New Records. Please Proceed to Module Maintenence to Include More Details if Neccessary.",
      });
    } else if (result.affectedRows > 0) {
      return res.status(200).json({
        message:
          "Successfully Updated Existing Records. Please Proceed to Module Maintenence to Include More Details if Neccessary.",
      });
    } else if (result.errno) {
      throw "Database Error. SQL Error Code: " + result.errno + result.code;
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const uploadStaffListJSON = async (req, res) => {};

export const uploadModuleRequirementJSON = async (req, res) => {};
