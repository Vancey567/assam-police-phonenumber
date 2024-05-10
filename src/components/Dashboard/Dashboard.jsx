import React, { useEffect, useState } from "react";
import { getRequest, postRequest, updateRequest } from "../../utils/ApiRequest";
import PoliceDetail from "./PoliceDetail";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NewRow from "../NewRow/NewRow";
import Button from "@mui/material/Button";

const Dashboard = ({ policeDetail, setPoliceDetail }) => {
  // const [policeDetail, setPoliceDetail] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [policeStations, setPoliceStations] = useState([]);

  // New Row States
  const [addingNewRow, setAddingNewRow] = useState(false);
  const [isNewRowSaved, setIsNewRowSaved] = useState(false);

  const fetchData = async () => {
    try {
      const response = await getRequest("police/all");
      setPoliceDetail(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDistrictChange = (index, value) => {
    const updatedPoliceDetail = [...policeDetail];
    updatedPoliceDetail[index].district = value;
    setPoliceDetail(updatedPoliceDetail);
  };

  const handlePoliceStationChange = (index, value) => {
    const updatedPoliceDetail = [...policeDetail];
    updatedPoliceDetail[index].ps = value;
    setPoliceDetail(updatedPoliceDetail);
  };

  const saveChanges = async (detail) => {
    try {
      const requestBody = {};
      if (detail.district) requestBody.district = detail.district;
      if (detail.ps) requestBody.ps = detail.ps;
      if (detail.name) requestBody.name = detail.name;
      if (detail.phone) requestBody.phone = detail.phone;
      if (detail.rank) requestBody.rank = detail.rank;

      let response;
      // Make API call only if at least one property is present
      if (Object.keys(requestBody).length > 0) {
        response = await updateRequest(`police/edit`, requestBody, detail._id);
      }

      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  function handleAddNewRow() {
    //Save Data
    setAddingNewRow(true);
    setIsNewRowSaved(false);
  }

  async function handleSaveNewRow(data) {
    // Make the api request to save data

    const res = await postRequest("police/add", data);
    if (res.status === 201) {
      // Alert Nofification
      fetchData();
      // console.log("first")
      // setPoliceDetail((prev) => {
      //   prev.unshift(res.data.user);
      // });
      // console.log(policeDetail);
      setAddingNewRow(false);
      setIsNewRowSaved(true);
    }
  }

  return (
    <div>
      <h2>Police Detail</h2>
      <div className="">
        <Button onClick={handleAddNewRow} variant="contained" color="primary">
          New
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className="table-header">
              <TableCell className="header-item"><p>Name</p></TableCell>
              <TableCell className="header-item"><p>Phone</p></TableCell>
              <TableCell className="header-item"><p>Rank</p></TableCell>
              <TableCell className="header-item"><p>District</p></TableCell>
              <TableCell className="header-item"><p>Police Station</p></TableCell>
              <TableCell className="header-item"><p>Action</p></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Add New Row */}
            {addingNewRow && (
              <NewRow
                key="newRow"
                isNewRow
                isNewRowSaved={isNewRowSaved}
                handleSaveNewRow={handleSaveNewRow}
                districts={districts}
                policeStations={policeStations}
              />
            )}

            {/* All Police Detail */}
            {policeDetail?.map((detail, index) => (
              <PoliceDetail
                key={index}
                {...detail}
                handleDistrictChange={(value) =>
                  handleDistrictChange(index, value)
                }
                handlePoliceStationChange={(value) =>
                  handlePoliceStationChange(index, value)
                }
                // handleEditMode={handleEditMode}
                districts={districts}
                policeStations={policeStations}
                saveChanges={saveChanges}
                policeDetail = {policeDetail} 
                setPoliceDetail = {setPoliceDetail}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <button onClick={saveChanges}>Save Changes</button> */}
    </div>
  );
};

export default Dashboard;
