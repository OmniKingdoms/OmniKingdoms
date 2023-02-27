import React, { useState} from "react";
import map from "../images/game-map.jpeg"
import './action.css'

const Action = () => {


    return (
        <React.Fragment>
            <div className="action-container">

                <div className="game-map-container">
                    <img src={map} alt="game map" />
                </div>

                <div className="train-button-container">
                    <button>Train</button>
                </div>
            </div>


        </React.Fragment>
    )

};

export default Action;