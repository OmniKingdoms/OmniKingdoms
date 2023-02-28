import React, { useState, useEffect, useCallback} from "react";
import { Button } from 'react-bootstrap';
import map from "../images/game-map.jpeg"
import PlayerCard from "./PlayerCard";
import Backdrop from "../components/modal/Backdrop";
import Train from "../components/modal/Train";
import './action.css';

const Action = ({contract, account}) => {

    const [loading, setLoading] = useState(false);
    const [showTrain, setShowTrain] = useState(false);
    const [backdrop, setbackdrop] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState(null);

 
    const backdropHandler = () => {
        setbackdrop(!backdrop);
        setShowTrain(false);
    }

    const trainHandler = () => {
        setShowTrain(!showTrain)
        setbackdrop(!backdrop)
    }


    return (
        <React.Fragment>
            <div className="action-container">

                <div className="game-map-container">
                    <img src={map} alt="game map" width="100%" />

                    <Button variant="primary" className="button-train" size="sm" onClick={trainHandler}>TRAIN</Button>
                    <Button variant="primary" className="button-arena" size="sm">ARENA</Button>
                    <Button variant="primary" className="button-quest" size="sm">QUEST</Button>
                    <div className="player-card-container">
                        <PlayerCard contract={contract} account={account}
                            currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer}
                        />
                    </div>
                </div>
                
                {showTrain && 
                    <Train contract={contract} currentPlayer={currentPlayer}/>
                }

                <Backdrop show={backdrop} onClick={backdropHandler}/>

            </div>


            


        </React.Fragment>
    )

};

export default Action;