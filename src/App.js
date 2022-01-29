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
import UserLogin from './Components/Login/UserLogin';


const appColor = "#9c27b0";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      activeLayout: "My Family",
      user: {
        id: undefined,
        login: undefined,
        password: undefined,
        email: undefined
      }
    }
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
        email: newUser.emailAddress
      }
    });
  }

  handleUserLogIn = (user) => {
    this.setState({user:
      {
        id: user.id,
        login: user.login,
        password: user.password, 
        email: user.emailAddress
      }
    });

    this.setState({isLoggedIn: true});
  }

  handleLogOut = () => {
    this.setState({isLoggedIn: false});
  }

  render () {

    var display;

    if (!this.state.isLoggedIn) {
      //Not connected user
      display = <UserLogin onUserLogIn={this.handleUserLogIn}/> 
    }
    else {
      //Connected user
      var currentLayout;
      switch (this.state.activeLayout) {
        case "Dashboard":
          currentLayout = <Dashboard color={appColor} userId={this.state.user.id}/>;
          break;
        case "My Family":
          currentLayout = <MyFamily color={appColor} userId={this.state.user.id}/>; 
          break;
        case "User Profile":
          currentLayout = <UserProfile color={appColor}
            userId={this.state.user.id} 
            userLogin={this.state.user.login}
            userPassword={this.state.user.password}
            userEmail={this.state.user.email}
            onUserProfileUpdate={this.handleUserProfileUpdate}
          />; 
          break;
        default:
          break;
      }

      display = <Box sx={{ display: 'flex'}}>
          <CssBaseline />
          <MainDrawer xs={1} handleItemChange={this.handleLayoutChange} userLogin={this.state.user.login}></MainDrawer>

          <Box component="main" sx={{ flexGrow:1, p: 3}}>
              <Header xs={5} layoutName={this.state.activeLayout} userLogin={this.state.user.login} onLogOut={this.handleLogOut}></Header>
              {currentLayout}
          </Box>      
        </Box>;
    }

    return (
      <div className="App">
        {display}
      </div>
    );
  }

}

export default App;