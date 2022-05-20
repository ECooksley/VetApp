import './App.css';
import Login from './login'
import Home from './home'
import Profile from './profile'
import UserList from './userlist';
import NewUser from './newuser';
import EditUser from './edituser';
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.min.css'
import axios from 'axios'
import AnimalListing from './AnimalListing';
import Header from './Header';
import AnimalListingHeader from './AnimalListingHeader';
import Requests from './requests';
import { ClassNames } from '@emotion/react';
import AnimalProfile from './AnimalProfile';
import AnimalWrapper from './AnimalWrapper';

const endpoint = "http://localhost:8000"; //API Endpoint url

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Pages />
    );
  }
}
class Pages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: 0,
      endpoint: endpoint,
      currentPage: 0,
      idNo: 0,
      edit_user_id: 0,
      userName: "no-name",
      animalId: 0
    }
  }
  setProfile = (id, perm, name) => {
    this.setState({
      permission: perm,
      idNo: id,
      userName: name
    });
  }
  setPage = (p) => {
    this.setState({ currentPage: p })
  }
  setEditID = (id) => {
    this.setState({ edit_user_id: id })
  }
  setSelectedAnimal = (id) => {
    this.setState({ animalId: id })
  }

  getRoleText = (n) => {
    switch (n) {
      case 1:
        return "Student";
      case 2:
        return "Care Attendant";
      case 3:
        return "Health Technician";
      case 4:
        return "Teaching Technician";
      case 5:
        return "Admin";
      default:
        return "Unknown";
    }
  }

  getRoleNumber = (text) => {
    switch (text) {
      case "Student":
        return 1;
      case "Care Attendant":
        return 2;
      case "Health Technician":
        return 3;
      case "Teaching Technician":
        return 4;
      case "Admin":
        return 5;
      default:
        return 0;
    }
  }

  render(props) {
    switch (this.state.currentPage) {
      case 0:
        return <Login endpoint={this.state.endpoint} setProfile={this.setProfile} setPage={this.setPage} />
        break;
      case 1:
        return <Home endpoint={this.state.endpoint} setProfile={this.setProfile} permission={this.state.permission} setPage={this.setPage} getRoleText={this.getRoleText} />
        break;
      case 2:
        return <Profile endpoint={this.state.endpoint} setPage={this.setPage} idNo={this.state.idNo} permission={this.state.permission} />
        break;
      case 3:
        return <UserList endpoint={this.state.endpoint} setPage={this.setPage} getRoleText={this.getRoleText} permission={this.state.permission} setEditID={this.setEditID} />
        break;
      case 4:
        return <NewUser endpoint={this.state.endpoint} permission={this.state.permission} setPage={this.setPage} getRoleNumber={this.getRoleNumber} getRoleNumber={this.getRoleNumber} />
        break;
      case 5:
        return <EditUser endpoint={this.state.endpoint} setPage={this.setPage} getRoleText={this.getRoleText} getRoleNumber={this.getRoleNumber} idNo={this.state.edit_user_id} />
        break;
      case 6:
        return (
          <AnimalWrapper endpoint={this.state.endpoint} setPage={this.setPage}  setAnimal={this.setSelectedAnimal} permission={this.state.permission}/>
          // <>
          //   <AnimalListingHeader endpoint={this.state.endpoint} setPage={this.setPage} />
          //   <AnimalListing endpoint={this.state.endpoint} setPage={this.setPage} setAnimal={this.setSelectedAnimal} permission={this.state.permission} />
          // </>
        )
        break;
      case 7:
        return <Requests endpoint={this.state.endpoint} setPage={this.setPage} permission={this.state.permission} />
        break;
      case 8:
        return <AnimalProfile endpoint={this.state.endpoint} setPage={this.setPage} setAnimal={this.setSelectedAnimal} id={this.state.idNo} userName={this.state.userName} permission={this.state.permission} animalId = {this.state.animalId}/>
        break;
    }
  }
}

export default App;
