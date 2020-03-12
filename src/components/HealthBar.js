import React from 'react';

/* eslint-disable react/prop-types */
class HealthBar extends React.Component {
    
    render() {
        
        const { health } = this.props;
        const style = {
            width: health+"%",
            height: "35px",
            backgroundColor: "black"
        }
        const healthnum = parseInt(health);
        if(healthnum <= 50){
            style.backgroundColor = "#D9534F";
        }
        else if(healthnum <= 70){
            style.backgroundColor = "#f0ad4e";
        }
        else{
            style.backgroundColor = "#5cb85c";
        }
        
        const total = {
            height: "35px",
            border: "1px solid black"
        }
        return (
            <div style={total}>
                <div style={style}></div>
            </div>
        )
    }
} 

export default HealthBar;
/* eslint-enable react/prop-types */