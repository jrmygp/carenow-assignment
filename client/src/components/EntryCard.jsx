/* eslint-disable react/prop-types */
import { useState } from "react";

import { styled } from "@mui/material/styles";
import { Tabs, Tab } from "@mui/material";

import Form from "./Form";
import Entries from "./Entries";

const CustomTabs = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  alignItems: "center",
  color: "#fff",
  "&.Mui-selected": {
    color: "#FFA611",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
  minWidth: "fit-content",
}));

const EntryCard = ({ entries, refresh }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        <CustomTabs label="Input Entry" />
        <CustomTabs label="See All Entries" />
      </Tabs>

      {!value ? <Form refresh={refresh} /> : <Entries entries={entries} />}
    </>
  );
};

export default EntryCard;
