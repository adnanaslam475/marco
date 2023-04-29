import * as React from "react";
import Box from "@mui/material/Box";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CancelIcon from "@mui/icons-material/Cancel";

import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";

// custom import
import { API_URL } from "../utilities/apiUrl";
import theme from "../../assets/theme";
import { generateUniqueKey } from "../utilities/RandomKeyGen";
import LoadingSpinner from "../utilities/LoadingSpinner";
import CustomizedSwitches, {
  CustomizedFilteredSwitches,
} from "./filters/IosSwitch";
import ApiFunc from "../utilities/apiFunc";
import { useState } from "react";

const FacetColumnClassic = (props) => {
  const { toggles, setToggles } = props;
  const url = `${API_URL}apifacetsclassic?online=${props.online}&query=${props.query}`;
  const [expanded, setExpanded] = useState("");
  const { data, error, loading } = ApiFunc(url);

  return (
    <React.Fragment>
      <Box
        sx={{
          backgroundColor: "transparent",
        }}
      >
        {!loading && <LoadingSpinner />}
        {error && <p>Errore: {error}</p>}
        {data?.facets.map((item) => {
          let values = Object.values(item);

          return (
            <Accordion
              key={generateUniqueKey()}
              expanded={expanded == item.facet_cat}
              onChange={() => {
                setExpanded(expanded == item.facet_cat ? "" : item.facet_cat);
              }}
              defaultExpanded={false}
            >
              <AccordionSummary
                key={generateUniqueKey()}
                expandIcon={<ExpandMoreIcon />}
                id={item.facet_cat}
                className=""
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
                  {values.length > 0 && (
                    <>
                      {values
                        .filter(
                          (v) => typeof v == "object" && (v.count || v.value)
                        )
                        .map((v, idx) => {
                          let vl = `${v.value} ${v.count}`;
                          return (
                            <ListItem key={idx} disablePadding>
                              <ListItemText
                                primary={vl}
                                sx={{
                                  color: theme.palette.primary.main,
                                }}
                              />
                              <CustomizedFilteredSwitches
                                onChange={(e) => {
                                  e.stopPropagation();
                                  const exist = e.target.name;
                                  let t = toggles[item.facet_cat] || [];
                                  if (t) {
                                    if (t.includes(exist)) {
                                      t = t.filter((v) => v !== vl);
                                    } else {
                                      t.push(exist);
                                    }
                                  }
                                  setToggles({
                                    ...toggles,
                                    [item.facet_cat]: t,
                                  });
                                }}
                                checked={toggles[item.facet_cat]?.includes(vl)}
                                name={vl}
                                id={vl}
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
    </React.Fragment>
  );
};

export default FacetColumnClassic;
