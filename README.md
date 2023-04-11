# Scroll Kingdoms - Scaling Eth Hackathon Overview

### Contract Address - Scroll Alpha

[0xe79C627c41746bd5D013c855c6f89645a34de6F5](https://blockscout.scroll.io/address/0xe79C627c41746bd5D013c855c6f89645a34de6F5)

### Live preview 
https://clientpv2.vercel.app/

## Generate type

npx typechain --target ethers-v5 "deployment/artifacts/hardhat-diamond-abi/HardhatDiamondABI.sol/DIAMOND-1-HARDHAT.json"

##  Project Description

Scroll Kingdoms is a cross chain MMORPG. Ideally the game will be a free, play to game. Users can customize their characters by changing their unique name, equipping items and switching between skins. They can also earn in game resources by questing, as well as boosting their stats via training. We plan to add PvP arenas, and boss battles (both individual and co-op). Our token will be used for trading on our custom multi-token standard exchange, governance, and special game events (such as special quests and items).

Users can generate an image via midJourney API, this image is then uploaded to IPFS and attached in the URI of the character NFT. Users must also select a name. All names must be unique and have to be verified on chain. Finally they must select a gender. 
Then you are allowed to choose between fighting in the arena, crafting, training or questing. It would make sense to train. The important part of training is that it can be used to increase your stats. For example the basic train functions allow a user to take their NFT for 120 seconds. Once the unlock period is hit, players can unstake their player, while getting a boost to their strength stat. Similar logic applies to different stats and different periods. Training allows users to become strong, but some have cooldowns, which means they can’t keep accruing certain stats over and over again. 



## How it's Made

#### Smart Contract

We are using the EIP-2535 standard, also known as the diamond standard. This allows us to upgrade our contracts as well as bypass memory constraints and create as much on chain logic as possible. We are using Hardhat to deploy the diamond with the related facets, while also verifying the contracts on each chain. Louper is also being used for testing purposes. 

#### Front-End

We are using Next.js React Framework to build our front-end and tailwind for style css. As a provider to handle wallet connection and wallet interactions we are using wagmi with rainbowkit, as it connects really well with react and ethers.js. We are also using libraries like zustand for state management and framer-motion for components animations.

## Future Plans

### Exchange

We want to add an exchange that will allow other players to trade their character NFTs, as well as their tokens and items. Users will be able to use an in-game currency to purchase lists and purchase their assets. They can also get special benefits by using certain tokens. For example certain skins/items may only be available for trade and purchase with certain tokens. Perhaps we will open up the exchange to other compatible tokens in the future, allowing users to import and interact with other metaverse projects. 

### Cross-Chain

Ideally we are planning on deploying to several EVM compatible networks. We are currently experimenting with several cross chain bridges, such as hyperlane. The idea is to allow users to bridge their characters to different chains. We may track this on chain or on our own server.
