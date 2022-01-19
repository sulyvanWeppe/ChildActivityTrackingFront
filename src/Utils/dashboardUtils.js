import axios from 'axios';

async function getActivityTrackingByChildIdActivitiesId(childId,activities) {
    var actTrackMap = new Map();
    for (var i=0; i<activities.length; i++){
        try {
            const actTrackReq = await axios.get('http://localhost:9443/activitytracking/childid/activityid/'+childId+'/'+activities[i].id);
            if (actTrackReq.status.toString() === "200") {
                actTrackMap.set(activities[i].name,actTrackReq.data);
            }
        } catch(err) {
            if (err.response.status.toString() === "404") {
                actTrackMap.set(activities[i].name,undefined);
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

export function getActivityNameById(activityId) {
    axios.get('http://localhost:9443/activity/'+activityId)
        .then(res => console.log(res.data))
        .catch(err => alert(err));
}

export async function getActivityTrackingPromiseByChildId(childId) {
    var activityTrackingPromise = await axios.get('http://localhost:9443/activitytracking/childid/'+childId);
    
    return activityTrackingPromise;
}

export async function getActivityNamePromiseById(activityId) {
    var returnedPromise = axios.get('http://localhost:9443/activity/'+activityId);

    return returnedPromise;
}