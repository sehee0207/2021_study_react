import React from 'react';
import ReactDOM from 'react-dom';
import Clock from "./clock"

//타이머
function tick(){
  const element = (
    <div>
      <h1>Hello world</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  )
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}
setInterval(tick, 1000);