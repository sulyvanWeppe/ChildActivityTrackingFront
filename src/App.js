import './App.css';
import MainDrawer from './Components/MainDrawer';
import Header from './Components/Header';
import { CssBaseline } from '@mui/material';
import { Box } from '@mui/system';
import './Components/UserProfile/UserProfile.css';
import './Components/Dashboard/Dashboard.css';
import Dashboard from './Components/Dashboard/Dashboard';
import UserProfile from './Components/UserProfile/UserProfile';
import MyFamily from './Components/MyFamily/MyFamily';
import React from 'react';
import axios from 'axios';


const appColor = "#9c27b0";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeLayout: "My Family",
      user: {
        id: -1, //@ToDo: re-change with null and handle it in the render function so that it display a loading spin for example
        login: " ", //@ToDo: re-change with null and handle it in the render function so that it display a loading spin for example
        password: " ",//@ToDo: re-change with null and handle it in the render function so that it display a loading spin for example
        email: " "//@ToDo: re-change with null and handle it in the render function so that it display a loading spin for example
      },
      doctor: {
        id: -1,
        userId: -1,
        name: " ", //@ToDo: re-change with null and handle it in the render function so that it display a loading spin for example
        emailAddress: " ", //@ToDo: re-change with null and handle it in the render function so that it display a loading spin for example
        phoneNr: " ", //@ToDo: re-change with null and handle it in the render function so that it display a loading spin for example
        city: " ", //@ToDo: re-change with null and handle it in the render function so that it display a loading spin for example
        street: " ", //@ToDo: re-change with null and handle it in the render function so that it display a loading spin for example
        streetNr: " ", //@ToDo: re-change with null and handle it in the render function so that it display a loading spin for example
        zipCode: " ", //@ToDo: re-change with null and handle it in the render function so that it display a loading spin for example
        country: " " //@ToDo: re-change with null and handle it in the render function so that it display a loading spin for example
      }
    }
  }

  componentDidMount() {
    /**
     * User info
     */
    axios.get('http://localhost:9443/user/1')
      .then(resUserData => {
        const resUser = resUserData.data;
        this.setState({
          user:{
            id: resUser.id,
            login: resUser.login,
            password: resUser.password,
            emailAddress: resUser.emailAddress
          }
        });

        /**
         * Doctor info 
         */
        //Get Doctor id for the current user
        axios.get('http://localhost:9443/doctor/userid/'+resUser.id)
        .then(resDoctorId => {
          this.setState({doctor:{id:resDoctorId.data[0].id}});
          //Get the doctor info
          axios.get('http://localhost:9443/doctor/'+resDoctorId.data[0].id)
          .then(resDoctorData => {
            const resDoctor = resDoctorData.data;
            this.setState({
              doctor:{ 
                id: resDoctor.id,
                userId: resDoctor.userId,
                name: resDoctor.name,
                emailAddress: resDoctor.emailAddress,
                phoneNr: resDoctor.phoneNr,
                city: resDoctor.city,
                street: resDoctor.street,
                streetNr: resDoctor.streetNr,
                zipCode: resDoctor.zipCode,
                country: resDoctor.country
              }
            })
          })
          .catch(err => alert(err));
        })
        .catch(err => alert(err));
      })
      .catch(err => alert(err));
        
  }

  handleLayoutChange = (newLayout) => {
    this.setState({
      activeLayout: newLayout 
    });
  }

  handleUserProfileUpdate = (newUser) => {
    this.setState({
      user: {
        id: newUser.id,
        login: newUser.login,
        password: newUser.password,
        emailAddress: newUser.emailAddress
      }
    });
  }

  handleDoctorEdit = (newDoctor) => {
    this.setState({
      doctor: {
        id: newDoctor.id,
        userId: newDoctor.userId,
        name: newDoctor.name,
        emailAddress: newDoctor.emailAddress,
        phoneNr: newDoctor.phoneNr,
        city: newDoctor.city,
        street: newDoctor.street,
        streetNr: newDoctor.streetNr,
        zipCode: newDoctor.zipCode,
        country: newDoctor.country
      }
    });
  }

  render () {

    var currentLayout;
    switch (this.state.activeLayout) {
      case "Dashboard":
        currentLayout = <Dashboard color={appColor}/>;
        break;
      case "My Family":
        currentLayout = <MyFamily color={appColor} userId={this.state.user.id}/>; 
        break;
      case "User Profile":
        currentLayout = <UserProfile color={appColor}
          userId={this.state.user.id} 
          userLogin={this.state.user.login}
          userPassword={this.state.user.password}
          userEmail={this.state.user.emailAddress}
          onUserProfileUpdate={this.handleUserProfileUpdate}
          doctorId={this.state.doctor.id}
          doctorName={this.state.doctor.name}
          doctorEmail={this.state.doctor.emailAddress}
          doctorPhone={this.state.doctor.phoneNr}
          doctorNr={this.state.doctor.streetNr}
          doctorStreet={this.state.doctor.street}
          doctorCity={this.state.doctor.city}
          doctorZC={this.state.doctor.zipCode}
          doctorCountry={this.state.doctor.country}
          onDoctorEdit={this.handleDoctorEdit}
        />; 
        break;
      default:
        break;
    }

    return (
      <div className="App">
        <Box sx={{ display: 'flex'}}>
          <CssBaseline />
          <MainDrawer xs={1} handleItemChange={this.handleLayoutChange}></MainDrawer>
    
          <Box component="main" sx={{ flexGrow:1, p: 3}}>
              <Header xs={5} layoutName={this.state.activeLayout} userLogin={this.state.user.login}></Header>
              {currentLayout}
          </Box>      
        </Box>
      </div>
    );
  }

}

export default App;
