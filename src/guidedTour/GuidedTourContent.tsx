import { Popper, Paper, Button, Grid } from "@material-ui/core";
import * as React from "react";
import { ReferenceObject } from "popper.js";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  GuidedTourContext,
  GuidedTourStopElementClassOrFunction,
} from "./index";
import { useCallback, useContext } from "react";

interface GuidedTourStop {
  anchor?: ReferenceObject;
  open: boolean;
  showOn?: "left" | "right";
  title: string;
  description: string;
  showNextButton: boolean;
  next?: GuidedTourStopElementClassOrFunction;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    popper: {
      zIndex: 10,
    },
    outer: {
      padding: theme.spacing(2),
    },
    wrapper: {
      padding: theme.spacing(2),
      maxWidth: "400px",
      minWidth: "300px",
    },
    actions: {
      paddingTop: theme.spacing(1),
    },
  })
);

export function GuidedTourContent(props: GuidedTourStop) {
  const styles = useStyles();
  const ctx = useContext(GuidedTourContext);
  const moveToNext = useCallback(() => {
    if (!!props.next) {
      ctx.moveTo(props.next);
      return;
    }

    if(ctx.canGoForward) {
        ctx.forward();
        return;
    }

    ctx.moveTo(null);
  }, [ctx, props.next]);

  console.log(ctx);

  if (!props.anchor) return null;

  const showNext = props.next || ctx.canGoForward;
  const showDone = props.showNextButton && !showNext;

  return (
    <Popper
      open={props.open}
      anchorEl={props.anchor}
      placement={props.showOn || "left"}
      className={styles.popper}
    >
      <div className={styles.outer}>
        <Paper elevation={3}>
          <div className={styles.wrapper}>
            <Typography key="title" variant="h6">
              {props.title}
            </Typography>
            <Typography key="description" variant="body1">
              {props.description}
            </Typography>
            <Grid container justify="space-between" className={styles.actions}>
              <Grid item key="exit">
                {!showDone && (
                  <Button
                    key="exit"
                    variant="text"
                    color="primary"
                    size="small"
                    onClick={ctx.exit}
                  >
                    Exit Tour
                  </Button>
                )}
              </Grid>
              <Grid item key="right">
                <Grid container spacing={1}>
                  {ctx.canGoBack && (
                    <Grid item key="back">
                      <Button
                        variant="text"
                        color="primary"
                        size="small"
                        onClick={ctx.back}
                      >
                        Back
                      </Button>
                    </Grid>
                  )}
                  {(showNext || showDone) && (
                    <Grid item key="next">
                      <Button
                        variant="text"
                        color="primary"
                        size="small"
                        onClick={moveToNext}
                      >
                        {showDone ? "Done" : "Next"}
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
    </Popper>
  );
}
