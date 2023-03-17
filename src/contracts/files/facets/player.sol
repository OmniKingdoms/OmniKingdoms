// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct Player {
    uint256 level;
    uint256 xp;
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

library PlayerStorageLib {

    bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("player.test.storage.a");

    struct PlayerStorage {
        uint256 totalSupply;
        uint256 playerCount;
        mapping(uint256 => address) owners;
        mapping(uint256 => Player) players;
        mapping(uint256 => uint256) status;
        mapping(address => uint256) balances;
        mapping(address => mapping(address => uint256)) allowances;
        mapping(uint256 => string) URIs;
        mapping(string => bool) usedNames;
        mapping(address => mapping(uint => bool)) addressToPlayers;
    }

    function diamondStorage() internal pure returns (PlayerStorage storage ds) {
        bytes32 position = DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    function _mint(string memory _name, string memory _uri, bool _isMale) internal {
        PlayerStorage storage s = diamondStorage();
        require(!s.usedNames[_name], "name is taken");
        s.playerCount++;
        s.players[s.playerCount] = Player(1,0,1,10,1,1,1,1,1,1,1, _name, _isMale);
        s.status[s.playerCount] = 0;
        s.usedNames[_name] = true;
        s.URIs[s.playerCount] = _uri;
        s.owners[s.playerCount] = msg.sender;
        s.addressToPlayers[msg.sender][s.playerCount] = true;
    }

    function _playerCount() internal view returns(uint256) {
        PlayerStorage storage s = diamondStorage();
        return s.playerCount;
    }

    function _nameAvailable(string memory _name) internal view returns (bool) {
        PlayerStorage storage s = diamondStorage();
        return s.usedNames[_name];
    }

    function _changeName(uint256 _id, string memory _newName) internal {
        PlayerStorage storage s = diamondStorage();
        require(s.owners[_id] == msg.sender);
        require(!s.usedNames[_newName], "name is taken");
        require(bytes(_newName).length > 0, "Cannot pass an empty hash");
        require(bytes(_newName).length < 16, "Cannot be longer than 16 chars");
        string memory existingName = s.players[_id].name;
        if (bytes(existingName).length > 0) {
            delete s.usedNames[existingName];
        }
        s.players[_id].name = _newName;
        s.usedNames[_newName] = true;
    }

    function _getPlayer(uint256 _id) internal view returns(Player memory player) {
        PlayerStorage storage s = diamondStorage();
        player = s.players[_id];
    }

    function _ownerOf(uint256 _id) internal view returns(address owner) {
        PlayerStorage storage s = diamondStorage();
        owner = s.owners[_id];
    }

    function _transfer(address _to, uint256 _id) internal {
        PlayerStorage storage s = diamondStorage();
        require(s.owners[_id] == msg.sender);
        require(_to != address(0), "_to cannot be zero address");    
        s.owners[_id] = _to;

    }


}

contract PlayerNft {

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Mint(address indexed _to, uint256 _id);


    function playerCount() public view returns(uint256) {
        return PlayerStorageLib._playerCount();
    }

    function mint(string memory _name, string memory _uri, bool _isMale) external {
        PlayerStorageLib._mint(_name, _uri, _isMale);
        uint256 count = playerCount();
        emit Mint(msg.sender, count);
    }

    function changeName(uint256 _id, string memory _newName) external {
        PlayerStorageLib._changeName(_id, _newName);
    }

    function getPlayer(uint256 _playerId) external view returns(Player memory player) {
        player = PlayerStorageLib._getPlayer(_playerId);
    }

    function nameAvailable(string memory _name) external view returns (bool available) {
        available = PlayerStorageLib._nameAvailable(_name);
    }

    function ownerOf(uint256 _id) external view returns (address owner) {
        owner = PlayerStorageLib._ownerOf(_id);
    }







    function supportsInterface(bytes4 _interfaceID) external view returns (bool) {}
}


