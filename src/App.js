import React, { Component } from 'react';
import './App.css';
import Logo from './components/Logo';
import Excel from './components/Excel';

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
      </div>
    );
  }
}

export default App;
