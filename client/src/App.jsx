import { useEffect, useState } from "react";

import { Grid, Typography } from "@mui/material";

import "./App.css";
import EntryCard from "./components/EntryCard";
import axiosInstance from "./config/api";

function App() {
  const [entries, setEntries] = useState([]);

  const getAllEntries = async () => {
    try {
      const res = await axiosInstance.get("/entry");
      setEntries(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEntries();
  }, []);
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography fontWeight={700} component={"h1"} fontSize={30} textAlign="center">
          Hello welcome to CareNow Treatment Entry System!
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <EntryCard entries={entries} refresh={getAllEntries} />
      </Grid>
    </Grid>
  );
}

export default App;
