import React from 'react'
import EditProfile from './EditProfile'
import EditDoctor from './EditDoctor';

class UserProfile extends React.Component {

    render () {
        return (
            <div>
                <EditProfile cardColor={this.props.color}
                    userId={this.props.userId} 
                    userLogin={this.props.userLogin}
                    userPassword={this.props.userPassword}
                    userEmail={this.props.userEmail}
                    onUpdate={this.props.onUserProfileUpdate}/>
                <EditDoctor cardColor={this.props.color}
                    userId={this.props.userId}
                    doctorId={this.props.doctorId}
                    doctorName={this.props.doctorName}
                    doctorEmail={this.props.doctorEmail}
                    doctorPhone={this.props.doctorPhone}
                    doctorNr={this.props.doctorNr}
                    doctorStreet={this.props.doctorStreet}
                    doctorCity={this.props.doctorCity}
                    doctorZC={this.props.doctorZC}
                    doctorCountry={this.props.doctorCountry}
                    onEdit={this.props.onDoctorEdit}/>
            </div>
        )
    }
}

export default UserProfile;