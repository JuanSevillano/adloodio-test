import React, { useEffect } from 'react';
import logo from './logo.png';
import './App.css';
import openSocket from 'socket.io-client';
import axios from './axiosConfig';

function App() {

  useEffect(() => {
    const socket = openSocket('http://localhost:4848');


    socket.on('order', data => {
      if (data.action === 'ready') {
        console.log('Esta listo el Notification!! papá ')
      }
    })

    axios.get('http://localhost:4848/')
      .then(res => console.log(res.data))
      .catch(err => console.log(err))



  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome! And good luck! :)<br />Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
