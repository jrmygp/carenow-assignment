/* eslint-disable react/prop-types */
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
  Chip,
  FormControl,
  FormHelperText,
  FormLabel,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import NumericFormatCustom from "./NumericFormatCustom";
import dayjs from "dayjs";
import axiosInstance from "../config/api";

const Form = ({ refresh }) => {
  const [description, setDescription] = useState("");
  const [medication, setMedication] = useState("");
  const [selectedDescriptions, setSelectedDescriptions] = useState([]);
  const [selectedMedications, setSelectedMedications] = useState([]);

  const formik = useFormik({
    initialValues: {
      patient_name: "",
      date: "",
      cost: 0,
    },
    validationSchema: yup.object().shape({
      patient_name: yup.string().required("Your name is required"),
      date: yup.date().required("Date of treatment is required"),
      cost: yup.number().min(1, "Cost can't be 0").required("Treatment cost is required"),
    }),
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      await axiosInstance.post("/entry/create", {
        ...values,
        medications: selectedMedications,
        descriptions: selectedDescriptions,
      });
      refresh();
      resetForm();
    },
  });

  /**
   * Handles prevention of user to type inside the DatePicker component
   * @param {*} event
   */
  const onKeyDownDatePicker = (event) => {
    event?.preventDefault();
  };

  /**
   * Handles add selected description to the selectedDescriptions array
   * @param {string} description
   */
  const addDescription = (description) => {
    setSelectedDescriptions((prevState) => {
      if (!prevState.find((item) => item === description) && description !== "") {
        return [...prevState, description];
      }
      return prevState;
    });
  };

  /**
   * Handles remove selected description from the selectedDescriptions array
   * @param {string} description
   */
  const removeDescription = (description) => {
    const newDescriptionArray = selectedDescriptions.filter((item) => {
      return item !== description;
    });
    setSelectedDescriptions(newDescriptionArray);
  };

  /**
   * Handles add selected medication to the selectedMedications array
   * @param {string} medication
   */
  const addMedication = (medication) => {
    setSelectedMedications((prevState) => {
      if (!prevState.find((item) => item === medication) && medication !== "") {
        return [...prevState, medication];
      }
      return prevState;
    });
  };

  /**
   * Handles remove selected medication from the selectedMedications array
   * @param {string} description
   */
  const removeMedication = (medication) => {
    const newMedicationArray = selectedMedications.filter((item) => {
      return item !== medication;
    });
    setSelectedMedications(newMedicationArray);
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
          <FormControl error={formik.errors.patient_name}>
            <FormLabel>Patient Name</FormLabel>
            <TextField
              placeholder="Input your name..."
              name="patient_name"
              value={formik.values.patient_name}
              fullWidth
              size="small"
              onChange={formik.handleChange}
              error={formik.errors.patient_name}
            />
            <FormHelperText>{formik.errors.patient_name}</FormHelperText>
          </FormControl>

          <FormControl error={formik.errors.date}>
            <FormLabel>Date of Treatment</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={formik.values.date || null}
                name="date"
                onChange={(value) => formik.setFieldValue("date", dayjs(value).format("YYYY/MM/DD"))}
                slotProps={{
                  textField: { size: "small", onKeyDown: onKeyDownDatePicker, error: formik.errors.date },
                }}
              />
            </LocalizationProvider>
            <FormHelperText>{formik.errors.date}</FormHelperText>
          </FormControl>

          <FormControl error={formik.errors.cost}>
            <FormLabel>Treatment Cost</FormLabel>
            <TextField
              placeholder="Input treatment cost..."
              name="cost"
              fullWidth
              size="small"
              InputProps={{
                startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                inputComponent: NumericFormatCustom,
              }}
              value={formik.values.cost}
              onChange={formik.handleChange}
              error={formik.errors.cost}
            />
            <FormHelperText>{formik.errors.cost}</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Treatment Description(s)</FormLabel>
            <Select
              size="small"
              displayEmpty
              value={description}
              onChange={(e) => {
                addDescription(e.target.value);
                setDescription(e.target.value);
              }}
            >
              <MenuItem value="">Select Description</MenuItem>
              <MenuItem value="Rawat Inap">Rawat Inap</MenuItem>
              <MenuItem value="Rawat Jalan">Rawat Jalan</MenuItem>
              <MenuItem value="Perlu Penanganan Lebih Lanjut">Perlu Penanganan Lebih Lanjut</MenuItem>
            </Select>

            {selectedDescriptions.length > 0 && (
              <Box display="flex" alignItems="center" gap={1} flexWrap="wrap" mt={2}>
                {selectedDescriptions.map((desc, idx) => {
                  return (
                    <Tooltip
                      key={idx}
                      title={`Click to remove ${desc}`}
                      placement="top"
                      onClick={() => removeDescription(desc)}
                    >
                      <Chip label={desc} />
                    </Tooltip>
                  );
                })}
              </Box>
            )}
          </FormControl>

          <FormControl>
            <FormLabel>Medications Prescribed</FormLabel>
            <Select
              size="small"
              displayEmpty
              value={medication}
              onChange={(e) => {
                addMedication(e.target.value);
                setMedication(e.target.value);
              }}
            >
              <MenuItem value="">Select Medication</MenuItem>
              <MenuItem value="Amoxilin">Amoxilin</MenuItem>
              <MenuItem value="Albucare">Albucare</MenuItem>
              <MenuItem value="Aspirin">Aspirin</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>

            {selectedMedications.length > 0 && (
              <Box display="flex" alignItems="center" gap={1} flexWrap="wrap" mt={2}>
                {selectedMedications.map((med, idx) => {
                  return (
                    <Tooltip
                      key={idx}
                      title={`Click to remove ${med}`}
                      placement="top"
                      onClick={() => removeMedication(med)}
                    >
                      <Chip label={med} />
                    </Tooltip>
                  );
                })}
              </Box>
            )}
          </FormControl>

          <Box display="flex" alignItems="center" justifyContent="flex-end" gap={2}>
            <Button
              variant="info"
              onClick={() => {
                formik.handleReset();
                setSelectedDescriptions([]);
                setSelectedMedications([]);
              }}
            >
              Reset
            </Button>

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
