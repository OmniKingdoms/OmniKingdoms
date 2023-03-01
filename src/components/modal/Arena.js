import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';
import preview from '../../images/nft-preview.gif'


const Arena = (props) => {
    
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

    const enterArena = async() => {
        await props.contract.enterArena(props.currentPlayer)
    };

    const challengeArena = async() => {
        await props.contract.fightArena(props.currentPlayer)
    };

    useEffect(() => {
        getPlayerData();
    },[getPlayerData]);


    return (
        <div>
            <Button onClick={enterArena} variant="contained" sx={{ m: "0.5rem" }}>Enter Arena</Button>
            <Button onClick={challengeArena} variant="contained" color="success">Exit Arena</Button>
        </div>
    )

};

export default Arena;