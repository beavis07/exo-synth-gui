import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    fullScreenItem: {
        height: "100%"
    },
    instrumentList: {
        margin: theme.spacing(1),
        height: `calc(100% - ${theme.spacing(1) * 2}px)`,
        overflowY: "scroll",
        paddingTop: 0,
        paddingBottom: 0
    },
    menuList: {
        width: 350
    },
    moreButtonArea: {
        height: "72px", //`calc(10% - ${theme.spacing(1)}px)`,
        width: `calc(100% - ${theme.spacing(1) * 2}px)`,
        margin: theme.spacing(1),
        marginBottom: 0
    },
    upDown: {
        flexGrow: 1
    },
    buttonItem: {
        height: `calc(20% - ${theme.spacing(1) * 2}px)`,
        minHeight: "72px",
        margin: theme.spacing(1)
    },
    menuButton: {
        width: "100%",
        height: "100%",
        textTransform: "none"
    },
    arrowButton: {
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff"
    },
    currentCard: {
        maxHeight: "50%",
        margin: theme.spacing(1),
        maxWidth: `calc(100% - ${theme.spacing(1) * 2}px)`
    },
    cardImage: {
        height: "130px"
    },
    dialog: {
        width: "400px",
        height: "180px"
    },
    instrumentsLoading: {
        margin: theme.spacing(4)
    }
}));
