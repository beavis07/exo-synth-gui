import socket from "./socket";

import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";

import Menu from "./Menu";
import InstrumentList from "./InstrumentList";
import CurrentInstrument from "./CurrentInstrument";
import NavigationButtons from "./NavigationButtons";
import ShutdownDialog from "./ShutdownDialog";
import ShuttingDownDialog from "./ShuttingDownDialog";

import {useStyles} from "./styles";

function App() {
    const classes = useStyles();

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

    React.useEffect(() => {
        socket.on("instruments", instruments => {
            setInstruments(instruments);
            setLoading(false);
        });
        socket.on("shutdown", () => {
            setShuttingDown(false);
            setShutdownComplete(true);
        });

        loadInstruments();

        return socket.close;
    }, [loadInstruments]);

    const toggleMenu = () => setShowMenu(!showMenu);
    const toggleShutdownConfirm = () => setShowShutdownConfirm(!showShutdownConfirm);

    const selectInstrument = idx => {
        setSelectedIndex(idx);
        socket.emit("load-instrument", instruments[idx].instrument);
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
                                <InstrumentList
                                    loading={loading}
                                    selectedIndex={selectedIndex}
                                    instruments={instruments}
                                    selectInstrument={selectInstrument}
                                />
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
                                <NavigationButtons instrumentUp={instrumentUp} instrumentDown={instrumentDown} />
                                <CurrentInstrument instrument={instruments && instruments[selectedIndex]} />
                            </Grid>
                        </Grid>

                        <Menu {...{showMenu, toggleMenu, loadInstruments, toggleShutdownConfirm}} />
                        <ShutdownDialog {...{showShutdownConfirm, toggleShutdownConfirm, shutdown}} />
                        <ShuttingDownDialog shuttingDown={shuttingDown} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
