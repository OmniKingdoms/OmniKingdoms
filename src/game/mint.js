import React from "react";

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
                <p>this is the mint page</p>
                <div>
                    <button onClick={simpleMint}>Mint</button>
                </div>
            </div>
        </React.Fragment>
    )

};

export default Mint;