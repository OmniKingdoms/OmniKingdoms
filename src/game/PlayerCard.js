import React, { useState, useEffect, useCallback} from "react";


const PlayerCard = ({contract, account}) => {

    const [players, setPlayers] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [playerData, setPlayerData] = useState({
        id: '',
        attack: '',
        hp: '',
        status: '',
        image: ''
    })


    const getPlayers = useCallback(async() => {
        const tmp = await contract.getPlayers(account);
        setPlayers(tmp.map(val => val.toNumber()));
        setCurrentPlayer(players[0]);
        getPlayerData()
    });

    const nextPlayer = async() => {

    }

    const getPlayerData = async() => {
        const response = await contract.players(currentPlayer);
        const uri = await contract.uri(currentPlayer);
        const uriResponse = await fetch(uri);
    
        const player = {
            id: currentPlayer,
            attack: response.attack.toNumber(),
            hp: response.hp.toNumber(),
            status: response.status,
            image: uri
        };
        setPlayerData(player);
    }
    

    useEffect(() => {
        getPlayers();
    },[]);

    return (
        <div>
            
            <div>
                {playerData.status}
                {playerData.attack}
                {playerData.hp}
            </div>

            {/* <img src={playerData.image} alt="" /> */}
    
            <p>this is the player card</p>
        </div>
    );

};

export default PlayerCard;