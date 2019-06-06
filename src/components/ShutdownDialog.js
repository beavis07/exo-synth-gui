import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// eslint-disable-next-line react/prop-types
export default function ShutdownDialog({showShutdownConfirm, toggleShutdownConfirm, shutdown}) {
    return (
        <Dialog open={showShutdownConfirm}>
            <DialogTitle>Shutdown</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you want to shutdown right now?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleShutdownConfirm} color="primary">
                    No
                </Button>
                <Button onClick={shutdown} color="primary" autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
