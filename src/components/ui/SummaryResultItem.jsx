import React from "react";
import ApiFunc from "../utilities/apiFunc";
import LoadingSpinner from "../utilities/LoadingSpinner";
import { Button } from "@mui/material";
import { HashLink } from "react-router-hash-link";

import theme from "../../assets/theme";

const SummaryResultItem = (props) => {
  const { data, error, loading } = ApiFunc(props.url);

  return (
    <React.Fragment>
      {!loading && <LoadingSpinner />}
      {error && <p>Errore: {error}</p>}
      {data && (
        <span>
          <Button variant="outlined">
            <HashLink
              smooth
              to={props.hashlink}
              style={{
                textDecoration: "none",
                color: theme.palette.primary.main,
              }}
            >
              {props.type} ({data?.risultati})
            </HashLink>
          </Button>
        </span>
      )}
    </React.Fragment>
  );
};

export default SummaryResultItem;
