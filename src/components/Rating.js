import React,{Component} from 'react';
import PropTypes from 'prop-types';


class Rating extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            rating:props.defaultValue,
            tempRating:props.defaultValue
        }
        this.setRating = this.setRating.bind(this);
        this.setTemp = this.setTemp.bind(this);
        this.reset = this.reset.bind(this);
        
    }
    
    getValue = ()=>{
        return this.state.rating;
    }
    setTemp = (rating)=>{ //onMouse over
         this.setState({tempRating:rating});
    }
    setRating = (rating)=>{ //on click
         this.setState({
            tempRating:rating,
            rating:rating
        });
    }

    reset =()=>{ //on mouse out
        this.setTemp(this.state.rating);

    }

    componentWillReceiveProps(nextProps){
        this.setRating(nextProps.defaultValue);
    }

    render(){
    
    const stars = [];
    for(let i = 1; i<this.props.max;i++){
        stars.push(
            <span
            className = {i<=this.state.tempRating ? 'RatingOn' : null}
            key={i}
            onClick = {this.setRating.bind(this,i)}
            onMouseOver = {this.setTemp.bind(this,i)}
            >
            &#9734;
            </span>
        );
    }

        
        return (
        <div className = "Rating"
             onMouseOut={this.reset.bind(this)}
        >
        {stars}
        {this.props.readonly || !this.props.id
        ? null : <input
                    type="hidden"
                    id={this.props.id}
                    value={this.state.rating}
                    />
        }
        </div> 
        );
    }
    
}

Rating.propTypes = {
    defaultValue:PropTypes.number,
    readonly: PropTypes.bool,
    max: PropTypes.number
};

Rating.defaultProps = {
    defaultValue:0,
    max:5
};

export default Rating