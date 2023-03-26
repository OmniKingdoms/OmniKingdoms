import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';
import preview from '../../images/nft-preview.gif';

const Quest = (props) => {

    const [status, setStatus] = useState('');
    const [disableBeginQuest, setDisableBeginQuesting] = useState(false);
    const [disableEndQuest, setDisableEndQuesting] = useState(true);


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

            if (player.status !== 0) {
                setDisableBeginQuesting(true);
            }
            if (player.status == 1) {
                setDisableEndQuesting(false);
            }
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
        <div>
            <Button onClick={startQuesting} variant="contained" sx={{ m: "0.5rem" }} disabled={disableBeginQuest}>Begin Quest</Button>
            <Button onClick={endQuesting} variant="contained" color="success" disabled={disableEndQuest}>Finish Quest</Button>
        </div>
    )

};

export default Quest;