import React, { useState, useEffect, useCallback} from "react";
import './PlayerCard.css';

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

    const statusMap = {
        0: 'idle'
    }

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
    },[getPlayers]);

    return (
        <div className="card-container">
            
            <img className="player-image" src={playerData.image} alt="" />
            <div>
                <ul>
                    <li className="list-item">
                        Status: {statusMap[playerData.status]}
                    </li>
                    <li>
                        Attack: {playerData.attack}
                    </li>
                    <li>
                        HP: {playerData.hp}
                    </li>
                </ul>
            </div>

    
        </div>
    );

};

export default PlayerCard;