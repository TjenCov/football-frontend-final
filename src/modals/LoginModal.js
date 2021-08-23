import {Dialog, DialogActions, DialogContent, DialogTitle, TextField, withStyles} from "@material-ui/core";
import {refresh, useStyles} from "../Utils";
import Button from "@material-ui/core/Button";
import React from "react";

class LoginModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loginUsername: "",
            loginPassword: ""
        }
    }

    login = () => {
        const username = this.state.loginUsername;
        const password = this.state.loginPassword;
        this.props.userApi.login(username, password, (data) => {
            document.cookie = 'jwt=' + data['token'];
            console.log(data?.body?.username)
            refresh();
        })
    }

    setUsernameLogin = (event) => {
        this.setState({loginUsername: event.target.value})
    }

    setPasswordLogin = (event) => {
        this.setState({loginPassword: event.target.value})
    }

    render() {
        return <Dialog closeAfterTransition={true} open={this.props.loginModalOpen} onClose={this.props.setLoginModalClose}
                       aria-labelledby="login">
            <DialogTitle id="login">Login</DialogTitle>
            <DialogContent>
                <TextField required label="Username" type="text" fullWidth value={this.state.loginUsername}
                           onChange={this.setUsernameLogin}/>
                <TextField required label="Password" type="password" fullWidth value={this.state.loginPassword}
                           onChange={this.setPasswordLogin}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.login}>Login</Button>
                <Button onClick={this.props.setLoginModalClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    }
}

export default withStyles(useStyles)(LoginModal);