import * as React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CancelIcon from "@mui/icons-material/Cancel";

// custom import
import { API_URL } from "../utilities/apiUrl";
import theme from "../../assets/theme";
import { generateUniqueKey } from "../utilities/RandomKeyGen";
import LoadingSpinner from "../utilities/LoadingSpinner";
import ApiFunc from "../utilities/apiFunc";
import CustomizedSwitches, {
  CustomizedFilteredSwitches,
} from "./filters/IosSwitch";

const Facetsidebar = (props) => {
  const { toggles, setToggles } = props;
  const [expanded, setExpanded] = React.useState("");
  const url = `${API_URL}apifacets?online=${props.online}&filter=${props.filter}&query=${props.query}`;

  const { data, error, loading } = ApiFunc(url);

  return (
    <React.Fragment>
      {!loading && <LoadingSpinner />}
      {error && <p>Errore: {error}</p>}

      {data?.facets && data.facets.length > 0 && (
        <Grid item xs={12} lg={6}>
          <Typography
            variant="h6"
            color="primary"
            sx={{
              marginBottom: "1rem",
            }}
          >
            Per tipo di campo
          </Typography>
          <Box
            sx={{
              backgroundColor: "transparent",
            }}
          >
            {data?.facets.map((item) => {
              let values = Object.values(item);

              return (
                <Accordion
                  key={generateUniqueKey()}
                  expanded={expanded == item.fam_name}
                  onChange={() => {
                    setExpanded(expanded == item.fam_name ? "" : item.fam_name);
                  }}
                  defaultExpanded={false}
                >
                  <AccordionSummary
                    key={generateUniqueKey()}
                    expandIcon={<ExpandMoreIcon />}
                    id={item.fam_name}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: theme.palette.primary.main,
                      }}
                      key={generateUniqueKey()}
                    >
                      {item.fam_name}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {values.length > 0 && (
                        <>
                          {values
                            .filter(
                              (value, idx, ref) =>
                                value.length && idx !== ref.length - 1
                            )
                            .map((v, index) => {
                              return (
                                <ListItem key={index} disablePadding>
                                  <ListItemText
                                    primary={v}
                                    sx={{
                                      color: theme.palette.primary.main,
                                    }}
                                  />
                                  <CustomizedFilteredSwitches
                                    onChange={(e) => {
                                      e.stopPropagation();
                                      const exist = e.target.name;
                                      let t = toggles[item.fam_name] || [];
                                      if (t) {
                                        if (t.includes(exist)) {
                                          t = t.filter((val) => val !== v);
                                        } else {
                                          t.push(exist);
                                        }
                                      }
                                      setToggles({
                                        ...toggles,
                                        [item.fam_name]: t,
                                      });
                                    }}
                                    checked={toggles[item.fam_name]?.includes(
                                      v
                                    )}
                                    name={v}
                                    id={v}
                                  />
                                </ListItem>
                              );
                            })}
                        </>
                      )}
                    </List>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default Facetsidebar;

// {data?.facets.map((item) => {
//   return (
//     <Accordion key={generateUniqueKey()} defaultExpanded={false}>
//       <AccordionSummary
//         key={generateUniqueKey()}
//         expandIcon={<ExpandMoreIcon />}
//         aria-controls="panel1a-content"
//         id="panel1a-header"
//       >
//         <Typography
//           variant="h6"
//           sx={{
//             color: theme.palette.primary.main,
//           }}
//           key={generateUniqueKey()}
//         >
//           {item.fam_name}
//         </Typography>
//       </AccordionSummary>
//       <AccordionDetails>
//         <List>
//           {!loading && <LoadingSpinner />}
//           {error && <p>Errore: {error}</p>}
//           {item["0"] && (
//             <ListItem disablePadding>
//               <ListItemText
//                 primary={item["0"]}
//                 sx={{
//                   color: theme.palette.primary.main,
//                 }}
//               />
//               <CustomizedFilteredSwitches label="" />
//             </ListItem>
//           )}
//         </List>
//       </AccordionDetails>
//     </Accordion>
//   );
// })}
