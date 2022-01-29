import React from 'react'
import EditProfile from './EditProfile'
import EditDoctor from './EditDoctor';

class UserProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state= {
            isRefreshNeeded: true
        }
    }

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
                    userId={this.props.userId}/>
            </div>
        )
    }
}

export default UserProfile;