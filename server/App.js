import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route,Routes, Link } from "react-router-dom";
import Login from "./component/Login"
import Register from "./component/Register"


function App() {

  return (
    <div>
      <Router>
        <nav>
          <Link to="/">log in</Link>
          <Link to="/Register">register</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
        </Routes>
    </Router>
    </div>

  )
}

export default App