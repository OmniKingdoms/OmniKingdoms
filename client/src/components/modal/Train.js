import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';
import preview from '../../images/nft-preview.gif'


const Train = (props) => {
    
    const [status, setStatus] = useState('');
    const [disableBeginTrain, setDisableBeginTraining] = useState(false);
    const [disableEndTraining, setDisableEndTraining] = useState(true);
    const [remaingtime, setRemainingTime] = useState(null);
    const [isTraining, setIsTraining] = useState(false);
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

            if (response.status !== 0) setDisableBeginTraining(true);
            if (response.status == 2) {
                setDisableBeginTraining(true)
                let startTime = await props.contract.trainings(props.currentPlayer);
                let curTime = await props.contract.getBlocktime();
                console.log('start time - ' + startTime);
                console.log('cur time - ' + curTime);
                console.log('difference - ', curTime - startTime);
                if (curTime - startTime >= 120) {
                    setDisableEndTraining(false)
                } else {
                    setRemainingTime(120 - (curTime-startTime));
                }
            }
        };
    }

    const startTraining = async() => {
        await props.contract.startTraining(props.currentPlayer);
    };

    const endTraining = async() => {
        await props.contract.endTraining(props.currentPlayer)
    };

    useEffect(() => {
        getPlayerData();

    },[props.contract]);


    return (
        <div>
            <Button onClick={startTraining} variant="contained" sx={{ m: "0.5rem" }} disabled={disableBeginTrain}>Begin Training</Button>
            <Button onClick={endTraining} variant="contained" color="success" disabled={disableEndTraining}>Finish Training</Button>
            <div>
                <br />
                {remaingtime &&
                    <div>
                        <h6>{remaingtime} Seconds Left</h6>
                    </div>
                }
            </div>
        </div>
    )

};

export default Train;