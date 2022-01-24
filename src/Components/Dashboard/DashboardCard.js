import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, CardActions, Typography, IconButton} from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid';

import AddActivityDialog from './AddActivityDialog';
import axios from 'axios';


class DashboardCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            addActivityDialogOpen: false,
            selectedRow : undefined,
            activity: {
                time: new Date()
            }
        }
    }

    handleAddClick = () => {
        this.setState({addActivityDialogOpen: true});
    };

    handleRemoveClick = () => {
        //Delete the selected row
        axios.delete('http://localhost:9443/activitytracking/'+this.state.selectedRow.id)
            .then(res => {
                //Unselect the row which was removed
                console.log('toto');
                this.setState({selectedRow: undefined});
                this.props.refresh(true);
            })
            .catch(err => alert('An error occured when trying to remove activity record : {'+this.state.selectedRow+'}'));
    }

    handleDialogCloselick = () => {
        this.setState({addActivityDialogOpen: false});
    };

    render () {
        return (
            <div>
                <Card>
                    <CardActionArea >
                        <CardMedia sx={{backgroundColor:this.props.cardColor}}>
                            <Typography variant="h5" sx={{color:'white'}}>
                                {this.props.cardTitle}
                            </Typography>
                        </CardMedia>
                        <CardContent sx={{minHeight:340}} >
                            <DataGrid 
                                rows={this.props.gridRows} 
                                columns={this.props.gridColumns} 
                                pageSize={5} 
                                pagination 
                                onSelectionModelChange={(rowId) => {
                                        const selectedRows = this.props.gridRows.filter(row => {return row.id.toString() === rowId.toString()});
                                        const selectedRow = (selectedRows ? selectedRows[0] : undefined);
                                        this.setState({selectedRow: selectedRow});
                                        console.log(selectedRow)
                                    }
                                }
                            />
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <IconButton color="secondary" size="large" sx={{marginLeft:'auto', textAlign:'right'}} onClick={this.handleRemoveClick}>
                            <RemoveCircle sx={{fontSize: 40}}/>
                        </IconButton>
                        <IconButton color="secondary" size="large" sx={{marginLeft:'auto', textAlign:'right'}} onClick={this.handleAddClick}>
                            <AddCircle sx={{fontSize: 40}}/>
                        </IconButton>
                        <AddActivityDialog 
                            isOpen={this.state.addActivityDialogOpen} 
                            onClose={this.handleDialogCloselick}
                            time={this.state.activity.time}
                            onActivityTimeChange={(newTime) => this.setState({activity: {time: newTime}})}
                            dialogColor={this.props.cardColor}
                            dialogTitle={this.props.cardTitle}
                            dialogTextfieldLabel={this.props.remarkLabel}
                            childId={this.props.childId}
                            activityId={this.props.activityId}
                            refresh={this.props.refresh}
                            />
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default DashboardCard;