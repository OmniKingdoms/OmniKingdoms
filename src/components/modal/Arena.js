import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';
import preview from '../../images/nft-preview.gif'


const Arena = (props) => {
    
    const [status, setStatus] = useState(false);
    const [host, setHost] = useState(null);
    const [playerData, setPlayerData] = useState({
        id: '...',
        attack: '...',
        hp: '...',
        status: 'NA',
        image: preview
    })

    const getPlayerData = async() => {

        const tmp = await props.contract.arena();
        const open = tmp.open;
        if (!open) {
            const id = tmp.hostId.toNumber();
            setHost(id);
            setStatus(true);
            const response = await props.contract.players(id);
            const uri = await props.contract.uri(id)

            const player = {
                id: props.currentPlayer,
                attack: response.attack.toNumber(),
                hp: response.hp.toNumber(),
                status: response.status,
                image: uri
            };
            setPlayerData(player);
        } else {
            setStatus(false);
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

    },[props.contract]);


    return (
        <div>
            {status &&
                <React.Fragment>
                    <div>Current Host Hero #{host}</div>
                    <img className="player-image" src={playerData.image} alt="" />
                </React.Fragment>

            }
            <Button onClick={enterArena} variant="contained" sx={{ m: "0.5rem" }} disabled={status}>Create Challenge</Button>
            <Button onClick={challengeArena} variant="contained" color="success" disabled={!status}>Accept Challenge</Button>
        </div>
    )

};

export default Arena;