import React, {Fragment} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {Drawer, Hidden, List, ListItem, ListItemIcon, ListItemText, withStyles} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }
});

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.getUser = props.getUser;
        this.setLoginModalOpen = props.setLoginModalOpen;
        this.showPlatformButton = props.showPlatformButton;
        this.logoutAPI = props.logoutAPI;

        this.state = {
            drawerOpen: false,
        }
    }

    render() {
        const {classes} = this.props;
        return <Fragment>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h5" className={classes.title} component={Link} to={'/l-v-l'}
                                style={{color: "#ffffff", textDecoration: "none"}}>
                        Liga
                    </Typography>
                    <Hidden smUp>
                        <Button onClick={() => this.setState({drawerOpen: true})}><MenuIcon style={{color: "#ffffff"}}/></Button>
                        <Drawer anchor={'bottom'} open={this.state.drawerOpen} onClose={() => this.setState({drawerOpen: false})}>
                            <List>
                                {
                                    this.getUser() === undefined &&
                                    <ListItem onClick={() => this.setLoginModalOpen(true)} button>
                                        <ListItemIcon><MenuIcon/></ListItemIcon>
                                        <ListItemText primary={"Login"}/>
                                    </ListItem>
                                }
                                {
                                    this.getUser() !== undefined &&
                                    <ListItem onClick={this.logoutAPI} button>
                                        <ListItemIcon><MenuIcon/></ListItemIcon>
                                        <ListItemText primary={"Logout"}/>
                                    </ListItem>
                                }
                                {
                                    this.getUser() !== undefined &&
                                    <ListItem component={Link} to="/l-v-l/platform" button>
                                        <ListItemIcon><MenuIcon/></ListItemIcon>
                                        <ListItemText primary={"Dashboard"}/>
                                    </ListItem>
                                }
                            </List>
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown>
                        {
                            this.getUser() === undefined ? (
                                <div>
                                    <Button color="inherit"
                                            onClick={() => this.setLoginModalOpen(true)}>Login</Button>
                                </div>
                            ) : (
                                <div>
                                    <Button color="inherit">Welcome {this.getUser().username}!</Button>
                                    <Button color="inherit" onClick={this.logoutAPI}>Logout</Button>
                                    {
                                        this.showPlatformButton && <Button color="inherit" component={Link} to="l-v-l/platform"
                                                                           style={{color: "white"}}>Dashboard</Button>
                                    }
                                </div>
                            )
                        }
                    </Hidden>
                </Toolbar>
            </AppBar>
        </Fragment>
    }
}

export default withStyles(useStyles)(Navbar);