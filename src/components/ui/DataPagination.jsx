import React from "react";
import Pagination from "@mui/material/Pagination";

const DataPagination = (props) => {
  const { onChange, page, count } = props;
  console.log("cpunt", count, count / 10);
  return (
    <Pagination
      onChange={onChange}
      showFirstButton={true}
      showLastButton={true}
      page={page}
      count={count / 10}
      color="primary"
      size="large"
    />
  );
};

export default DataPagination;
