import {Box, Divider, Grid, Paper, withStyles, Link} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {useStyles} from "../Utils";
import ClickCard from "../components/ClickCard";



class ClubsTab extends React.Component {
    // TODO: sample modal onClick={this.openDatasetSampleWindow}
    // TODO: horizontal scrolling in table

    constructor(props) {
        super(props);
        this.handle_switch = this.handle_switch.bind(this);


        this.state = {
            clubs: [],
            teams: [],
            selectedClub: undefined,
            selectedTeam: undefined,
            fixtures: undefined,

            switch: 0

        }
    }

    read_all_clubs = () => {
        this.props.teamApi.read_all_clubs((data) => this.setState({clubs: data}))
    }

    read_all_teams = (stam) => {
        this.props.teamApi.read_club_teams(stam, (data) => this.setState({teams: data}))
    }

    read_team_fixtures = (team_id) => {
        this.props.teamApi.read_team_fixtures(team_id, (data) => this.setState({fixtures: data}))

    }


    componentDidMount() {
        this.read_all_clubs();

    }

    render_switch = () => {
        if(this.state.switch === 0){
            return this.render_all_clubs()
        }
        else if(this.state.switch === 1){
            return this.render_club()
        }
        else if(this.state.switch === 2){
            return this.render_teamPage()
        }

    }

    render_teamPage = () => {
        return <Grid container direction={"row"} spacing={2} xs={12} justify={"flex-start"}>
            <Grid item xs={12} md={6} lg={4}>


                <Box component={Paper} width={1800} style={{overflowX: "hidden", overflowY: "auto"}}>
                        <Grid container direction={"column"} justify={"center"}>

                            <Grid item justify={"flex-start"} >
                                <Typography variant={"h4"} align={"center"} style={{textDecorationLine: 'underline'}}>{this.state.selectedTeam.prefix !== ""? this.state.selectedTeam.prefix: "Nameless team"}</Typography>
                            </Grid>
                            <div style={{padding: 4}}>

                            </div>
                            <Typography align={"center"}> Division: {this.state.selectedTeam.division}</Typography>
                            <Typography align={"center"}> Wins: {this.state.selectedTeam.wins}</Typography>
                            <Typography align={"center"}> Losses: {this.state.selectedTeam.losses}</Typography>
                            <Typography align={"center"}> Colours: {this.state.selectedTeam.colours}</Typography>
                            <Typography align={"center"}> Goals scored: {this.state.selectedTeam.goals_made}</Typography>
                            <Typography align={"center"}> Goals against: {this.state.selectedTeam.goals_against}</Typography>
                        </Grid>

                </Box>
                <div style={{padding: 10}}>
                </div>
                <Box component={Paper} width={1800} style={{overflowX: "hidden", overflowY: "auto"}}>
                        <Grid container direction={"column"} justify={"center"}>

                            <Grid item justify={"flex-start"} >
                                <Typography variant={"h6"} align={"center"} style={{textDecorationLine: 'underline'}}>Last three matches:</Typography>
                            </Grid>
                            <div style={{padding: 4}}>
                            </div>
                            {
                                this.state.fixtures?.last_three.map((match) =>
                                    <Grid item key={match.id}>
                                        <Typography align={"center"}>{match.home_team + " - " + match.away_team}</Typography>
                                        <Typography align={"center"}> date: {match.date !== ''? match.date: "TBA"}</Typography>
                                        <Typography align={"center"}> time: {match.time !== ''? match.time: "TBA"}</Typography>
                                        <div style={{padding: 2}}>
                                            <Divider/>
                                        </div>
                                    </Grid>


                                )
                            }

                        </Grid>

                </Box>
                <div style={{padding: 10}}>
                </div>

                <Box component={Paper} width={1800} style={{overflowX: "hidden", overflowY: "auto"}}>
                        <Grid container direction={"column"} justify={"center"}>

                            <Grid item justify={"flex-start"} >
                                <Typography variant={"h6"} align={"center"} style={{textDecorationLine: 'underline'}}>Upcoming matches:</Typography>
                            </Grid>
                            <div style={{padding: 4}}>
                            </div>
                            {
                                this.state.fixtures?.upcoming.map((match) =>
                                    <Grid item key={match.id}>
                                        <Typography align={"center"}>{match.home_team + " - " + match.away_team}</Typography>
                                        <Typography align={"center"}> date: {match.date !== ''? match.date: "TBA"}</Typography>
                                        <Typography align={"center"}> time: {match.time !== ''? match.time: "TBA"}</Typography>
                                        <div style={{padding: 2}}>
                                            <Divider/>
                                        </div>
                                    </Grid>


                                )
                            }

                        </Grid>

                </Box>


            </Grid>

        </Grid>

    }

