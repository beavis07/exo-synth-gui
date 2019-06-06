import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MemoryIcon from "@material-ui/icons/Memory";
import AvTimerIcon from "@material-ui/icons/AvTimer";
import SettingsInputSvideoIcon from "@material-ui/icons/SettingsInputSvideo";

import SignalWifiOffIcon from "@material-ui/icons/SignalWifiOff";
import SignalWifi0BarIcon from "@material-ui/icons/SignalWifi0Bar";
import SignalWifi1BarIcon from "@material-ui/icons/SignalWifi1Bar";
import SignalWifi2BarIcon from "@material-ui/icons/SignalWifi2Bar";
import SignalWifi3BarIcon from "@material-ui/icons/SignalWifi3Bar";
import SignalWifi4BarIcon from "@material-ui/icons/SignalWifi4Bar";

const SignalIcons = [
    <SignalWifi0BarIcon key={1} />,
    <SignalWifi1BarIcon key={2} />,
    <SignalWifi2BarIcon key={3} />,
    <SignalWifi3BarIcon key={4} />,
    <SignalWifi4BarIcon key={5} />
];

const WifiIcon = wifi => {
    const {connected, signal = 100} = wifi || {};

    if (!connected) {
        return <SignalWifiOffIcon />;
    }

    const signalStrength = Math.floor(Math.min(signal, 100) / 25);
    return SignalIcons[signalStrength];
};

// eslint-disable-next-line react/prop-types
export default function StatsArea({stats}) {
    return (
        <List>
            <ListItem>
                <ListItemIcon>{WifiIcon(stats && stats.wifi)}</ListItemIcon>
                {stats ? (
                    <ListItemText
                        primary={`Wifi ${stats.wifi.connected ? "Connected" : "Not Connected"}`}
                        secondary={
                            stats.wifi.connected ? `Network: ${stats.wifi.network}` : "Check your network settings!"
                        }
                    />
                ) : (
                    <ListItemText primary="Loading..." secondary="..." />
                )}
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <MemoryIcon />
                </ListItemIcon>
                {stats ? (
                    <ListItemText
                        primary="Free Memory"
                        secondary={`${Number(stats.memory.free / 1000).toFixed(2)}mb of ${Number(
                            stats.memory.total / 1000
                        ).toFixed(2)}mb used`}
                    />
                ) : (
                    <ListItemText primary="Loading..." secondary="..." />
                )}
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <AvTimerIcon />
                </ListItemIcon>
                {stats ? (
                    <ListItemText primary="CPU Usage" secondary={stats.cpu.map(c => `${c}%`).join(", ")} />
                ) : (
                    <ListItemText primary="Loading..." secondary="..." />
                )}
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <SettingsInputSvideoIcon />
                </ListItemIcon>
                {stats ? (
                    <ListItemText primary="Midi Device" secondary={stats.midi} />
                ) : (
                    <ListItemText primary="Loading..." secondary="..." />
                )}
            </ListItem>
        </List>
    );
}
