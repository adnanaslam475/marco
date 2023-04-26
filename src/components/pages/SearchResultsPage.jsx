import React, { useEffect } from "react";
import { Container, Grid, Paper, List } from "@mui/material";
import Masonry from "react-masonry-css";
import { useLocation } from "react-router-dom";
import Grow from "@mui/material/Grow";

// custom import
import FullWidthTabs from "../ui/header/FullWidthTabs";
import ResultSummaryBar from "../ui/ResultSummaryBar";
import ResultBox from "../ui/ResultBox";
import { API_URL } from "../utilities/apiUrl";

const SearchResultsPage = () => {
  let location = useLocation();
  let params = new URLSearchParams(location.search);

  const query = encodeURI(
    params.get("q").replace(/\s/g, "+").replaceAll(";", "")
  ).replaceAll("|", "");
  console.log("[SearchResultPage.js] const query: ", query);
  const fields = params.get("fields");
  console.log("[SearchResultPage.js] const fields: ", fields);
  const sort = params.get("sort");

  const box1url = `${API_URL}apisearchbase?online=${params.get(
    "fq"
  )}&filter=1&query=${encodeURI(
    query
  )}&fields=${fields}&start=0&sort=${sort}&ord=desc`;
  const box2url = `${API_URL}apisearchbase?online=${params.get(
    "fq"
  )}&filter=2&query=${encodeURI(
    query
  )}&fields=${fields}&start=0&sort=${sort}&ord=desc`;
  const box3url = `${API_URL}apisearchbase?online=${params.get(
    "fq"
  )}&filter=3&query=${encodeURI(
    query
  )}&fields=${fields}&start=0&sort=${sort}&ord=desc`;
  const box4url = `${API_URL}apisearchbase?online=${params.get(
    "fq"
  )}&filter=4&query=${encodeURI(
    query
  )}&fields=${fields}&start=0&sort=${sort}&ord=desc`;

  // console.log('[SearchResultPage.js] const box1url: ', box1url);

  // Masonry custom
  const breakpoints = {
    default: 2,
    900: 1,
  };

  // const per faccette tipologie

  return (
    <React.Fragment>
      <Grid container spacing={0} direction="row" align="center">
        <Grid item xs={12} display="flex">
          {/* here goes tab online/offline  */}
          <FullWidthTabs tabfocus={params.get("fq")} />
        </Grid>
      </Grid>

      {/* ResultSummaryBar */}
      {/* // this is the most important component, a tool to refine search, user's choices and values must be stored */}
      <ResultSummaryBar queryraw={query} />

      <Container maxWidth="xl" sx={{ marginTop: "2rem" }}>
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          <Grow in={true} timeout={{ appear: 2000, enter: 2000, exit: 2000 }}>
            <Paper elevation={3}>
              <List>
                <ResultBox
                  url={box1url}
                  online={params.get("fq")}
                  filter={1}
                  boxtype="Testi a stampa"
                  hashid="box1"
                />
              </List>
            </Paper>
          </Grow>

          <Grow in={true} timeout={{ appear: 2000, enter: 2000, exit: 2000 }}>
            <Paper elevation={3}>
              <List>
                <ResultBox
                  url={box2url}
                  online={params.get("fq")}
                  filter={2}
                  boxtype="Periodici"
                  hashid="box2"
                />
              </List>
            </Paper>
          </Grow>

          <Grow in={true} timeout={{ appear: 2000, enter: 2000, exit: 2000 }}>
            <Paper elevation={3}>
              <List>
                <ResultBox
                  url={box3url}
                  online={params.get("fq")}
                  filter={3}
                  boxtype="Libri antichi"
                  hashid="box3"
                />
              </List>
            </Paper>
          </Grow>

          <Grow in={true} timeout={{ appear: 2000, enter: 2000, exit: 2000 }}>
            <Paper elevation={3}>
              <List>
                <ResultBox
                  url={box4url}
                  online={params.get("fq")}
                  filter={4}
                  boxtype="Altre tipologie"
                  hashid="box4"
                />
              </List>
            </Paper>
          </Grow>
        </Masonry>
      </Container>
    </React.Fragment>
  );
};

export default SearchResultsPage;
