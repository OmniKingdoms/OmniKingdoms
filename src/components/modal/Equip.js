import React from "react";
import { Button } from '@mui/material';


const Equip = () => {

    // 

    return (
        <div>
            <Button variant="contained" color="success"  sx={{ m: "0.5rem" }}>Equip Sword</Button>
            <Button variant="contained" color="error">Unequip Sword</Button>
        </div>
    )

};

export default Equip;