import {
    Box,
    Divider,
    FormControl,
    Grid, InputLabel,
    Paper, Select,
    withStyles
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import React, {Component} from "react";
import {refresh, useStyles} from "../Utils";


class LeaderboardTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: undefined,
            selectedDivision: undefined,
            order_attack: undefined,
            order_defence: undefined,
            order_sheets: undefined,
            divisions: [],
            leaderboard: [],
            symbol: '',
            colour: ''
        }
    }

    readDivisions = () => {
        this.props.matchApi.read_divisions((data) => {this.setState({divisions: data, selectedDivision:data[0]}, this.render)
})
    }


    readLeaderboard = (division=undefined) => {
        if(division === undefined) {
            division = 1;
        }
        this.props.matchApi.read_leaderboard(division, (data) =>
        this.setState({leaderboard: data}));
    }

    changeSelectedDivision = (event) => {
        const old_value = this.state.selectedDivision;
        this.setState({selectedDivision: event.target.value });
        if(old_value !== event.target.value){
            this.readLeaderboard(event.target.value.id);
        }
    }

    //ATTACK ORDERING
    order_attack = (event) => {
        const order = this.state.order_attack;
        this.setState({order_defence: undefined, order_sheets: undefined})

        if(order === undefined){
            this.setState({order_attack: 1, symbol: '-', colour: 'red'});
            this.order_Attack(1);

        }
        else if (order === 1){
            this.setState({order_attack: 2, symbol: '+', colour: 'green'});
            this.order_Attack(2);
        }
        if (order === 2){
            this.setState({order_attack: undefined, symbol: '', colour: ''});
            this.readLeaderboard(this.state.selectedDivision.id)
        }

    }

    order_Attack = (order) => {
        let board = this.state.leaderboard;
        let sorted = [];
        const size = board.length;
        for(let j = 0; j < size; j++) {
            let max = 0
            for (let i = 0; i < board.length; i++) {
                if (board[i].attack > board[max].attack) {
                    max = i;
                }
            }
            sorted.push(board[max])
            board.splice(max, 1)


        }
        if(order === 2){sorted.reverse()}

        this.setState({leaderboard: sorted});

    }


    // DEFENCE ORDERING
     order_defence = (event) => {
        const order = this.state.order_defence;
                this.setState({order_attack: undefined, order_sheets: undefined})


        if(order === undefined){
            this.setState({order_defence: 1, symbol: '-', colour: 'red'});
            this.order_Defence(1)

        }
        else if (order === 1){
            this.setState({order_defence: 2, symbol: '+', colour: 'red'});
            this.order_Defence(2)
        }
        if (order === 2){
            this.setState({order_defence: undefined, symbol: '', colour: ''});
            this.readLeaderboard(this.state.selectedDivision.id)
        }

    }

    order_Defence = (order) => {
        let board = this.state.leaderboard;
        let sorted = [];
        const size = board.length;
        for(let j = 0; j < size; j++) {
            let max = 0
            for (let i = 0; i < board.length; i++) {
                if (board[i].defence > board[max].defence) {
                    max = i;
                }
            }
            sorted.push(board[max])
            board.splice(max, 1)


        }
        if(order === 2){sorted.reverse()}

        this.setState({leaderboard: sorted});

    }

    order_sheets = (event) => {
        const order = this.state.order_sheets;
                this.setState({order_attack: undefined, order_defence: undefined})


        if(order === undefined){
            this.setState({order_sheets: 1, symbol: '-', colour: 'red'});
            this.order_Sheets(1)

        }
        else if (order === 1){
            this.setState({order_sheets: 2, symbol: '+', colour: 'red'});
            this.order_Sheets(2)
        }
        if (order === 2){
            this.setState({order_sheets: undefined, symbol: '', colour: ''});
            this.readLeaderboard(this.state.selectedDivision.id)
        }
    }

    order_Sheets = (order) => {
        let board = this.state.leaderboard;
        let sorted = [];
        const size = board.length;
        for(let j = 0; j < size; j++) {
            let max = 0
            for (let i = 0; i < board.length; i++) {
                if (board[i].clean_sheets > board[max].clean_sheets) {
                    max = i;
                }
            }
            sorted.push(board[max])
            board.splice(max, 1)


        }
        if(order === 2){sorted.reverse()}

        this.setState({leaderboard: sorted});

    }


    componentDidMount() {
        this.readDivisions();
        this.readLeaderboard();
    }

    render() {
        const {classes} = this.props;

        return <Grid container direction={"row"} spacing={2} justify={"flex-start"} xs={12}>

            <Grid item xs={12} md={6} lg={4}>
                <Box component={Paper} width={1800}>
                    <Grid container direction={"column"} justify={"center"}>
                        <Grid item>
                            <Typography variant={"h4"} align={"center"} style={{textDecorationLine: 'underline'}}>Leader Board</Typography>
                        </Grid>

                        <Grid item xs={1}>
                            <FormControl variant={"outlined"} style={{width: '100%'}}>
                                <InputLabel htmlFor="division">Division</InputLabel>
                                <Select
                                      inputProps={{id: "division_id", name: "division_name"} }
                                      value={this.state.selectedDivision}
                                      defaultValue={this.state.divisions?.[0]}
                                      onChange={this.changeSelectedDivision}

                                    >
                                    {this.state.divisions.map((division) => <option key={division.id} value={division}>{division.name}</option>)}
                                </Select>

                            </FormControl>
                            </Grid>
                        </Grid>
                    <div style={{padding: 6}}>
                            <Divider/>

                        </div>
                    <Grid xs={12} container direction={"column"}>

                        <Grid xs={12} container direction={"row"} justify={"space-evenly"}>
                            <Grid item>
                                <Typography> Club</Typography>
                            </Grid>

                            <Grid item>
                                <Typography> Team</Typography>
                            </Grid>


                            <Grid item >
                                <button style={{width: '200%', height: '120%'}} onClick={(event) => this.order_attack(event)}>Attack {this.state.order_defence === undefined && this.state.order_sheets === undefined && <Typography style={{color: this.state.colour}}>{this.state.symbol}</Typography>}</button>
                            </Grid>

                            <Grid item>
                                <button style={{width: '200%', height: '120%'}} onClick={(event) => this.order_defence(event)}>Defence {this.state.order_attack === undefined && this.state.order_sheets === undefined && <Typography style={{color: this.state.colour}}>{this.state.symbol}</Typography>}</button>
                            </Grid>

                            <Grid item>
                                <button style={{width: '200%', height: '120%'}} onClick={(event) => this.order_sheets(event)}>Clean sheets {this.state.order_attack === undefined && this.state.order_defence === undefined && <Typography style={{color: this.state.colour}}>{this.state.symbol}</Typography>}</button>
                            </Grid>

                        </Grid>


                        <div style={{padding: 16}}/>
                        <Divider/>

                        {
                            this.state.leaderboard.map((team) =>
                                <Grid item key={team.id}>
                                    <Paper className={classes.activeComponent} style={{padding: 16, borderTop: "line", borderBottom: "none"}}>
                                        <Grid container xs={12} direction={"row"} alignItems={"flex-start"} justify={"space-evenly"}>
                                            <Grid item xs={2} justify={"center"}>
                                                <Typography align={"center"}>{team.club}</Typography>
                                            </Grid>
                                            <Grid item xs={2} justify={"center"}>
                                                <Typography align={"center"}>{team.prefix}</Typography>
                                            </Grid>

                                            <Grid item xs={2} justify={"center"}>
                                                <Typography align={"center"}>{team.attack}</Typography>
                                            </Grid>

                                            <Grid item xs={2} justify={"center"}>
                                                <Typography align={"center"}>{team.defence}</Typography>
                                            </Grid>
                                            <Grid item xs={2} justify={"center"}>
                                                <Typography align={"center"}> {team.clean_sheets}</Typography>
                                            </Grid>

                                        </Grid>
                                    </Paper>

                                </Grid>
                            )
                        }

                    </Grid>
                </Box>
            </Grid>



        </Grid>
    }
}

export default withStyles(useStyles)(LeaderboardTab);