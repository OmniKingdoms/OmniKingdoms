import React from "react";
import preview from "../images/nft-preview.gif"
import './mint.css';
import { Button } from '@mui/material';

const Mint = ({contract}) => {

    const simpleMint = async () => {
        try { 
            await(await contract._mintPlayer()).wait()
        } catch(error) {
            console.log(error)
        }  
    } 

    return (
        <React.Fragment>
            <div className="mint-container">
                <h1>Mint a Character</h1>
                <div className="mint-image">
                    <img src={preview} alt="preview" width="50%" />
                </div>
                <div className="mint-button">
                    <Button 
                        onClick={simpleMint}
                        variant="contained"
                        color="primary"
                    >
                        Mint
                    </Button>
                </div>
            </div>
        </React.Fragment>
    )

};

export default Mint;