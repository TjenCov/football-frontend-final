import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid, Link,
    Paper,
    TextField,
    withStyles
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {getCookie, useStyles} from "../Utils";
import ClickCard from "../components/ClickCard";
import Button from "@material-ui/core/Button";
import {Autocomplete} from "@material-ui/lab";



class MyClubTab extends React.Component {
    // TODO: sample modal onClick={this.openDatasetSampleWindow}
    // TODO: horizontal scrolling in table

    constructor(props) {
        super(props);
        this.handle_switch = this.handle_switch.bind(this);


        this.state = {
            teams: [],
            matches: [],
            referees: [],
            statusses: [],

            selectedClub: undefined,
            selectedTeam: undefined,

            editTeam: undefined,
            editClub: undefined,
            editMatch: undefined,

            switch: 0

        }
    }

    getCurrentUser = () => {
        if (getCookie('jwt') !== "") {
            this.props.userApi.currentUser((data) => this.setState({user: data}, this.read_club));
        }
    }

    getUser = () => {
        return this.state.user;
    }

    read_club = () => {
        this.props.teamApi.read_club(this.getUser()?.club_stam,(data) => this.setState({selectedClub: data}))
    }

    read_unfilled_matches = () => {
        this.props.teamApi.read_all_unfilled_matches(this.state.selectedTeam?.id, (data) => this.setState({matches: data}));

    }

    read_all_referees = () => {
        this.props.matchApi.read_all_referees((data) => this.setState({referees: data}))
    }

    read_all_statusses = () => {
        this.props.matchApi.read_all_statusses((data) => this.setState({statusses: data}))
    }

    update_club = () => {
        this.props.teamApi.update_club_information(this.state.editClub, this.read_club());
    }

    update_team = () => {
        this.props.teamApi.update_team_information(this.state.editTeam, this.read_club());
    }

    update_match = () => {
        let m = this.state.editMatch;
        if (m.referee === null){m.referee = ""}
        if (m.status === null){m.status = ""}
        this.props.matchApi.update_match(this.state.editMatch);
        this.read_unfilled_matches();
    }

    openClubEditWindow = () => {
        this.setState({
            editClub: this.state.selectedClub
        })
    }

    closeClubEditWindow = (update) => {
        if(update === true){
            this.update_club();
        }
        this.setState({editClub: undefined});
    }

    openTeamEditWindow = () => {
        this.setState({
            editTeam: this.state.selectedTeam
        })
    }

    closeTeamEditWindow = (update) => {
        if(update === true){
            this.update_team();
        }
        this.setState({editTeam: undefined});
    }

    openMatchEditWindow = (match) => {
        this.setState({
            editMatch: match
        })
    }

    closeMatchEditWindow = (update) => {
        if(update === true){
            this.update_match();
        }
        this.setState({editMatch: undefined});
    }



    //edit modal stuff

    changeClubInformation = (event, type) => {
        let editedClub = this.state.editClub


        if(type === "name"){
            editedClub.name = event.target.value
        }
        else if(type === "address"){
            editedClub.address = event.target.value
        }
        else if(type === "zipcode"){
            editedClub.zip = event.target.value
        }
        else if(type === "city"){
            editedClub.city = event.target.value
        }
        else if(type === "website"){
            editedClub.site = event.target.value
        }

        this.setState({editClub: editedClub});

    }

    changeTeamInformation = (event, type) => {
        let editedTeam = this.state.editTeam

        if(type === "prefix"){
            editedTeam.prefix = event.target.value
        }

        else if(type === "division"){
            editedTeam.division = event.target.value
        }
        else if(type === "wins"){
            editedTeam.wins = event.target.value
        }
        else if(type === "losses"){
            editedTeam.losses = event.target.value
        }
        else if(type === "colours"){
            editedTeam.colours = event.target.value
        }


        this.setState({editTeam: editedTeam});
    }

