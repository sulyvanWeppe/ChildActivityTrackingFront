import { Avatar, Grid, Box, Typography, Card, CardContent, SpeedDialAction, SpeedDial, Breadcrumbs, createMuiTheme, CssBaseline } from '@mui/material';
import { createTheme,ThemeProvider } from '@mui/material/styles'
import React from 'react';
import Image from './header3.png';
import '../index.css';

import { Home, PowerSettingsNew } from '@mui/icons-material';


const myTheme = createTheme({
    typography: {
        h2:{
            fontFamily: 'Varela Round'
        }
    }
})

const style = {
    backgroundImage: `url(${Image})`
}

class Header extends React.Component{

    getInitialFromUserLogin = (userLogin) => {
        return userLogin.charAt(0);
    }

    render() {
        var userLoginInitial = this.getInitialFromUserLogin(this.props.userLogin).toUpperCase();
        return (
            <div style={{height:270, marginBottom: '0%'}}>
                <ThemeProvider theme={myTheme}>
                <Card sx={{height:'100%', marginTop:0}} style={style}>
                    <CardContent>
                        <Grid container spacing={2}>
                        <Box component={Grid} md={2} item display={{xs:'none', md:'block'}}>
                            <Breadcrumbs>
                                <Home/>
                                <Typography variant='h5'>{this.props.layoutName}</Typography>
                            </Breadcrumbs>
                        </Box>
                        <Grid item xs={11} md={9}>
                            <Typography variant="h2" >Newborn activity tracking</Typography>
                        </Grid>
                        <Grid item xs={1}>

                            <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
                                <SpeedDial
                                    ariaLabel="SpeedDial basic example"
                                    sx={{ marginRight:0,marginLeft:'auto',}}
                                    icon={<Avatar sx={{ bgcolor:'black', opacity:'0.8', width:'100%', height:'100%'}} style={{ text_align: "center" }}>{userLoginInitial}</Avatar>}
                                    direction='down'
                                >
                                  <SpeedDialAction
                                    icon={<PowerSettingsNew />}
                                    tooltipTitle='Logout'
                                    onClick={this.props.onLogOut}
                                  />
                                </SpeedDial>
                            </Box>   
                            
                        </Grid>
                        </Grid>                        
                    </CardContent>
                </Card>
                </ThemeProvider>
            </div>
        );
    }
}

export default Header;