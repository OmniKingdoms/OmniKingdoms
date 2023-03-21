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

struct Item {
    uint256 slot;
    uint256 rank;
    string name;
    address owner;
    bool isEquiped;
}

// slots {
//     0: head;
//     1: body;
//     2: hand;
//     3: pants;
//     4: feet;
// }

library StorageLib {

    bytes32 constant PLAYER_STORAGE_POSITION = keccak256("player.test.storage.d");
    bytes32 constant ITEM_STORAGE_POSITION = keccak256("Item.test.storage.d");
    bytes32 constant POTION_STORAGE_POSITION = keccak256("Potion.test.storage.d");
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

    struct ItemStorage {
        uint256 itemCount;
        mapping(uint256 => address) owners;
        mapping(uint256 => Item) items;
        mapping(address => uint256[]) addressToItems;
    }

    struct PotionStorage {
        mapping(uint256 => address) timePotion;
        mapping(address => uint256) healthPotion;
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
    function diamondStorageItem() internal pure returns (ItemStorage storage ds) {
        bytes32 position = ITEM_STORAGE_POSITION;
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

    function _craftSword(uint256 _tokenId) internal {
        PlayerStorage storage s = diamondStoragePlayer();
        ItemStorage storage i = diamondStorageItem();
        CoinStorage storage c = diamondStorageCoin();
        require(s.players[_tokenId].status == 0); //make sure player is idle
        require(s.owners[_tokenId] == msg.sender); //ownerOf
        require(c.goldBalance[msg.sender] >= 5); //check user has enough gold
        c.goldBalance[msg.sender] -= 5; //deduct 5 gold from the address' balance
        i.owners[i.itemCount] = msg.sender;
        i.items[i.itemCount] = Item(2, 1, "Sword", msg.sender, false);
        i.addressToItems[msg.sender].push(i.itemCount);
    }
    function _craftArmor(uint256 _tokenId) internal {
        PlayerStorage storage s = diamondStoragePlayer();
        ItemStorage storage i = diamondStorageItem();
        CoinStorage storage c = diamondStorageCoin();
        require(s.players[_tokenId].status == 0); //make sure player is idle
        require(s.owners[_tokenId] == msg.sender); //ownerOf
        require(c.goldBalance[msg.sender] >= 3); //check user has enough gold
        c.goldBalance[msg.sender] -= 3; //deduct 3 gold from the address' balance
        i.owners[i.itemCount] = msg.sender;
        i.items[i.itemCount] = Item(1, 1, "Armor", msg.sender, false);
        i.addressToItems[msg.sender].push(i.itemCount);
    }

     
    // function _craftWand(uint256 _tokenId) internal {
    //     PlayerStorage storage s = diamondStoragePlayer();
    //     ItemStorage storage i = diamondStorageItem();
    //     CoinStorage storage c = diamondStorageCoin();
    //     require(s.players[_tokenId].status == 0); //make sure player is idle
    //     require(s.owners[_tokenId] == msg.sender); //ownerOf
    //     require(s.players[_tokenId].mana >= 2); //make sure player has at least 2 mana
    //     require(s.players[_tokenId].level >= 2); //make sure their level is at least 2
    // }

    function _getItems (address _address) internal view returns (uint256[] memory) {
        ItemStorage storage i = diamondStorageItem();   
        return i.addressToItems[_address];
    }

    function _getItem (uint256 _itemId) internal view returns (Item memory) {
        ItemStorage storage i = diamondStorageItem();   
        return i.items[_itemId];
    }


}



contract Questing {

    event ItemCrafted(address indexed _owner, uint256 _player);

    function craftSword(uint256 _tokenId) external {
        StorageLib._craftSword(_tokenId);
        emit ItemCrafted(msg.sender, _tokenId);
    }
    function craftArmor(uint256 _tokenId) external {
        StorageLib._craftArmor(_tokenId);
        emit ItemCrafted(msg.sender, _tokenId);
    }





    function supportsInterface(bytes4 _interfaceID) external view returns (bool) {}
}
