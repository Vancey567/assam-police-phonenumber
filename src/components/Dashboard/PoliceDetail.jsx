import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { deleteRequest, getRequest, postRequest } from "../../utils/ApiRequest";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";

const PoliceDetail = ({
  _id,
  name,
  phone,
  district,
  ps,
  rank,
  handleDistrictChange,
  handlePoliceStationChange,
  districts,
  policeStations,
  saveChanges,
  policeDetail,
  setPoliceDetail,
}) => {
  const [allRanks, setAllRanks] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [allPoliceStations, setAllPoliceStations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetail, setEditedDetail] = useState({
    name,
    phone,
    district,
    ps,
    rank,
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // save changes to backend
    const data = { _id, ...editedDetail };
    const success = saveChanges(data);
    setUpdateSuccess(success);
    if (success) {
      toggleEditMode();
    }
  };

  const handleDelete = async (_id) => {
    const res = await deleteRequest("police/remove", _id);

    if (res.status === 200) {
      const police = await getRequest("police/all");
      setPoliceDetail(police.data);
    }
  };

  const handleChange = async (field, value) => {
    setEditedDetail((prevDetail) => ({
      ...prevDetail,
      [field]: value,
    }));
  };

  // get the PS of the selected District as it changes
  useEffect(() => {
    const fetchData = async () => {
      const policeStationResponse = await postRequest("police/ps/all", {
        district: editedDetail.district,
      });
      setAllPoliceStations(policeStationResponse.data);
    };

    // fetch the station only when it's in editing mode
    if (isEditing) {
      fetchData();
    }
  }, [editedDetail.district, isEditing]);

  const handleEditMode = async () => {
    // Get all districts
    const rankResponse = await getRequest("police/ranks");
    setAllRanks(rankResponse.data);

    // Get all districts
    const districtResponse = await getRequest("police/district/all");
    setAllDistricts(districtResponse.data);

    // Get PS of select district
    const policeStationResponse = await postRequest("police/ps/all", {
      district: editedDetail.district,
    });
    setAllPoliceStations(policeStationResponse.data);

    // Change the edit mode
    setIsEditing(!isEditing);
  };

  return (
    // <div className="" style={{ display: "flex" }}>
    <TableRow className="table-row">
      <TableCell>
        {isEditing ? (
          <TextField
            id="standard-basic"
            variant="standard"
            type="text"
            value={editedDetail.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        ) : updateSuccess ? (
          editedDetail.name
        ) : (
          name
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <TextField
            id="standard-basic"
            variant="standard"
            type="text"
            value={editedDetail.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        ) : updateSuccess ? (
          editedDetail.phone
        ) : (
          phone
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <FormControl fullWidth>
            {/* <InputLabel id="rank-label">Rank</InputLabel> */}
            <Select
              labelId="rank-label"
              value={editedDetail.rank}
              onChange={(e) => handleChange("rank", e.target.value)}
            >
              {allRanks?.map((rankOption) => (
                <MenuItem key={rankOption.id} value={rankOption.rank}>
                  {rankOption.rank}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : updateSuccess ? (
          editedDetail.rank
        ) : (
          rank
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <FormControl fullWidth>
            {/* <InputLabel id="district-label">District</InputLabel> */}
            <Select
              labelId="district-label"
              value={editedDetail.district}
              onChange={(e) => handleChange("district", e.target.value)}
            >
              {allDistricts?.map((districtOption) => (
                <MenuItem key={districtOption} value={districtOption}>
                  {districtOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : updateSuccess ? (
          editedDetail.district
        ) : (
          district
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <FormControl fullWidth>
            {/* <InputLabel id="ps-label">Police Station</InputLabel> */}
            <Select
              labelId="ps-label"
              value={editedDetail.ps}
              onChange={(e) => handleChange("ps", e.target.value)}
              style={{padding: 0}}
            >
              {allPoliceStations?.map((policeStationOption) => (
                <MenuItem
                  key={policeStationOption.PS_CODE}
                  value={policeStationOption.PS_NAME}
                  style={{padding: 0}}
                >
                  {policeStationOption.PS_NAME}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : updateSuccess ? (
          editedDetail.ps
        ) : (
          ps
        )}
      </TableCell>
      <TableCell className="actions">
        <MoreVertIcon className="options-icon" />
        <div className="options">
          <div className="delete">
            <DeleteIcon onClick={() => handleDelete(_id)} />
          </div>
          <div className="edit option">
            {isEditing ? (
              <SaveIcon className="save-icon" onClick={handleSave} />
            ) : (
              <EditIcon className="edit-icon" onClick={handleEditMode} />
            )}
          </div>
        </div>
      </TableCell>
    </TableRow>
    // </div>
  );
};

export default PoliceDetail;
