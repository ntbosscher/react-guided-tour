import React, { useCallback, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { ProductSizeTourStop } from "./guidedTour/stops/ProductSizeTourStop";

const selectStyle = {
  width: "300px",
};

export function ProductSizeSelector(props: {}) {
  const [value, setValue] = useState(10);
  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return (
    <ProductSizeTourStop>
      <div>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Size</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChange}
            value={value}
            style={selectStyle}
          >
            <MenuItem value={10}>Small</MenuItem>
            <MenuItem value={20}>Medium</MenuItem>
            <MenuItem value={30}>Large</MenuItem>
          </Select>
        </FormControl>
      </div>
    </ProductSizeTourStop>
  );
}
