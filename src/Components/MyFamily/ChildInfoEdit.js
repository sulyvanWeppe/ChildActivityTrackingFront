import { DatePicker, LocalizationProvider } from '@mui/lab';
import { Box, FormControl, InputLabel, TextField, MenuItem, Select } from '@mui/material';
import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import * as FamilyUtils from '../../Utils/familyUtils';

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
        var parents = this.props.members.filter(member => {return member.type === "parent"});
        var parent1Item=null;
        var parent2Item=null;
        if (parents && parents[0]) {
            parent1Item= <MenuItem value={parents[0].member.id}>{parents[0].member.firstName+" "+parents[0].member.lastName}</MenuItem>;
        }
        if (parents && parents[1]) {
            parent2Item= <MenuItem value={parents[1].member.id}>{parents[1].member.firstName+" "+parents[1].member.lastName}</MenuItem>;
        }

        return (
            <div>
                <Box component="form" autoComplete="off" noValidate>
                    <Box sx={{display:'flex', flexDirection:'column'}}>
                        <Box sx={{display:'flex', flexDirection:'row'}}>
                            <TextField 
                                id="firstNameField" 
                                onChange={this.props.onFieldUpdate} 
                                disabled={!this.props.editEnabled} 
                                label="First name" 
                                value={(this.props.memberToUpdate && !this.props.editEnabled) ? this.props.memberToUpdate.member.firstName : null} 
                                placeholder={(this.props.memberToUpdate && this.props.editEnabled) ? this.props.memberToUpdate.member.firstName : null}
                                variant="standard" 
                                sx={{width:'30%', marginLeft:'2%'}}/>
                            <TextField 
                                id="lastNameField" 
                                onChange={this.props.onFieldUpdate} 
                                disabled={!this.props.editEnabled} 
                                label="Last name" 
                                value={(this.props.memberToUpdate && !this.props.editEnabled) ? this.props.memberToUpdate.member.lastName : null}
                                placeholder={(this.props.memberToUpdate && this.props.editEnabled) ? this.props.memberToUpdate.member.lastName : null}
                                variant="standard" 
                                sx={{width:'30%', margin:'auto'}}/>
                        </Box>
                        <Box sx={{display:'flex', flexDirection:'row'}}>
                            <FormControl variant="standard" sx={{width:'40%', marginLeft:'2%'}}>
                                <InputLabel id="selectParent1Label">First parent</InputLabel>
                                <Select
                                    labelId="selectParent1Label"
                                    id="selectParent1Field"
                                    onChange={this.handleParent1Change}
                                    disabled={!this.props.editEnabled}
                                    value={(this.props.memberToUpdate && !this.props.editEnabled) ? this.props.memberToUpdate.member.parent1Id : this.props.currentChildValue.parent1}
                                    renderValue={(selected) => {
                                        const selectedParent = FamilyUtils.getMemberFromFamilyByIdAndType(selected, "parent", this.props.members);
                                        return selectedParent.member.firstName+' '+selectedParent.member.lastName;
                                    }}
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
                                    value={(this.props.memberToUpdate && !this.props.editEnabled) ? this.props.memberToUpdate.member.parent2Id : this.props.currentChildValue.parent2}
                                    renderValue={(selected) => {
                                        const selectedParent = FamilyUtils.getMemberFromFamilyByIdAndType(selected, "parent", this.props.members);
                                        return selectedParent.member.firstName+' '+selectedParent.member.lastName;
                                    }}
                                >
                                    {parent1Item}
                                    {parent2Item}
                                </Select>
                            </FormControl>                             
                        </Box>
                        <Box sx={{display:'flex', marginLeft:'2%', marginTop:'4%'}}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    id="birthDateField"
                                    label="Birth date"
                                    renderInput={(params) => {return <TextField {...params} />}}
                                    value={(this.props.memberToUpdate && !this.props.editEnabled ? this.props.memberToUpdate.member.birthDate : (this.props.memberToUpdate ? this.props.memberToUpdate.member.birthDate : this.props.currentChildValue.birthDate))}
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