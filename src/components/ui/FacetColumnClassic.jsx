import * as React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

// custom import
import { API_URL } from "../utilities/apiUrl";
import theme from "../../assets/theme";
import { generateUniqueKey } from "../utilities/RandomKeyGen";
import LoadingSpinner from "../utilities/LoadingSpinner";
import CustomizedSwitches from "./filters/IosSwitch";
import ApiFunc from "../utilities/apiFunc";

const FacetColumnClassic = (props) => {
  //   console.log('FacetClassicsidebar Query:',props.query);
  //   console.log('FacetClassicsidebar online:',props.online);

  // LINK IN PRODUZIONE
  // https://stackoverflow.com/questions/69955965/proxying-api-requests-in-production-for-react-express-app
  const url = `${API_URL}/apifacetsclassic?online=${props.online}&query=${props.query}`;

  // console.log('apifacetsclassic URL', url);
  const { data, error, loading } = ApiFunc(url);
  // console.log('apifacetclassic data: ',data);

  return (
    <React.Fragment>
      <Box
        sx={{
          backgroundColor: "transparent",
        }}
      >
        {!loading && <LoadingSpinner />}
        {error && <p>Errore: {error}</p>}
        {data?.facets.map((item) => (
          <Accordion key={generateUniqueKey()} defaultExpanded={false}>
            <AccordionSummary
              key={generateUniqueKey()}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.primary.main,
                }}
                key={generateUniqueKey()}
              >
                {item.facet_cat}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {item["0"]?.value && item["0"].value.length > 0 && (
                  <ListItem disablePadding>
                    <ListItemText
                      primary={`${item["0"].value} ${item["0"].count}`}
                      sx={{
                        color: theme.palette.primary.main,
                      }}
                    />
                    <CustomizedSwitches label="" />
                  </ListItem>
                )}

                {item["1"]?.value && item["1"].value.length > 0 && (
                  <ListItem disablePadding>
                    <ListItemText
                      primary={`${item["1"].value} ${item["1"].count}`}
                      sx={{
                        color: theme.palette.primary.main,
                      }}
                    />
                    <CustomizedSwitches label="" />
                  </ListItem>
                )}

                {item["2"]?.value && item["2"].value.length > 0 && (
                  <ListItem disablePadding>
                    <ListItemText
                      primary={`${item["2"].value} ${item["2"].count}`}
                      sx={{
                        color: theme.palette.primary.main,
                      }}
                    />
                    <CustomizedSwitches label="" />
                  </ListItem>
                )}

                {item["3"]?.value && item["3"].value.length > 0 && (
                  <ListItem disablePadding>
                    <ListItemText
                      primary={`${item["3"].value} ${item["3"].count}`}
                      sx={{
                        color: theme.palette.primary.main,
                      }}
                    />
                    <CustomizedSwitches label="" />
                  </ListItem>
                )}

                {item["4"]?.value && item["4"].value.length > 0 && (
                  <ListItem disablePadding>
                    <ListItemText
                      primary={`${item["4"].value} ${item["4"].count}`}
                      sx={{
                        color: theme.palette.primary.main,
                      }}
                    />
                    <CustomizedSwitches label="" />
                  </ListItem>
                )}

                {item["5"]?.value && item["5"].value.length > 0 && (
                  <ListItem disablePadding>
                    <ListItemText
                      primary={`${item["5"].value} ${item["5"].count}`}
                      sx={{
                        color: theme.palette.primary.main,
                      }}
                    />
                    <CustomizedSwitches label="" />
                  </ListItem>
                )}

                {item["6"]?.value && item["6"].value.length > 0 && (
                  <ListItem disablePadding>
                    <ListItemText
                      primary={`${item["6"].value} ${item["6"].count}`}
                      sx={{
                        color: theme.palette.primary.main,
                      }}
                    />
                    <CustomizedSwitches label="" />
                  </ListItem>
                )}

                {item["7"]?.value && item["7"].value.length > 0 && (
                  <ListItem disablePadding>
                    <ListItemText
                      primary={`${item["7"].value} ${item["7"].count}`}
                      sx={{
                        color: theme.palette.primary.main,
                      }}
                    />
                    <CustomizedSwitches label="" />
                  </ListItem>
                )}

                {item["8"]?.value && item["8"].value.length > 0 && (
                  <ListItem disablePadding>
                    <ListItemText
                      primary={`${item["8"].value} ${item["8"].count}`}
                      sx={{
                        color: theme.palette.primary.main,
                      }}
                    />
                    <CustomizedSwitches label="" />
                  </ListItem>
                )}

                {item["9"]?.value && item["9"].value.length > 0 && (
                  <ListItem disablePadding>
                    <ListItemText
                      primary={`${item["9"].value} ${item["9"].count}`}
                      sx={{
                        color: theme.palette.primary.main,
                      }}
                    />
                    <CustomizedSwitches label="" />
                  </ListItem>
                )}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </React.Fragment>
  );
};

export default FacetColumnClassic;
