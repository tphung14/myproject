import "./App.css";

//Router
import React, {Component , useState}  from 'react';
import { Routes, Route,BrowserRouter as Router } from "react-router-dom";
import Recommendations from './Recommendations';
import Add_Exercises from "./Add_Exercises";
import Profile from "./Profile";
import Register from "./Register";
import Login from "./Login";

/*
<Route exact path="/" component={Recommendations} />
<Route exact path="/newExercise" component={Add_Exercises} />
*/


class App extends Component {
 
  constructor() {
    super();
    this.state = {id: 0};
  }
  
  logout = (num) =>{
    this.setState({id : num});
    console.log(this.state.id)
  }
  setId = (num) =>{
    
    this.setState({id : num});
    console.log(this.state.id);
  }
  
  render(){

  return (
    <div className="App">
      <Routes>
      <Route exact path="/" element={<Login parentCallback = {this.setId} parentLogout={this.logout}/>} />
      <Route exact path="/newExercise" element={<Add_Exercises id = {this.state.id}/>} />
      <Route exact path="/profile" element={<Profile id = {this.state.id}/>} />
      <Route exact path="/register" element={<Register id = {this.state.id} setId = {this.setId}/>} />
      <Route exact path="/Recommendations" element={<Recommendations id = {this.state.id}/>} />
      </Routes>
       
    </div>
  );
  }
 
}

export default App;