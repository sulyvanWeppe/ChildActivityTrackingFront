import React from 'react'
import { Grid, Box } from '@mui/material';
import DashboardCard from './DashboardCard';
import axios from 'axios';
import * as DashboardUtils from '../../Utils/dashboardUtils';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            childId: 5,
            date: new Date(),
            activityTrackingRecords: undefined,
            isRefreshNeeded: true
        }
    }

    async componentDidMount() {
        if (this.state.isRefreshNeeded)
        { 
            this.setState({isRefreshNeeded:false}); 

            const actTrackMap = await DashboardUtils.getActivityTrackingByChildId(this.state.childId);
            this.setState({activityTrackingRecords:actTrackMap});
        }
    }   

    async componentDidUpdate() {
        if (this.state.isRefreshNeeded)
        {  
            this.setState({isRefreshNeeded:false}); 

            const actTrackMap = await DashboardUtils.getActivityTrackingByChildId(this.state.childId);
            this.setState({activityTrackingRecords:actTrackMap});
        }
        
    }

    getCardItemRows = (actKey) => {
        const rows = [];
        const actTrackRecords = this.state.activityTrackingRecords.get(actKey).actTrackRecords;
        if (actTrackRecords) {
            //For every records corresponding to the given activity (actKey)
            //Create the row data and add it to the complete row data list (rows)
            for(var i=0;i<actTrackRecords.length;i++) 
            {    const row = {
                    id : i,
                    time: actTrackRecords[i].activityTimestamp,
                    type: actTrackRecords[i].activityRemark
                };
                rows.push(row);
            }
        }

        return rows;
    }

    render () {
        var cards;
        if (this.state.activityTrackingRecords) {
            const activities = Array.from(this.state.activityTrackingRecords.keys());
            
            activities.forEach(e =>  console.log(this.state.activityTrackingRecords.get(e)));

            cards = activities.map((key) => 
            <Box component={Grid} item xs={6}>
                <DashboardCard 
                    cardColor={this.props.color} 
                    cardTitle={key} 
                    gridRows={this.getCardItemRows(key)} 
                    gridColumns={[
                        {field:'time', headerName:'Time', flex:0.3},
                        {field:'type', headerName:this.state.activityTrackingRecords.get(key).activityMeasureLabel, flex:1}
                    ]} 
                    labelMapping={this.props.labelMapping}/>
            </Box>);
        }
    
        return (
            <div>
                <Grid container spacing={2}>
                    {cards}
                </Grid>
            </div>
        );
    }
}

export default Dashboard;