import React, { useState, useEffect } from "react";
import PlayerItem from "../components/PlayerItem";
import { Button, Box, CircularProgress } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import './LeaderBoard.css';

const LeaderBoard = (props) => {

    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(false);

    const getPlayers = async() => {
        setLoading(true);
        const tmp = await props.contract.playerCount();
        const playerCount = tmp.toNumber();
        let hold = []

        for(var i = 1; i <= playerCount; i++){
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


    const sortByAttack = async() => {
        let tmp = players;
        let sorted = tmp.sort(
            (a,b) => (b.attack - a.attack)
        );
        setPlayers(sorted);
    };

    const sortByWins = async() => {
        let tmp = players;
        let sorted = tmp.sort(
            (a,b) => (b.wins - a.wins)
        );
        setPlayers(sorted);
    };


    useEffect(() => {
        getPlayers()

    },[props.contract]);


    return (
        <div className="board-container">
            <h1>
                Welcome to The Leaderboard
            </h1>
            <div className="sorting">
                <Button variant="outlined" startIcon={<FilterListIcon />}>SORT BY:</Button>
                <Button onClick={sortByWins} variant="contained">Wins</Button>
                <Button onClick={sortByAttack} variant="contained">Attack</Button>
            </div>
            {loading && (
                <div className="spinner">
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                    <br />
                </div>
            )}
            <ul className="users-list">
                {players.map(nft => (
                    <PlayerItem 
                        id={nft.id} 
                        attack={nft.attack}
                        wins={nft.wins}
                        image={nft.image} 
                />
                ))}
            </ul>
        </div>
    )

};

export default LeaderBoard;