import React from 'react';
import {Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator} from '@mui/lab';
import { Card, CardActionArea, CardContent, CardMedia, Divider, Typography } from '@mui/material';
import DateChildSelectionCard from '../Dashboard/DateChildSelectionCard';
import * as FamilyUtils from '../../Utils/familyUtils';
import * as DashboardUtils from '../../Utils/dashboardUtils';
import * as GenericUtils from '../../Utils/genericUtils';
import {BabyChangingStation, Crib, Extension, ExtensionOffSharp, Restaurant} from '@mui/icons-material';


class MyDay extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            children: undefined,
            childId: undefined,
            date: new Date(),
            activityTrackingRecords: undefined,
            isRefreshNeeded: true
        };
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

            var timeline = [];
            if (this.state.childId && this.state.date) {
                const actTrackMap = await DashboardUtils.getActivityTrackingByChildIdDate(this.state.childId, this.state.date);
                
                console.log(actTrackMap);
                this.setState({activityTrackingRecords:actTrackMap});
            }
        }
        
    }

    handleDateChange = (newDate) => {
        this.setState({date:newDate});
        this.setState({isRefreshNeeded:true}); 
    }

    handleChildChange = (childId) => {
        this.setState({childId: childId});
        this.setState({isRefreshNeeded:true});
    }

    render() {
        //Get the Timeline out of the ActivityTracking records 
        var timeline = [];
        if (this.state.activityTrackingRecords) {
            this.state.activityTrackingRecords.forEach((value,key) => {
                if (value.actTrackRecords) {
                    value.actTrackRecords.forEach((record) => {
                        GenericUtils.insertRecordIntoTimeline({activityLabel:value.activityName, activityRecord:record}, timeline);
                    })
                }
            });
        }

        const timelineItems = timeline.map((activity, index) => {
            var activityIcon;
            switch (activity.activityLabel) {
                case 'Meal':
                    activityIcon = <Restaurant />
                    break;
                case 'Sleep':
                    activityIcon = <Crib />
                    break;
                case 'Baby Changing':
                    activityIcon = <BabyChangingStation />
                    break;
                case 'Other Activities':
                    activityIcon = <Extension /> 
                default:
                    break;
            }
            return (<TimelineItem key={activity.activityRecord.id}>
                <TimelineOppositeContent color='text.secondary'>
                    {activity.activityRecord.activityTimestamp}
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot>
                        {activityIcon}
                    </TimelineDot>
                    {(index+1)!= timeline.length ? <TimelineConnector/> : undefined}
                </TimelineSeparator>
                <TimelineContent><em>{activity.activityLabel}</em> : {activity.activityRecord.activityRemark}</TimelineContent>
            </TimelineItem>);
            }
        )



        return (
            <div>
                <DateChildSelectionCard
                    date={this.state.date}
                    onDateChange={this.handleDateChange}
                    children={this.state.children}
                    onChildChange={this.handleChildChange}/>

                <Card sx={{marginTop:'3%'}}>
                    <CardActionArea>
                        <CardMedia
                            sx={{textAlign:'left', marginLeft:'2%', marginTop:'1%', marginBottom:'1%', color:'text.secondary'}}>
                            <Typography variant="h5">Your child {this.state.date.toISOString().split('T')[0]} day</Typography>
                        </CardMedia>
                        <Divider/>
                        <CardContent>
                            <React.Fragment>
                                <Timeline position='alternate'>
                                    {timelineItems}
                                </Timeline>
                            </React.Fragment>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        );
    }
}

export default MyDay;