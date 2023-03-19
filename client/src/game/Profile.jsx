import React, { useState, useEffect, useCallback} from "react";
import AiAvatar from '../components/AiAvatar';
import { Button, Box, Typography, Modal, Form } from '@mui/material';


const Profile = (props) => {
  const [name, setName] = useState('');
  const [players, setPlayers] = useState(null);
  const [currentPlayerId, setCurerntPlayerId] = useState(null);
  const [currentPlayer, setCurerntPlayer] = useState(null);
  
  const [img, setImg] = useState(''); 


  const getPlayers = async() => {
    console.log('getting players')
    const response = await props.diamond.getPlayers(props.account);
    if (response.length) {
      setPlayers(response.map(val => val.toNumber()));
      setCurerntPlayerId(1);
    }
    getPlayer(currentPlayerId)
  }

  const getPlayer = async(playerId) => {
    const response = await props.diamond.getPlayer(playerId);
    const player = {
      name: response.name,
      uri: response.uri
    }
    setCurerntPlayer(player)
  }


  const mint = async() => {
    await props.diamond.mint(name, 
    'img',
    true
    )
  }

  const inputHandler = async (e) => {
    e.preventDefault();
    const val = e.target.value;
    setName(val);
  }


  useEffect(() => {
    console.log('hitting use effect')
    getPlayers();
  },[props.diamond]);

  return (
    <div>
      <div>
        <input type="text" onInput={inputHandler} value={name}/>
        <Button onClick={mint}>Mint</Button>
        {currentPlayer && 
          <div>
            <p>{players.length}</p>
            <p>{currentPlayer.name}</p>
            <img src={currentPlayer.uri} alt="" />
          </div>
        }
        <div>{name}</div>
      </div>

      <h1>Profile</h1>
      <div>Avatar</div>
      <div>Stats</div>
      <div>Inventory</div>
      <div>Equipment</div>
      <div>Mint</div>

      <div>
        <h3>Generate Image</h3>
        <AiAvatar img={img} setImg={setImg} diamond={props.diamond}/>
      </div>

    </div>
  )
}

export default Profile