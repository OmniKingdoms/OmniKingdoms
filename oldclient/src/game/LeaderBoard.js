import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from '@mui/material';
import './LeaderBoard.css';
import EnhancedTable from "../components/PlayerTable";
import cache from "./scores.json"


const LeaderBoard = (props) => {

    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(false);

    const getPlayers = async() => {
        console.log('hello from leaderboard')
        // setPlayers(cache.cache);

        const tmp = await props.contract.playerCount();
        const playerCount = tmp.toNumber();
        console.log(playerCount);

        let uni = [];
        // for (var i = 1; i < playerCount; i++) {
        //     console.log(i)
        //     let ad = await props.contract.owner(i);
        //     if (!uni.includes(ad)) {
        //         uni.push(ad)
        //     }
        //     console.log('uniqu players ', uni.length);
        // }
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${month}-${day}-${year}`;
        const storedDate = JSON.parse(localStorage.getItem('date'));
        //const log = JSON.parse(localStorage.getItem('playerArray'));
        //console.log(log.cache)
        if ( storedDate.reset == false) {
        //if (storedDate.date !== currentDate || storedDate.reset == false) {
            console.log('cache boutta hit')
            setLoading(true);
            const tmp = await props.contract.playerCount();
            const playerCount = tmp.toNumber();
            let hold = []
            console.log(playerCount);
            for(var i = 1; i < playerCount; i++){
                console.log('saving to chache', i)
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
            localStorage.setItem('playerArray', JSON.stringify({
                cache: sorted
            }))
    
            setPlayers(sorted);
            setLoading(false);
            localStorage.setItem('date', JSON.stringify({
                date: currentDate,
                reset: true
            }))
        } else {
            //const storedPlayers = JSON.parse(localStorage.getItem('playerArray'));
            //console.log(cache.cache)
            setPlayers(cache.cache);
            console.log(players)
        }
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