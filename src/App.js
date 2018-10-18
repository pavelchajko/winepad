import React, { Component } from 'react';
import './App.css';
import Logo from './components/Logo';
import Excel from './components/Excel';
//testing components
import Button from './components/Button';
import Suggest from './components/Suggest';
import Rating from './components/Rating';

var headers = localStorage.getItem('headers');
var data = localStorage.getItem('data');

if(!headers){
   headers = ["Title","Year","Rating","Comments","Value"];
   data = [
      ["Prosseco","2015","4","good one","15 euro"],
      ["Rosseto","2013","2","bad smell","18 euro"]
    ];
}

class App extends Component {

  render() {
    return (
      <div id="pad" className="App">
          <h1>
          <Logo /> Welcome to Winepad!
        </h1>
        <Excel headers={headers} initialData ={data}/>

      <p>****************************************************************</p>
        <div style={{display:'block',float:'left'}}>
            <h1>Test of new components</h1>
            
            <div style={{display:'block'}}>
            <h2>Buttons</h2>
              <div>Button with onClick<Button onClick = {()=>alert('Ouch!')}>Click me</Button></div>
              <div>Button with a link<Button href = "http://reactjs.com">Follow me</Button></div>
              <div>Custom class name<Button className="custom">I do nothing</Button></div>
            </div>

            <div style={{display:'block'}}>
            <h2>Form inptus</h2>
            <h3>Suggest</h3>
              <div>
                <Suggest options = {['eenie','meenie','miney','mo']} />
              </div>
              
            </div>
          
            <div style={{display:'block'}}>
              <h2>Form inptus</h2>
              <h3>Rating</h3>
              <div>
                <Rating  defaultValue ={3} max ={11} readOnly = {false}/>
              </div>
              
            </div>
            


        </div> 


      </div>
    );
  }
}

export default App;
