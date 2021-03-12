import React, { useState, useEffect } from "react";
import axios from 'axios';

var arrobjs = [];



const Log = () => {

  //Using hook to add states to function components
  const [logs, setLogs] = useState([]);
  const [time, setTime] = useState([]);
  const [isRunning, setIsRunning] = useState(true);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    //Retrieving data from API every 2 secs
    if (isRunning) {
      const id = window.setInterval(() => {
        console.log('this will run every two secs!');
        axios.get('https://join.reckon.com/stock-pricing')
          .then(res => {
            console.log(res.data);
            var currentdate = new Date();
            setTime("Updates for " + currentdate.getDate() + "/"
              + (currentdate.getMonth() + 1) + "/"
              + currentdate.getFullYear() + "  "
              + currentdate.getHours() + ":"
              + currentdate.getMinutes() + ":"
              + currentdate.getSeconds());
            var obj = {
              "code": "Updates for " + currentdate.getDate() + "/"
                + (currentdate.getMonth() + 1) + "/"
                + currentdate.getFullYear() + "  "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds(), "price": " "
            };
            arrobjs.push(obj);
            res.data.map(item => arrobjs.push(item));
            arrobjs.push(res.data);;
            setLogs(arrobjs);
          })
          
          .catch(err => {
            console.log(err)
          })
      }, 2000);
      // Clearing interval when log paused
      return () => window.clearInterval(id);
    }
  }, [isRunning]);
//Displaying html elements on the
  return (

    <div className="log-box">
      <h1>Log</h1>
      <button id="btn" onClick={() => {
        setIsRunning(!isRunning);
        if (isRunning === true) {
          document.getElementById("btn").innerHTML = "Resume Log";
        }
        else { document.getElementById("btn").innerHTML = "Pause Log"; }
      }}>Pause Log</button>
      <ul>
        {
          Object.keys(logs)
            .map((item, i) => (
              <li key={i}>
                <span >{logs[item].code} {logs[item].price}  </span>
              </li>))

        }</ul>
    </div>
  );
};

export default Log

//