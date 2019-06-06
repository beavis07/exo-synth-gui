import openSocket from "socket.io-client";

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

import MemoryIcon from "@material-ui/icons/Memory";
import AvTimerIcon from "@material-ui/icons/AvTimer";
import SettingsInputSvideoIcon from "@material-ui/icons/SettingsInputSvideo";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import SignalWifiOffIcon from "@material-ui/icons/SignalWifiOff";
import SignalWifi0BarIcon from "@material-ui/icons/SignalWifi0Bar";
import SignalWifi1BarIcon from "@material-ui/icons/SignalWifi1Bar";
import SignalWifi2BarIcon from "@material-ui/icons/SignalWifi2Bar";
import SignalWifi3BarIcon from "@material-ui/icons/SignalWifi3Bar";
import SignalWifi4BarIcon from "@material-ui/icons/SignalWifi4Bar";

import {useStyles} from "./styles";

const SignalIcons = [
    <SignalWifi0BarIcon key={1} />,
    <SignalWifi1BarIcon key={2} />,
    <SignalWifi2BarIcon key={3} />,
    <SignalWifi3BarIcon key={4} />,
    <SignalWifi4BarIcon key={5} />
];

const WifiIcon = ({connected, signal = 100}) => {
    if (!connected) {
        return <SignalWifiOffIcon />;
    }

    const signalStrength = Math.floor(Math.min(signal, 100) / 25);
    return SignalIcons[signalStrength];
};

