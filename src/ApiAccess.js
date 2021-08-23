import {getCookie} from "./Utils";

const prefix = "http://localhost:";

class Api {

    constructor(setNotification) {
        this.setNotification = setNotification;
    }

    sendRequest = async (port, method, endpoint, data, success, failure, notifyOnSuccess = false, notifyOnFailure = true) => {

        const promise = fetch(prefix + port + endpoint, {
            method: method,
            headers: {'Content-Type': 'application/json', 'Authorization': getCookie("jwt")},
            body: method === 'GET' ? undefined : JSON.stringify(data)
        });

        promise.catch((error) => {
            console.log(error);
            this.setNotification({isOpen: true, message: "An unknown error occurred!", type: "error"});
        });

        const response = await promise;

        const status = response.status;
        const responseData = await response.json();

        if (status !== 200 && status !== 202 && status !== 201) {
            if (failure !== undefined) failure();
            if (notifyOnFailure) this.setNotification({isOpen: true, message: responseData["message"], type: "error"});
        } else {
            if (success !== undefined) success(responseData);
            if (notifyOnSuccess && false) this.setNotification({
                isOpen: true,
                message: responseData["message"],
                type: "success"
            });
        }
    }
}

export class UserApi extends Api {

    login = async (username, password, success, failure) => {
        await this.sendRequest(5003, 'POST', '/users/login', {username: username, password: password}, success, failure, true);
    }

    logout = async (success, failure) => {
        await this.sendRequest(5003, 'GET', '/users/logout', {}, success, failure, true);
    }

    currentUser = async (success, failure) => {
        await this.sendRequest(5003, 'GET', '/users/current', {}, success, failure, false, false);
    }

    listUsers = async (success, failure) => {
        await this.sendRequest(5003,'GET', '/users', {}, success, failure);
    }

    readAdminUrl = async (success, failure) => {
        await this.sendRequest(5003, 'GET', '/users/admin', {}, success, failure)
    }
}


export class TeamApi extends Api {

    read_all_clubs = async (success, failure) => {
        await this.sendRequest(5001, 'GET', '/clubs', {}, success, failure);
    }

    read_all_teams = async (success, failure) => {
        await this.sendRequest(5001, 'GET', '/teams', {}, success, failure);
    }

    read_club_teams = async (club_stam, success, failure) => {
        await this.sendRequest(5001, 'GET', '/clubs/' + club_stam + '/teams', {}, success, failure);

    }

    read_club = async (club_stam, success, failure) => {
        await this.sendRequest(5001, 'GET', '/clubs/' + club_stam, {}, success, failure);
    }

    update_club_information = async (club, success, failure) => {
        await this.sendRequest(5001, 'PUT', '/clubs/' + club.stam + '/update', {'name': club.name, 'address': club.address, 'zip': club.zip, 'city': club.city, 'site': club.site}, success, failure);
    }

    update_team_information = async (team, success, failure) => {
        await this.sendRequest(5001, 'PUT', '/teams/' + team.id + '/update', { 'prefix': team.prefix,'colours': team.colours, 'wins': team.wins, 'losses': team.losses, 'division': team.division}, success, failure);
    }

    read_all_unfilled_matches = async (team_id, success, failure) => {
        await this.sendRequest(5001, 'GET', '/teams/' + team_id + '/unfilled_matches', {}, success, failure);
    }

    read_team_fixtures = async (team_id, success, failure) => {
        await this.sendRequest(5001, 'GET', '/teams/' + team_id + '/fixture', {}, success, failure);

    }

    configure_teams = async (success, failure) => {
        await this.sendRequest(5001, 'GET', '/teams/config', {}, success, failure);

    }

    readAdminUrl = async (success, failure) => {
        await this.sendRequest(5001, 'GET', '/teams/admin', {}, success, failure)
    }
}

export class MatchApi extends Api {
    read_matches_for_week = async (week, division, success, failure) => {
        await this.sendRequest(5002, 'GET', '/calendar/' + week + '/' + division, {}, success, failure);
    }

    read_weekNumber = async (success, failure) => {
        await this.sendRequest(5002, 'GET', '/calendar', {}, success, failure);
    }
    read_leaderboard = async (division, success, failure) => {
        await this.sendRequest(5002,'GET', "/divisions/" + division, {}, success, failure);
    }

    read_divisions = async (success, failure) => {
         await this.sendRequest(5002, 'GET', '/divisions', {}, success, failure);
    }

    read_stats = async (match_id, success, failure) => {
        await this.sendRequest(5002, 'GET', '/matches/' + match_id + '/stats', {}, success, failure);

    }

    read_all_referees = async (success, failure) => {
        await this.sendRequest(5002, 'GET', '/referees', {}, success, failure);

    }

    read_all_statusses = async (success, failure) => {
        await this.sendRequest(5002, 'GET', '/statuses', {}, success, failure);

    }

    update_match = async (match, success, failure) => {
        await this.sendRequest(5002, 'PUT', '/matches/' + match.id + '/update', {'home_goals': match.home_goals, 'away_goals': match.away_goals, 'referee': match.referee, 'status': match.status}, success, failure);

    }

    readAdminUrl = async (success, failure) => {
        await this.sendRequest(5002, 'GET', '/matches/admin', {}, success, failure)
    }
}


