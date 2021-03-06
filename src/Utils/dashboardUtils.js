import axios from 'axios';

async function getActivityTrackingByChildIdActivitiesIdDate(childId,activities,date) {
    var actTrackMap = new Map();
    for (var i=0; i<activities.length; i++){
        try {
            const formatedDate = date.toISOString().split('T')[0]+' 00:00:00';
            const actTrackReq = await axios.get('http://localhost:9443/activitytracking/childid/activityid/date/'+childId+'/'+activities[i].id+'/'+formatedDate);
            if (actTrackReq.status.toString() === "200") {
                const actTrackMapValue = {
                    activityName: activities[i].name,
                    activityMeasureLabel: activities[i].measureLabel,
                    actTrackRecords: actTrackReq.data
                }
                actTrackMap.set(activities[i].id,actTrackMapValue);
            }
        } catch(err) {
            if (err.response.status.toString() === "404") {
                const actTrackMapValue = {
                    activityName: activities[i].name,
                    activityMeasureLabel: activities[i].measureLabel,
                    actTrackRecords: undefined
                }
                actTrackMap.set(activities[i].id,actTrackMapValue);
            }
            else {
                alert("An error occured when trying to get "+activities[i].name+" for childId "+childId+ " and date : "+date);
            }
        }
    }

    return actTrackMap;
}

export async function getActivityTrackingByChildIdDate(childId, date) {
    var activities;
    var actTrackRecordsMap;

    try {
        //Get all activity types
        const activitiesReq = await axios.get('http://localhost:9443/activity');
        if (activitiesReq.status.toString() === "200") {
            activities = activitiesReq.data;
            //For every activity type get activityTracking records for the child
            actTrackRecordsMap = await getActivityTrackingByChildIdActivitiesIdDate(childId,activities,date);
        }
    } catch(err) {
        if (err.response.status.toString() === "404") {
            alert("Error : No activity type is defined");
        }
        else {
            alert("An error occured while trying to get activity types");
        }
    }

    return actTrackRecordsMap;
}
