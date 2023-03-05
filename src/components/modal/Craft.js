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
        await props.contract.craftSword(props.currentPlayer)
    };

    useEffect(() => {
        getGold();

    },[props,gold]);


    return (
        <React.Fragment>
            <ul>
                <Button variant="contained" color="success"  sx={{ m: "0.5rem" }} onClick={craftSword} disabled={!canCraft}>Craft Sword</Button>
                <Button variant="contained" color="success"  sx={{ m: "0.5rem" }} onClick={craftSword} disabled={true}>Craft Shield</Button>
                <br />
                <h6>3 gold per sword - shield coming soon</h6>
            </ul>

        </React.Fragment>
    )

};

export default Craft;