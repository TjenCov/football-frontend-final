import {
    Box,
    Divider,
    FormControl,
    Grid, IconButton, InputLabel,
    Paper, Select, TextField,

    withStyles
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {useStyles} from "../Utils";
import {Autocomplete} from "@material-ui/lab";



class CalendarTab extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            matches: [],
            selectedWeek: undefined,
            weeks: [],
            divisions: [],
            selectedDivision: undefined,
            renderSwitch: 0,
            selectedMatch: undefined,
            stats: undefined
        }
    }

    read_matches = (division = undefined, week = undefined) => {
        if (division === undefined) {
            division = this.state.selectedDivision?.id;
        }
        if (week === undefined) {
            week = this.state.selectedWeek;
        }

        if (week !== undefined && division !== undefined) {
            this.props.matchApi.read_matches_for_week(week, division, (data) => {
                this.setState({matches: data})
            })
        }
    }

    read_weekNumber = () => {
        this.props.matchApi.read_weekNumber((data) => {
            this.setState({selectedWeek: data.allWeeks[0], weeks: data.allWeeks}
            )

        })

    }

    readDivisions = () => {
        this.props.matchApi.read_divisions((data) => {
            this.setState({divisions: data, selectedDivision: data[0]}, this.read_matches);
        })
    }

    readMatchStats = (match) => {
        this.props.matchApi.read_stats(match.id, (data) => {
            this.setState({stats: data});
        });
    }


    changeSelectedWeek = (event) => {
        const old_value = this.state.selectedWeek;

        this.setState({selectedWeek: event.target.value})
        if (old_value !== event.target.value) {
            this.read_matches(undefined, event.target.value);
        }
    }

    changeSelectedDivision = (event, value) => {
        const old_value = this.state.selectedDivision;

        this.setState({selectedDivision: value});
        if (old_value !== value) {
            this.read_matches(value.id);
        }

    }


    componentDidMount() {
        this.read_weekNumber();
        this.readDivisions();

    }

    switch = (match) => {
        let switcher = this.state.renderSwitch;

        if(switcher === 0){
            switcher += 1;
            this.readMatchStats(match);
        }
        else if(switcher === 1){
            switcher = 0;
        }
        this.setState({renderSwitch: switcher, selectedMatch: match});
    }

    render_switch = () => {
        if(this.state.renderSwitch === 0){return this.render_calendar()}
        else if(this.state.renderSwitch === 1){return this.render_match()}
    }

    render_match = () => {
        const {classes} = this.props;
        const stats = this.state.stats;
        const match = this.state.selectedMatch;
        return <Grid container direction={"column"} spacing={2} justify={"center"}>
            <Grid item xs={12} md={6} lg={4}>
                <Box component={Paper} width={1800}>
                    <Grid container direction={"column"}  justify={"center"} xs={12}>
                        <Grid item>
                            <Typography variant={"h4"} align={"center"} style={{textDecorationLine: 'underline'}}>{match.home_team} - {match.away_team}</Typography>
                        </Grid>
                        <div style={{padding:6}}/>

                        <Grid item>
                            <Typography variant={"h6"} align={"center"}>status: {match.status !== ""? match.status: "normal"}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={"h6"} align={"center"}>date: {match.date}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={"h6"} align={"center"}>Kick-off: {match.time}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={"h6"} align={"center"}>Division: {match.division}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={"h6"} align={"center"}>Weather: {stats?.weather?.status === 200? stats?.weather?.data.description + ", temperature: " + stats?.weather?.data.temperature + "°c, humidity: " + stats?.weather?.data.humidity + "%": "Data not available" }, </Typography>
                        </Grid>




                        <Grid item>
                            <Typography variant={"h6"} align={"center"}>Times faced: {stats?.times_faced}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={"h6"} align={"center"}>Home team wins: {stats?.home_wins}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={"h6"} align={"center"}>Away team wins: {stats?.away_wins}</Typography>
                        </Grid>

                        <Grid item>
                            <Typography variant={"h6"} align={"center"}>Referee: {match.referee !== "" ? match.referee: "TBA"}</Typography>
                        </Grid>

                    </Grid>
                    <div style={{padding: 16}}>
                                </div>
                    <Grid container direction={"column"} justify={"flex-start"} xs={12}>
                        <Grid item justify={"center"} container>
                            <Grid item justify={"center"}>
                                <Typography variant={"h6"} style={{textDecorationLine: 'underline'}} align={"center"}>Last three matches:</Typography>
                                <div style={{padding: 6}}>
                                </div>
                            </Grid>

                            <Grid container direction={"column"} item>
                                {stats !== undefined && stats.previous_three?.map((m) =>
                                    <Grid container direction={"column"} justify={"center"} >
                                        <Divider/>

                                        <Grid item>
                                            <Grid item container justify={"center"} direction={"column"}>
                                                <Grid item><Typography variant={"h6"} align={"center"}>home: {m.home_team}</Typography></Grid>
                                                <Grid item><Typography variant={"h6"} align={"center"}>away: {m.away_team}</Typography></Grid>
                                                <Grid item><Typography variant={"h6"} align={"center"}>score: {m.home_goals} - {m.away_goals}</Typography></Grid>
                                            </Grid>
                                        </Grid>
                                        <Divider/>
                                    </Grid>
                                )}
                            </Grid>

                        </Grid>
                        <div style={{padding: 16}}>
                                </div>
                        <Grid item container xs={12} justify={"space-evenly"} direction={"row"}>
                        <Grid item justify={"center"} container>
                            <Grid item justify={"center"}>
                                <Typography variant={"h6"} style={{textDecorationLine: 'underline'}} align={"center"}>Last five matches home:</Typography>
                                <div style={{padding: 6}}>
                                </div>
                            </Grid>

                            <Grid container direction={"column"} item>
                                {stats !== undefined && stats.home_last_five?.map((m) =>
                                    <Grid container direction={"column"} justify={"center"} >
                                        <Divider/>

                                        <Grid item>
                                            <Grid item container justify={"center"} direction={"column"}>
                                                <Grid item><Typography variant={"h6"} align={"center"}>home: {m.home_team}</Typography></Grid>
                                                <Grid item><Typography variant={"h6"} align={"center"}>away: {m.away_team}</Typography></Grid>
                                                <Grid item><Typography variant={"h6"} align={"center"}>score: {m.home_goals} - {m.away_goals}</Typography></Grid>
                                            </Grid>
                                        </Grid>
                                        <Divider/>
                                    </Grid>
                                )}
                            </Grid>

                        </Grid>
                                                <div style={{padding: 16}}>
                                </div>
                        <Grid item justify={"center"} container>
                            <Grid item justify={"center"}>
                                <Typography variant={"h6"} style={{textDecorationLine: 'underline'}} align={"center"}>Last five matches away:</Typography>
                                <div style={{padding: 6}}>
                                </div>
                            </Grid>

                            <Grid container direction={"column"} item>
                                {stats !== undefined && stats.away_last_five?.map((m) =>
                                    <Grid container direction={"column"} justify={"center"} >
                                        <Divider/>

                                        <Grid item>
                                            <Grid item container justify={"center"} direction={"column"}>
                                                <Grid item><Typography variant={"h6"} align={"center"}>home: {m.home_team}</Typography></Grid>
                                                <Grid item><Typography variant={"h6"} align={"center"}>away: {m.away_team}</Typography></Grid>
                                                <Grid item><Typography variant={"h6"} align={"center"}>score: {m.home_goals} - {m.away_goals}</Typography></Grid>
                                            </Grid>
                                        </Grid>
                                        <Divider/>
                                    </Grid>
                                )}
                            </Grid>

                        </Grid>
                            </Grid>
                    </Grid>
                </Box>

            </Grid>



        </Grid>

    }

    render_calendar = () => {
        const {classes} = this.props;


        return <Grid container direction={"row"} spacing={2} justify={"flex-start"} xs={12}>
            <Grid item xs={12} md={6} lg={4}>
                <Box component={Paper} width={1800}>
                    <Grid container direction={"column"} justify={"center"}>
                        <Grid item>
                            <Typography variant={"h4"} align={"center"} style={{textDecorationLine: 'underline'}}>Calendar</Typography>
                        </Grid>

                        <Grid container direction={"row"}>
                            <Grid item xs={1}>
                                <FormControl variant={"outlined"} style={{width: '100%'}}>
                                    {this.state.selectedWeek === undefined &&
                                    <InputLabel htmlFor="week">Week</InputLabel>
                                    }
                                    <Select
                                        native
                                        value={this.state.selectedWeek}
                                        onChange={(event) => this.changeSelectedWeek(event)}
                                        inputProps={{
                                            id: 'week'
                                        }}
                                    >
                                        {this.state.weeks.map((week) =>
                                            <option value={week}>Week {week}</option>
                                        )}


                                    </Select>

                                </FormControl>
                            </Grid>
                            <Grid item xs={1}>
                                     <Autocomplete
                                        options={this.state.divisions}
                                        getOptionLabel={(option) => option.name}
                                        onChange={this.changeSelectedDivision}
                                        value={this.state.selectedDivision}
                                        size={"small"}
                                        renderInput={(params) => <TextField {...params} label="division"
                                                                            variant="outlined"/>}
                                    />

                            </Grid>


                        </Grid>
                    </Grid>
                    <Grid xs={12} container direction={"column"}>
                        <Grid xs={12} container direction={"row"} justify={"space-evenly"}>
                            <Grid item>Home</Grid>
                            <Grid item>Away</Grid>
                            <Grid item>Score</Grid>
                            <Grid item>Date</Grid>
                            <Grid item> Details </Grid>

                        </Grid>

                        <div style={{padding: 8}}>
                            <Divider/>
                        </div>
                        {this.state.matches.length === 0 &&
                        <Typography align={"center"}>No matches found</Typography>
                        }
                        {
                            this.state.matches.map((match) =>
                                <Grid item key={match.id}>


                                    <Grid container xs={12} direction={"row"} justify={"space-evenly"}>
                                        <Grid item xs={2}>
                                            <Typography align={"center"}>{match.home_team}</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography align={"center"}>{match.away_team}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Typography align={"center"}>{match.home_goals !== null? match.home_goals: "TBA"} - {match.away_goals !== null? match.away_goals: "TBA"}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Typography align={"center"}>{match.date}</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <IconButton onClick={() => this.switch(match)}
                                                        color={"primary"}> -> </IconButton>
                                        </Grid>

                                    </Grid>

                                </Grid>
                            )
                        }
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    }


    render() {
        return this.render_switch()

    }
}

export default withStyles(useStyles)(CalendarTab);