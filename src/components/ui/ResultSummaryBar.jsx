import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  Container,
  Button,
  Box,
  Slide,
  CardContent,
  Typography,
  AppBar,
} from "@mui/material";
import {
  Toolbar,
  Divider,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import SummaryResultItem from "./SummaryResultItem";
import Facetsidebar from "./Facetsidebar";
import FacetColumnClassic from "./FacetColumnClassic";
import theme from "../../assets/theme";
import ConsoleSwitchContainer from "./filters/ConsoleSwitchContainer";
import CustomizedSwitches from "./filters/IosSwitch";

import ConsoleSwitch from "./filters/ConsoleSwitch";
import ApiFunc from "../utilities/apiFunc";
import { API_URL } from "../utilities/apiUrl";
import { materialtype } from "../../constants";

const ResultSummaryBar = (props) => {
  const navigate = useNavigate();
  let location = useLocation();
  let params = new URLSearchParams(location.search);

  // var userChoicesDict = {};

  // To store user choices, you can update the query parameters in the URL with the new values.
  // For example, if the user selects a value in a dropdown,
  // you can update the corresponding query parameter with the selected value.
  // You can do this by creating a function that updates the query parameters and sets them to the new value:
  const updateQueryParam = (paramName, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(paramName, value);
    navigate.push({ search: searchParams.toString() });
  };

  // Here, paramName is the name of the query parameter you want to update, and value is the new value for that parameter.
  // location and history are both provided by the useLocation and useHistory hooks from react-router-dom.
  // You can then call this function from your component when the user selects a new value:
  const handleDropdownChange = (event) => {
    updateQueryParam("selectedValue", event.target.value);
  };

  const query = encodeURI(
    params.get("q").replace(/\s/g, "+").replaceAll(";", "")
  ).replaceAll("|", "");
  // console.log("[ResultSummaryBar.js] const query: ",query);
  const fields = params.get("fields");
  const sort = params.get("sort");
  const ord = params.get("ord");

  // URL API CALLS
  // https://stackoverflow.com/questions/69955965/proxying-api-requests-in-production-for-react-express-app
  const box1url = `${API_URL}apisearchbase?online=${params.get(
    "fq"
  )}&filter=1&query=${encodeURI(
    query
  )}&fields=${fields}&start=0&sort=${sort}&ord=${ord}`;
  const box2url = `${API_URL}apisearchbase?online=${params.get(
    "fq"
  )}&filter=2&query=${encodeURI(
    query
  )}&fields=${fields}&start=0&sort=${sort}&ord=${ord}`;
  const box3url = `${API_URL}apisearchbase?online=${params.get(
    "fq"
  )}&filter=3&query=${encodeURI(
    query
  )}&fields=${fields}&start=0&sort=${sort}&ord=${ord}`;
  const box4url = `${API_URL}apisearchbase?online=${params.get(
    "fq"
  )}&filter=4&query=${encodeURI(
    query
  )}&fields=${fields}&start=0&sort=${sort}&ord=${ord}`;

  // checkboxes console
  // facets api call, response with several arrays: bibliographic material type | language | year | branch | location
  const checkboxesUrl = `${API_URL}apicheckboxesfacets?online=${params.get(
    "fq"
  )}&filter=5&query=${encodeURI(
    query
  )}&fields=${fields}&start=0&sort=${sort}&ord=${ord}`;
  const { data } = ApiFunc(checkboxesUrl);

  return (
    <Box sx={{ flexGrow: 1, marginY: "2rem" }}>
      <Container maxWidth="xl">
        <Slide
          direction="right"
          in={true}
          timeout={{ appear: 1000, enter: 1000, exit: 1000 }}
        >
          <Card elevation={3}>
            <AppBar
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.primary.main,
              }}
              position="static"
              elevation={0}
            >
              <Toolbar>
                <Typography variant="h6">La tua ricerca</Typography>
              </Toolbar>
              <Divider />
            </AppBar>

            <CardContent>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  color: theme.palette.primary.main,
                }}
              >
                hai cercato
                <span className="spann">"{props.queryraw}"</span>e lo hai
                trovato in:
              </Typography>

              {/* pulsanti anchor veloci da risultati box */}
              <Typography
                variant="body1"
                component="div"
                sx={{
                  color: theme.palette.primary.main,
                  marginY: "1rem",
                }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                  <SummaryResultItem
                    url={box1url}
                    type={"Testi a stampa"}
                    hashlink={`/search?q=${query}&fq=${params.get(
                      "fq"
                    )}&filter=5&fields=${fields}&start=0&sort=${sort}&ord=desc#box1`}
                  />
                  <SummaryResultItem
                    url={box2url}
                    type={"Periodici"}
                    hashlink={`/search?q=${query}&fq=${params.get(
                      "fq"
                    )}&filter=5&fields=${fields}&start=0&sort=${sort}&ord=desc#box2`}
                  />
                  <SummaryResultItem
                    url={box3url}
                    type={"Libri antichi"}
                    hashlink={`/search?q=${query}&fq=${params.get(
                      "fq"
                    )}&filter=5&fields=${fields}&start=0&sort=${sort}&ord=desc#box3`}
                  />
                  <SummaryResultItem
                    url={box4url}
                    type={"Altre tipologie"}
                    hashlink={`/search?q=${query}&fq=${params.get(
                      "fq"
                    )}&filter=5&fields=${fields}&start=0&sort=${sort}&ord=desc#box4`}
                  />
                </Stack>
              </Typography>
            </CardContent>

            {/* accordion dashboard/console di affinamento */}
            <Accordion>
              <AccordionSummary
                // sx={{
                //   backgroundColor: '#395883'
                // }}
                expandIcon={<ExpandMoreIcon color="primary" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6" color="primary">
                  Affina la tua ricerca
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Container maxWidth="xl" sx={{ marginTop: "1rem" }}>
                  {/* a ConsoleSwitchContainer in components/ui/filters/ vanno passate props con le faccette  */}

                  <ConsoleSwitchContainer arr={data} />

                  <CustomizedSwitches label="risorse disponibili online" />

                  {/* due colonne facets qui */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} lg={12}>
                      <Divider
                        sx={{ marginTop: "2rem", marginBottom: "1rem" }}
                      />
                    </Grid>

                    {/* colonna sx marc21 facets */}
                    <Facetsidebar
                      query={params.get("q")}
                      filter="1"
                      // boxtype={location.state.boxtype}
                      online={params.get("fq")}
                    />

                    {/* colonna dx classic facets */}
                    <Grid item xs={12} lg={6}>
                      <Typography
                        variant="h6"
                        color="primary"
                        sx={{ marginBottom: "1rem" }}
                      >
                        Per Contenuto
                      </Typography>
                      <FacetColumnClassic
                        query={params.get("q")}
                        online={params.get("fq")}
                      />
                    </Grid>

                    <Grid item xs={12} lg={12}>
                      <Divider
                        sx={{
                          marginY: "2rem",
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    variant="contained"
                    sx={{
                      marginY: "1rem",
                    }}
                  >
                    Applica i filtri
                  </Button>
                </Container>

                {/* applica i filtri */}
                <Container
                  maxWidth="lg"
                  sx={{
                    marginTop: "1rem",
                  }}
                ></Container>
              </AccordionDetails>
            </Accordion>
          </Card>
        </Slide>
      </Container>
    </Box>
  );
};

export default ResultSummaryBar;
