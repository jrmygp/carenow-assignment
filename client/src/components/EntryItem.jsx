import { useState } from "react";
/* eslint-disable react/prop-types */
import { Box, Chip, Collapse, IconButton, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const EntryItem = ({ name, date, cost = 0, descriptions = [], medications = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  let formattedNumber = new Intl.NumberFormat().format(cost);
  return (
    <Box
      display="flex"
      flexDirection="column"
      border="1px solid white"
      py={1}
      px={4}
      borderRadius={2}
      mb={2}
      bgcolor="#ffff"
      overflow="hidden"
      sx={{ overflowX: "auto" }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
        <Typography color="#3f434a">{name}</Typography>
        <Typography color="#3f434a">{date}</Typography>
        <Typography color="#3f434a">Rp. {formattedNumber}</Typography>

        <IconButton onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <KeyboardArrowUpIcon color="info" /> : <KeyboardArrowDownIcon color="info" />}
        </IconButton>
      </Box>

      <Collapse in={isOpen}>
        <Box display="flex" flexDirection="column">
          <Typography color="#3f434a">Descriptions :</Typography>

          {descriptions.length > 0 && (
            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
              {descriptions.map((desc, idx) => {
                return <Chip key={idx} label={desc} sx={{ mb: 1 }} />;
              })}
            </Box>
          )}
        </Box>

        <Box display="flex" flexDirection="column">
          <Typography color="#3f434a">Medications :</Typography>

          {medications.length > 0 && (
            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
              {medications.map((med, idx) => {
                return <Chip key={idx} label={med} sx={{ mb: 1 }} />;
              })}
            </Box>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

export default EntryItem;
