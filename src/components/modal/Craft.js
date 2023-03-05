import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';

const Craft = (props) => {

    const craftSword = async() => {

    }

    return (
        <React.Fragment>
            <div>this is the crafting page</div>
            <Button variant="contained" color="success"  sx={{ m: "0.5rem" }} onClick={craftSword}>Equip Sword</Button>

        </React.Fragment>
    )

};

export default Craft;