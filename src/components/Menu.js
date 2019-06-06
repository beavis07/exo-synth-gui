import socket from "./socket";

import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import RefreshIcon from "@material-ui/icons/Refresh";
import PowerIcon from "@material-ui/icons/PowerSettingsNew";
import StatsArea from "./StatsArea";

import {useStyles} from "./styles";

// eslint-disable-next-line react/prop-types
export default function Menu({showMenu, toggleMenu, loadInstruments, toggleShutdownConfirm}) {
    const classes = useStyles();
    const [stats, setStats] = React.useState(null);

    React.useEffect(() => {
        socket.on("stats", setStats);
        return () => {};
    }, []);

    return (
        <SwipeableDrawer anchor="right" open={showMenu} onClose={toggleMenu} onOpen={toggleMenu}>
            <div className={classes.menuList} role="presentation">
                <List>
                    <ListItem button onClick={loadInstruments}>
                        <ListItemIcon>
                            <RefreshIcon />
                        </ListItemIcon>
                        <ListItemText primary="Refresh" secondary="Refresh the instrument list from disk..." />
                    </ListItem>
                </List>
                <Divider />
                <StatsArea stats={stats} />
                <Divider />
                <List>
                    <ListItem button onClick={toggleShutdownConfirm}>
                        <ListItemIcon>
                            <PowerIcon />
                        </ListItemIcon>
                        <ListItemText primary="Shutdown" secondary="Shutdown everything gracefully..." />
                    </ListItem>
                </List>
            </div>
        </SwipeableDrawer>
    );
}
