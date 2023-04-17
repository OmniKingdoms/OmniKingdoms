const { getSelectors, FacetCutAction } = require('./libraries/diamond.js')

const upgradeExample = async () => {
const diamondAddress = "0x545Ad75E4A297Ff1cdb85147F5D0C8DFA0bA21E1";
const newFacetAddress = "0x96Fc87727acf891D3C24dd213d3DAb4f3BA9A39E";

const diamondCutFacet = await ethers.getContractAt(
    "DiamondCutFacet",
    diamondAddress
);

const NewFacet = await ethers.getContractFactory("TrainFacet");
const selectorsToAdd = getSelectors(NewFacet);

const tx = await diamondCutFacet.diamondCut(
    [
    {
        facetAddress: newFacetAddress,
        action: FacetCutAction.Add,
        functionSelectors: selectorsToAdd,
    },
    ],
    ethers.constants.AddressZero,
    "0x",
    { gasLimit: 800000 }
);

const receipt = await tx.wait();
if (!receipt.status) {
    throw Error(`Diamond upgrade failed: ${tx.hash}`);
} else {
    console.log("Diamond upgrade success");
}
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
upgradeExample()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
    });
}