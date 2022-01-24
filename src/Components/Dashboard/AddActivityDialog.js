import React from "react";
import { LocalizationProvider, StaticTimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {Typography, Dialog, DialogContent, DialogTitle, DialogActions, Button, TextField} from '@mui/material';
import axios from "axios";


class AddActivityDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state={
            time: new Date(),
            remark: undefined,
        };
    }


    handleClose = () => {
        //Create activity tracking record for POST request
        const newActivityRecord = {
            childId:this.props.childId,
            activityId:this.props.activityId,
            activityTimestamp: this.state.time,
            activityRemark: this.state.remark
        };

        //POST request
        axios.post('http://localhost:9443/activitytracking',newActivityRecord)
            .then(res => this.props.refresh(true))
            .catch(err => alert('An error occured while trying to add the new activity record : ('+err+')'));

        this.props.onClose();
    }

    handleTimeUpdate = (val) => {
        this.setState({time: val});

        this.props.onActivityTimeChange(val);
    } 

    handleRemarkUpdate = (e) => {
        this.setState({remark: e.target.value});
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
                                onChange={(newValue) => this.handleTimeUpdate(newValue)}
                                renderInput={(params) => {return <TextField {...params} />}}>
                            </StaticTimePicker>
                        </LocalizationProvider>
                        <TextField 
                            id="activityTextField" 
                            label={this.props.dialogTextfieldLabel} 
                            variant="standard" 
                            onChange={this.handleRemarkUpdate}
                            sx={{width:'100%'}}/>
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