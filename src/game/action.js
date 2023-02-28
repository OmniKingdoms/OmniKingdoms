import React, { useState, useEffect, useCallback} from "react";
import { Button } from 'react-bootstrap';
import map from "../images/game-map.jpeg"
import PlayerCard from "./PlayerCard";
import Modal from "../components/modal/Modal";
import './action.css';

const Action = ({contract, account}) => {

    const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState([]);

    
    const getPlayers = async() => {
        const tmp = await contract.getPlayers(account);
        setPlayers(tmp.map(val => val.toNumber()));
    };

    useEffect(() => {
        getPlayers();
    },[]);


    return (
        <React.Fragment>
            <div className="action-container">

                <div className="game-map-container">
                    <img src={map} alt="game map" width="100%" />

                    <Button variant="primary" className="button-train" size="sm">TRAIN</Button>
                    <Button variant="primary" className="button-arena" size="sm">ARENA</Button>
                    <Button variant="primary" className="button-quest" size="sm">QUEST</Button>
                    <div className="player-card-container">
                        <PlayerCard contract={contract} account={account}/>
                    </div>
                </div>




            </div>


            


        </React.Fragment>
    )

};

export default Action;