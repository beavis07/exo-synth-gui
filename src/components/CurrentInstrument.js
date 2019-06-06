import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import {useStyles} from "./styles";

// eslint-disable-next-line react/prop-types
export default function CurrentInstrument({instrument}) {
    const classes = useStyles();

    return (
        <Grid item className={classes.currentCard}>
            {instrument ? (
                <Card>
                    <CardActionArea>
                        <CardMedia
                            className={classes.cardImage}
                            image={"instruments/" + instrument.icon}
                            title={instrument.name}
                        />
                        <CardContent>
                            <Typography variant="h6" component="h2" noWrap>
                                {instrument.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" noWrap>
                                {instrument.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ) : null}
        </Grid>
    );
}
