import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';
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

        //const tmp = props.contract

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

    },[props.contract]);


    return (
        <div>
            <Button onClick={startTraining} variant="contained" sx={{ m: "0.5rem" }}>Begin Training</Button>
            <Button onClick={endTraining} variant="contained" color="success">Finish Training</Button>
        </div>
    )

};

export default Train;