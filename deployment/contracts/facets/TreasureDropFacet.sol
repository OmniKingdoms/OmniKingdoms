// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

struct Player {
    uint256 level;
    uint256 xp;
    uint256 status;
    uint256 strength;
    uint256 health;
    uint256 magic;
    uint256 mana;
    uint256 agility;
    uint256 luck;
    uint256 wisdom;
    uint256 haki;
    uint256 perception;
    uint256 defense;
    string name;
    string uri;
    bool male;
    Slot slot;
}

struct Slot {
    uint256 head;
    uint256 body;
    uint256 leftHand;
    uint256 rightHand;
    uint256 pants;
    uint256 feet;
}

// slots {
//     0: head;
//     1: body;
//     2: lefthand;
//     3: rightHand;
//     4: pants;
//     5: feet;
// }

// StatusCodes {
//     0: idle;
//     1: combatTrain;
//     2: goldQuest;
//     3: manaTrain;
//     4: Arena;
//     5: gemQuest;
// }

struct Item {
    uint256 slot;
    uint256 rank;
    uint256 value;
    uint256 stat;
    string name;
    address owner;
    bool isEquiped;
}

// stat {
//     0: strength;
//     1: health;
//     2: agility;
//     3: magic;
//     4: defense;
//     5: luck;
// }

struct Treasure {
    uint256 id;
    uint256 rank;
    uint256 pointer;
    string name;
}

struct TreasureDrop {
    uint256 id;
    bytes32 merkleRoot;
    string name;
}

library StorageLib {

    bytes32 constant PLAYER_STORAGE_POSITION = keccak256("player.test.storage.a");
    bytes32 constant TREASURE_STORAGE_POSITION = keccak256("treasure.test.storage.a");
    bytes32 constant TREASURE_DROP_STORAGE_POSITION = keccak256("treasureDrop.test.storage.a");
    

    struct PlayerStorage {
        uint256 totalSupply;
        uint256 playerCount;
        mapping(uint256 => address) owners;
        mapping(uint256 => Player) players;
        mapping(address => uint256) balances;
        mapping(address => mapping(address => uint256)) allowances;
        mapping(string => bool) usedNames;
        mapping(address => uint256[]) addressToPlayers;
    }

    struct TreasureStorage {
        uint256 treasureCount;
        mapping(uint256 => address) owners;
        mapping(uint256 => Treasure) treasures;
        mapping(uint256 => uint256[]) playerToTreasure;
    }

    struct TreasureDropStorage {
        uint256 treasureDropCount;
        mapping(uint256 => TreasureDrop) treasureDrops;
        mapping(uint256 => mapping(address => bool)) claimed;
    }

    function diamondStoragePlayer() internal pure returns (PlayerStorage storage ds) {
        bytes32 position = PLAYER_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }
    function diamondStorageTreasure() internal pure returns (TreasureStorage storage ds) {
        bytes32 position = TREASURE_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }
    function diamondStorageTreasureDrop() internal pure returns (TreasureDropStorage storage ds) {
        bytes32 position = TREASURE_DROP_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }


    function _createTreasureDrop(bytes32 _merkleRoot, string memory _name) internal {
        TreasureDropStorage storage td = diamondStorageTreasureDrop();
        td.treasureDropCount++; //increment the drop counter
        td.treasureDrops[td.treasureDropCount] = TreasureDrop(td.treasureDropCount, _merkleRoot, _name); //create drop struct
    }

    function _claimTreasureDropKyberShard(uint256 _treasureDropId, bytes32[] calldata _proof, uint256 _playerId) internal {
        TreasureDropStorage storage td = diamondStorageTreasureDrop();
        TreasureStorage storage t = diamondStorageTreasure();
        require(!td.claimed[_treasureDropId][msg.sender], "Address has already claimed the drop"); //check to see if they have already claimed;
        require(MerkleProof.verify(_proof, td.treasureDrops[_treasureDropId].merkleRoot, keccak256(abi.encodePacked(msg.sender))), "Invalid Merkle proof"); //check to see if sender is whitelisted
       
        td.claimed[_treasureDropId][msg.sender] = true; //set claim status to true
        t.treasures[t.treasureCount] = Treasure(t.treasureCount, 1, t.playerToTreasure[_playerId].length, "KyberShard"); //create treasure and add it main map
    }

    

}



contract TreasureDropFacet {

    event ClaimTreasure(uint256 indexed _playerId, uint256 indexed _treasureDropId);

    function createTreasureDrop(bytes32 _merkleRoot, string memory _name) external {
        StorageLib._createTreasureDrop(_merkleRoot, _name);
    }

    function claimTreasureDropKyberShard(uint256 _treasureDropId, bytes32[] calldata _proof, uint256 _playerId) external {
        StorageLib._claimTreasureDropKyberShard(_treasureDropId, _proof, _playerId);
        emit ClaimTreasure(_playerId, _treasureDropId);
    }

    //function supportsInterface(bytes4 _interfaceID) external view returns (bool) {}
}