function App() {
    const classes = useStyles();

    const {current: socket} = React.useRef(openSocket("http://localhost:7000"));
    const [stats, setStats] = React.useState(null);
    const [shuttingDown, setShuttingDown] = React.useState(false);
    const [showShutdownConfirm, setShowShutdownConfirm] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [instruments, setInstruments] = React.useState([]);
    const [shutdownComplete, setShutdownComplete] = React.useState(false);
    const [showMenu, setShowMenu] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const loadInstruments = React.useCallback(() => {
        setShowMenu(false);
        setLoading(true);
        socket.emit("get-instruments");
    }, []);

    const loadStats = React.useCallback(() => socket.emit("get-stats"), []);

    React.useEffect(() => {
        socket.on("instruments", instruments => {
            setInstruments(instruments);
            setLoading(false);
        });
        socket.on("stats", setStats);
        socket.on("shutdown", () => {
            setShuttingDown(false);
            setShutdownComplete(true);
        });

        loadInstruments();
        loadStats();

        return socket.close;
    }, [loadInstruments, loadStats]);

    let selectedItem;

    const toggleMenu = () => setShowMenu(!showMenu);
    const toggleShutdownConfirm = () => setShowShutdownConfirm(!showShutdownConfirm);

    const selectInstrument = idx => {
        setSelectedIndex(idx);
        socket.emit("load-instrument", instruments[idx].instrument);
        selectedItem.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    };

    const instrumentUp = () => selectInstrument(Math.min(selectedIndex + 1, instruments.length - 1));
    const instrumentDown = () => selectInstrument(Math.max(0, selectedIndex - 1));

    const shutdown = () => {
        socket.emit("start-shutdown");
        setShuttingDown(true);
        setShowMenu(false);
        setShowShutdownConfirm(false);
    };

    return (
        <div className={"tv" + (shutdownComplete ? " _off" : "")}>
            <div className="screen-inner">
                <div className="screen-content">
                    <div className={classes.root}>
                        <Grid className={classes.fullScreenItem} container spacing={0}>
                            <Grid className={classes.fullScreenItem} item xs={9}>
                                {loading ? (
                                    <div className={classes.instrumentsLoading}>
                                        <Typography gutterBottom variant="h5" component="h2" noWrap>
                                            Loading instruments...
                                        </Typography>
                                        <LinearProgress />
                                    </div>
                                ) : (
                                    <List className={classes.instrumentList}>
                                        {instruments.map((instrument, idx) => (
                                            <ListItem
                                                ref={node => idx === selectedIndex && (selectedItem = node)}
                                                selected={idx === selectedIndex}
                                                button
                                                key={idx + instrument.name}
                                                onClick={() => selectInstrument(idx)}
                                            >
                                                <ListItemAvatar>
                                                    {instrument.icon ? (
                                                        <Avatar src={"instruments/" + instrument.icon} />
                                                    ) : (
                                                        <Avatar>{idx}</Avatar>
                                                    )}
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
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.menuButton}
                                        onClick={toggleMenu}
                                    >
                                        <MenuIcon /> &nbsp;Menu
                                    </Button>
                                </Grid>
                                <Grid item className={classes.upDown}>
                                    <Grid item className={classes.buttonItem}>
                                        <Button
                                            variant="contained"
                                            className={classes.arrowButton}
                                            onClick={instrumentDown}
                                        >
                                            <KeyboardArrowUpIcon />
                                        </Button>
                                    </Grid>
                                    <Grid item className={classes.buttonItem}>
                                        <Button
                                            variant="contained"
                                            className={classes.arrowButton}
                                            onClick={instrumentUp}
                                        >
                                            <KeyboardArrowDownIcon />
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item className={classes.currentCard}>
                                    {instruments[selectedIndex] ? (
                                        <Card>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={classes.cardImage}
                                                    image={"instruments/" + instruments[selectedIndex].icon}
                                                    title={instruments[selectedIndex].name}
                                                />
                                                <CardContent>
                                                    <Typography variant="h6" component="h2" noWrap>
                                                        {instruments[selectedIndex].name}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="textSecondary"
                                                        component="p"
                                                        noWrap
                                                    >
                                                        {instruments[selectedIndex].description}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    ) : null}
                                </Grid>
                            </Grid>
                        </Grid>

                        <SwipeableDrawer anchor="right" open={showMenu} onClose={toggleMenu} onOpen={toggleMenu}>
                            <div className={classes.menuList} role="presentation">
                                <List>
                                    <ListItem button onClick={loadInstruments}>
                                        <ListItemIcon>
                                            <RefreshIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Refresh"
                                            secondary="Refresh the instrument list from disk..."
                                        />
                                    </ListItem>
                                </List>
                                <Divider />
                                {stats ? (
                                    <List>
                                        <ListItem>
                                            <ListItemIcon>{WifiIcon(stats.wifi)}</ListItemIcon>
                                            <ListItemText
                                                primary={`Wifi ${stats.wifi.connected ? "Connected" : "Not Connected"}`}
                                                secondary={
                                                    stats.wifi.connected
                                                        ? `Network: ${stats.wifi.network}`
                                                        : "Check your network settings!"
                                                }
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <MemoryIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Free Memory"
                                                secondary={`${Number(stats.memory.free / 1000).toFixed(
                                                    2
                                                )}mb of ${Number(stats.memory.total / 1000).toFixed(2)}mb used`}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <AvTimerIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="CPU Usage"
                                                secondary={stats.cpu.map(c => `${c}%`).join(", ")}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <SettingsInputSvideoIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Midi Device" secondary={stats.midi} />
                                        </ListItem>
                                    </List>
                                ) : null}
                                <Divider />
                                <List>
                                    <ListItem button onClick={toggleShutdownConfirm}>
                                        <ListItemIcon>
                                            <PowerIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Shutdown"
                                            secondary="Shutdown everything gracefully..."
                                        />
                                    </ListItem>
                                </List>
                            </div>
                        </SwipeableDrawer>

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

                        <Dialog open={shuttingDown}>
                            <DialogTitle>Shutdown</DialogTitle>
                            <DialogContent className={classes.shutdownText}>
                                <DialogContentText>This synthy-boi is shutting down now... bye!</DialogContentText>
                                <LinearProgress />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
