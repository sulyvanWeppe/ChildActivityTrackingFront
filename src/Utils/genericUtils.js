import axios from "axios";

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