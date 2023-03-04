import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';
import preview from '../../images/nft-preview.gif'


const Train = (props) => {
    
    const [status, setStatus] = useState('');
    const [disableBeginTrain, setDisableBeginTraining] = useState(false);
    const [disableEndTraining, setDisableEndTraining] = useState(true);
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

            if (response.status == 0) {
                setDisableBeginTraining(false)
            } else if (response.status == 2) {
                let endTime = await props.contract.trainings(props.currentPlayer);
                let curTime = await props.contract.getBlocktime();
                console.log('end time' + endTime)
                console.log('cur time' + curTime)
                if (curTime >= endTime) setDisableEndTraining(false);
            } else {
                setDisableBeginTraining(true)
            }
        };
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
            <Button onClick={startTraining} variant="contained" sx={{ m: "0.5rem" }} disabled={disableBeginTrain}>Begin Training</Button>
            <Button onClick={endTraining} variant="contained" color="success" disabled={disableEndTraining}>Finish Training</Button>
            <div>
                <br />
                <h6>*Train for 2 minutes*</h6>
            </div>
        </div>
    )

};

export default Train;