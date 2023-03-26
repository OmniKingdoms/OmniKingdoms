import React, { useState, useEffect } from "react";
import Diamond from "../contracts/data/diamond.json";
import { ethers } from "ethers";


const Test = props => {
    const [account, setAccount] = useState(null);
    const [diamond, setDiamond] = useState(null);

    const web3Handler = async () => {
        let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0])

        window.ethereum.on('chainChanged', () => {
            window.location.reload();
        })
        window.ethereum.on('accountsChanged', async () => {
            web3Handler()
        })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        loadContract(signer);
    };

    const loadContract = async (signer) => {
    
        const diamondContract = await new ethers.Contract(Diamond.address, Diamond.abi, signer);
        console.log('hitting in loading')    
        setDiamond(diamondContract);

    }

    useEffect(() => {
        web3Handler();
    }, []);

    const readFunc = async() => {
        const tmp = await diamond.getMessage();
        console.log(tmp)
    }

    return (
        <div>
            <button onClick={readFunc}>press this button</button>
        </div>
    )

};

export default Test;