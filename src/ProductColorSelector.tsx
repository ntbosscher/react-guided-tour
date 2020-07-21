import React, { useCallback, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useGuidedTour } from "./guidedTour";
import { ProductColorTourStop } from "./guidedTour/stops/ProductColorTourStop";
import { ProductSizeTourStop } from "./guidedTour/stops/ProductSizeTourStop";

const selectStyle = {
  width: "300px",
};

export function ProductColorSelector(props: {}) {
  const tour = useGuidedTour();
  const [value, setValue] = useState(10);
  const handleChange = useCallback(
    (e) => {
      setValue(e.target.value);
      tour.moveTo(ProductSizeTourStop);
    },
    [tour]
  );

  return (
    <ProductColorTourStop>
      <div>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Color</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChange}
            value={value}
            style={selectStyle}
          >
            <MenuItem value={10}>Blue</MenuItem>
            <MenuItem value={20}>Green</MenuItem>
            <MenuItem value={30}>Yellow</MenuItem>
          </Select>
        </FormControl>
      </div>
    </ProductColorTourStop>
  );
}
