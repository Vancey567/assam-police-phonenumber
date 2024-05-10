import React, { useEffect, useRef, useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { getRequest, postRequest } from "../../utils/ApiRequest";

const NewRow = ({ handleSaveNewRow, isNewRowSaved }) => {
  const [newRowData, setNewRowData] = useState({
    name: "",
    phone: "",
    rank: "",
    district: "",
    ps: "",
  });
  const [ranks, setAllRanks] = useState([]);
  const [districts, setAllDistricts] = useState([]);
  const [policeStations, setAllPoliceStations] = useState([]);
  const isFirstRender = useRef(true);
  //   const [isFirstRender, setIsFirstRender] = useState(true);

  console.log({ isNewRowSaved });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSave = () => {
    handleSaveNewRow(newRowData);
  };

  // get the PS of the selected District as it changes
  useEffect(() => {
    const fetchData = async () => {
      const policeStationResponse = await postRequest("police/ps/all", {
        district: newRowData.district,
      });
      setAllPoliceStations(policeStationResponse.data);
    };

    // console.log(newRowData.district);
    if (newRowData.district !== "" && !isFirstRender.current) {
      fetchData();
    } else {
      isFirstRender.current = false;
    }
  }, [newRowData.district]);

  useEffect(() => {
    const handleEditMode = async () => {
      // Get all ranks
      const rankResponse = await getRequest("police/ranks");
      setAllRanks(rankResponse.data);

      // Get all districts
      const districtResponse = await getRequest("police/district/all");
      setAllDistricts(districtResponse.data);

      // Get PS of select district
      const policeStationResponse = await postRequest("police/ps/all", {
        district: newRowData.district,
      });
      setAllPoliceStations(policeStationResponse.data);
    };

    handleEditMode();
  }, []);

  return (
    <TableRow>
      <TableCell>
        {isNewRowSaved ? (
          newRowData.name
        ) : (
          <TextField
            name="name"
            value={newRowData.name}
            onChange={handleChange}
            variant="outlined"
          />
        )}
      </TableCell>
      <TableCell>
        {isNewRowSaved ? (
          newRowData.phone
        ) : (
          <TextField
            name="phone"
            value={newRowData.phone}
            onChange={handleChange}
            variant="outlined"
          />
        )}
      </TableCell>
      <TableCell>
        {isNewRowSaved ? (
          newRowData.rank
        ) : (
          <TextField
            name="rank"
            value={newRowData.rank}
            onChange={handleChange}
            variant="outlined"
            select
          >
            {ranks?.map((rank) => (
              <MenuItem key={rank.id} value={rank.rank}>
                {rank.rank}
              </MenuItem>
            ))}
          </TextField>
        )}
      </TableCell>
      <TableCell>
        {isNewRowSaved ? (
          newRowData.district
        ) : (
          <TextField
            name="district"
            value={newRowData.district}
            onChange={handleChange}
            variant="outlined"
            select
          >
            {districts?.map((district, index) => (
              <MenuItem key={index} value={district}>
                {district}
              </MenuItem>
            ))}
          </TextField>
        )}
      </TableCell>
      <TableCell>
        {isNewRowSaved ? (
          newRowData.ps
        ) : (
          <TextField
            name="ps"
            value={newRowData.ps}
            onChange={handleChange}
            variant="outlined"
            select
          >
            {policeStations?.map((station) => (
              <MenuItem key={station.PS_CODE} value={station.PS_NAME}>
                {station.PS_NAME}
              </MenuItem>
            ))}
          </TextField>
        )}
      </TableCell>
      <TableCell>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default NewRow;
