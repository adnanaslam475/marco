import React from "react";
import {
  List,
  Divider,
  Box,
  Paper,
  Grid,
  Container,
  Grow,
  Typography,
} from "@mui/material";

// custom imports
import FullWidthTabs from "../ui/header/FullWidthTabs";
import HomePageResultBox from "../ui/HomePageResultBox";
import Masonry from "react-masonry-css";
import { API_URL } from "../utilities/apiUrl";

const Home = () => {
  const breakpoints = {
    default: 2,
    900: 1,
  };

  // LINK IN PRODUZIONE
  // https://stackoverflow.com/questions/69955965/proxying-api-requests-in-production-for-react-express-app

  const economia = `${API_URL}apisearchbase?online=all&filter=5&query=economia&fields=tagfamilyall&start=0&sort=_score&ord=desc`;
  const economiaEgiurisprudenza = `${API_URL}apisearchbase?online=all&filter=5&query=economia,giurisprudenza&fields=tagfamilyall&start=0&sort=_score&ord=desc`;
  const giurisprudenza = `${API_URL}apisearchbase?online=all&filter=5&query=giurisprudenza&fields=tagfamilyall&start=0&sort=_score&ord=desc`;

  // const economia = "apisearch?online=all&filter=1&query=economia"
  // const economiaEgiurisprudenza = "apisearch?online=all&filter=1&query=economia,giurisprudenza"
  // const giurisprudenza = "apisearch?online=all&filter=1&query=giurisprudenza"

  // const lettereEfilosofia = 'search?online=all&query=lettere,filosofia'

  // const medicinaEchirurgia = 'https://5eksdshftf.execute-api.eu-west-1.amazonaws.com/v1/search?online=all&query=medicina,chirurgia'
  // const psicologia = 'https://5eksdshftf.execute-api.eu-west-1.amazonaws.com/v1/search?online=all&query=psicologia'
  // const scienzeAgrarieAlimentariEambientali = 'https://5eksdshftf.execute-api.eu-west-1.amazonaws.com/v1/search?online=all&query=agraria,ambiente,alimentazione'
  // const scienzeBancarieFinanziarieEassicurative = 'https://5eksdshftf.execute-api.eu-west-1.amazonaws.com/v1/search?online=all&query=scienze bancarie'

  // const scienzeDellaformazione = 'https://5eksdshftf.execute-api.eu-west-1.amazonaws.com/v1/search?online=all&query=scienze della formazione'
  // const scienzeLinguisticheEletteratureStraniere = 'https://5eksdshftf.execute-api.eu-west-1.amazonaws.com/v1/search?online=all&query=scienze linguistiche'
  // const scienzeMatematicheFisicheEnaturali = 'https://5eksdshftf.execute-api.eu-west-1.amazonaws.com/v1/search?online=all&query=matematica,fisica'
  // const scienzePoliticheEsociali = 'https://5eksdshftf.execute-api.eu-west-1.amazonaws.com/v1/search?online=all&query=scienze politiche,scienze sociali'

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3} direction="row" align="center">
          <Grid item xs={12} display="flex">
            {/* qui le tabs */}
            <FullWidthTabs />
          </Grid>
        </Grid>
      </Box>

      <Container
        maxWidth="xl"
        sx={{
          marginY: "2rem",
        }}
      >
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          <Grow in={true} timeout={{ appear: 2000, enter: 2000, exit: 2000 }}>
            <Paper
              elevation={3}
              sx={{
                marginY: 0,
              }}
            >
              <List
                sx={{
                  marginY: 0,
                  paddingY: 0,
                }}
              >
                <HomePageResultBox url={economia} title="Economia" />
              </List>
            </Paper>
          </Grow>

          <Grow in={true} timeout={{ appear: 2000, enter: 2000, exit: 2000 }}>
            <Paper
              elevation={3}
              sx={{
                marginY: 0,
              }}
            >
              <List
                sx={{
                  marginY: 0,
                  paddingY: 0,
                }}
              >
                <HomePageResultBox
                  url={economiaEgiurisprudenza}
                  title="Economia e giurisprudenza"
                />
              </List>
            </Paper>
          </Grow>

          <Grow in={true} timeout={{ appear: 2000, enter: 2000, exit: 2000 }}>
            <Paper
              elevation={3}
              sx={{
                marginY: 0,
              }}
            >
              <List
                sx={{
                  marginY: 0,
                  paddingY: 0,
                }}
              >
                <HomePageResultBox
                  url={giurisprudenza}
                  title="Giurisprudenza"
                />
              </List>
            </Paper>
          </Grow>
        </Masonry>
      </Container>
    </React.Fragment>
  );
};

export default Home;
