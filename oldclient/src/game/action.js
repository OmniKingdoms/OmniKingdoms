import React, { useState, useEffect, useCallback} from "react";
import { Button } from 'react-bootstrap';
import map from "../images/game-map.jpeg"
import PlayerCard from "./PlayerCard";
import Train from "../components/modal/Train";
import Quest from "../components/modal/Quest";
import Arena from '../components/modal/Arena';
import Craft from "../components/modal/Craft";
import './action.css';
import { Box, Typography, Modal } from '@mui/material';

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

const Action = ({contract, account, extension}) => {
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [gold, setGold] = useState();
    const [openTrain, setOpenTrain] = React.useState(false);
    const [openQuest, setOpenQuest] = React.useState(false);
    const [openArena, setOpenArena] = React.useState(false);
    const [openCraft, setOpenCraft] = React.useState(false);
    const handleOpenTrain = () => setOpenTrain(true);
    const handleCloseTrain = () => setOpenTrain(false);
    const handleOpenQuest = () => setOpenQuest(true);
    const handleCloseQuest = () => setOpenQuest(false);
    const handleOpenArena = () => setOpenArena(true);
    const handleCloseArena = () => setOpenArena(false);
    const handleOpenCraft = () => setOpenCraft(true);
    const handleCloseCraft = () => setOpenCraft(false);


    const getGold = async() => {
        const response = await contract.balanceOf(account, 1);
        setGold(response.toNumber())
    }

    useEffect(() => {
        getGold();
    }, [getGold])


    return (
        <React.Fragment>
            <div className="action-container">

                <div className="game-map-container">
                    <img src={map} alt="game map" width="100%" />

                    <div>
                        <Button variant="primary" className="button-train" size="sm" onClick={handleOpenTrain}>TRAIN</Button>
                        <Modal
                            open={openTrain}
                            onClose={handleCloseTrain}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={modalStyle}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Train to increase your attack!
                                </Typography>
                                <Box 
                                    id="modal-modal-description"
                                    display="flex"
                                    justifyContent="center"
                                >
                                    <Train contract={contract} currentPlayer={currentPlayer}/>
                                </Box>
                            </Box>
                        </Modal>
                    </div>

                    <div>
                        <Button variant="primary" className="button-quest" size="sm" onClick={handleOpenQuest}>QUEST</Button>
                        <Modal
                            open={openQuest}
                            onClose={handleCloseQuest}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={modalStyle}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Quest to earn Gold!
                                </Typography>
                                <Box 
                                    id="modal-modal-description"
                                    display="flex"
                                    justifyContent="center"
                                >
                                    <Quest contract={contract} currentPlayer={currentPlayer}/>                            
                                </Box>
                            </Box>
                        </Modal>
                    </div>

                    <div>
                        <Button variant="primary" className="button-arena" size="sm" onClick={handleOpenArena}>ARENA</Button>
                        <Modal
                            open={openArena}
                            onClose={handleCloseArena}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={modalStyle}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Battle other players & win Gold!
                                </Typography>
                                <Box 
                                    id="modal-modal-description"
                                    display="flex"
                                    justifyContent="center"
                                >
                                    <Arena contract={contract} currentPlayer={currentPlayer} extension={extension} />
                                </Box>
                            </Box>
                        </Modal>
                    </div>

                    <div>
                        <Button variant="primary" className="button-craft" size="sm" onClick={handleOpenCraft}>CRAFT</Button>
                        <Modal
                            open={openCraft}
                            onClose={handleCloseCraft}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={modalStyle}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Craft a Sword
                                </Typography>
                                <Box 
                                    id="modal-modal-description"
                                    display="flex"
                                    justifyContent="center"
                                >
                                    <Craft contract={contract} currentPlayer={currentPlayer} account={account}/>
                                </Box>
                            </Box>
                        </Modal>
                    </div>

                    <div className="player-card-container">
                        <PlayerCard contract={contract} account={account}
                            currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer}
                        />
                    </div>

                    <div className='gold-container'>
                        <div>Gold: {gold}</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

};

export default Action;