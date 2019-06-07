import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearProgress from "@material-ui/core/LinearProgress";

import {useStyles} from "./styles";

// eslint-disable-next-line react/prop-types
export default function ShutdownDialog({showShutdownConfirm, toggleShutdownConfirm, shutdown, shuttingDown}) {
    const classes = useStyles();
    return (
        <Dialog classes={{paper: classes.dialog}} open={showShutdownConfirm}>
            <DialogTitle>Shutdown</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {shuttingDown
                        ? "This synthy-boi is shutting down now... bye!"
                        : "Are you sure you want to shutdown right now?"}
                </DialogContentText>
                {shuttingDown && <LinearProgress />}
            </DialogContent>
            {!shuttingDown && (
                <DialogActions>
                    <Button onClick={toggleShutdownConfirm} color="primary">
                        No
                    </Button>
                    <Button onClick={shutdown} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
}
