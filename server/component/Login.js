import React, { useEffect, useState } from 'react'

function Login() {
  const [username, setUsername] = useState([{}]);
  const [password, setPassword] = useState([{}]);
  var request = { "username":username , "password": password };
  const [serverResponse, setResponse]=useState([{}]);
  var HandleSubmit = function (event) {
    event.preventDefault();
 
    alert('form submitted');
    console.log(request);
    //
    fetch('http://localhost:5000/auth', {
      method: 'POST',
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      //convert react state to json and send it as the post body
      body: JSON.stringify(request)
    }).then((response) => response.json()
    ).then(data => {
      console.log(data);
      setResponse(data)
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
        <input type="submit" value="Submit"></input>
      </form>
      <h1>log in</h1>
      {(serverResponse.authenticatedUser === 'incorrect') ? (
        <p>Incorrect Username/Password</p>
      ) : (
        <p>Hello {serverResponse.authenticatedUser}!</p>
      )}
    </div>
  )
}

export default Login