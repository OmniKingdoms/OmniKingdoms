import React, { useState, useEffect, useCallback} from "react";
import { Avatar } from "@mui/material";
import { Button, Box, Typography, Modal, Form } from '@mui/material';


const Profile = (props) => {

  const mint = async() => {
    await props.diamond.mint('kyle', 
    'https://bafybeihfvy2hmcnvpax6anx3tgx53qie4nj32eqtuehsu2g5c5hx3ukxc4.ipfs.nftstorage.link/240.png',
    true
    )
  }

  useEffect(() => {

  },[props]);

  return (
    <div>
      <div>
        <input type="text" />
        <Button onClick={mint}>Mint</Button>
      </div>

      <h1>Profile</h1>
      <div>Avatar</div>
      <div>Stats</div>
      <div>Inventory</div>
      <div>Equipment</div>
      <div>Mint</div>
    </div>
  )
}

export default Profile