    changeMatchInformation = (event, type) => {
        let editedMatch = this.state.editMatch

        if(type === "home_goals"){
            editedMatch.home_goals = event.target.value
        }
        else if(type === "away_goals"){
            editedMatch.away_goals = event.target.value
        }

        this.setState({editMatch: editedMatch});
    }

    changeReferee = (event, value) => {
        let match = this.state.editMatch;

        if(match !== undefined){
            match.referee = value;
            this.setState({editMatch: match})
        }
    }

    changeStatus = (event, value) => {
        let match = this.state.editMatch;

        if(match !== undefined){
            match.status = value;
            this.setState({editMatch: match})
        }
    }


    //misc

    componentDidMount() {
        this.getCurrentUser();
        this.read_all_referees();
        this.read_all_statusses();

    }

    render_switch = () => {
        if(this.state.switch === 0){
            return this.render_club()
        }
        else if(this.state.switch === 1){
            return this.render_teamPage()
        }

    }

    render_teamPage = () => {
        const team = this.state.selectedTeam;
        const matches = this.state.matches;
        return <Grid container direction={"row"} spacing={2} xs={12} justify={"flex-start"}>
            <Grid item xs={12} md={6} lg={4}>


                <Box component={Paper} width={1800} style={{overflowX: "hidden", overflowY: "auto"}}>
                        <Grid container direction={"column"} justify={"center"}>
                            <Grid item justify={"flex-start"} alignItems={"center"}>
                                <Typography variant={"h4"} align={"center"} style={{textDecorationLine: 'underline'}}>{team?.prefix !== ''? team?.prefix: "Nameless team"}</Typography>
                            </Grid>
                            <div style={{padding: 4}}>

                            </div>

                            <Typography variant={"h6"} align={"center"}> Division: {team?.division}</Typography>
                            <Typography variant={"h6"} align={"center"}> Wins: {team?.wins}</Typography>
                            <Typography variant={"h6"} align={"center"}> Losses: {team?.losses}</Typography>
                            <Typography variant={"h6"} align={"center"}> Colours: {team?.colours}</Typography>

                            <Button onClick={this.openTeamEditWindow} color={"primary"}>Edit</Button>

                        </Grid>


                </Box>
                <div style={{padding: 16}}>
                </div>

                <Box component={Paper} width={1800} style={{overflowX: "hidden", overflowY: "auto"}}>
                    <Grid container direction={"column"} justify={"center"}>
                        <Grid item justify={"flex-start"} alignItems={"center"}>
                                <Typography variant={"h6"} align={"center"} style={{textDecorationLine: 'underline'}}>Matches</Typography>
                        </Grid>
                    </Grid>
                    <div style={{padding: 4}}>
                    </div>
                    {matches.map((match) =>
                        <Grid item xs={12} key={match.id} justify={"center"}>
                            <Grid container direction={"column"}  justify={"center"}>

                                <div style={{padding: 6}}>
                                    <Divider/>
                                </div>

                                <Grid item>
                                    <Typography variant={"h6"} style={{textDecorationLine: 'underline'}} align={"center"}>{match.home_team + " - " + match.away_team}</Typography>

                                </Grid>
                                <Grid item>
                                    <Typography variant={"h6"} align={"center"}>status: {match.status !== null? match.status.name: "TBA"}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant={"h6"} align={"center"}>date: {match.date !== ''? match.date: "TBA"}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant={"h6"} align={"center"}>Kick-off: {match.time !== ''? match.time: "TBA"}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant={"h6"} align={"center"}>Division: {match.division}</Typography>
                                </Grid>

                                <Grid item>
                                    <Typography variant={"h6"} align={"center"}>Referee: {match.referee !== null ? match.referee.first_name + " " + match.referee.last_name: "TBA"}</Typography>
                                </Grid>
                                <Button onClick={() => this.openMatchEditWindow(match)} color={"primary"}>Edit</Button>


                            </Grid>
                        </Grid>
                    )}

                </Box>



            </Grid>
             <Dialog closeAfterTransition={true} open={this.state.editTeam !== undefined} onClose={this.closeTeamEditWindow}>
                    <DialogTitle id="Edit information">Edit information</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={1} direction={"column"}>
                            <Grid item>
                                <TextField label={"prefix"} value={this.state.editTeam?.prefix} onChange={(e) => this.changeTeamInformation(e, "prefix")}>{this.selectedTeam?.prefix !== ''? this.selectedTeam?.prefix : "Nameless team"}</TextField>
                            </Grid>
                            <Grid item>
                                <TextField label={"division"} value={this.state.editTeam?.division} onChange={(e) => this.changeTeamInformation(e, "division")}>{this.selectedTeam?.division}</TextField>
                            </Grid>
                            <Grid item>

                                <TextField label={"wins"} value={this.state.editTeam?.wins} onChange={(e) => this.changeTeamInformation(e, "wins")}>{this.selectedTeam?.wins}</TextField>
                            </Grid>
                            <Grid item>
                                <TextField label={"losses"} value={this.state.editTeam?.losses} onChange={(e) => this.changeTeamInformation(e, "losses")}>{this.selectedTeam?.losses}</TextField>
                            </Grid>
                            <Grid item>
                                <TextField label={"colours"} value={this.state.editTeam?.colours} onChange={(e) => this.changeTeamInformation(e, "colours")}>{this.selectedTeam?.colours}</TextField>
                             </Grid>

                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.closeTeamEditWindow(true)}>Save</Button>
                        <Button onClick={() => this.closeTeamEditWindow(false)}>Cancel</Button>
                    </DialogActions>
                </Dialog>
                <Dialog closeAfterTransition={true} open={this.state.editMatch !== undefined} onClose={this.closeMatchEditWindow}>
                        <DialogTitle id="Edit information">Edit information</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={1} direction={"column"}>
                                {/*<Grid item>*/}
                                {/*    <TextField label={"division"} value={this.state.editMatch?.division} onChange={(e) => this.changeMatchInformation(e, "division")}>{this.state.editMatch?.division}</TextField>*/}
                                {/*</Grid>*/}
                                {/*<Grid item>*/}
                                {/*    <TextField label={"date"} value={this.state.editMatch?.date} onChange={(e) => this.changeMatchInformation(e, "date")}>{this.state.editMatch?.date}</TextField>*/}
                                {/*</Grid>*/}
                                {/*<Grid item>*/}

