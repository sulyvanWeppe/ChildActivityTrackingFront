import { Button, Card, CardActionArea, CardActions, CardContent, Divider, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

class UserLogin extends React.Component {

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item xs>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Already have an account ?</Typography>
                                <Typography variant="h5">Log in</Typography>
                                <Divider/>
                                <Box sx={{display:'flex', flexDirection:'column'}}>
                                    <TextField id="logInLoginField" label="Login" variant="standard"/>
                                    <TextField id="logInPswdField" label="Password" variant="standard"/>
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button variant="outlined" color="secondary">Validate</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Divider orientation="vertical" flexItem>Toto</Divider>
                    <Grid item xs>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Don't have an account yet ?</Typography>
                                <Typography variant="h5">Create one</Typography>
                                <Divider/>
                                <Box sx={{display:'flex', flexDirection:'column'}}>
                                    <TextField id="createLoginField" label="Login" variant="standard"/>
                                    <TextField id="createPswdField" label="Password" variant="standard"/>
                                    <TextField id="createEmailField" label="Email address" variant="standard"/>
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button variant="outlined" color="secondary">Validate</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default UserLogin;