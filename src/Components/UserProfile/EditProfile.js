import { Card, CardActionArea, CardContent, TextField, CardActions, Button, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import axios from 'axios';
    
class EditProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isEditEnabled: false
        };
    }

    handleUpdateClick = (e) => {
        e.preventDefault();

        if (!this.state.isEditEnabled) {
            this.setState({isEditEnabled: true});
        }
        else {
            //Form fields' value
            var newLogin = document.getElementById('loginField').value;
            newLogin = ((newLogin && newLogin!=="") ? newLogin : this.props.userLogin);
            var newPassword = document.getElementById('passwordField').value;
            newPassword = ((newPassword && newPassword!=="") ? newPassword : this.props.userPassword);
            var newEmail = document.getElementById('emailField').value;
            newEmail = ((newEmail && newEmail!=="") ? newEmail : this.props.userEmail); 
            //DB and state update
            const userToUpdate = {
                id: this.props.userId,
                emailAddress: newEmail,
                login: newLogin,
                password: newPassword
            }
            axios.put('http://localhost:9443/user/', userToUpdate)
                .then(res => {
                    this.props.onUpdate(userToUpdate);
                })
                .catch(err => {alert(err)});
        
            this.setState({isEditEnabled: false});
        }
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
                                        sx={{width:'20%', marginLeft:'2%', marginRight:'20%'}}/>
                                    <TextField 
                                        id="passwordField" 
                                        label="Password" 
                                        disabled={!this.state.isEditEnabled}
                                        placeholder={this.props.userPassword} 
                                        variant="standard" 
                                        type="password" 
                                        sx={{ width: '20%' }}/>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '1%' }}>
                                    <TextField 
                                        id="emailField" 
                                        label="Email address" 
                                        disabled={!this.state.isEditEnabled}
                                        placeholder={this.props.userEmail} 
                                        variant="standard" 
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