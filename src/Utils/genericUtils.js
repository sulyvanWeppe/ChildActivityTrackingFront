import axios from "axios";

/**
 * User management
 */
export function getInitialFromUserLogin(userLogin) {
    return userLogin.charAt(0);
}

export async function getUserIdFromLoginPwd(userLogin, userPwd) {
    try {
        const userReq = await axios.get('http://localhost:9443/user/login/password/'+userLogin+'/'+userPwd);

        if (userReq.status.toString() === "200") {
            return userReq.data;
        }
    } catch (err) {
        if (err.response.status.toString() === "404") {
            alert("Login/Password is not correct");
        }
        else {
            alert("A technical error occured when trying to log you in {"+err+"}")
        }
    }
}

export async function createUserAccount(login, password, email) {
    try {
        const newUser= {
            login: login,
            password: password,
            emailAddress: email
        }
        const creationReq = await axios.post('http://localhost:9443/user/', newUser);

        if (creationReq.status.toString() === "200") {
            return creationReq.data;
        }

    } catch(err) {
        alert("An error occured while trying to create your account {"+err+"}")
    }
}

/**
 * Doctor management
 * 
 */
export async function getDoctorFromUserId(userId) {
    try {
        const doctorReq = await axios.get('http://localhost:9443/doctor/userid/'+userId);

        if (doctorReq.status.toString() === "200") {
            return doctorReq.data;
        }
    } catch(err) {
        if (err.response.status.toString() === "404") {
            return undefined;
        }
        else {
            alert("An error occured while trying to get doctor information {"+err+"}")
        }
    }
}

/**
 * Activity management
 */
export function insertRecordIntoTimeline(activity, timeline) {
    if (timeline.length === 0) {
        //Edge case : timeline is empty
        timeline.push(activity);    
    }
    else {
        var i=0;
        var isActivityInTimeline = false;

        while(i<timeline.length && !isActivityInTimeline) {
            //Till we reach the end of the timeline we check if the record occurs before the current one in the timeline
            if(activity.activityRecord.activityTimestamp < timeline[i].activityRecord.activityTimestamp) {
                if (i===0) {
                    timeline.splice(0,0,activity);
                }
                else {
                    timeline.splice(i-1,0,activity);
                }
                
                isActivityInTimeline = true;
            }

            i++;
        }

        if (!isActivityInTimeline) {
            timeline.push(activity);
        }

        return timeline;
    }
    return timeline;
}

