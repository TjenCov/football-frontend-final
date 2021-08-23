import React from 'react';
import Button from '@material-ui/core/Button';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withStyles} from "@material-ui/core";
import Notification from "../components/Notification";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {UserApi} from "../ApiAccess";
import {getCookie, refresh} from "../Utils";
import LoginModal from "../modals/LoginModal";

const useStyles = theme => ({
    heroContent: {
        backgroundImage: "url(soccer_field.png)",
        backgroundSize: "cover",
        padding: theme.spacing(10, 0, 8),
        color: "white",
        height: "800px"

    },
    heroJumbotron: {
        backgroundColor: "rgba(0,0,0,0.7)",
        borderRadius: "5px",
        padding: "16px 32px"
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
});

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.userApi = new UserApi(this.setNotification);
        this.state = {
            loginModalOpen: false,
            registerModalOpen: false,
            user: undefined,
            notification: {
                isOpen: false,
                message: "",
                type: ""
            },
        }
    }

    logout = () => {
        this.userApi.logout((data) => {
            document.cookie = 'jwt=';
            refresh();
        })
    }

    currentUser = () => {
        if (getCookie('jwt') !== "") {
            this.userApi.currentUser((data) => this.setState({user: data}));
        }
    }

    getUser = () => {
        return this.state.user;
    }

    setLoginModalOpen = () => {
        this.setState({loginModalOpen: true});
    }

    setLoginModalClose = () => {
        this.setState({loginModalOpen: false});
    }

    setRegisterModalOpen = () => {
        this.setState({registerModalOpen: true});
    }

    setRegisterModalClose = () => {
        this.setState({registerModalOpen: false});
    }

    setNotification = (notification) => {
        this.setState({notification: notification});
    }

    componentDidMount() {
        this.currentUser();
    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <CssBaseline/>
                <Navbar user getUser={this.getUser} setLoginModalOpen={this.setLoginModalOpen}
                        setRegisterModalOpen={this.setRegisterModalOpen} showPlatformButton={true}
                        logoutAPI={this.logout}/>
                <main>
                    <div className={classes.heroContent}>
                        <Container maxWidth="sm" className={classes.heroJumbotron} >
                            <Typography component="h1" variant="h2" align="center" gutterBottom>
                                Liga
                            </Typography>
                            <Typography variant="h5" align="center" paragraph>
                               Nen football liga for de liefhebbers hé
                            </Typography>
                            <Typography variant="caption" align="center" paragraph>
                                Tjenne Covens
                            </Typography>
                            {
                                this.getUser() === undefined && <div className={classes.heroButtons}>
                                    <Grid container spacing={2} justify="center">
                                        <Grid item>
                                            <Button variant="contained" color="primary"
                                                    onClick={() => window.location.href = "l-v-l/platform"}>
                                                Enter site
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" color="primary"
                                                    onClick={() => this.setState({loginModalOpen: true})}>
                                                Login
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </div>
                            }
                        </Container>
                    </div>
                </main>
                <Footer/>
                <LoginModal userApi={this.userApi} loginModalOpen={this.state.loginModalOpen} setLoginModalClose={this.setLoginModalClose}/>
                <Notification notify={this.state.notification} setNotify={this.setNotification}/>
            </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(LandingPage);
