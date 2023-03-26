// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


struct Player {
    uint256 level;
    uint256 xp;
    uint256 status;
    uint256 strength;
    uint256 health;
    uint256 stamina;
    uint256 mana;
    uint256 agility;
    uint256 luck;
    uint256 wisdom;
    uint256 haki;
    uint256 perception;
    string name;
    bool male;
}

library StorageLib {

    bytes32 constant PLAYER_STORAGE_POSITION = keccak256("player.test.storage.b");
    bytes32 constant TRAIN_STORAGE_POSITION = keccak256("train.test.storage.b");

    struct PlayerStorage {
        uint256 totalSupply;
        uint256 playerCount;
        mapping(uint256 => address) owners;
        mapping(uint256 => Player) players;
        mapping(address => uint256) balances;
        mapping(address => mapping(address => uint256)) allowances;
        mapping(uint256 => string) URIs;
        mapping(string => bool) usedNames;
        mapping(address => uint256[]) addressToPlayers;
    }

    struct TrainStorage {
        mapping(uint256 => uint256) meditations;
        mapping(uint256 => uint256) combat;
        mapping(uint256 => uint256) education;
    }

    function diamondStoragePlayer() internal pure returns (PlayerStorage storage ds) {
        bytes32 position = PLAYER_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }
    function diamondStorageTrain() internal pure returns (TrainStorage storage ds) {
        bytes32 position = TRAIN_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    function _startTrainingCombat(uint256 _tokenId) internal {
        PlayerStorage storage s = diamondStoragePlayer();
        TrainStorage storage t = diamondStorageTrain();
        require(s.players[_tokenId].status == 0);
        require(s.owners[_tokenId] == msg.sender);

        s.players[_tokenId].status = 1;
        t.combat[_tokenId] = block.timestamp;
    }

    function _endTrainingCombat(uint256 _tokenId) internal {
        PlayerStorage storage s = diamondStoragePlayer();
        TrainStorage storage t = diamondStorageTrain();
        require(s.owners[_tokenId] == msg.sender);
        require(s.players[_tokenId].status == 1);
        require(
            block.timestamp >= t.combat[_tokenId] + 1,
            "it's too early to pull out"
        );
        s.players[_tokenId].status = 0;
        delete t.combat[_tokenId]; 
        s.players[_tokenId].strength++; 
        s.players[_tokenId].stamina++; 
    }

}



contract Training {

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Mint(address indexed _to, uint256 _id);

    function startTrainingCombat(uint256 _tokenId) external {
        StorageLib._startTrainingCombat(_tokenId);
    }

    function endTrainingCombat(uint256 _tokenId) external {
        StorageLib._endTrainingCombat(_tokenId);
    }

    function supportsInterface(bytes4 _interfaceID) external view returns (bool) {}
}