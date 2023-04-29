import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

// custom imports
import ApiFunc from "../../utilities/apiFunc";
import LoadingSpinner from "../../utilities/LoadingSpinner";
import theme from "../../../assets/theme";
import { API_URL } from "../../utilities/apiUrl";

const CoverImg = (props) => {
  const url = `${API_URL}getcover?bibid=${props.bibid}&size=${props.size}`;
  const { data, error, loading } = ApiFunc(url);

  // console.log('CoverImg-bibid data: ', data);

  return (
    // <Paper>
    <React.Fragment>
      {!loading && <LoadingSpinner />}
      {error && <p>Errore: {error}</p>}
      {data?.coverimg && data?.coverimg.length > 0 && (
        <Box
          component="img"
          alt="immagine di copertina"
          src={data["coverimg"]}
          sx={{
            maxWidth: "100%",
            padding: 0,
            margin: 0,
            boxShadow: theme.shadows[4],
          }}
        />
      )}
      {/* // </Paper> */}
    </React.Fragment>
  );
};

export default CoverImg;