    render_club = () => {
            return <Grid container direction={"row"} spacing={2} xs={12} justify={"flex-start"}>
                <Grid item xs={12} md={6} lg={4}>

                    <Box component={Paper} width={1800} style={{overflowX: "hidden", overflowY: "auto"}}>
                        <Grid container xs={12} direction={"column"} justify={"flex-start"}>
                            <Grid item justify={"flex-start"} xs={12}>
                                <Typography variant={"h4"} style={{textDecorationLine: 'underline'}}>{this.state.selectedClub.name}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant={"h6"}> address: {this.state.selectedClub?.address}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant={"h6"}> city: {this.state.selectedClub?.city}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant={"h6"}> zipcode: {this.state.selectedClub?.zip}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant={"h6"}> website: {this.state.selectedClub?.site !== "" ? <Link href={"http://" + this.state.selectedClub?.site} target="_blank">{this.state.selectedClub?.site}</Link>: "No website"}</Typography>
                            </Grid>
                            <div style={{padding: 6}}>
                                <Divider/>
                            </div>

                            {
                                this.state.teams.map((team) =>
                                    <Grid item xs={12} key={team.id} justify={"center"}>

                                        <ClickCard team={team} type={'team'} switcher={2} handler={this.handle_switch} props={this.props}>
                                        </ClickCard>

                                    </Grid>
                                )
                            }
                        </Grid>


                    </Box>
                </Grid>

            </Grid>

    }

    handle_switch = (selectee, switcher) => {

        if(switcher === 1){
            this.setState({switch: switcher, selectedClub: selectee})
            this.read_all_teams(selectee.stam);
        }
        else if(switcher === 2){
            this.setState({switch: switcher, selectedTeam: selectee})
            this.read_team_fixtures(selectee.id)

        }



    }

    render_all_clubs = () => {
        return <Grid container direction={"row"} spacing={2} xs={12} justify={"flex-start"}>
                    <Grid item xs={12} md={6} lg={4}>

                        <Box component={Paper} width={1800} style={{overflowX: "hidden", overflowY: "auto"}}>
                            <Grid container xs={12} direction={"column"} justify={"flex-start"}>
                                <Grid item justify={"flex-start"} alignItems={"center"}>
                                    <Typography variant={"h4"} align={"center"} style={{textDecorationLine: 'underline'}}>Clubs</Typography>
                                </Grid>
                                <div style={{padding: 6}}>
                                    <Divider/>

                                </div>
                                {
                                    this.state.clubs.map((club) =>
                                        <Grid item xs={12} key={club.stam} justify={"flex-start"}>

                                            <ClickCard club={club} type={'club'} switcher={1} handler={this.handle_switch} props={this.props}>
                                            </ClickCard>

                                        </Grid>
                                    )
                                }
                                { this.state.clubs[0] === undefined &&
                                    <Typography align={"center"}> Clubs are currently unavailable</Typography>
                                 }
                            </Grid>


                        </Box>
                    </Grid>



                </Grid>

    }




    render() {
        const {classes} = this.props;

        return this.render_switch()


    }
}

export default withStyles(useStyles)(ClubsTab);