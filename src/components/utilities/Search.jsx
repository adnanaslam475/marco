import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Slide from "@mui/material/Slide";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useNavigate, useLocation } from "react-router-dom";

// custom imports
import theme from "../../assets/theme";

const SearchBar = (props) => {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let navigate = useNavigate();
  const [message, setMessage] = useState("");

  const paramsearchbarcheck = params.get("q");
  // q = ev.target.value.split(/[, ]+/)
  // fq = props.filter

  const GoTosearch = (q, fq, filter, fields, start, sort, ord) => {
    if (paramsearchbarcheck) {
      navigate(
        `/search?q=${q}&fq=${fq}&filter=${filter}&fields=${fields}&start=${start}&sort=${sort}&ord=${ord}`,
        {
          state: {
            pathname: "/search",
            // http://localhost:5000/apicheckboxesfacets?online=all&filter=5&query=milano+citt%25C3%25A0&fields=tagfamilyall&start=0&sort=_score&ord=desc
            search: `?q=${q}&fq=${fq}&filter=${filter}&fields=${fields}&start=${start}&sort=${sort}&ord=${ord}`,
            hash: "",
            key: "search-result-page",
          },
        }
      );
      // window.location.reload();
    } else {
      // i parametri sono:
      // - query (q),
      // - online (fq)
      // - filter [1,2,3,4,5]
      // - fields []
      // - start [0,1,2,3,...]
      // - sort [_score, tag008date, ...]
      // - ord [desc, asc]
      navigate(
        `/search?q=${q}&fq=${fq}&filter=${filter}&fields=${fields}&start=${start}&sort=${sort}&ord=${ord}`,
        {
          state: {
            pathname: "/search",
            search: `?q=${q}&fq=${fq}&filter=${filter}&fields=${fields}&start=${start}&sort=${sort}&ord=${ord}`,
            hash: "",
            key: "search-result-page",
          },
        }
      );
    }
  };

  return (
    <Slide
      direction="left"
      in={true}
      timeout={{ appear: 500, enter: 500, exit: 500 }}
    >
      <Box
        sx={{
          "& > :not(style)": {
            m: 1,
            backgroundColor: theme.palette.secondary.main,
            borderRadius: 2,
          },
        }}
      >
        <TextField
          color="secondary"
          focused
          sx={{
            marginLeft: "auto",
            marginRight: "auto",
            paddingBottom: 0,
            fontWeight: 500,
            input: {
              borderRadius: 1,
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.secondary.main,
              height: "1rem",
              marginY: "0.5rem",
            },
            inputLabel: {
              color: theme.palette.common.white,
              borderRadius: 1,
              marginY: 0,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{
                  marginY: 0,
                }}
              >
                <IconButton
                  onClick={() => {
                    if (message)
                      GoTosearch(
                        message.replace(/\s/g, "+"),
                        props.fq,
                        props.filter,
                        props.fields,
                        props.start,
                        props.sort,
                        props.ord
                      );
                  }}
                  aria-label="search"
                  sx={{
                    marginY: 0,
                  }}
                >
                  <SearchIcon
                    sx={{
                      marginY: 0,
                    }}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          id="input-with-icon-textfield"
          placeholder="es.: storia di Milano"
          fullWidth
          variant="outlined"
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(ev) => {
            if (ev.key === "Enter") {
              GoTosearch(
                ev.target.value.replace(/\s/g, "+"),
                props.fq,
                props.filter,
                props.fields,
                props.start,
                props.sort,
                props.ord
              );
            }
          }}
          value={message}
        />
        {/* chiude TextField */}
      </Box>
    </Slide>
  );
};

export default SearchBar;
