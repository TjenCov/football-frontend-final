import React from 'react';
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '} Liga {new Date().getFullYear()}.
        </Typography>
    );
}


const useStyles = theme => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
});

class Footer extends React.Component {
    render() {
        const {classes} = this.props;
        return <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
                Liga
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                A Football Liga 2021
            </Typography>
            <Copyright/>
        </footer>
    }
}

export default withStyles(useStyles)(Footer);