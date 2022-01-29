import { Button, CardActionArea, Card, CardActions, CardContent, CardMedia, Typography, TextField } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React from 'react';
import * as GenericUtils from '../../Utils/genericUtils';

class EditDoctor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isEditEnabled: false,
            doctor:{
                id: undefined,
                name: undefined,
                email: undefined,
                phone: undefined,
                nr: undefined,
                street: undefined,
                city: undefined,
                zc: undefined,
                country: undefined
            },
            isRefreshNeeded: true
        };
    }
    
    async componentDidMount() {
        if (this.state.isRefreshNeeded) {
            this.setState({isRefreshNeeded: false})

            const doctor = await GenericUtils.getDoctorFromUserId(this.props.userId);
            if (doctor) {
                this.setState({doctor: {
                    id: doctor[0].id,
                    name: doctor[0].name,
                    email: doctor[0].emailAddress,
                    phone: doctor[0].phoneNr,
                    nr: doctor[0].streetNr,
                    street: doctor[0].street,
                    zc: doctor[0].zipCode,
                    city: doctor[0].city,
                    country: doctor[0].country
                    }
                })
            }
        }
    }

    handleUpdateClick = (e) => {
        e.preventDefault();

        if (!this.state.isEditEnabled) {
            this.setState({isEditEnabled: true});
        }
        else {
            //DB and state update
            const newDoctor = {
                id: this.state.doctor.id,
                userId: this.props.userId,
                name: this.state.doctor.name,
                emailAddress: this.state.doctor.email,
                phoneNr: this.state.doctor.phone,
                city: this.state.doctor.city,
                street: this.state.doctor.street,
                streetNr: this.state.doctor.nr,
                zipCode: this.state.doctor.zc,
                country: this.state.doctor.country
            };
            //Check if this is a creation or an update
            if (this.state.doctor.id)
            {
                axios.put('http://localhost:9443/doctor/', newDoctor)
                .catch(err => {alert("An error occured when trying to update doctor's information {"+err+"}")});
            }
            else {
                axios.post('http://localhost:9443/doctor', newDoctor)
                .then(res => {
                    this.setState((prevState) => {
                        return ({
                            isEditEnabled: prevState.isEditEnabled,
                            doctor: {
                                id: res.data.id,
                                name: prevState.doctor.name,
                                email: prevState.doctor.email,
                                phone: prevState.doctor.phone,
                                nr: prevState.doctor.nr,
                                street: prevState.doctor.street,
                                zc: prevState.doctor.zc,
                                city: prevState.doctor.city,
                                country: prevState.doctor.country
                            },
                            isRefreshNeeded: prevState.isRefreshNeeded
                        })
                    });
                })
                .catch(err => {alert("An error occured when trying create the doctor {"+err+"}")});
            }        
            this.setState({isEditEnabled: false});
        }

    }

    handleNameChange = (e) => {
        this.setState((prevState) => {
            return ({doctor:{
                id: prevState.doctor.id,
                name: e.target.value,
                email: prevState.doctor.email,
                phone: prevState.doctor.phone,
                nr: prevState.doctor.nr,
                street: prevState.doctor.street,
                zc: prevState.doctor.zc,
                city: prevState.doctor.city,
                country: prevState.doctor.country
            }}
            );
        })
    }

    handleEmailChange = (e) => {
        this.setState((prevState) => {
            return ({doctor:{
                id: prevState.doctor.id,
                name: prevState.doctor.name,
                email: e.target.value,
                phone: prevState.doctor.phone,
                nr: prevState.doctor.nr,
                street: prevState.doctor.street,
                zc: prevState.doctor.zc,
                city: prevState.doctor.city,
                country: prevState.doctor.country
            }}
            );
        })
    }
 
    handlePhoneChange = (e) => {
        this.setState((prevState) => {
            return ({doctor:{
                id: prevState.doctor.id,
                name: prevState.doctor.name,
                email: prevState.doctor.email,
                phone: e.target.value,
                nr: prevState.doctor.nr,
                street: prevState.doctor.street,
                zc: prevState.doctor.zc,
                city: prevState.doctor.city,
                country: prevState.doctor.country
            }}
            );
        })
    }

    handleNrChange = (e) => {
        this.setState((prevState) => {
            return ({doctor:{
                id: prevState.doctor.id,
                name: prevState.doctor.name,
                email: prevState.doctor.email,
                phone: prevState.doctor.phone,
                nr: e.target.value,
                street: prevState.doctor.street,
                zc: prevState.doctor.zc,
                city: prevState.doctor.city,
                country: prevState.doctor.country
            }}
            );
        })
    }

    handleStreetChange = (e) => {
        this.setState((prevState) => {
            return ({doctor:{
                id: prevState.doctor.id,
                name: prevState.doctor.name,
                email: prevState.doctor.email,
                phone: prevState.doctor.phone,
                nr: prevState.doctor.nr,
                street: e.target.value,
                zc: prevState.doctor.zc,
                city: prevState.doctor.city,
                country: prevState.doctor.country
            }}
            );
        })
    }

    handleZcChange = (e) => {
        this.setState((prevState) => {
            return ({doctor:{
                id: prevState.doctor.id,
                name: prevState.doctor.name,
                email: prevState.doctor.email,
                phone: prevState.doctor.phone,
                nr: prevState.doctor.nr,
                street: prevState.doctor.street,
                zc: e.target.value,
                city: prevState.doctor.city,
                country: prevState.doctor.country
            }}
            );
        })
    }

    handleCityChange = (e) => {
        this.setState((prevState) => {
            return ({doctor:{
                id: prevState.doctor.id,
                name: prevState.doctor.name,
                email: prevState.doctor.email,
                phone: prevState.doctor.phone,
                nr: prevState.doctor.nr,
                street: prevState.doctor.street,
                zc: prevState.doctor.zc,
                city: e.target.value,
                country: prevState.doctor.country
            }}
            );
        })
    }

    handleCountryChange = (e) => {
        this.setState((prevState) => {
            return ({doctor:{
                id: prevState.doctor.id,
                name: prevState.doctor.name,
                email: prevState.doctor.email,
                phone: prevState.doctor.phone,
                nr: prevState.doctor.nr,
                street: prevState.doctor.street,
                zc: prevState.doctor.zc,
                city: prevState.doctor.city,
                country: e.target.value
            }}
            );
        })
    }

    render() {
        return (
            <div>
                <Card id="userProfileDoctorCard">
                    <CardActionArea>
                        <CardMedia sx={{backgroundColor:this.props.cardColor, color:'white'}}>
                            <Typography variant="h5" sx={{textAlign:'left', marginLeft:'2%'}}>Edit Doctor</Typography>
                        </CardMedia>
                        <CardContent>
                            <Box component="form" noValidate autoComplete="off">
                                <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '1%' }}>
                                    <TextField 
                                        id="doctorNameField" 
                                        label="Name"
                                        disabled={!this.state.isEditEnabled} 
                                        placeholder={this.state.doctor.name}
                                        variant="standard" 
                                        onChange={this.handleNameChange}
                                        sx={{ marginLeft: '2%', marginRight: "20%", width: '20%' }}/>
                                    <TextField 
                                        id="doctorEmailField" 
                                        label="Email address" 
                                        disabled={!this.state.isEditEnabled}
                                        placeholder={this.state.doctor.email}
                                        variant="standard" 
                                        onChange={this.handleEmailChange}
                                        sx={{ width: '30%', marginRight:"20%" }}/>
                                    <TextField 
                                        id="doctorPhoneNrField" 
                                        label="Phone number" 
                                        disabled={!this.state.isEditEnabled}
                                        placeholder={this.state.doctor.phone}
                                        variant="standard" 
                                        onChange={this.handlePhoneChange}
                                        sx={{ width: '30%', marginRight:"2%" }}/>
                                </Box>
                                <Box sx={{display:'flex', flexDirection:'row', marginTop:'1%'}}>
                                    <TextField 
                                        id="doctorNrField" 
                                        label="Nr" 
                                        disabled={!this.state.isEditEnabled}
                                        placeholder={this.state.doctor.nr}
                                        variant="standard" 
                                        onChange={this.handleNrChange}
                                        sx={{marginLeft:'2%', width:'5%'}}/>
                                    <TextField 
                                        id="doctorStreetField" 
                                        label="Street" 
                                        disabled={!this.state.isEditEnabled}
                                        placeholder={this.state.doctor.street}
                                        variant="standard" 
                                        onChange={this.handleStreetChange}
                                        sx={{marginLeft:'2%', width:'20%', marginRight:'5%'}}/> 
                                    <TextField 
                                        id="doctorZipCodeField" 
                                        label="Zip code" 
                                        disabled={!this.state.isEditEnabled}
                                        placeholder={this.state.doctor.zc}
                                        variant="standard" 
                                        onChange={this.handleZcChange}
                                        sx={{marginLeft:'2%', width:'5%'}}/>
                                    <TextField 
                                        id="doctorCityField" 
                                        label="City" 
                                        disabled={!this.state.isEditEnabled}
                                        placeholder={this.state.doctor.city}
                                        variant="standard" 
                                        onChange={this.handleCityChange}
                                        sx={{marginLeft:'2%', width:'20%'}}/> 
                                </Box>
                                <Box sx={{display:'flex', flexDirection:'row', marginTop:'1%'}}>
                                    <TextField 
                                        id="doctorCountryField" 
                                        label="Country" 
                                        disabled={!this.state.isEditEnabled}
                                        placeholder={this.state.doctor.country}
                                        variant="standard" 
                                        onChange={this.handleCountryChange}
                                        sx={{marginLeft:'2%', width:'20%'}}/> 
                                </Box>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button 
                            variant="contained" 
                            sx={{marginTop: '2%', marginLeft: '2%', backgroundColor:this.props.cardColor, '&:hover':{backgroundColor:this.props.cardColor}}}
                            onClick={this.handleUpdateClick}>
                            {!this.state.doctor.id ? "Add new doctor" : (this.state.isEditEnabled ? "Update doctor" : "Edit")}
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }

}

export default EditDoctor;