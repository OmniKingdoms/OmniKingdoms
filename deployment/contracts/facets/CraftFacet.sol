// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../libraries/PlayerSlotLib.sol";
import "./ERC1155Facet.sol";

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

library StorageLib {
    bytes32 constant PLAYER_STORAGE_POSITION = keccak256("player.test.storage.a");
    bytes32 constant ITEM_STORAGE_POSITION = keccak256("item.test.storage.a");
    bytes32 constant POTION_STORAGE_POSITION = keccak256("potion.test.storage.a");
    bytes32 constant COIN_STORAGE_POSITION = keccak256("coin.test.storage.a");

    using PlayerSlotLib for PlayerSlotLib.Player;
    using PlayerSlotLib for PlayerSlotLib.Slot;

    struct PlayerStorage {
        uint256 totalSupply;
        uint256 playerCount;
        mapping(uint256 => address) owners;
        mapping(uint256 => PlayerSlotLib.Player) players;
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
        mapping(uint256 => uint256) cooldown;
    }

    struct PotionStorage {
        mapping(uint256 => address) timePotion;
        mapping(address => uint256) healthPotion;
    }

    struct CoinStorage {
        mapping(address => uint256) goldBalance;
        mapping(address => uint256) gemBalance;
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
        i.itemCount++;
        i.owners[i.itemCount] = msg.sender;
        i.items[i.itemCount] = Item(2, 1, 1, 0, "Sword", msg.sender, false); // slot, rank, value, stat
        i.addressToItems[msg.sender].push(i.itemCount);
    }

    function _craftGuitar(uint256 _tokenId) internal {
        PlayerStorage storage s = diamondStoragePlayer();
        ItemStorage storage i = diamondStorageItem();
        CoinStorage storage c = diamondStorageCoin();
        require(s.players[_tokenId].status == 0); //make sure player is idle
        require(s.owners[_tokenId] == msg.sender); //ownerOf
        require(c.goldBalance[msg.sender] >= 10); //check user has enough gold
        c.goldBalance[msg.sender] -= 10; //deduct 10 gold from the address' balance
        i.itemCount++;
        i.owners[i.itemCount] = msg.sender;
        i.items[i.itemCount] = Item(2, 1, 2, 3, "Guitar", msg.sender, false); // slot, rank, value, stat
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
        i.itemCount++;
        i.owners[i.itemCount] = msg.sender;
        i.items[i.itemCount] = Item(1, 1, 1, 1, "Armor", msg.sender, false); // slot, rank, value, stat
        i.addressToItems[msg.sender].push(i.itemCount);
    }

    function _craftHelmet(uint256 _tokenId) internal {
        PlayerStorage storage s = diamondStoragePlayer();
        ItemStorage storage i = diamondStorageItem();
        CoinStorage storage c = diamondStorageCoin();
        require(s.players[_tokenId].status == 0); //make sure player is idle
        require(s.owners[_tokenId] == msg.sender); //ownerOf
        require(c.goldBalance[msg.sender] >= 4); //check user has enough gold
        c.goldBalance[msg.sender] -= 4; //deduct 8 gold from the address' balance
        i.itemCount++;
        i.owners[i.itemCount] = msg.sender;
        i.items[i.itemCount] = Item(0, 1, 4, 1, "Helmet", msg.sender, false); // slot, rank, value, stat
        i.addressToItems[msg.sender].push(i.itemCount);
    }

    function _craftWizardHat(uint256 _tokenId) internal {
        PlayerStorage storage s = diamondStoragePlayer();
        ItemStorage storage i = diamondStorageItem();
        CoinStorage storage c = diamondStorageCoin();
        require(s.players[_tokenId].status == 0); //make sure player is idle
        require(s.owners[_tokenId] == msg.sender); //ownerOf
        require(c.gemBalance[msg.sender] >= 10); //check user has enough gem
        require(s.players[_tokenId].mana >= 10); //make sure player has at least 10 mana
        c.gemBalance[msg.sender] -= 10; //deduct 8 gem from the address' balance
        s.players[_tokenId].mana -= 10; //deduct 51 mana from the player
        i.itemCount++;
        i.owners[i.itemCount] = msg.sender;
        i.items[i.itemCount] = Item(0, 1, 5, 3, "WizHat", msg.sender, false); // slot, rank, value, stat(catagory)
        i.addressToItems[msg.sender].push(i.itemCount);
    }

    function _craftSorcerShoes(uint256 _tokenId) internal {
        PlayerStorage storage s = diamondStoragePlayer();
        ItemStorage storage i = diamondStorageItem();
        CoinStorage storage c = diamondStorageCoin();
        require(s.players[_tokenId].status == 0); //make sure player is idle
        require(s.owners[_tokenId] == msg.sender); //ownerOf
        require(s.players[_tokenId].mana >= 1); //make sure player has at least 1 mana
        require(c.goldBalance[msg.sender] >= 3); //check user has enough gold
        require(c.gemBalance[msg.sender] >= 1); //check user has enough gem
        c.goldBalance[msg.sender] -= 3; //deduct 3 gold from the address' balance
        c.gemBalance[msg.sender] -= 1; //deduct 1 gem from the address' balance
        s.players[_tokenId].mana -= 1; //deduct 51 mana from the player
        i.itemCount++; //increment item count
        i.owners[i.itemCount] = msg.sender;
        i.items[i.itemCount] = Item(5, 1, 2, 3, "SorcShoes", msg.sender, false); // slot, rank, value, stat
        i.addressToItems[msg.sender].push(i.itemCount);
    }

    function _craftGemSword(uint256 _playerId, uint256 _swordOne, uint256 _swordTwo, uint256 _swordThree) internal {
        PlayerStorage storage s = diamondStoragePlayer();
        ItemStorage storage i = diamondStorageItem();
        CoinStorage storage c = diamondStorageCoin();
        require(s.players[_playerId].status == 0); //make sure player is idle
        require(s.players[_playerId].level >= 2); //make sure player is at least level 2
        require(s.players[_playerId].mana >= 5); //make sure their mana is at least 5
        require(s.owners[_playerId] == msg.sender); //ownerOf
        require(i.owners[_swordOne] == msg.sender); //make sure player owns the sword
        require(i.owners[_swordTwo] == msg.sender); //make sure player owns the sword
        require(i.owners[_swordThree] == msg.sender); //make sure player owns the sword
        require(!i.items[_swordOne].isEquiped); //require item isn't equiped
        require(!i.items[_swordTwo].isEquiped); //require item isn't equiped
        require(!i.items[_swordThree].isEquiped); //require item isn't equiped
        require(keccak256(abi.encodePacked(i.items[_swordOne].name)) == keccak256(abi.encodePacked("Sword"))); //require item isn't equiped
        require(keccak256(abi.encodePacked(i.items[_swordTwo].name)) == keccak256(abi.encodePacked("Sword"))); //require item isn't equiped
        require(keccak256(abi.encodePacked(i.items[_swordThree].name)) == keccak256(abi.encodePacked("Sword"))); //require item isn't equiped
        require(c.gemBalance[msg.sender] >= 3); //check user has enough gem
        c.gemBalance[msg.sender] -= 3; //deduct 3 gem from the user;
        s.players[_playerId].mana -= 5; //deduct 5 mana from the player
        delete i.owners[_swordOne]; //delete first sword
        delete i.owners[_swordTwo]; //delete first sword
        delete i.owners[_swordThree]; //delete first sword
        i.itemCount++; //increment count
        i.owners[i.itemCount] = msg.sender; //set the owner of the item to the user
        i.items[i.itemCount] = Item(2, 2, 5, 3, "Sword", msg.sender, false); // slot, rank, value, stat, owner, isEquiped
        i.addressToItems[msg.sender].push(i.itemCount);
    }

    function _getItems(address _address) internal view returns (uint256[] memory) {
        ItemStorage storage i = diamondStorageItem();
        return i.addressToItems[_address];
    }

    function _getItem(uint256 _itemId) internal view returns (Item memory) {
        ItemStorage storage i = diamondStorageItem();
        return i.items[_itemId];
    }

    function _getItemCount() internal view returns (uint256) {
        ItemStorage storage i = diamondStorageItem();
        return i.itemCount;
    }

    // function _mintCoins() internal {
    //     CoinStorage storage c = diamondStorageCoin();
    //     c.goldBalance[msg.sender] += 100; //mint one gold
    //     c.gemBalance[msg.sender] += 100; //mint one gold
    //     c.diamondBalance[msg.sender] += 100; //mint one gold
    //     c.totemBalance[msg.sender] += 100; //mint one gold
    // }
}

