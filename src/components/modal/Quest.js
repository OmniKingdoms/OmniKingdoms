import React, { useState, useEffect, useDebugValue } from "react";
import './Train.css'
import { Button } from "react-bootstrap";
import preview from '../../images/nft-preview.gif';
import './Quest.css'

const Quest = (props) => {

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

    const startQuesting = async() => {
        await props.contract.startQuest(props.currentPlayer)
    };

    const endQuesting = async() => {
        await props.contract.endQuest(props.currentPlayer)
    };

    useEffect(() => {
        getPlayerData();
    },[getPlayerData]);

    return (
        <div className="quest-container">
            <div>Welcome to the questing page</div>
            <Button onClick={startQuesting}>Begin Quest</Button>
            <Button onClick={endQuesting}>Finish Quest</Button>
        </div>
    )

};

export default Quest;