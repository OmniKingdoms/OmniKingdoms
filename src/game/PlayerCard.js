import React, { useState, useEffect, useCallback} from "react";
import './PlayerCard.css';
import preview from '../images/nft-preview.gif';
import rightArrow from '../images/right-arrow.png'

const PlayerCard = (props) => {
    const [players, setPlayers] = useState([]);
    const [playerIndex, setPlayerIndex] = useState(0);
    const [playerData, setPlayerData] = useState({
        id: '...',
        attack: '...',
        hp: '...',
        status: 'NA',
        image: preview
    })

    const statusMap = {
        99: '...',
        0: 'Idle',
        1: 'Questing',
        2: 'Training'
    }

    const getPlayers = useCallback(async() => {
        const tmp = await props.contract.getPlayers(props.account);
        setPlayers(tmp.map(val => val.toNumber()));
        props.setCurrentPlayer(players[playerIndex]);
        getPlayerData()
    });


    const nextPlayer = async() => {
        if (playerIndex < players.length-1) {
            let newIndex = playerIndex + 1;
            setPlayerIndex(newIndex);
        } else {
            setPlayerIndex(0);
        }
        props.setCurrentPlayer(players[playerIndex]);
        getPlayerData()
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
            <div onClick={nextPlayer}>
                <img className="right-arrow"  src={rightArrow} alt="" />
            </div>

    
        </div>
    );

};

export default PlayerCard;