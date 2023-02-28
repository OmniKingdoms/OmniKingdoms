import React, { useState, useEffect, useCallback} from "react";
import './PlayerCard.css';
import preview from '../images/nft-preview.gif'

const PlayerCard = (props) => {
    const [players, setPlayers] = useState([]);
    const [playerData, setPlayerData] = useState({
        id: '...',
        attack: '...',
        hp: '...',
        status: 'NA',
        image: preview
    })

    const statusMap = {
        99: '...',
        0: 'idle',
        1: 'Questing',
        2: 'Training'
    }

    const getPlayers = useCallback(async() => {
        const tmp = await props.contract.getPlayers(props.account);
        setPlayers(tmp.map(val => val.toNumber()));
        props.setCurrentPlayer(players[0]);
        getPlayerData()
    });


    const nextPlayer = async() => {

    }

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
        }
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