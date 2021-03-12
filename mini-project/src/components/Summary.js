import React, { useState, useEffect } from "react";
import axios from 'axios';

var arrobjs = [];



const Summary = () => {

  const [logs, setLogs] = useState([]);

//Retrieving data from API every 2 secs and storing them in logs
  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('https://join.reckon.com/stock-pricing')
        .then(res => {
          res.data.map(item => arrobjs.push(item));
          setLogs(arrobjs);
        })
        .catch(err => {
          console.log(err)
        })
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  //Rendering UI
  return (
    <div className="summary-box">
      <h1>Summary</h1>
      <table >
        <tr>
          <th>Stock</th>
          <th>Starting</th>
          <th>Lowest</th>
          <th>Highest</th>
          <th>Current</th>
        </tr>
      </table>
    </div>
  );
};

export default Summary

