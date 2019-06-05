import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearProgress from "@material-ui/core/LinearProgress";

import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import MenuIcon from "@material-ui/icons/Menu";
import RefreshIcon from "@material-ui/icons/Refresh";
import PowerIcon from "@material-ui/icons/PowerSettingsNew";
import WifiIcon from "@material-ui/icons/Wifi";
import MemoryIcon from "@material-ui/icons/Memory";
import AvTimerIcon from "@material-ui/icons/AvTimer";
import SettingsInputSvideoIcon from "@material-ui/icons/SettingsInputSvideo";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import {useStyles} from "./styles";

import instrumentList from "./instruments.json";

function App() {
    const classes = useStyles();

    const [state, setState] = React.useState({
        showMenu: false,
        showShutdownConfirm: false,
        shuttingDown: false,
        selectedIndex: 0,
        loading: false
    });

    let selectedItem;

    const loadInstruments = () => {
        window.console.info("Load Instruments");
        setState({...state, showMenu: false, loading: true});
        // TODO: Load instruments
        setTimeout(() => setState({...state, showMenu: false, loading: false}), 2000);
    };

    const toggleMenu = () => setState({...state, showMenu: !state.showMenu});
    const toggleShutdownConfirm = () => setState({...state, showShutdownConfirm: !state.showShutdownConfirm});

    const selectInstrument = idx => {
        window.console.info("Load instrument", idx, instrumentList[idx].name);
        setState({...state, selectedIndex: idx});
        // TODO: Set instrument
        selectedItem.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    };

    const instrumentUp = () => selectInstrument(Math.min(state.selectedIndex + 1, instrumentList.length - 1));
    const instrumentDown = () => selectInstrument(Math.max(0, state.selectedIndex - 1));

    const shutdown = () => {
        window.console.info("Shutdown");
        // TODO: Shutdown
        setState({...state, showShutdownConfirm: false, showMenu: false, shuttingDown: true});
    };

    return (
        <div className={classes.root}>
            <Grid className={classes.fullScreenItem} container spacing={0}>
                <Grid className={classes.fullScreenItem} item xs={9}>
                    {state.loading ? (
                        <div className={classes.instrumentsLoading}>
                            <Typography gutterBottom variant="h5" component="h2" noWrap>
                                Loading instruments...
                            </Typography>
                            <LinearProgress />
                        </div>
                    ) : (
                        <List className={classes.instrumentList}>
                            {instrumentList.map((instrument, idx) => (
                                <ListItem
                                    ref={node => idx === state.selectedIndex && (selectedItem = node)}
                                    selected={idx === state.selectedIndex}
                                    button
                                    key={idx + instrument.name}
                                    onClick={() => selectInstrument(idx)}
                                >
                                    <ListItemAvatar>
                                        {instrument.icon ? <Avatar src={instrument.icon} /> : <Avatar>{idx}</Avatar>}
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={instrument.name}
                                        secondary={instrument.description || "..."}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Grid>

                <Grid container xs={3} direction="column">
                    <Grid item className={classes.moreButtonArea}>
                        <Button variant="contained" color="primary" className={classes.menuButton} onClick={toggleMenu}>
                            <MenuIcon /> &nbsp;Menu
                        </Button>
                    </Grid>
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
                    <Grid item className={classes.currentCard}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.cardImage}
                                    image={instrumentList[state.selectedIndex].icon}
                                    title={instrumentList[state.selectedIndex].name}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="h2" noWrap>
                                        {instrumentList[state.selectedIndex].name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" noWrap>
                                        {instrumentList[state.selectedIndex].description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>

            <SwipeableDrawer anchor="right" open={state.showMenu} onClose={toggleMenu} onOpen={toggleMenu}>
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
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <WifiIcon />
                            </ListItemIcon>
                            <ListItemText primary="Wifi Connected" secondary="Network: BEAD" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <MemoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Free Memory" secondary="728.34 of 1048MB used" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <AvTimerIcon />
                            </ListItemIcon>
                            <ListItemText primary="CPU Usage" secondary="72.42%, 85.28%, 81.17%, 78.34%" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <SettingsInputSvideoIcon />
                            </ListItemIcon>
                            <ListItemText primary="Midi Device" secondary="ReMOTE SL: 0: 129" />
                        </ListItem>
                    </List>
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

            <Dialog open={state.showShutdownConfirm}>
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

            <Dialog open={state.shuttingDown}>
                <DialogTitle>Shutdown</DialogTitle>
                <DialogContent className={classes.shutdownText}>
                    <DialogContentText>This synthy-boi is shutting down now... bye!</DialogContentText>
                    <LinearProgress />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default App;
