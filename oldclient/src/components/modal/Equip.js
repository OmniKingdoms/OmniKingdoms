import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';
import preview from '../../images/nft-preview.gif'


const Equip = (props) => {

    const [avaliableSword, setAvailableSword] = useState(false);
    const [swords, setSwords] = useState([]);

    const getPlayerData = async() => {

        



        let response = await props.contract.players(props.currentPlayer);
        let hasSword = response.item;

        if (hasSword) {
            
        } else {
            let hold = [];
            const arr = await props.contract.getSwords(props.account);
            for (let i = 0; i < arr.length; i++) {
                let tmp = await props.contract.swords(arr[i]);
                let s = tmp.available;
                if (s == true) {
                    hold.push(arr[i]);
                }
            }
            setSwords(hold);
            if (hold.length) setAvailableSword(true);
        }

    }

    const equipSword = async() => {
        await props.contract.equipSword(props.currentPlayer, swords[0])
    };

    useEffect(() => {
        getPlayerData();

    },[props]);

    return (
        <div>
            <Button variant="contained" color="success"  sx={{ m: "0.5rem" }} onClick={equipSword} disabled={!avaliableSword}>Equip Sword</Button>
            <Button variant="contained" color="error" disabled={true}>Unequip Sword</Button>
        </div>
    )

};

export default Equip;