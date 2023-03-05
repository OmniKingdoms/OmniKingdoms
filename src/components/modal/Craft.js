import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';

const Craft = (props) => {
    const [gold, setGold] = useState();
    const [canCraft, setCanCraft] = useState(false);

    const getGold = async() => {
        const response = await props.contract.balanceOf(props.account, 1);
        let goldData = response.toNumber()
        console.log(goldData)
        setGold(goldData);
        if (gold >= 3) setCanCraft(true);
    }

    const craftSword = async() => {
        
    };

    useEffect(() => {
        getGold();

    },[props,gold]);


    return (
        <React.Fragment>
            <ul>
                <Button variant="contained" color="success"  sx={{ m: "0.5rem" }} onClick={craftSword} disabled={!canCraft}>Craft Sword</Button>
                <Button variant="contained" color="success"  sx={{ m: "0.5rem" }} onClick={craftSword} disabled={true}>Craft Shield</Button>
            </ul>

        </React.Fragment>
    )

};

export default Craft;