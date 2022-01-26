import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

class DateChildSelectionCard extends React.Component {

    handleDateChange = (e) => {
        this.props.onDateChange(e);
    }

    handleChildChange = (e) => {
        this.props.onChildChange(e.target.value);
    }

    render() {
        var childrenItems; 
        if (this.props.children) {
            childrenItems = this.props.children.map(child =>
                <MenuItem value={child.id}>{child.firstName+' '+child.lastName}</MenuItem>
                );
        }
        return (
            <div>
                <Card sx={{marginTop:'2%'}}>
                    <CardContent sx={{height:120, marginTop:'1%'}}>
                        <Grid container sx={{display:'flex', flexDirection:'row', minHeight:'100%', minWidth:'100%'}}>    
                            <Box sx={{marginLeft:'1%'}}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker 
                                        id="activityDateField"
                                        label="Date"
                                        renderInput={(params) => {return <TextField {...params} />}}
                                        value={this.props.date}
                                        onChange={this.handleDateChange}
                                    />
                                </LocalizationProvider>
                            </Box>
                            <FormControl sx={{width:'20%', marginLeft:'4%'}}>
                                <InputLabel id="childSelectFieldLabel">Child</InputLabel>
                                <Select
                                    labelId="childSelectFieldLabel"
                                    id="childSelectField"
                                    label="Child"
                                    onChange={this.handleChildChange}
                                    >
                                        {childrenItems}

                                </Select>
                            </FormControl>
                        </Grid>
                    </CardContent>
                </Card> 
            </div>
        );
    }
}

export default DateChildSelectionCard;