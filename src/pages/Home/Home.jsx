import { useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  const [policeDetail, setPoliceDetail] = useState([]);

  return (
    <div>
      <Navbar setPoliceDetail={setPoliceDetail} />
      <Dashboard
        policeDetail={policeDetail}
        setPoliceDetail={setPoliceDetail}
      />
    </div>
  );
};

export default Home;
