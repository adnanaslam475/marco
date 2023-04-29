import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ConsoleSwitch from "./ConsoleSwitch";

const ConsoleSwitchContainer = (props) => {
  const { arr, filters, setfilters } = props;
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1, marginY: "2rem" }}>
        <Container maxWidth="xl">
          <Grid container spacing={5}>
            <Grid item xs={12} md={12} lg={4}>
              <ConsoleSwitch
                filters={filters}
                setfilters={setfilters}
                cmpName="lang"
                arr={arr?.lang}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={4}>
              <ConsoleSwitch
                filters={filters}
                setfilters={setfilters}
                cmpName="location"
                arr={arr?.locations}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <ConsoleSwitch
                filters={filters}
                setfilters={setfilters}
                cmpName="materialtype"
                arr={arr?.materialtype}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={4}>
              <ConsoleSwitch
                filters={filters}
                setfilters={setfilters}
                cmpName="sede"
                arr={arr?.sede}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <ConsoleSwitch
                filters={filters}
                setfilters={setfilters}
                cmpName="tag008date"
                arr={arr?.tag008date}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default ConsoleSwitchContainer;
