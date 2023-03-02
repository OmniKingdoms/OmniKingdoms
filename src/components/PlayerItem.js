import React from "react";
import './PlayerItem.css';


const PlayerItem = (props) => {

    return (
        <div className="item-container">
            <div >
                <h6 className="name">Hero #{props.id}</h6>
                <img className="player-image" src={props.image} alt="" />
            </div>
            <div className="player-info">
                <div>wins: {props.wins}</div>
            </div>
        </div>
    )
};

export default PlayerItem;