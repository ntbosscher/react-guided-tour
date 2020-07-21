import React, { useCallback, useState } from "react";
import { ProductLineTourStop } from "./guidedTour/stops/ProductLineTourStop";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useGuidedTour } from "./guidedTour";
import { ProductColorTourStop } from "./guidedTour/stops/ProductColorTourStop";

const selectStyle = {
  width: "300px",
};

export function ProductLineSelector(props: {}) {
  const tour = useGuidedTour();
  const [value, setValue] = useState(0);
  const handleChange = useCallback(
    (e) => {
      setValue(e.target.value);
      tour.moveTo(ProductColorTourStop);
    },
    [tour]
  );

  return (
    <ProductLineTourStop>
      <div>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Product</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChange}
            value={value}
            style={selectStyle}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
    </ProductLineTourStop>
  );
}
