import { Router } from "express";
const policerouter = Router();

import {
  getAllPoliceDetail,
  addPoliceDetail,
  editPoliceDetail,
  filterPoliceDetail,
  searchPoliceDetail,
  allDistricts,
  allPoliceStation,
  getAllRanks,
  addAllPoliceDetail,
  editAllPoliceDetail,
  updateAllPoliceDetail,
  deletePoliceDetail,
} from "../controllers/police/police-detail-controller.js";

policerouter.get("/all", getAllPoliceDetail);
policerouter.get("/district/all", allDistricts);
policerouter.post("/ps/all", allPoliceStation);
policerouter.get("/ranks", getAllRanks);
policerouter.post("/add", addPoliceDetail);
policerouter.post("/edit/:id", editPoliceDetail);
policerouter.post("/search", searchPoliceDetail);
policerouter.get("/filter", filterPoliceDetail);
// policerouter.get("/addAllPD", addAllPoliceDetail);
policerouter.post("/updateAll", editAllPoliceDetail);

// Existing data to be updated createdAt, UpdatedAt
policerouter.post("/updateAllExistingData", updateAllPoliceDetail);
policerouter.post("/remove/:id", deletePoliceDetail);

export default policerouter;
