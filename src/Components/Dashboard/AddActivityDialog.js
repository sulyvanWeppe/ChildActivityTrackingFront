import React from "react";
import { LocalizationProvider, StaticTimePicker, TimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {Typography, Dialog, DialogContent, DialogTitle, DialogActions, Button, TextField} from '@mui/material';


class AddActivityDialog extends React.Component {

    handleClose = () => {
        this.props.onClose();
    }

    setActivityTime = (val) => {
        this.props.onActivityTimeChange(val);
    } 

    render () {
        return (
            <div>
                <Dialog onClose={this.handleClose} open={this.props.isOpen}>
                    <DialogTitle sx={{backgroundColor:this.props.dialogColor, color:'white'}}>
                        <Typography variant="h5">New {this.props.dialogTitle}</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <StaticTimePicker value={this.props.time}
                                onChange={(newValue) => this.setActivityTime(newValue)}
                                renderInput={(params) => {return <TextField {...params} />}}>
                            </StaticTimePicker>
                        </LocalizationProvider>
                        <TextField id="activityTextField" label={this.props.dialogTextfieldLabel} variant="standard" sx={{width:'100%'}}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.handleClose}>Validate</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AddActivityDialog;