import { DatePicker, LocalizationProvider } from '@mui/lab';
import { Box, FormControl, InputLabel, TextField, MenuItem, Select } from '@mui/material';
import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

class ChildInfoEdit extends React.Component {

    handleParent1Change = (e) => {
        this.props.onComposedFieldUpdate(e,"selectParent1Field");
    }
    
    handleParent2Change = (e) => {
        this.props.onComposedFieldUpdate(e,"selectParent2Field");
    }
    
    handleBirthDateChange = (e) => {
        this.props.onComposedFieldUpdate(e,"birthDateField")
    }

    render() {
        var parent1Item=null;
        var parent2Item=null;
        if (this.props.parent1) {
            parent1Item= <MenuItem value={this.props.parent1.id}>{this.props.parent1.firstName+" "+this.props.parent1.lastName}</MenuItem>;
        }
        if (this.props.parent2) {
            parent2Item= <MenuItem value={this.props.parent2.id}>{this.props.parent2.firstName+" "+this.props.parent2.lastName}</MenuItem>;
        }

        return (
            <div>
                <Box component="form" autoComplete="off" noValidate>
                    <Box sx={{display:'flex', flexDirection:'column'}}>
                        <Box sx={{display:'flex', flexDirection:'row'}}>
                            <TextField id="firstNameField" onChange={this.props.onFieldUpdate} disabled={!this.props.editEnabled} label="First name" variant="standard" sx={{width:'30%', marginLeft:'2%'}}/>
                            <TextField id="lastNameField" onChange={this.props.onFieldUpdate} disabled={!this.props.editEnabled} label="Last name" variant="standard" sx={{width:'30%', margin:'auto'}}/>
                        </Box>
                        <Box sx={{display:'flex', flexDirection:'row'}}>
                            <FormControl variant="standard" sx={{width:'40%', marginLeft:'2%'}}>
                                <InputLabel id="selectParent1Label">First parent</InputLabel>
                                <Select
                                    labelId="selectParent1Label"
                                    id="selectParent1Field"
                                    onChange={this.handleParent1Change}
                                    disabled={!this.props.editEnabled}
                                >
                                    {parent1Item}
                                    {parent2Item}
                                </Select>
                            </FormControl> 
                            <FormControl variant="standard" sx={{width:'40%', margin:'auto'}}>
                                <InputLabel id="selectParent2Label">Second parent</InputLabel>
                                <Select
                                    labelId="selectParent2Label"
                                    id="selectParent2Field"
                                    onChange={this.handleParent2Change}
                                    disabled={!this.props.editEnabled}
                                >
                                    {parent1Item}
                                    {parent2Item}
                                </Select>
                            </FormControl>                             
                        </Box>
                        <Box sx={{display:'flex', marginTop:'6%'}}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    id="birthDateField"
                                    label="Birth date"
                                    renderInput={(params) => {return <TextField {...params} />}}
                                    value={this.props.birthDate}
                                    onChange={this.handleBirthDateChange}
                                    disabled={!this.props.editEnabled}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Box>
                </Box>
            </div>
        );
    }
}

export default ChildInfoEdit;

/**
 * Select need to be adapted the following way 
 *                                 <Select
                                    labelId="selectParent1Label"
                                    id="selectParent1Field"
                                    value={var}
                                    onChange={function}
                                >
                                    <MenuItem value="Camille">Camille</MenuItem>
                                    <MenuItem value="Sulyvan">Sulyvan</MenuItem>
                                </Select>
 */

/**
 * Date picker must be updated the following way
 *       <DatePicker
        label="Basic example"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
 */