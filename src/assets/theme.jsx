import { createTheme } from "@mui/material";

const arcBlue = "#002F56";
const arcBlueLight = "#395883";
const arcBlueDark = "#00042d";
const white = "#FFFFFF";
const black = "rgba(0,0,0,.87)";
const black60 = "rgba(0,0,0,.60)";

const theme = createTheme({
  palette: {
    common: {
      blue: `${arcBlue}`,
      white: `${white}`,
      black: `${black}`,
    },
    primary: {
      main: `${arcBlue}`,
      light: `${arcBlueLight}`,
      dark: `${arcBlueDark}`,
      black: `${black}`,
      black60: `${black60}`,
    },
    secondary: {
      main: `${white}`,
    },
  },
  typography: {
    tab: {
      textTransform: "none",
      fontWeight: 700,
      fontSize: "1rem",
    },
  },
  MuiTypography: {
    styleOverrides: {
      h6: {
        "&.MyClass": { color: "red" },
      },
    },
  },
});

export default theme;
