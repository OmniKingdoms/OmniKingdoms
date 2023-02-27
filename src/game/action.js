import React, { useState} from "react";
import { Button } from 'react-bootstrap';
import map from "../images/game-map.jpeg"
import './action.css'

const Action = () => {


    return (
        <React.Fragment>
            <div className="action-container">

                <div className="game-map-container">
                    <img src={map} alt="game map" width="100%" />
                    <Button variant="primary" className="button-train" size="sm">TRAIN</Button>
                    <Button variant="primary" className="button-arena" size="sm">ARENA</Button>
                    <Button variant="primary" className="button-quest" size="sm">QUEST</Button>
                    <Button variant="primary" className="button-bridge" size="sm">BRIDGE</Button>
                </div>

            </div>


        </React.Fragment>
    )

};

export default Action;