import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // width: ITEM_HEIGHT * 5,
    },
  },
};

const ConsoleSwitch = ({ cmpName, arr = [], filters = [], setfilters }) => {
  const handleChange = (event) => {
    const {
      target: { value, name, id },
    } = event;
    setfilters({
      ...filters,
      [name || id]: typeof value === "string" ? value.split(",") : value,
    });
  };

  return (
    <FormControl sx={{ m: 1, width: "100%" }}>
      <InputLabel id="demo-multiple-checkbox-label">{cmpName}</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id={cmpName}
        multiple
        name={cmpName}
        label={"Select " + cmpName}
        value={filters[cmpName] || []}
        onChange={handleChange}
        input={<OutlinedInput label={cmpName} />}
        renderValue={(selected) => {
          return filters[cmpName]?.join(", ");
        }}
        MenuProps={MenuProps}
      >
        {arr?.map((v, i) => {
          return (
            <MenuItem key={i} value={v?.value}>
              <Checkbox
                checked={filters[cmpName]?.indexOf(v?.value) > -1 || false}
              />
              <ListItemText primary={v?.value} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default ConsoleSwitch;
