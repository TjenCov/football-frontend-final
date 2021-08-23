import {Box, Divider, Grid, Paper, withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {getCookie, useStyles} from "../Utils";
import Button from "@material-ui/core/Button";



class AdminTab extends React.Component {


    constructor(props) {
        super(props);


        this.state = {
            user: undefined

        }
    }

    openUsersAdmin = () => {
        this.props.userApi.readAdminUrl((data) => {window.location.href = data.url})
    }

    openTeamsAdmin = () => {
        this.props.teamApi.readAdminUrl((data) => {window.location.href = data.url})
    }

    openMatchesAdmin = () => {
        this.props.matchApi.readAdminUrl((data) => {window.location.href = data.url})
    }

    getCurrentUser = () => {
        if (getCookie('jwt') !== "") {
            this.props.userApi.currentUser((data) => this.setState({user: data}));
        }
    }

    getUser = () => {
        return this.state.user;
    }

    componentDidMount() {
        this.getCurrentUser();
    }

    render() {
        const {classes} = this.props;

        return <Grid container direction={"column"} justify={"flex-start"}>
            <Grid item>
                <Typography variant={"h4"} align={"center"} style={{textDecorationLine: 'underline'}}>Admin</Typography>
            </Grid>
            <div style={{padding: 6}}>

            </div>
            <Box component={Paper} width={1800}>
                <div style={{padding: 6}}>
                        </div>
                <Grid item justify={"center"} direction={"row"} xs={12}>
                    <Typography style={{padding:6}} align={"center"} variant={"h5"}>Choose your workspace</Typography>
                </Grid>
                <div style={{padding: 6}}>
                        </div>
                <Grid container direction={"row"} xs={12} justify={"space-evenly"}>
                    <Grid item>
                        <Button onClick={this.openTeamsAdmin} color={"primary"} variant={"outlined"}>
                            <Typography>Clubs and Teams</Typography>
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button onClick={this.openMatchesAdmin} color={"primary"} variant={"outlined"}><Typography>Matches and Referees</Typography></Button>
                    </Grid>
                    {
                        this.state.user?.superAdmin &&
                        <Grid item>
                            <Button onClick={this.openUsersAdmin} color={"primary"} variant={"outlined"}><Typography>Users</Typography></Button>
                        </Grid>
                    }
                </Grid>
                                <div style={{padding: 12}}>
                        </div>
            </Box>
        </Grid>


    }
}

export default withStyles(useStyles)(AdminTab);