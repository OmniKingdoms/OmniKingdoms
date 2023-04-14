/* global ethers */
/* eslint prefer-const: "off" */
const hre = require('hardhat');
const { getSelectors, FacetCutAction } = require('./libraries/diamond.js')
console.log('this is env', process.env.WALLET)

async function deployDiamond () {
  const accounts = await ethers.getSigners()
  const contractOwner = accounts[0]

  // Deploy DiamondInit
  // DiamondInit provides a function that is called when the diamond is upgraded or deployed to initialize state variables
  // Read about how the diamondCut function works in the EIP2535 Diamonds standard
  const DiamondInit = await ethers.getContractFactory('DiamondInit')
  const diamondInit = await DiamondInit.deploy()
  await diamondInit.deployed()
  console.log('DiamondInit deployed:', diamondInit.address)

  // Deploy facets and set the `facetCuts` variable
  console.log('')
  console.log('Deploying facets')
  const FacetNames = [
    'DiamondCutFacet',
    'DiamondLoupeFacet',
    'OwnershipFacet',
    'PlayerFacet',
    'QuestFacet',
    'CraftFacet',
    'TrainFacet',
    'EquipFacet',
    'ArenaFacet',
    'ExchangeFacet'
  ]
  // The `facetCuts` variable is the FacetCut[] that contains the functions to add during diamond deployment
  const facetCuts = []
  for (const FacetName of FacetNames) {
    const Facet = await ethers.getContractFactory(FacetName)
    const facet = await Facet.deploy()
    await facet.deployed()
    console.log(`${FacetName} deployed: ${facet.address}`)
    facetCuts.push({
      facetAddress: facet.address,
      action: FacetCutAction.Add,
      functionSelectors: getSelectors(facet)
    })

    //await verifyContract(facet, FacetName);
  }

  // Creating a function call
  // This call gets executed during deployment and can also be executed in upgrades
  // It is executed with delegatecall on the DiamondInit address.
  let functionCall = diamondInit.interface.encodeFunctionData('init')
  console.log('function call', functionCall)

  // Setting arguments that will be used in the diamond constructor
  const diamondArgs = {
    owner: contractOwner.address,
    init: diamondInit.address,
    initCalldata: functionCall
  }
  // deploy Diamond
  const Diamond = await ethers.getContractFactory('Diamond')
  const diamond = await Diamond.deploy(facetCuts, diamondArgs)
  await diamond.deployed()

  

  console.log()
  console.log('Diamond deployed:', diamond.address)

  //await verifyDiamond(diamond, facetCuts, diamondArgs);
 
  // returning the address of the diamond
  return diamond.address
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  deployDiamond()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}

exports.deployDiamond = deployDiamond

async function verifyContract (diamond, FacetName, constructorArguments = []) {
  const liveNetworks = ['mainnet', 'goerli', 'mumbai', 'scroll'];
  if (!liveNetworks.includes(hre.network.name)) {
    return; // Don't verify on test networks
  }

  try {
    console.log("Waiting for 10 blocks to be mined...");
    await diamond.deployTransaction.wait(10);
    console.log("Running verification");
    await hre.run("verify:verify", {
      address: diamond.address,
      contract: `contracts/facets/${FacetName}.sol:${FacetName}`,
      network: hardhatArguments.network,
      arguments: constructorArguments ? constructorArguments : [],
    });
  } catch (e) {
    console.log("Verification failed: ", JSON.stringify(e, null, 2));
  }

  // hre.run('verify:verify', {
  //   address: diamond.address,
  //   constructorArguments
  // })
  
}

async function verifyDiamond (diamond, facetCuts, diamondArgs) {
  const liveNetworks = ['mainnet', 'goerli', 'mumbai', 'scroll'];
  if (!liveNetworks.includes(hre.network.name)) {
    return; // Don't verify on test networks
  }

  try {
    console.log("Waiting for 10 blocks to be mined...");
    console.log('---------------')
    console.log(facetCuts);
    console.log(diamondArgs);
    console.log('---------------')
    await diamond.deployTransaction.wait(10);
    console.log("Running verification");
    await hre.run("verify:verify", {
      address: diamond.address,
      contract: "contracts/Diamond.sol:Diamond",
      network: hardhatArguments.network,
      arguments: [facetCuts, diamondArgs],
    });
  } catch (e) {
    console.log("Verification failed: ", JSON.stringify(e, null, 2));
  }

  // hre.run('verify:verify', {
  //   address: diamond.address,
  //   constructorArguments
  // })
  
}