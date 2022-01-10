import { TextField, Box } from '@mui/material';
import React from 'react';

class ParentInfoEdit extends React.Component {
    render() {
        return (<div>
                    <Box component="form" autoComplete='off' noValidate>
                        <Box sx={{display:'flex', flexDirection:'column'}}>
                            <Box sx={{display:'flex', flexDirection:'row'}}>
                                <TextField id="firstNameField" onChange={this.props.onFieldUpdate} disabled={!this.props.editEnabled} label="First name" variant="standard" sx={{width:'30%', marginLeft:'2%'}}/>
                                <TextField id="lastNameField" onChange={this.props.onFieldUpdate} disabled={!this.props.editEnabled} label="Last name" variant="standard" sx={{width:'30%', margin:'auto'}}/>
                            </Box>
                            <TextField id="emailField" onChange={this.props.onFieldUpdate} disabled={!this.props.editEnabled} label="Email address" variant="standard" sx={{width:'50%', marginLeft:'2%'}}/>
                        </Box>
                    </Box>
        </div>);
    }
}

export default ParentInfoEdit;