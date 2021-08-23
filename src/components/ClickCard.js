import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Paper, Grid, IconButton} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles({
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


const ClickCard = (props) => {
        const {classes} = props.props;


    return (
        <Paper className={classes.activeComponent} style={{padding: 16, borderTop: "line", borderBottom: "none"}}>
            {props.type === 'club' &&
                <IconButton color={"primary"} onClick={() => props.handler(props.club, props.switcher)}>
                    <CardMedia>
                        <Grid item container justify={"flex-start"} spacing={2} xs={12} direction={"row"}>

                            <Grid item>
                                <Typography variant={'h6'} style={{textDecorationLine: 'underline'}} align={"center"}>{props.club.name}</Typography>
                            </Grid>

                            <Grid item>
                                <Typography align={"center"}>City: {props.club.city}</Typography>
                            </Grid>

                        </Grid>
                    </CardMedia>
                </IconButton>

            }
            {props.type === 'team' &&
                <IconButton color={"primary"}  onClick={() => props.handler(props.team, props.switcher)}>
                    <CardMedia>
                        <Grid item container justify={"flex-start"} spacing={2} xs={12} direction={"row"}>
                            <Grid item>
                                <Typography variant={"h6"} style={{textDecorationLine: 'underline'}} align={"center"}>{props.team.prefix !== ""? props.team.prefix: "\'Nameless team\'"}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography align={"center"}>Division: {props.team.division}</Typography>
                            </Grid>

                        </Grid>
                    </CardMedia>
                </IconButton>

            }




        </Paper>

    );

}
export default ClickCard
