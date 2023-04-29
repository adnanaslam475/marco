import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

// custom import
import theme from "../../assets/theme";
import { generateUniqueKey } from "../utilities/RandomKeyGen";
import LoadingSpinner from "../utilities/LoadingSpinner";
import ApiFunc from "../utilities/apiFunc";
import BibModal from "./bibrecord/BibModal";

// // given a location like this:
// let location = {
//   pathname: "/bbq/pig-pickins",
//   search: "?campaign=instagram&popular=true",
//   hash: "",
//   state: null,
//   key: "aefz24ie",
// };

// // we can turn the location.search into URLSearchParams
// let params = new URLSearchParams(location.search);
// params.get("campaign"); // "instagram"
// params.get("popular"); // "true"
// params.toString(); // "campaign=instagram&popular=true",

const ResultBox = (props) => {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  const navigate = useNavigate();

  // route change forse da spostare nel permalink della modal bibliografica
  // const routeChange = (bibid) => {
  //   const path = generatePath('/item/:bibid', { bibid });
  //   navigate(path, { replace: true });
  // };

  const url = props.url;
  const { data, error, loading } = ApiFunc(url);

  const [open, setOpen] = useState(null);
  const [item, setItem] = useState(null);
  const handleOpen = (item) => {
    setOpen(true);
    setItem(item);
  };
  const handleClose = () => {
    setOpen(null);
    setItem(null);
  };

  return (
    <React.Fragment>
      {open && <BibModal open={open} item={item} onClose={handleClose} />}

      <ListItem
        id={props.hashid}
        sx={{
          marginBottom: "2rem",
          marginLeft: "1rem",
          marginTop: "1rem",
        }}
      >
        <ListItemText
          disableTypography
          primary={
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.primary.main,
                marginLeft: 0,
                marginRight: 0,
              }}
            >
              {!loading && <LoadingSpinner />}
              {error && <p>Errore: {error}</p>}
              {data && (
                <p sx={{ marginBottom: "4rem" }}>
                  {props.boxtype} ({data?.risultati})
                </p>
              )}
              {/* {!data && <LoadingSpinner />} */}
            </Typography>
          }
        />

        <Link
          onClick={() =>
            navigate(
              `/searchfilter?q=${params.get("q")}&fq=${params.get(
                "fq"
              )}&filter=${props.filter}`,
              {
                state: {
                  data_arr: data,
                  query: params.get("q"),
                  boxtype: props.boxtype,
                  filter: props.filter,
                  online: params.get("fq"),

                  pathname: `/searchfilter/${props.filter}`,
                  search: `?q=${params.get("q")}&fq=${params.get("fq")}`,
                  hash: "",
                  key: "searchfilter-result-page",
                },
              }
            )
          }
          sx={{
            textDecoration: "none",
          }}
        >
          {!loading && <LoadingSpinner />}
          {error && <p>Errore: {error}</p>}
          {data?.risultati > 0 ? (
            <Button
              variant="outlined"
              color="primary"
              sx={{
                marginRight: "2rem",
                textDecoration: "none",
              }}
            >
              vedi tutti i risultati
            </Button>
          ) : (
            ""
          )}
        </Link>
      </ListItem>
      <Divider
        sx={{
          width: "100%",
          marginY: "3rem",
        }}
      />

      {/* qui la lista dei 10 record preview */}
      {!loading && <LoadingSpinner />}
      {error && <p>Errore: {error}</p>}
      {data?.hits.map((item) => (
        <ListItem
          sx={{
            width: 1,
            marginLeft: 0,
            marginRight: 0,
            marginY: 0,
            paddingY: 0,
          }}
          key={generateUniqueKey()}
        >
          <Card
            key={generateUniqueKey()}
            elevation={0}
            sx={{
              width: 1,
              marginRight: 0,
              marginLeft: 0,
              marginY: 0,
              padding: 0,
            }}
          >
            <CardActionArea
              key={generateUniqueKey()}
              onClick={() => handleOpen(item)}
            >
              <CardContent key={generateUniqueKey()}>
                {/* <Typography 
                key={generateUniqueKey()} 
                variant="body2"
                sx={{
                  color: theme.palette.primary.main,
                }}
                >
                {item.id}
                </Typography> */}

                <Typography
                  key={generateUniqueKey()}
                  variant="body2"
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                >
                  {
                    // item.fields.tag100.replace(/,\s*$/, "").replace(/\.$/, "")
                    item.fields.tag100
                  }
                </Typography>

                <Typography
                  key={generateUniqueKey()}
                  variant="body2"
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                >
                  {
                    // item.fields.tag110.replace(/,\s*$/, "").replace(/\.$/, "")
                    item.fields.tag110
                  }
                </Typography>

                <Typography
                  key={generateUniqueKey()}
                  variant="body2"
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                >
                  {
                    // item.fields.tag111.replace(/,\s*$/, "").replace(/\.$/, "")
                    item.fields.tag111
                  }
                </Typography>

                <Typography
                  key={generateUniqueKey()}
                  gutterBottom
                  variant="h6"
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                >
                  {
                    // item.fields.tag245.replace(/\.$/, "")
                    item.fields.tag245
                  }
                </Typography>

                <Typography
                  key={generateUniqueKey()}
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                  variant="body2"
                >
                  {item.fields.tag260}
                </Typography>

                {item.fields.online[0] === "1" ? (
                  <Chip
                    sx={{
                      marginY: "1rem",
                    }}
                    color="primary"
                    key={generateUniqueKey()}
                    label="disponibile online"
                    variant="outlined"
                  />
                ) : (
                  ""
                )}
              </CardContent>
            </CardActionArea>
            <Divider key={generateUniqueKey()} />
          </Card>
        </ListItem>
      ))}
    </React.Fragment>
  );
};

export default ResultBox;
