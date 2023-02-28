import React, { useState, useEffect } from "react";
import './Train.css'
import { Button } from "react-bootstrap";
import preview from '../../images/nft-preview.gif'


const Train = (props) => {
    
    const [status, setStatus] = useState('');
    const [playerData, setPlayerData] = useState({
        id: '...',
        attack: '...',
        hp: '...',
        status: 'NA',
        image: preview
    })

    const getPlayerData = async() => {
        if (props.currentPlayer) {
            const response = await props.contract.players(props.currentPlayer);
            const uri = await props.contract.uri(props.currentPlayer);
        
            const player = {
                id: props.currentPlayer,
                attack: response.attack.toNumber(),
                hp: response.hp.toNumber(),
                status: response.status,
                image: uri
            };
            setPlayerData(player);
        }
    }

    const startTraining = async() => {
        await props.contract.startTraining(props.currentPlayer)
    };

    const endTraining = async() => {
        await props.contract.endTraining(props.currentPlayer)
    };

    useEffect(() => {
        getPlayerData();
    },[getPlayerData]);


    return (
        <div className="training-container">
            <div>Welcome to the training page</div>
            <Button onClick={startTraining}>Begin Training</Button>
            <Button onClick={endTraining}>Finish Training</Button>
        </div>
    )

};

export default Train;