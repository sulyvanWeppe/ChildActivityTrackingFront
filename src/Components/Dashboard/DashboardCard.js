import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, CardActions, Typography, IconButton} from '@mui/material';
import { AddCircle } from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid';

import AddActivityDialog from './AddActivityDialog';


class DashboardCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            addActivityDialogOpen: false,
            activity: {
                time: new Date()
            }
        }
    }

    handleAddClick = () => {
        this.setState({addActivityDialogOpen: true});
    };

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
                            <DataGrid rows={this.props.gridRows} columns={this.props.gridColumns} pageSize={5} pagination/>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <IconButton color="secondary" size="large" sx={{marginLeft:'auto', textAlign:'right'}} onClick={this.handleAddClick}>
                            <AddCircle sx={{fontSize: 40}}/>
                        </IconButton>
                        <AddActivityDialog 
                            isOpen={this.state.addActivityDialogOpen} 
                            onClose={this.handleDialogCloselick}
                            time={this.state.activity.time}
                            onActivityTimeChange={(newTime) => this.setState({activity: {time: newTime}})}
                            dialogColor={this.props.cardColor}
                            dialogTitle={this.props.labelMapping.activity.get(this.props.cardTitle)}
                            dialogTextfieldLabel={this.props.labelMapping.remark.get(this.props.cardTitle)}
                            />
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default DashboardCard;