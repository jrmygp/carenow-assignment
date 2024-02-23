import { useState } from "react";

import { useFormik } from "formik";
import * as yup from "yup";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import NumericFormatCustom from "./NumericFormatCustom";

const Form = () => {
  const [description, setDescription] = useState("");
  const [medication, setMedication] = useState("");

  const formik = useFormik({
    initialValues: {
      patient_name: "",
      date: "",
      cost: 0,
    },
    validationSchema: yup.object().shape({
      patient_name: yup.string().required("Your name is required"),
      date: yup.date().required("Date of treatment is required"),
      cost: yup.number().required("Treatment cost is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const onKeyDownDatePicker = (event) => {
    event?.preventDefault();
  };

  return (
    <Card>
      <CardContent>
        <Typography fontWeight={600} fontSize={24} textAlign="center">
          Patient Data
        </Typography>

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
          onSubmit={formik.handleSubmit}
        >
          <FormControl>
            <FormLabel>Patient Name</FormLabel>
            <TextField placeholder="Input your name..." fullWidth size="small" />
          </FormControl>

          <FormControl>
            <FormLabel>Date of Treatment</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker slotProps={{ textField: { size: "small", onKeyDown: onKeyDownDatePicker } }} />
            </LocalizationProvider>
          </FormControl>

          <FormControl>
            <FormLabel>Treatment Cost</FormLabel>
            <TextField
              placeholder="Input treatment cost..."
              fullWidth
              size="small"
              InputProps={{
                startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                inputComponent: NumericFormatCustom,
              }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Treatment Description(s)</FormLabel>
            <Select size="small" displayEmpty value={description} onChange={(e) => setDescription(e.target.value)}>
              <MenuItem value="">Select Description</MenuItem>
              <MenuItem value="Rawat Inap">Rawat Inap</MenuItem>
              <MenuItem value="Rawat Jalan">Rawat Jalan</MenuItem>
              <MenuItem value="Perlu Penanganan Lebih Lanjut">Perlu Penanganan Lebih Lanjut</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Medications Prescribed</FormLabel>
            <Select size="small" displayEmpty value={medication} onChange={(e) => setMedication(e.target.value)}>
              <MenuItem value="">Select Medication</MenuItem>
              <MenuItem value="Amoxilin">Amoxilin</MenuItem>
              <MenuItem value="Albucare">Albucare</MenuItem>
              <MenuItem value="Aspirin">Aspirin</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>

          <Box display="flex" alignItems="center" justifyContent="flex-end" gap={2}>
            <Button variant="info">Reset</Button>

            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default Form;
