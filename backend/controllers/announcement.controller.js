import { getAllAnnouncementsSvc } from "../services/announcement.service.js";

export const getAllAnnouncements = async (req, res) => {
  let order = req.query.order;
  try {
    let results = await getAllAnnouncementsSvc(order);
    if (results.errno) {
      throw "Database SQL Error";
    } else {
      //console.log('Get All Announcements', results);
      return res.status(200).json(results);
    }
  } catch (error) {
    let message = "Server is unable to process your request. Error: " + error;
    return res.status(500).json({
      message: message,
    });
  }
};
