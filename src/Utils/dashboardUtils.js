import axios from 'axios';

async function getActivityTrackingByChildIdActivitiesId(childId,activities) {
    var actTrackMap = new Map();
    for (var i=0; i<activities.length; i++){
        try {
            const actTrackReq = await axios.get('http://localhost:9443/activitytracking/childid/activityid/'+childId+'/'+activities[i].id);
            if (actTrackReq.status.toString() === "200") {
                const actTrackMapValue = {
                    activityMeasureLabel: activities[i].measureLabel,
                    actTrackRecords: actTrackReq.data
                }
                actTrackMap.set(activities[i].name,actTrackMapValue);
            }
        } catch(err) {
            if (err.response.status.toString() === "404") {
                const actTrackMapValue = {
                    activityMeasureLabel: activities[i].measureLabel,
                    actTrackRecords: undefined
                }
                actTrackMap.set(activities[i].name,actTrackMapValue);
            }
            else {
                alert("An error occured when trying to get "+activities[i].name+" for childId "+childId);
            }
        }
    }

    return actTrackMap;
}

export async function getActivityTrackingByChildId(childId) {
    var activities;
    var actTrackRecordsMap;

    try {
        //Get all activity types
        const activitiesReq = await axios.get('http://localhost:9443/activity');
        if (activitiesReq.status.toString() === "200") {
            activities = activitiesReq.data;
            //For every activity type get activityTracking records for the child
            actTrackRecordsMap = await getActivityTrackingByChildIdActivitiesId(childId,activities);
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