                                {/*    <TextField label={"time"} value={this.state.editMatch?.time} onChange={(e) => this.changeMatchInformation(e, "time")}>{this.state.editMatch?.time}</TextField>*/}
                                {/*</Grid>*/}

                                <Grid item>
                                    <TextField label={"home goals"} value={this.state.editMatch?.home_goals} onChange={(e) => this.changeMatchInformation(e, "home_goals")}>{this.state.editMatch?.home_goals}</TextField>
                                </Grid>
                                <Grid item>
                                    <TextField label={"away goals"} value={this.state.editMatch?.away_goals} onChange={(e) => this.changeMatchInformation(e, "away_goals")}>{this.state.editMatch?.away_goals}</TextField>
                                 </Grid>
                                <Grid item>
                                     <Autocomplete
                                        options={this.state.referees}
                                        getOptionLabel={(option) => option.first_name + " " +  option.last_name}
                                        onChange={this.changeReferee}
                                        value={this.state.editMatch?.referee}
                                        size={"small"}
                                        renderInput={(params) => <TextField {...params} label="referee"
                                                                            variant="outlined"/>}
                                    />
                                </Grid>
                                <Grid item>
                                     <Autocomplete
                                        options={this.state.statusses}
                                        getOptionLabel={(option) => option.name}
                                        onChange={this.changeStatus}
                                        value={this.state.editMatch?.status}
                                        size={"small"}
                                        renderInput={(params) => <TextField {...params} label="status"
                                                                            variant="outlined"/>}
                                    />
                                </Grid>

                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.closeMatchEditWindow(true)}>Save</Button>
                            <Button onClick={() => this.closeMatchEditWindow(false)}>Cancel</Button>
                        </DialogActions>
                    </Dialog>

        </Grid>

    }

    render_club = () => {
        const club = this.state.selectedClub
            return <Grid container direction={"row"} spacing={2} xs={12} justify={"flex-start"}>
                <Grid item xs={12} md={6} lg={4}>

                    <Box component={Paper} width={1800} style={{overflowX: "hidden", overflowY: "auto"}}>
                        <Grid container xs={12} direction={"column"} justify={"center"}>
                            <Grid item justify={"center"} xs={12}>
                                <Typography variant={"h4"} align={"center"} style={{textDecorationLine: 'underline'}}>{club?.name}</Typography>
                            </Grid>
                            <div style={{padding: 6}}>
                            </div>

                            <Grid item>
                                <Typography variant={"h6"} align={"center"}>Address: {club?.address}</Typography>
                            </Grid>

                            <Grid item>
                                <Typography variant={"h6"} align={"center"}>Zip: {club?.zip}</Typography>
                            </Grid>

                            <Grid item>
                                <Typography variant={"h6"} align={"center"}>City: {club?.city}</Typography>
                            </Grid>

                            <Grid item>
                                <Typography variant={"h6"} align={"center"}>Website:
                                    <Link href={"http://" + club?.site} target="_blank" >
                                         { " " + club?.site}
                                    </Link>
                                </Typography>
                            </Grid>

                            <Button onClick={this.openClubEditWindow} color={"primary"}>Edit</Button>


                            <div style={{padding: 16}}>
                                <Divider/>
                            </div>


                            <Typography variant={"h6"} style={{textDecorationLine: 'underline'}} align={"center"}>Teams:</Typography>

                            {
                                club?.teams.map((team) =>
                                    <Grid item xs={12} key={team.id} justify={"center"}>

                                        <ClickCard team={team} type={'team'} switcher={1} handler={this.handle_switch} props={this.props}>
                                        </ClickCard>

                                    </Grid>
                                )
                            }
                        </Grid>


                    </Box>
                </Grid>

                <Dialog closeAfterTransition={true} open={this.state.editClub !== undefined} onClose={this.closeClubEditWindow}>
                    <DialogTitle id="Edit information">Edit information</DialogTitle>
                    <DialogContent>
                        <Grid container direction={"column"}>
                            <Grid item>
                                <TextField label={"name"} value={this.state.editClub?.name} onChange={(e) => this.changeClubInformation(e, "name")}>{club?.name}</TextField>
                            </Grid>
                            <Grid item>

                                <TextField label={"address"} value={this.state.editClub?.address} onChange={(e) => this.changeClubInformation(e, "address")}>{club?.address}</TextField>
                            </Grid>
                            <Grid item>
                                <TextField label={"zipcode"} value={this.state.editClub?.zip} onChange={(e) => this.changeClubInformation(e, "zipcode")}>{club?.zip}</TextField>
                            </Grid>
                            <Grid item>
                                <TextField label={"city"} value={this.state.editClub?.city} onChange={(e) => this.changeClubInformation(e, "city")}>{club?.city}</TextField>
                             </Grid>
                            <Grid item>
                                <TextField label={"website"} value={this.state.editClub?.site} onChange={(e) => this.changeClubInformation(e, "website")}>{club?.site}</TextField>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.closeClubEditWindow(true)}>Save</Button>
                        <Button onClick={() => this.closeClubEditWindow(false)}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Grid>

    }

    handle_switch = (selectee, switcher) => {

        if(switcher === 0){
            this.setState({switch: switcher})
        }
        else if(switcher === 1){
            this.setState({switch: switcher, selectedTeam: selectee}, this.read_unfilled_matches
)

        }


    }

    render() {
        const {classes} = this.props;

        return this.render_switch()


    }
}

export default withStyles(useStyles)(MyClubTab);