import { createTheme } from "@mui/material/styles";
import ComponentsOverrides from "./core/components";
import palette from "./core/colors";

const theme = createTheme({ palette });

theme.components = ComponentsOverrides(theme);

export default theme;
