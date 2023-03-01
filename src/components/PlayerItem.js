import React from "react";

const PlayerItem = (props) => {

    return (
        <div>
            <h6>Hero #{props.id}</h6>
            <img className="player-image" src={props.image} alt="" />
            <div>wins: {props.wins}</div>
        </div>
    )
};

export default PlayerItem;