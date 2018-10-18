import React from 'react';

class Suggest extends React.Component{

    constructor(props){
        super(props);
        this.state = {}
    }
    getValue = ()=>{
        //return this.refs.lowlevelinput.value;
        return this.state.value;
    }

    render(){
    const randomId = Math.random().toString(16).substring(2);

        return (
        <div className="Suggest">
            <input 
            list = {randomId}
            ref = "lowlevelinput"
            id = {this.props.id} 
            onChange = {e => this.setState({value: e.target.value})}           
            />
            <datalist>
            id = {randomId}
            {
            this.props.options.map((item,idx) => 
                <option value = {item} key ={idx} />
                )
            } 
            </datalist>
        </div> 
        )
    }
};

export default Suggest