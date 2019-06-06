import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearProgress from "@material-ui/core/LinearProgress";

import {useStyles} from "./styles";

// eslint-disable-next-line react/prop-types
export default function ShuttingDownDialog({shuttingDown}) {
    const classes = useStyles();

    return (
        <Dialog open={shuttingDown}>
            <DialogTitle>Shutdown</DialogTitle>
            <DialogContent className={classes.shutdownText}>
                <DialogContentText>This synthy-boi is shutting down now... bye!</DialogContentText>
                <LinearProgress />
            </DialogContent>
        </Dialog>
    );
}
