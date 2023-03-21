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
    uint256 defense;
    string name;
    string uri;
    bool male;
}

library StorageLib {

    bytes32 constant PLAYER_STORAGE_POSITION = keccak256("player.test.storage.d");
    bytes32 constant QUEST_STORAGE_POSITION = keccak256("quest.test.storage.d");
    bytes32 constant COIN_STORAGE_POSITION = keccak256("coin.test.storage.d");

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

    struct QuestStorage {
        mapping(uint256 => uint256) goldQuest;
        mapping(uint256 => uint256) totemQuest;
        mapping(uint256 => uint256) education;
        mapping(uint256 => uint256) cooldowns;
    }

    struct CoinStorage {
        mapping(address => uint256) goldBalance;
        mapping(address => uint256) totemBalance;
        mapping(address => uint256) diamondBalance;
    }


    function diamondStoragePlayer() internal pure returns (PlayerStorage storage ds) {
        bytes32 position = PLAYER_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }
    function diamondStorageQuest() internal pure returns (QuestStorage storage ds) {
        bytes32 position = QUEST_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }
    function diamondStorageCoin() internal pure returns (CoinStorage storage ds) {
        bytes32 position = COIN_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    function _startQuestGold(uint256 _tokenId) internal {
        PlayerStorage storage s = diamondStoragePlayer();
        QuestStorage storage q = diamondStorageQuest();
        require(s.players[_tokenId].status == 0); //make sure player is idle
        require(s.owners[_tokenId] == msg.sender); //ownerOf

        s.players[_tokenId].status = 2; //set quest status
        q.goldQuest[_tokenId] = block.timestamp; //set start time
    }

    function _endQuestGold(uint256 _tokenId) internal {
        PlayerStorage storage s = diamondStoragePlayer();
        CoinStorage storage c = diamondStorageCoin();
        QuestStorage storage q = diamondStorageQuest();
        require(s.owners[_tokenId] == msg.sender);
        require(s.players[_tokenId].status == 2);
        require(
            block.timestamp >= q.goldQuest[_tokenId] + 1,
            "it's too early to pull out"
        );
        s.players[_tokenId].status = 0; //set back to idle
        delete q.goldQuest[_tokenId]; //remove the start time
        c.goldBalance[msg.sender]++; //mint one gold
    }

    function _getGoldBalance(address _address) internal view returns (uint256) {
        CoinStorage storage c = diamondStorageCoin();
        return c.goldBalance[_address];
    }

}



contract Questing {

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Mint(address indexed _to, uint256 _id);

    function startQuestGold(uint256 _tokenId) external {
        StorageLib._startQuestGold(_tokenId);
    }

    function endQuestGold(uint256 _tokenId) external {
        StorageLib._endQuestGold(_tokenId);
    }

    function getGoldBalance(address _address) public view returns (uint256) {
        return StorageLib._getGoldBalance(_address);
    }






    function supportsInterface(bytes4 _interfaceID) external view returns (bool) {}
}
