import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import {useStyles} from "./styles";

// eslint-disable-next-line react/prop-types
export default function NavigationButtons({instrumentDown, instrumentUp}) {
    const classes = useStyles();
    return (
        <Grid item className={classes.upDown}>
            <Grid item className={classes.buttonItem}>
                <Button variant="contained" className={classes.arrowButton} onClick={instrumentDown}>
                    <KeyboardArrowUpIcon />
                </Button>
            </Grid>
            <Grid item className={classes.buttonItem}>
                <Button variant="contained" className={classes.arrowButton} onClick={instrumentUp}>
                    <KeyboardArrowDownIcon />
                </Button>
            </Grid>
        </Grid>
    );
}
