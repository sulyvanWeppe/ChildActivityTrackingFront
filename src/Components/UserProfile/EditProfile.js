import { Card, CardActionArea, CardContent, TextField, CardActions, Button, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import axios from 'axios';
    
class EditProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isEditEnabled: false,
            currentUser:{
                login: undefined,
                email: undefined,
                pwd: undefined
            }
        };
    }

    componentDidMount() {
        this.setState((prevState) => {
            return (
                {
                    isEditEnabled: prevState.isEditEnabled,
                    currentUser: {
                        login: this.props.userLogin,
                        email: this.props.userEmail,
                        pwd: this.props.userPassword
                    }
                }
            )
        })
    }

    componentDidUpdate() {
        //Check if the user has not yet manually updated the info
        if (!this.state.currentUser.login && ! this.state.currentUser.pwd && !this.state.currentUser.email)
        {
            this.setState((prevState) => {
                return (
                    {
                        isEditEnabled: prevState.isEditEnabled,
                        currentUser: {
                            login: this.props.userLogin,
                            email: this.props.userEmail,
                            pwd: this.props.userPassword
                        }
                    }
                )
            })
        }
    }

    handleUpdateClick = (e) => {
        e.preventDefault();

        if (!this.state.isEditEnabled) {
            this.setState({isEditEnabled: true});
        }
        else {
            //DB and state update
            const userToUpdate = {
                id: this.props.userId,
                emailAddress: this.state.currentUser.email,
                login: this.state.currentUser.login,
                password: this.state.currentUser.pwd
            }

            axios.put('http://localhost:9443/user/', userToUpdate)
                .then(res => {
                    this.props.onUpdate(userToUpdate);
                })
                .catch(err => {alert("An error occured when trying to update user's information {"+err+"}")});
        
            this.setState({isEditEnabled: false});
        }
    }

    handleLoginChange = (e) => {
        this.setState((prevState) => {
            return (
                {
                    isEditEnabled: prevState.isEditEnabled,
                    currentUser: {
                        login: e.target.value,
                        email: prevState.currentUser.email,
                        pwd: prevState.currentUser.pwd
                    }
                }
            )
        })
    }

    handleEmailChange = (e) => {
        this.setState((prevState) => {
            return (
                {
                    isEditEnabled: prevState.isEditEnabled,
                    currentUser: {
                        login: prevState.currentUser.login,
                        email: e.target.value,
                        pwd: prevState.currentUser.pwd
                    }
                }
            )
        })
    }

    handlePwdChange = (e) => {
        this.setState((prevState) => {
            return (
                {
                    isEditEnabled: prevState.isEditEnabled,
                    currentUser: {
                        login: prevState.currentUser.login,
                        email: prevState.currentUser.email,
                        pwd: e.target.value
                    }
                }
            )
        })
    }

    render() {
        return (
            <div>
                <Card id="userProfileProfileCard">
                    <CardActionArea>
                        <CardMedia sx={{ backgroundColor:this.props.cardColor, color:'white' }}>
                            <Typography variant='h5' component='div' sx={{ textAlign: 'left', marginLeft: '2%' }}>Edit Profile</Typography>
                        </CardMedia>
                        <CardContent>
                            <Box component="form" noValidate autoComplete="off">
                                <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '1%' }}>
                                    <TextField 
                                        id="loginField" 
                                        label="Login" 
                                        disabled={!this.state.isEditEnabled}
                                        placeholder={this.props.userLogin}
                                        variant="standard" 
                                        onChange={this.handleLoginChange}
                                        sx={{width:'20%', marginLeft:'2%', marginRight:'20%'}}/>
                                    <TextField 
                                        id="passwordField" 
                                        label="Password" 
                                        disabled={!this.state.isEditEnabled}
                                        placeholder={this.props.userPassword} 
                                        variant="standard" 
                                        type="password" 
                                        onChange={this.handlePwdChange}
                                        sx={{ width: '20%' }}/>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '1%' }}>
                                    <TextField 
                                        id="emailField" 
                                        label="Email address" 
                                        disabled={!this.state.isEditEnabled}
                                        placeholder={this.props.userEmail} 
                                        variant="standard" 
                                        onChange={this.handleEmailChange}
                                        sx={{ marginLeft: '2%', width: '30%' }}/>
                                </Box>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button variant="contained" 
                            sx={{ marginTop: '2%', marginLeft: '2%', backgroundColor:this.props.cardColor, '&:hover':{ backgroundColor:this.props.cardColor}}}
                            onClick={this.handleUpdateClick}>
                            {this.state.isEditEnabled ? "Update Profile" : "Edit"}
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default EditProfile;