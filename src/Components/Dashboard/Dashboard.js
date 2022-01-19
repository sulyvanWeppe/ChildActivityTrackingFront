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

            var activities;
            var actTrackRecordsMap = new Map();
        
            /*try {
                //Get all activity types
                const activitiesReq = await axios.get('http://localhost:9443/activity');
                if (activitiesReq.status.toString() === "200") {
                    activities = activitiesReq.data;
                    await activities.forEach(async (activity) => {
                        //Get activity tracking records for this activity type and the current child
                        try {
                            const actTrackReq = await axios.get('http://localhost:9443/activitytracking/childid/activityid/'+this.state.childId+'/'+activity.id);
                            if (actTrackReq.status.toString() === "200") {
                                actTrackRecordsMap.set(activity.name,actTrackReq.data);
                                this.setState({activityTrackingRecords:actTrackRecordsMap});
                            }
                        } catch(err) {
                            if (err.response.status.toString() === "404") {
                                actTrackRecordsMap.set(activity.name,undefined);
                                this.setState({activityTrackingRecords:actTrackRecordsMap});
                            }
                            else {
                                alert("An error occured when trying to get "+activity.name+" for childId "+this.state.childId);
                            }
                        }
                    });
                    
                }
            } catch(err) {
                if (err.response.status.toString() === "404") {
                    alert("Error : No activity type is defined");
                }
                else {
                    alert("An error occured while trying to get activity types");
                }
            }*/
            const actTrackMap = await DashboardUtils.getActivityTrackingByChildId(this.state.childId);
            this.setState({isRefreshNeeded:false});
            console.log("before set activityTrackingRecords");
            console.log(actTrackMap);
            this.setState({activityTrackingRecords:actTrackMap});
            console.log("after set activityTrackingRecords");
        }
    }   

    async componentDidUpdate() {
        if (this.state.isRefreshNeeded)
        {  
            this.setState({isRefreshNeeded:false}); 

            var activities;
            var actTrackRecordsMap = new Map();
        
            
            const actTrackMap = await DashboardUtils.getActivityTrackingByChildId(this.state.childId);
            this.setState({isRefreshNeeded:false});
            console.log("before set activityTrackingRecords");
            console.log(actTrackMap);
            this.setState({activityTrackingRecords:actTrackMap});
            console.log("after set activityTrackingRecords");
        }
        
    }

    render () {
        console.log("render");
        console.log(this.state);
        var cards;
        if (this.state.activityTrackingRecords) {
            console.log(this.state.activityTrackingRecords);
            //const activities = Array.from(this.props.data.keys());
            const activities = Array.from(this.state.activityTrackingRecords.keys());
            console.log(activities);
            cards = activities.map((key) => 
            <Box component={Grid} item xs={6}>
                <DashboardCard 
                    cardColor={this.props.color} 
                    cardTitle={key} 
                    gridRows={this.props.data.get(key).rows} 
                    gridColumns={this.props.data.get(key).columns} 
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