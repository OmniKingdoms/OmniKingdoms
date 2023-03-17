import React, { useState, useEffect, useCallback} from "react";
import AiAvatar from '../components/AiAvatar';
import { Button, Box, Typography, Modal, Form } from '@mui/material';


const Profile = (props) => {
  const [name, setName] = useState('');


  const mint = async() => {
    await props.diamond.mint(name, 
    'https://bafybeihfvy2hmcnvpax6anx3tgx53qie4nj32eqtuehsu2g5c5hx3ukxc4.ipfs.nftstorage.link/240.png',
    true
    )
  }

  const inputHandler = async (e) => {
    e.preventDefault();
    const val = e.target.value;
    setName(val);
  }

  

  useEffect(() => {

  },[props]);

  return (
    <div>
      <div>
        <input type="text" onInput={inputHandler} value={name}/>
        <Button onClick={mint}>Mint</Button>
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
        <AiAvatar />
      </div>

    </div>
  )
}

export default Profile