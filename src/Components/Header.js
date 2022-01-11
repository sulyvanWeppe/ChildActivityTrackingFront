import { Avatar, Grid, Box, Typography, Card, CardContent, SpeedDialAction, SpeedDial, Breadcrumbs } from '@mui/material';
import React from 'react';
import Image from './header3.png';

import { Home } from '@mui/icons-material';

const style = {
    backgroundImage: `url(${Image})`
}
const actions = [
    { 
        icon: <Avatar sx={{ bgcolor:'black', opacity:'0.8', width:'100%', height:'100%'}} style={{ text_align: "center" }}>S</Avatar>, 
        name: 'Sulyvan'
    },
    {
        icon: <Avatar sx={{ bgcolor:'black', opacity:'0.8', width:'100%', height:'100%'}} style={{ text_align: "center" }}>C</Avatar>, 
        name: 'Camille'
    },
    {
        icon: <Avatar sx={{ bgcolor:'black', opacity:'0.8', width:'100%', height:'100%'}} style={{ text_align: "center" }}>A</Avatar>, 
        name: 'Arthur'
    },
    {
        icon: <Avatar sx={{ bgcolor:'black', opacity:'0.8', width:'100%', height:'100%'}} style={{ text_align: "center" }}>N</Avatar>, 
        name: 'Ninja'
    }
  ];

class Header extends React.Component{

    getInitialFromUserLogin = (userLogin) => {
        return userLogin.charAt(0);
    }

    render() {
        var userLoginInitial = this.getInitialFromUserLogin(this.props.userLogin).toUpperCase();
        return (
            <div style={{height:270, marginBottom: '0%'}}>
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
                            <Typography variant="h2" >{this.props.userLogin}</Typography>
                        </Grid>
                        <Grid item xs={1}>

                            <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
                                <SpeedDial
                                    ariaLabel="SpeedDial basic example"
                                    sx={{ marginRight:0,marginLeft:'auto',}}
                                    icon={<Avatar sx={{ bgcolor:'black', opacity:'0.8', width:'100%', height:'100%'}} style={{ text_align: "center" }}>{userLoginInitial}</Avatar>}
                                    direction='down'
                                >
                                {actions.map((action) => (
                                  <SpeedDialAction
                                    key={action.name}
                                    icon={action.icon}
                                    tooltipTitle={action.name}
                                  />))}
                                </SpeedDial>
                            </Box>   
                            
                        </Grid>
                        </Grid>                        
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default Header;
/**
 * 
                <Box >
                    <Grid container spacing={2}>
                        <Box component={Grid} md={2} item display={{xs:'none', md:'block'}}>
                            <Typography variant='h5'>{this.props.layoutName}</Typography>
                        </Box>
                        <Grid item xs={11} md={9}>
                            <Typography variant="h2" >{this.props.userLogin}</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Avatar sx={{ bgcolor:'black', opacity:'0.8', marginRight:0,marginLeft:'auto'}} style={{ text_align: "center" }}>{userLoginInitial}</Avatar>
                        </Grid>
                    </Grid>
                </Box>
 */