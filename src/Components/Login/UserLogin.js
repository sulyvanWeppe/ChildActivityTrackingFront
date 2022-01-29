import { Button, Card, CardActionArea, CardActions, CardContent, Divider, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import * as GenericUtils from '../../Utils/genericUtils';

class UserLogin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            logIn: {
                login: undefined,
                pwd: undefined
            },
            createAcc: {
                login: undefined,
                pwd: undefined,
                email: undefined
            }
        }
    }

    handleValidateLogIn = async () =>  {
        const user = await GenericUtils.getUserIdFromLoginPwd(this.state.logIn.login, this.state.logIn.pwd);
        if (user) {
            this.props.onUserLogIn(user);
        }
    }

    handleValidateCreateAcc = async () => {
        const user = await GenericUtils.createUserAccount(this.state.createAcc.login, this.state.createAcc.pwd, this.state.createAcc.email)
        if (user) {
            this.props.onUserLogIn(user);
        }
    }

    handleLogInLoginChange = (e) => {
        this.setState((prevState) => {return ({logIn:{login: e.target.value, pwd: prevState.logIn.pwd}})});
    }

    handleLogInPwdChange = (e) => {
        this.setState((prevState) => {return ({logIn:{login: prevState.logIn.login, pwd: e.target.value}})});
    }

    handleCreateAccLoginChange = (e) => {
        this.setState((prevState) => {return ({createAcc:{login: e.target.value, pwd: prevState.createAcc.pwd, email: prevState.createAcc.email}})});
    }

    handleCreateAccPwdChange = (e) => {
        this.setState((prevState) => {return ({createAcc:{login: prevState.createAcc.login, pwd: e.target.value, email: prevState.createAcc.email}})});
    }

    handleCreateAccEmailChange = (e) => {
        this.setState((prevState) => {return ({createAcc:{login: prevState.createAcc.login, pwd: prevState.createAcc.pwd, email: e.target.value}})});
    }

    render() {
        return (
            <div>
                <Grid container sx={{marginTop:'14%'}}>
                    <Grid item xs >
                        <Card sx={{width:'70%', margin:'auto'}}>
                            <CardContent>
                                <Typography variant="h6">Already have an account ?</Typography>
                                <Typography variant="h5">Log in</Typography>
                                <Divider/>
                                <Box sx={{display:'flex', flexDirection:'column'}}>
                                    <TextField id="logInLoginField" label="Login" variant="standard" onChange={this.handleLogInLoginChange}/>
                                    <TextField id="logInPswdField" label="Password" variant="standard" type="password" onChange={this.handleLogInPwdChange}/>
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button 
                                    variant="outlined" 
                                    color="secondary" 
                                    sx={{margin:'auto'}}
                                    onClick={this.handleValidateLogIn}
                                >Validate</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Divider orientation="vertical" flexItem></Divider>
                    <Grid item xs>
                        <Card sx={{width:'70%', margin:'auto'}}>
                            <CardContent>
                                <Typography variant="h6">Don't have an account yet ?</Typography>
                                <Typography variant="h5">Create one</Typography>
                                <Divider/>
                                <Box sx={{display:'flex', flexDirection:'column'}}>
                                    <TextField id="createLoginField" label="Login" variant="standard" onChange={this.handleCreateAccLoginChange}/>
                                    <TextField id="createPswdField" label="Password" variant="standard" type="password" onChange={this.handleCreateAccPwdChange}/>
                                    <TextField id="createEmailField" label="Email address" variant="standard" onChange={this.handleCreateAccEmailChange}/>
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button 
                                    variant="outlined" 
                                    color="secondary" 
                                    sx={{margin:'auto'}}
                                    onClick={this.handleValidateCreateAcc}
                                >Validate</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default UserLogin;