import PoliceDetailModel from "../../models/police-detail-model.js";
import mongoose from "mongoose";
import { readFile } from "fs/promises";
import { resolve } from "path";

export async function getAllPoliceDetail(req, res) {
  try {
    const users = await PoliceDetailModel.find().sort({ updatedAt: -1 }).exec();

    if (users.length === 0) {
      return res.status(400).json({ message: "No users found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.log("Error Getting ALL Police Officer Detail", error);
    res.status(500).json({ message: "Internal Server Error!!", error });
  }
}

// Update Existing Detail
export async function updateAllPoliceDetail(req, res) {
  try {
    // const users = await PoliceDetailModel.updateAll();
    const users = await PoliceDetailModel.updateMany(
      {},
      { $set: { createdAt: new Date(), updatedAt: new Date() } }
    );
    //   (err, result) => {
    //     if (err) {
    //       console.error("Error updating documents:", err);
    //       return res.status(400).json({ message: "No users found" });
    //     } else {
    //       console.log("Documents updated successfully:", result);
    //     }
    //   }
    // );

    if (users.length === 0) {
      return res.status(400).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.log("Error Getting ALL Police Officer Detail", error);
    res.status(500).json({ message: "Internal Server Error!!", error });
  }
}

export async function addPoliceDetail(req, res) {
  const { name, phone, district, ps, rank } = req.body;

  if (!name || !phone || !district || !ps || !rank) {
    return res.status(400).json({ message: "All Fields are required" });
  }

  try {
    const policeObj = new PoliceDetailModel({
      name,
      phone,
      district,
      ps,
      rank,
    });

    const user = await policeObj.save();

    if (!user) {
      return res.status(500).json({ message: "Unable to save data to DB!!" });
    }
    return res.status(201).json({ message: "Added Successfully!!", user });
  } catch (error) {
    console.error("Error saving police detail", error);
    res.status(500).json({ message: "Internal Server Error!!", error });
  }
}

export async function editPoliceDetail(req, res) {
  const objectId = req.params.id;
  const updateFields = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(objectId)) {
      return res.status(400).json({ message: "Invalid Object ID" });
    }

    const objectIdAsObjectId = new mongoose.Types.ObjectId(objectId);

    const updatedObject = await PoliceDetailModel.findOneAndUpdate(
      objectIdAsObjectId,
      updateFields,
      { new: true }
    );

    if (!updatedObject) {
      return res.status(404).json({ message: "Item not found to update!!" });
    }

    return res
      .status(200)
      .json({ message: "Edited Successfully!!", updatedObject });
  } catch (error) {
    console.error("Error updating object:", error);
    res.status(500).json({ message: "Internal Server Error!!", error });
  }
}

// Delete Police Detail By ID
export async function deletePoliceDetail(req, res) {
  const objectId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(objectId)) {
      return res.status(400).json({ message: "Invalid Object ID" });
    }

    const objectIdAsObjectId = new mongoose.Types.ObjectId(objectId);

    const deletedDoc = await PoliceDetailModel.findByIdAndDelete(objectIdAsObjectId);

    if (!deletedDoc) {
      return res.status(404).json({ message: "Item not found to delete!!" });
    }

    return res
      .status(200)
      .json({ message: "Deleted Successfully!!", deletedDoc });
  } catch (error) {
    console.error("Error Deleting object:", error);
    res.status(500).json({ message: "Internal Server Error!!", error });
  }
}

export async function searchPoliceDetail(req, res) {
  const { searchQuery, searchField } = req.query;

  try {
    const query = {
      [searchField]: { $regex: searchQuery, $options: "i" },
    };

    const policeDetail = await PoliceDetailModel.find(query);

    return res.status(200).json(policeDetail);
  } catch (error) {
    console.error("Error Finding Police Detail:", error);
    res.status(500).json({ message: "Internal Server Error!!", error });
  }
}

export async function filterPoliceDetail(req, res) {
  const { name, phone, district, ps, rank } = req.query;

  try {
    let query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    if (phone) {
      query.phone = { $regex: phone, $options: "i" };
    }

    if (district) {
      query.district = { $regex: district, $options: "i" };
    }

    if (ps) {
      query.ps = { $regex: ps, $options: "i" };
    }

    if (rank) {
      query.rank = { $regex: rank, $options: "i" };
    }

    const matchingUsers = await PoliceDetailModel.find(query);

    return res.status(200).json(matchingUsers);
  } catch (error) {
    console.error("Error filtering user", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function allDistricts(req, res) {
  try {
    // const filePath = resolve("@assets/district-police-station.json");
    const filePath = resolve("assets/JSON/district-police-station.json");

    const districtsData = await readFile(filePath, { encoding: "utf8" });
    // const districts = Object.keys(JSON.parse(districtsData));
    const districtsObject = JSON.parse(districtsData).ASSAM;
    const districts = Object.keys(districtsObject);

    // districts
    return res.status(200).json(districts);
  } catch (error) {
    console.error("Error Finding Districts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function allPoliceStation(req, res) {
  try {
    const district = req.body.district;

    const filePath = resolve("assets/JSON/district-police-station.json");
    const psData = await readFile(filePath, { encoding: "utf8" });
    const districtsObject = JSON.parse(psData).ASSAM;

    let policeStations;

    if (districtsObject.hasOwnProperty(district)) {
      policeStations = districtsObject[district];
    } else {
      return res.status(400).json({ message: "District not found!!" });
    }

    if (policeStations.length < 1) {
      return res.status(400).json({ message: "Error Finding Polce Station" });
    }
    return res.status(200).json(policeStations);
  } catch (error) {
    console.error("Error Finding Polce Station:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getAllRanks(req, res) {
  try {
    const filePath = resolve("assets/JSON/rank.json");
    const ranksData = await readFile(filePath, { encoding: "utf8" });
    const ranks = JSON.parse(ranksData);

    if (ranks.length < 1) {
      return res.status(400).json({ message: "Error Finding Rank" });
    }
    return res.status(200).json(ranks.rank);
  } catch (error) {
    console.error("Error Finding Polce Station:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function addAllPoliceDetail(req, res) {
  const filePath = resolve("assets/JSON/police-detail.json");

  const detail = await readFile(filePath, { encoding: "utf8" });
  const detailObject = JSON.parse(detail);

  detailObject.forEach(async (element) => {
    const { name, phone, district, ps, rank } = element;

    try {
      const policeObj = new PoliceDetailModel({
        name,
        phone,
        district,
        ps,
        rank,
      });

      await policeObj.save();

      // if (!user) {
      //   return res.status(500).json({ message: "Unable to save data to DB!!" });
      // }
      // return res.status(201).json({ message: "Added Successfully!!", user });
    } catch (error) {
      console.error("Error saving police detail", error);
      res.status(500).json({ message: "Internal Server Error!!", error });
    }
  });
}

export async function editAllPoliceDetail(req, res) {
  const updateFields = req.body;

  try {
    const condition = { district: "SIVASAGAR\n" };
    let callback = function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    };

    const updatedObject = await PoliceDetailModel.updateMany(
      condition,
      updateFields,
      { new: true },
      callback
    );

    if (!updatedObject) {
      return res.status(404).json({ message: "Item not found to update!!" });
    }

    return res
      .status(200)
      .json({ message: "Edited Successfully!!", updatedObject });
  } catch (error) {
    console.error("Error updating object:", error);
    res.status(500).json({ message: "Internal Server Error!!", error });
  }
}
