import React from "react";

import Container from "@mui/material/Container";
import Slide from "@mui/material/Slide";
import Grow from "@mui/material/Grow";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import { useLocation } from "react-router-dom";

import ResultBoxSearchList from "../ui/ResultBoxSearchlist";
import DataPagination from "../ui/DataPagination";
import FullWidthTabs from "../ui/header/FullWidthTabs";
import ResultSummaryBar from "../ui/ResultSummaryBar";
import { API_URL } from "../utilities/apiUrl";
import ApiFunc from "../utilities/apiFunc";
import { useState } from "react";

const ResultList = (props) => {
  let location = useLocation();
  const { ...arr } = props;
  const [page, setPage] = useState(1);
  let params = new URLSearchParams(location.search);
  // console.log("arr---------------", arr);

  const query = encodeURI(
    params.get("q").replace(/\s/g, "+").replaceAll(";", "")
  ).replaceAll("|", "");
  // console.log("[SearchResultPage.js] const query: ", query);
  const fields = params.get("fields") || "tagfamilyall";
  const sort = params.get("sort") || "_score";

  const box4url = `${API_URL}apisearchbase?online=${params.get(
    "fq"
  )}&filter=4&query=${encodeURI(
    query
  )}&fields=${fields}&start=0&sort=${sort}&ord=desc&page=${page}`;

  const { data } = ApiFunc(box4url);
  console.log("data53---------", data);

  return (
    <React.Fragment>
      <Grid container spacing={0} direction="row" align="center">
        <Grid item xs={12} display="flex">
          {/* qui le tabs */}
          <FullWidthTabs tabfocus={params.get("fq")} />
        </Grid>
      </Grid>

      {/* qui la ResultSummaryBar (è già un container) */}
      <ResultSummaryBar
        queryraw={params.get("q").toString().replace(/,/g, " ")}
      />

      <Container
        maxWidth="xl"
        sx={{
          marginTop: "1rem",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
            <Slide
              direction="right"
              in={true}
              timeout={{ appear: 500, enter: 500, exit: 500 }}
            >
              <Paper
                elevation={2}
                sx={{
                  paddingY: "1rem",
                }}
              >
                <DataPagination
                  onChange={(_, p) => setPage(p)}
                  page={page}
                  count={location.state.data_arr.risultati}
                />
              </Paper>
            </Slide>
          </Grid>

          <Grid item xs={12} lg={12}>
            <Grow in={true} timeout={{ appear: 2000, enter: 2000, exit: 2000 }}>
              <Paper elevation={3}>
                <List>
                  <ResultBoxSearchList
                    data_array={location.state.data_arr.hits}
                    boxtype={location.state.boxtype}
                    risultati={location.state.data_arr.risultati}
                    hashid="box1"
                  />
                </List>
              </Paper>
            </Grow>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default ResultList;
