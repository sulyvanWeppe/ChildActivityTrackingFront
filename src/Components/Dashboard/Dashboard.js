import React from 'react'
import { Grid, Box, Avatar, Typography, Card, CardContent, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import DashboardCard from './DashboardCard';
import axios from 'axios';
import * as DashboardUtils from '../../Utils/dashboardUtils';
import * as FamilyUtils from '../../Utils/familyUtils';
import { DatePicker, LocalizationProvider, StaticTimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateChildSelectionCard from './DateChildSelectionCard';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            children: undefined,
            childId: undefined,
            date: new Date(),
            activityTrackingRecords: undefined,
            isRefreshNeeded: true
        }
    }

    updateRefreshNeeded = (isRefreshNeeded) => {
        this.setState({isRefreshNeeded:isRefreshNeeded});
    }

    async componentDidMount() {
        if (this.state.isRefreshNeeded)
        { 
            this.setState({isRefreshNeeded:false}); 

            //Get family's children
            const familyChildren = await FamilyUtils.getFamilyChildrenByUserId(this.props.userId) 
            this.setState({children: familyChildren});

            if (this.state.childId && this.state.date) {
                const actTrackMap = await DashboardUtils.getActivityTrackingByChildIdDate(this.state.childId, this.state.date);
                this.setState({activityTrackingRecords:actTrackMap});
            }
        }
    }   

    async componentDidUpdate() {
        if (this.state.isRefreshNeeded)
        {  
            this.setState({isRefreshNeeded:false}); 

            //Get family's children
            const familyChildren = await FamilyUtils.getFamilyChildrenByUserId(this.props.userId); 
            this.setState({children: familyChildren});

            if (this.state.childId && this.state.date) {
                const actTrackMap = await DashboardUtils.getActivityTrackingByChildIdDate(this.state.childId, this.state.date);
                this.setState({activityTrackingRecords:actTrackMap});
            }
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
                    id : actTrackRecords[i].id,
                    time: actTrackRecords[i].activityTimestamp,
                    type: actTrackRecords[i].activityRemark
                };
                rows.push(row);
            }
        }

        return rows;
    }

    handleDateChange = (newDate) => {
        this.setState({date:newDate});
        this.setState({isRefreshNeeded:true}); 
    }

    handleChildChange = (childId) => {
        this.setState({childId: childId});
        this.setState({isRefreshNeeded:true});
    }

    render () {
        var activityDashboardCards;
        if (this.state.activityTrackingRecords) {
            const activities = Array.from(this.state.activityTrackingRecords.keys());
            
            activities.forEach(e =>  console.log(this.state.activityTrackingRecords.get(e)));

            activityDashboardCards = activities.map((key) => 
            <Box component={Grid} item xs={6}>
                <DashboardCard 
                    cardColor={this.props.color} 
                    cardTitle={this.state.activityTrackingRecords.get(key).activityName} 
                    gridRows={this.getCardItemRows(key)} 
                    gridColumns={[
                        {field:'time', headerName:'Time', flex:0.3},
                        {field:'type', headerName:this.state.activityTrackingRecords.get(key).activityMeasureLabel, flex:1}
                    ]} 
                    remarkLabel={this.state.activityTrackingRecords.get(key).activityMeasureLabel}
                    childId={this.state.childId}
                    activityId={key}
                    refresh={this.updateRefreshNeeded}
                    />
            </Box>);
        }
    
        var childSelectionCard = <DateChildSelectionCard
            date={this.state.date}
            onDateChange={this.handleDateChange}
            children={this.state.children}
            onChildChange={this.handleChildChange}/>

        return (
            <div>
                {childSelectionCard}
                <Grid container spacing={2}>
                    {activityDashboardCards}
                </Grid>
            </div>
        );
    }
}

export default Dashboard;