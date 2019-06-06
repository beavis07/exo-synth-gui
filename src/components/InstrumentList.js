import React from "react";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

import {useStyles} from "./styles";

// eslint-disable-next-line react/prop-types
export default function InstrumentList({loading, selectedIndex, instruments, selectInstrument}) {
    const classes = useStyles();

    let selectedItem;

    React.useEffect(() => {
        selectedItem &&
            selectedItem.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
    }, [selectedIndex, selectedItem]);

    return loading ? (
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
                        {instrument.icon ? <Avatar src={"instruments/" + instrument.icon} /> : <Avatar>{idx}</Avatar>}
                    </ListItemAvatar>
                    <ListItemText primary={instrument.name} secondary={instrument.description || "..."} />
                </ListItem>
            ))}
        </List>
    );
}
