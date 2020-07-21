import React from "react";
import "./App.css";
import { GuidedTourProvider } from "./guidedTour";
import { ProductLineSelector } from "./ProductLineSelector";
import { ProductLineTourStop } from "./guidedTour/stops/ProductLineTourStop";
import { ProductColorSelector } from "./ProductColorSelector";
import { Grid } from "@material-ui/core";
import { ProductSizeSelector } from "./ProductSizeSelector";

function App() {
  return (
    <div className="App">
      <GuidedTourProvider startWith={ProductLineTourStop}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <ProductLineSelector />
          </Grid>
          <Grid item>
            <ProductColorSelector />
          </Grid>
          <Grid item>
            <ProductSizeSelector />
          </Grid>
        </Grid>
      </GuidedTourProvider>
    </div>
  );
}

export default App;
