import { TextField, Box } from '@mui/material';
import React from 'react';

class ParentInfoEdit extends React.Component {
    render() {
        return (<div>
                    <Box component="form" autoComplete='off' noValidate>
                        <Box sx={{display:'flex', flexDirection:'column'}}>
                            <Box sx={{display:'flex', flexDirection:'row'}}>
                                <TextField 
                                    id="firstNameField" 
                                    onChange={this.props.onFieldUpdate} 
                                    disabled={!this.props.editEnabled} 
                                    label="First name" 
                                    value={(this.props.member && !this.props.editEnabled) ? this.props.member.member.firstName : null} 
                                    placeholder={(this.props.member && this.props.editEnabled) ? this.props.member.member.firstName : null}
                                    variant="standard" 
                                    sx={{width:'30%', marginLeft:'2%'}}/>
                                <TextField 
                                    id="lastNameField" 
                                    onChange={this.props.onFieldUpdate} 
                                    disabled={!this.props.editEnabled} 
                                    label="Last name" 
                                    value={(this.props.member && !this.props.editEnabled) ? this.props.member.member.lastName : null}
                                    placeholder={(this.props.member && this.props.editEnabled) ? this.props.member.member.lastName : null}
                                    variant="standard" 
                                    sx={{width:'30%', margin:'auto'}}/>
                            </Box>
                            <TextField 
                                id="emailField" 
                                onChange={this.props.onFieldUpdate} 
                                disabled={!this.props.editEnabled} 
                                label="Email address" 
                                value={(this.props.member && !this.props.editEnabled) ? this.props.member.member.emailAddress : null}
                                placeholder={(this.props.member && this.props.editEnabled) ? this.props.member.member.emailAddress : null}
                                variant="standard" 
                                sx={{width:'50%', marginLeft:'2%'}}/>
                        </Box>
                    </Box>
        </div>);
    }
}

export default ParentInfoEdit;