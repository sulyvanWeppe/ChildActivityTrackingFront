import { Button, CardActionArea, Card, CardActions, CardContent, CardMedia, Typography, TextField } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React from 'react';

class EditDoctor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isEditEnabled: false,
            existDoctor: false
        };
    }

    componentDidMount = () => {
        axios.get('http://localhost:9443/doctor/userid/'+this.props.userId)
            .then(res => {
                this.setState({existDoctor: true});
            })
            .catch(err => {
                if (err.response.status !== 404) {
                    alert("Error when trying to retrieve user's doctor: ["+err+"]");
                }
            });
    }

    handleUpdateClick = (e) => {
        e.preventDefault();

        if (!this.state.isEditEnabled) {
            this.setState({isEditEnabled: true});
        }
        else {
            //Form fields' value
            var newName = document.getElementById('doctorNameField').value;
            newName = ((newName && newName!=="") ? newName : this.props.doctorName);
            var newEmail = document.getElementById('doctorEmailField').value;
            newEmail = ((newEmail && newEmail!=="") ? newEmail : this.props.doctorEmail);
            var newPhone = document.getElementById('doctorPhoneNrField').value;
            newPhone = ((newPhone && newPhone!=="") ? newPhone : this.props.doctorPhone);
            var newNr = document.getElementById('doctorNrField').value;
            newNr = ((newNr && newNr!=="") ? newNr : this.props.doctorNr); 
            var newStreet = document.getElementById('doctorStreetField').value;
            newStreet = ((newStreet && newStreet!=="") ? newStreet : this.props.doctorStreet); 
            var newZC = document.getElementById('doctorZipCodeField').value;
            newZC = ((newZC && newZC!=="") ? newZC : this.props.doctorZC); 
            var newCity = document.getElementById('doctorCityField').value;
            newCity = ((newCity && newCity!=="") ? newCity : this.props.doctorCity); 
            var newCountry = document.getElementById('doctorCountryField').value;
            newCountry = ((newCountry && newCountry!=="") ? newCountry : this.props.doctorCountry); 
            
            //DB and state update
            const newDoctor = {
                id: this.props.doctorId,
                userId: this.props.userId,
                name: newName,
                emailAddress: newEmail,
                phoneNr: newPhone,
                city: newCity,
                street: newStreet,
                streetNr: newNr,
                zipCode: newZC,
                country: newCountry
            };
            //Check if this is a creation or an update
            if (this.state.existDoctor)
            {
                axios.put('http://localhost:9443/doctor/', newDoctor)
                .then(res => {
                    this.props.onEdit(newDoctor);
                })
                .catch(err => {alert(err)});
            }
            else {
                axios.post('http://localhost:9443/doctor', newDoctor)
                .then(res => {
                    this.props.onEdit(newDoctor);
                    this.setState({existDoctor: true});
                })
                .catch(err => {alert(err)});
            }        
            this.setState({isEditEnabled: false});
        }

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
                                        placeholder={this.props.doctorName}
                                        variant="standard" 
                                        sx={{ marginLeft: '2%', marginRight: "20%", width: '20%' }}/>
                                    <TextField 
                                        id="doctorEmailField" 
                                        label="Email address" 
                                        disabled={!this.state.isEditEnabled}
                                        placeholder={this.props.doctorEmail}
                                        variant="standard" 
                                        sx={{ width: '30%', marginRight:"20%" }}/>
                                    <TextField 
                                        id="doctorPhoneNrField" 
                                        label="Phone number" 
                                        disabled={!this.state.isEditEnabled}
                                        placeholder={this.props.doctorPhone}
                                        variant="standard" 
                                        sx={{ width: '30%', marginRight:"2%" }}/>
                                </Box>
                                <Box sx={{display:'flex', flexDirection:'row', marginTop:'1%'}}>
                                    <TextField 
                                        id="doctorNrField" 
                                        label="Nr" 
                                        disabled={!this.state.isEditEnabled}
                                        placeholder={this.props.doctorNr}
                                        variant="standard" 
                                        sx={{marginLeft:'2%', width:'5%'}}/>
                                    <TextField 
                                        id="doctorStreetField" 
                                        label="Street" 
                                        disabled={!this.state.isEditEnabled}
                                        placeholder={this.props.doctorStreet}
                                        variant="standard" 
                                        sx={{marginLeft:'2%', width:'20%', marginRight:'5%'}}/> 
                                    <TextField 
                                        id="doctorZipCodeField" 
                                        label="Zip code" 
                                        disabled={!this.state.isEditEnabled}
                                        placeholder={this.props.doctorZC}
                                        variant="standard" 
                                        sx={{marginLeft:'2%', width:'5%'}}/>
                                    <TextField 
                                        id="doctorCityField" 
                                        label="City" 
                                        disabled={!this.state.isEditEnabled}
                                        placeholder={this.props.doctorCity}
                                        variant="standard" 
                                        sx={{marginLeft:'2%', width:'20%'}}/> 
                                </Box>
                                <Box sx={{display:'flex', flexDirection:'row', marginTop:'1%'}}>
                                    <TextField 
                                        id="doctorCountryField" 
                                        label="Country" 
                                        disabled={!this.state.isEditEnabled}
                                        placeholder={this.props.doctorCountry}
                                        variant="standard" 
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
                            {!this.state.existDoctor ? "Add new doctor" : (this.state.isEditEnabled ? "Update doctor" : "Edit")}
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }

}

export default EditDoctor;