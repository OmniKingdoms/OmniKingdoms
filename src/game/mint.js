import React from "react";
import preview from "../images/nft-preview.gif"

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
                <p>Mint a Charachter</p>
                <div>
                <img src={preview} alt="preview" width="100%" />
                </div>
                <div>
                    <button onClick={simpleMint}>Mint</button>
                </div>
            </div>
        </React.Fragment>
    )

};

export default Mint;