import React, { useEffect, useState } from 'react'

function App() {
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {

    // fetch api from backend
    fetch('/api').then(
      //whatever response we get from the api it will be in json format
      response => response.json()
    ).then(
      //get the data from the json and set it to the backendData variable
      data => {
        console.log(data)
        setBackendData(data)
      }
    )
  }, []/*[] it makes sure to start only on the first render of the page*/);

 const [secondBackendData, setSecondBackendData]= useState([{}])
 useEffect(() => {

    // fetch api from backend
    fetch('/testData').then(
      //whatever response we get from the api it will be in json format
      response => response.json()
    ).then(
      //get the data from the json and set it to the backendData variable
      data => {
        console.log(data)
        setSecondBackendData(data)
      }
    )
  },[]);

  const [fname, setfname] = useState([{}]);
  const [lname, setlname] = useState([{}]);
  const [location, setlocation] = useState([{}]);
  var request = { "firstname": fname, "lastname": lname, "location":location };
  const [serverResponse, setResponse]=useState([{}]);
  var HandleSubmit = function (event) {
    event.preventDefault();
    alert('form submitted');
    console.log(request);
    //
    fetch('http://localhost:5000/testDataResponse', {
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
      {(typeof secondBackendData === 'undefined') ? (
        <p>loading...</p>
      ) : (
        secondBackendData.map((user) => (
          <p>{user.firstname} {user.lastname} is from {user.location}</p>
        ))
      )}
      <form onSubmit={HandleSubmit}>
        <label>
          Enter first name: <input type="text" onChange={e => setfname(e.target.value)} />
        </label>
        <label>
          Enter last name: <input type="text" onChange={e => setlname(e.target.value)} />
        </label>
        <label>
          Enter location: <input type="text" onChange={e => setlocation(e.target.value)} />
        </label>
        <input type="submit" value="Submit"></input>
      </form>
      {(typeof serverResponse === 'undefined') ? (
        <p>loading...</p>
      ) : (
        serverResponse.map((user) => (
          <p>{user.firstname} {user.lastname} is from {user.location}</p>
        ))
      )}
    </div>
  )
}

export default App