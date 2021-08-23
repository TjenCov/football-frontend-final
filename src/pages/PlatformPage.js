import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {

    Tab,
    Tabs,
    withStyles
} from "@material-ui/core";
import Notification from "../components/Notification";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Redirect} from "react-router";

import {a11yProps, getCookie, TabPanel} from "../Utils";
import {
    UserApi, TeamApi, MatchApi
} from "../ApiAccess";

import {useStyles} from "../Utils";
import {BiBall, BiCalendar, BiFootball, BiWorld, IoHardwareChipOutline, BiHome} from "react-icons/all";
import AdminTab from "../tabs/AdminTab";
import ClubsTab from "../tabs/ClubsTab";
import CalendarTab from "../tabs/CalendarTab";
import LeaderboardTab from "../tabs/LeaderboardTab";
import MyClubTab from "../tabs/MyClubTab";
import LoginModal from "../modals/LoginModal";

class PlatformPage extends React.Component {
    constructor(props) {
        super(props);

        this.userApi = new UserApi(this.setNotification);
        this.teamApi = new TeamApi(this.setNotification);
        this.matchApi = new MatchApi(this.setNotification);

        this.api = {
            userApi: this.userApi,
            teamApi: this.teamApi,
            matchApi: this.matchApi
        }

        this.state = {
            loginModalOpen: false,
            user: undefined,
            redirect: false,
            tabIndex: 0,
            notification: {
                isOpen: false,
                message: "",
                type: ""
            },
        }
    }


    setLoginModalOpen = () => {
        this.setState({loginModalOpen: true});
    }

    setLoginModalClose = () => {
        this.setState({loginModalOpen: false});
    }

    setNotification = (notification) => this.setState({notification: notification});


    /**
     * User API access methods
     */

    logout = () => {
        this.userApi.logout((data) => {
            document.cookie = 'jwt=';
            window.location.replace("/l-v-l")
        })
    }

    getCurrentUser = () => {
        if (getCookie('jwt') !== "") {
            this.userApi.currentUser((data) => this.setState({user: data}));
        }
    }



    /**
     * UI-specific functionality
     */

    openLoginModal = () => this.setState({loginModalOpen: true});

    /**
     * Misc
     */

    getUser = () => {
        return this.state.user;
    }


    componentDidMount() {
        this.getCurrentUser();
        this.teamApi.configure_teams();

    }

    render() {
        const {classes} = this.props;

        if (this.state.redirect) {
            return <Redirect to="/l-v-l"/>;
        }

        return <React.Fragment>
            <CssBaseline/>
            <Navbar user getUser={this.getUser} setLoginModalOpen={this.openLoginModal} showPlatformButton={true}
                    logoutAPI={this.logout}/>
            <main className={classes.main}>
                <Tabs value={this.state.tabIndex}
                      onChange={(event, newValue) => this.setState({tabIndex: newValue})}
                      aria-label="Page tabs" variant={"scrollable"}>
                    <Tab label="LeaderBoard" icon={<BiFootball size={30}></BiFootball>} {...a11yProps(0)} />
                    <Tab label="Calendar" icon={<BiCalendar size={30}></BiCalendar>} {...a11yProps(1)} />
                    <Tab label="Clubs" icon={<BiWorld size={30}></BiWorld>} {...a11yProps(2)} />
                    {this.getUser() !== undefined && this.getUser().club_stam !== undefined &&
                    <Tab label="My Club" icon={<BiHome size={30}></BiHome>} {...a11yProps(3)} />
                    }

                    {this.getUser() !== undefined && this.getUser().admin === true &&
                    <Tab label="Admin" icon={<IoHardwareChipOutline size={30}></IoHardwareChipOutline>} {...a11yProps(4)} />
                    }
                </Tabs>
                <TabPanel value={this.state.tabIndex} index={0}>
                    <LeaderboardTab {...this.api}/>
                </TabPanel>
                <TabPanel value={this.state.tabIndex} index={1}>
                    <CalendarTab {...this.api}/>
                </TabPanel>
                <TabPanel value={this.state.tabIndex} index={2}>
                    <ClubsTab {...this.api}/>
                </TabPanel>
                <TabPanel value={this.state.tabIndex} index={3}>
                    <MyClubTab {...this.api}/>
                </TabPanel>
                <TabPanel value={this.state.tabIndex} index={4}>
                    <AdminTab {...this.api}/>
                </TabPanel>
            </main>
            <Footer/>
            <Notification notify={this.state.notification} setNotify={this.setNotification}/>
            <LoginModal userApi={this.userApi} loginModalOpen={this.state.loginModalOpen} setLoginModalClose={this.setLoginModalClose}/>

        </React.Fragment>
    }
}

export default withStyles(useStyles)(PlatformPage);
