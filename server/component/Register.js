import React, { useEffect, useState } from 'react'
function Register() {
  const [username, setUsername] = useState([{}]);
  const [password, setPassword] = useState([{}]);
  const [email, setEmail] = useState([{}]);
  var request = { "username":username , "password": password, "email":email };
  var HandleSubmit = function (event) {
    event.preventDefault();
 
    alert('form submitted');
    console.log(request);
    //
    fetch('http://localhost:5000/testRegistration', {
      method: 'POST',
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      //convert react state to json and send it as the post body
      body: JSON.stringify(request)
    }).then((response) => response.json()
    ).then(data => {
      console.log(data);
    })
  }
  return (
    <div>
      <form onSubmit={HandleSubmit}>
        <label>
          Enter username: <input type="text" onChange={e => setUsername(e.target.value)}/>
        </label>
        <label>
          Enter password: <input type="text" onChange={e => setPassword(e.target.value)}/>
        </label>
        <label>
          Enter email: <input type="text" onChange={e => setEmail(e.target.value)}/>
        </label>
        <input type="submit" value="Submit"></input>
      </form>
      <h1>register</h1>
    </div>
  )
}

export default Register