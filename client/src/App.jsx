import { Grid, Typography } from "@mui/material";

import "./App.css";
import Form from "./components/Form";

function App() {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography fontWeight={700} component={"h1"} fontSize={30} textAlign="center">
          Hello welcome to CareNow Treatment Entry System!
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Form />
      </Grid>
    </Grid>
  );
}

export default App;
