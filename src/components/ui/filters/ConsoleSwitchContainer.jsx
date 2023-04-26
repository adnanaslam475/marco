import React from "react";
import { useLocation } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Box, Grid, Container } from "@mui/material";

import theme from "../../../assets/theme";
import ConsoleSwitch from "./ConsoleSwitch";

const ConsoleSwitchContainer = (props) => {
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1, marginY: "2rem" }}>
        <Container maxWidth="xl">
          <Grid container spacing={5}>
            <Grid item xs={12} md={12} lg={4}>
              <ConsoleSwitch arr={props.arr.materialtype} />
            </Grid>
            {/*           
          <Grid item xs={12} md={12} lg={4}>
            <ConsoleSwitch arr={lingua} />
          </Grid>

          <Grid item xs={12} md={12} lg={4}>
            <ConsoleSwitch arr={date} />
          </Grid>

          
          <Grid item xs={12} md={12} lg={4}>
            <ConsoleSwitch arr={sede} />
          </Grid>

          <Grid item xs={12} md={12} lg={4}>
            <ConsoleSwitch arr={ubicazione} />
          </Grid> */}
          </Grid>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default ConsoleSwitchContainer;
