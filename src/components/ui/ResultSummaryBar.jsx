import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AccordionSummary from "@mui/material/AccordionSummary";
import Accordion from "@mui/material/Accordion";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import AccordionDetails from "@mui/material/AccordionDetails";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Slider from "react-slick";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SummaryResultItem from "./SummaryResultItem";
import Facetsidebar from "./Facetsidebar";
import FacetColumnClassic from "./FacetColumnClassic";
import theme from "../../assets/theme";
import ConsoleSwitchContainer from "./filters/ConsoleSwitchContainer";
import CustomizedSwitches from "./filters/IosSwitch";

import ApiFunc from "../utilities/apiFunc";
import { API_URL } from "../utilities/apiUrl";
import {
  ArrowBackIos,
  ArrowForward,
  ArrowForwardIos,
} from "@mui/icons-material";

const normal = (obj) =>
  Object.keys(obj)
    .map((v) => (v + "=" + obj[v] || {}).trim())
    .join("&");

const ResultSummaryBar = (props) => {
  let location = useLocation();
  const [filters, setfilters] = useState({
    lang: [],
    locations: [],
    materialtype: [],
    sede: [],
    tag008date: [],
  });

  const [toggles, setToggles] = useState({});
  let params = new URLSearchParams(location.search);

  // const updateQueryParam = (paramName, value) => {
  //   const searchParams = new URLSearchParams(location.search);
  //   searchParams.set(paramName, value);
  //   navigate.push({ search: searchParams.toString() });
  // };

  const query = encodeURI(
    params.get("q").replace(/\s/g, "+").replaceAll(";", "")
  ).replaceAll("|", "");
  const fields = params.get("fields");
  const sort = params.get("sort");
  const ord = params.get("ord");

  // URL API CALLS

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
                  <ConsoleSwitchContainer
                    filters={filters}
                    setfilters={setfilters}
                    arr={data}
                  />
                  <CustomizedSwitches
                    toggles={toggles}
                    setToggles={setToggles}
                    label="risorse disponibili online"
                  />
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
                      toggles={toggles}
                      setToggles={setToggles}
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
                        setToggles={setToggles}
                        toggles={toggles}
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
                  <Slider
                    dots={true}
                    infinite={true}
                    speed={500}
                    slidesToShow={3}
                    slidesToScroll={3}
                    arrows={true}
                    nextArrow={
                      <ArrowForwardIos
                        fontSize="large"
                        className="arrow"
                        color="primary"
                      />
                    }
                    prevArrow={
                      <ArrowBackIos
                        fontSize="large"
                        color="primary"
                        className="arrow"
                      />
                    }
                    responsive={[
                      {
                        breakpoint: 1024,
                        settings: {
                          slidesToShow: 3,
                          slidesToScroll: 3,
                        },
                      },
                    ]}
                  >
                    {[
                      "https://cdn.pixabay.com/photo/2015/04/19/08/32/rose-729509_960_720.jpg",
                      "https://cdn.pixabay.com/photo/2015/03/30/20/33/heart-700141_960_720.jpg",
                      "https://cdn.pixabay.com/photo/2012/03/04/01/01/father-22194_960_720.jpg",
                      "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg",
                      "https://cdn.pixabay.com/photo/2016/03/28/12/35/cat-1285634_960_720.png",
                      "https://cdn.pixabay.com/photo/2015/04/23/21/59/tree-736877_960_720.jpg",
                      "https://cdn.pixabay.com/photo/2017/07/24/19/57/tiger-2535888_960_720.jpg",
                      "https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_960_720.jpg",
                    ].map((v) => (
                      <div
                        className="aaaaaaaaa"
                        style={{ maxHeight: "200px" }}
                        key={v}
                      >
                        <img
                          src={v}
                          alt=""
                          style={{
                            width: "95%",
                            height: "200px",
                          }}
                          className=""
                        />
                      </div>
                    ))}
                  </Slider>

                  <Button
                    variant="contained"
                    sx={{
                      marginY: "1rem",
                    }}
                    onClick={() => {
                      history.pushState(
                        {},
                        "",
                        `${location.search}?${normal(filters)}&${normal(
                          toggles
                        )}`
                      );
                    }}
                  >
                    Applica i filtri
                  </Button>
                </Container>

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
