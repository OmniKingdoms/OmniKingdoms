import React, { useState, useEffect, useCallback} from "react";
import './PlayerCard.css';
import preview from '../images/nft-preview.gif';
import sword from '../images/sword.png'
import rightArrow from '../images/right-arrow.png'
import Equip from '../components/modal/Equip';
import { Button, Box, Typography, Modal } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const PlayerCard = (props) => {
    const [players, setPlayers] = useState([]);
    const [isEquiped, setisEquiped] = useState(false);
    const [playerIndex, setPlayerIndex] = useState(0);
    const [playerData, setPlayerData] = useState({
        id: '...',
        attack: '...',
        hp: '...',
        status: 'NA',
        wins: '',
        image: preview
    })
    const [openEquip, setOpenEquip] = React.useState(false);
    const handleOpenEquip = () => setOpenEquip(true);
    const handleCloseEquip = () => setOpenEquip(false);

    const statusMap = {
        99: '...',
        0: 'Idle',
        1: 'Questing',
        2: 'Training',
        3: 'Arena'
    }

    const getPlayers = async() => {
        const tmp = await props.contract.getPlayers(props.account);
        setPlayers(tmp.map(val => val.toNumber()));
        props.setCurrentPlayer(players[playerIndex]);
        let hasSword = await props.contract.players(props.currentPlayer);
        console.log(hasSword.item)
        if (hasSword) {
            setisEquiped(true);
        }
        getPlayerData()
    };


    const nextPlayer = async() => {
        if (playerIndex < players.length-1) {
            let newIndex = playerIndex + 1;
            setPlayerIndex(newIndex);
        } else {
            setPlayerIndex(0);
        }
        props.setCurrentPlayer(players[playerIndex]);
        getPlayerData()
    };

    const getPlayerData = async() => {
        if (props.currentPlayer) {
            const response = await props.contract.players(props.currentPlayer);
            const uri = await props.contract.uri(props.currentPlayer);
        
            const player = {
                id: props.currentPlayer,
                attack: response.attack.toNumber(),
                hp: response.hp.toNumber(),
                status: response.status,
                wins: response.wins.toNumber(),
                image: uri
            };
            setPlayerData(player);
        }
    };

    useEffect(() => {
        getPlayers();
    },[props]);

    return (
        <div className="card-container">
            <h6>Hero #{playerData.id}</h6>
            <div>
                <img className="player-image" src={playerData.image} alt="" />
                {isEquiped &&
                    <div className="sword">
                        <img src={sword} alt="this is sword"/>
                    </div>
                }
            </div>
            <div>
                <Button variant="contained" className="button-equip" size="sm" color="success" onClick={handleOpenEquip} sx={{ marginBottom: "0.5rem" }}>EQUIP</Button>
                <Modal
                    open={openEquip}
                    onClose={handleCloseEquip}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Equip sword to increase your attack!
                        </Typography>
                        <Box 
                            id="modal-modal-description"
                            display="flex"
                            justifyContent="center"
                        >
                            <Equip contract={props.contract} currentPlayer={props.currentPlayer}/>
                        </Box>
                    </Box>
                </Modal>
            </div>

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
                    <li>
                        Wins: {playerData.wins}
                    </li>
                </ul>
                
            </div>
            <div onClick={nextPlayer} className="selector">
                <img className="right-arrow"  src={rightArrow} alt="" />
            </div>

    
        </div>
    );

};

export default PlayerCard;