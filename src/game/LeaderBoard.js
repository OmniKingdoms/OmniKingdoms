import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from '@mui/material';
import './LeaderBoard.css';
import EnhancedTable from "../components/PlayerTable";

const LeaderBoard = (props) => {

    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(false);

    const getPlayers = async() => {
        setLoading(true);
        const tmp = await props.contract.playerCount();
        const playerCount = tmp.toNumber();
        let hold = []

        for(var i = 1; i <= playerCount; i++){
            console.log(playerCount)
            const response = await props.contract.players(i);
            const uri = await props.contract.uri(i);
            let body = {
                id: i,
                attack: response.attack.toNumber(),
                hp: response.hp.toNumber(),
                status: response.status,
                wins: response.wins.toNumber(),
                image: uri
            };
            hold.push(body);
        };
        let sorted = hold.sort(
            (a,b) => (b.wins - a.wins)
        );

        setPlayers(sorted);
        setLoading(false);
    }

    useEffect(() => {
        getPlayers()

    },[props.contract]);


    return (
        <div className="board-container">
            <EnhancedTable players={players} />
            {loading && (
                <div className="spinner">
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                    <br />
                </div>
            )}
        </div>
    )

};

export default LeaderBoard;