contract CraftFacet is ERC1155Facet {
    event ItemCrafted(address indexed _owner, uint256 _player);

    function craftSword(uint256 _tokenId) external {
        StorageLib._craftSword(_tokenId);
        emit ItemCrafted(msg.sender, _tokenId);

        _mint(msg.sender, uint256(PlayerSlotLib.TokenTypes.Sword), 1, "");
        _burn(msg.sender, uint256(PlayerSlotLib.TokenTypes.GoldCoin), 5);
    }

    function craftGuitar(uint256 _tokenId) external {
        StorageLib._craftGuitar(_tokenId);
        emit ItemCrafted(msg.sender, _tokenId);

        _mint(msg.sender, uint256(PlayerSlotLib.TokenTypes.Guitar), 1, "");
        _burn(msg.sender, uint256(PlayerSlotLib.TokenTypes.GoldCoin), 10);
    }

    function craftArmor(uint256 _tokenId) external {
        StorageLib._craftArmor(_tokenId);
        emit ItemCrafted(msg.sender, _tokenId);

        _mint(msg.sender, uint256(PlayerSlotLib.TokenTypes.Armor), 1, "");
        _burn(msg.sender, uint256(PlayerSlotLib.TokenTypes.GoldCoin), 3);
    }

    function craftHelmet(uint256 _tokenId) external {
        StorageLib._craftHelmet(_tokenId);
        emit ItemCrafted(msg.sender, _tokenId);

        _mint(msg.sender, uint256(PlayerSlotLib.TokenTypes.Helmet), 1, "");
        _burn(msg.sender, uint256(PlayerSlotLib.TokenTypes.GoldCoin), 4);
    }

    function craftSorcerShoes(uint256 _tokenId) external {
        StorageLib._craftSorcerShoes(_tokenId);
        emit ItemCrafted(msg.sender, _tokenId);

        _mint(msg.sender, uint256(PlayerSlotLib.TokenTypes.SorcShoes), 1, "");
        uint256[] memory ids = new uint256[](2);
        ids[0] = uint256(PlayerSlotLib.TokenTypes.GoldCoin);
        ids[1] = uint256(PlayerSlotLib.TokenTypes.GemCoin);

        uint256[] memory amounts = new uint256[](2);
        amounts[0] = 3;
        amounts[1] = 1;

        _burnBatch(msg.sender, ids, amounts);
    }

    function craftWizardHat(uint256 _tokenId) external {
        StorageLib._craftWizardHat(_tokenId);
        emit ItemCrafted(msg.sender, _tokenId);

        _mint(msg.sender, uint256(PlayerSlotLib.TokenTypes.WizHat), 1, "");
        _burn(msg.sender, uint256(PlayerSlotLib.TokenTypes.GemCoin), 10);
    }

    function getItems(address _address) public view returns (uint256[] memory items) {
        items = StorageLib._getItems(_address);
    }

    function getItem(uint256 _itemId) public view returns (Item memory item) {
        item = StorageLib._getItem(_itemId);
    }

    function getItemCount() public view returns (uint256 count) {
        count = StorageLib._getItemCount();
    }

    //function supportsInterface(bytes4 _interfaceID) external view returns (bool) {}

    function mintERC1155Item(uint256 _tokenId, uint256 v2Balance) internal {
        uint256 currentBalance = balanceOf(msg.sender, _tokenId);
        if (currentBalance < v2Balance) {
            _mint(msg.sender, _tokenId, v2Balance - currentBalance, "");
        }
    }

    function historicalERC1155Mint(address playerAddress) public {
        uint256[] memory items = StorageLib._getItems(playerAddress);

        uint256 swordCount = 0;
        uint256 guitarCount = 0;
        uint256 armorCount = 0;
        uint256 helmetCount = 0;
        uint256 wizHatCount = 0;
        uint256 sorcShoesCount = 0;

        for (uint256 i = 0; i < items.length; i++) {
            string memory name = StorageLib._getItem(items[i]).name;
            if (keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked("Sword"))) {
                swordCount++;
            } else if (keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked("Guitar"))) {
                guitarCount++;
            } else if (keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked("Armor"))) {
                armorCount++;
            } else if (keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked("Helmet"))) {
                helmetCount++;
            } else if (keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked("WizHat"))) {
                wizHatCount++;
            } else if (keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked("SorcShoes"))) {
                sorcShoesCount++;
            }
        }

        for (uint256 i = 0; i < items.length; i++) {
            string memory name = StorageLib._getItem(items[i]).name;
            if (keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked("Sword"))) {
                mintERC1155Item(uint256(PlayerSlotLib.TokenTypes.Sword), swordCount);
            } else if (keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked("Guitar"))) {
                mintERC1155Item(uint256(PlayerSlotLib.TokenTypes.Guitar), guitarCount);
            } else if (keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked("Armor"))) {
                mintERC1155Item(uint256(PlayerSlotLib.TokenTypes.Armor), armorCount);
            } else if (keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked("Helmet"))) {
                mintERC1155Item(uint256(PlayerSlotLib.TokenTypes.Helmet), helmetCount);
            } else if (keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked("WizHat"))) {
                mintERC1155Item(uint256(PlayerSlotLib.TokenTypes.WizHat), wizHatCount);
            } else if (keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked("SorcShoes"))) {
                mintERC1155Item(uint256(PlayerSlotLib.TokenTypes.SorcShoes), sorcShoesCount);
            }
        }
    }
}
