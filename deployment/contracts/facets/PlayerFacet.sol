// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../libraries/PlayerSlotLib.sol";
import "./ERC1155Facet.sol";

/// @title Player Storage Library
/// @dev Library for managing storage of player data
library PlayerStorageLib {
    bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("player.test.storage.a");

    using PlayerSlotLib for PlayerSlotLib.Player;
    using PlayerSlotLib for PlayerSlotLib.Slot;
    using PlayerSlotLib for PlayerSlotLib.TokenTypes;

    /// @dev Struct defining player storage
    struct PlayerStorage {
        uint256 totalSupply;
        uint256 playerCount;
        mapping(uint256 => address) owners;
        mapping(uint256 => PlayerSlotLib.Player) players;
        mapping(address => uint256) balances;
        mapping(address => mapping(address => uint256)) allowances;
        mapping(string => bool) usedNames;
        mapping(address => uint256[]) addressToPlayers;
        mapping(uint256 => PlayerSlotLib.Slot) slots;
    }

    /// @dev Function to retrieve diamond storage slot for player data. Returns a reference.
    function diamondStorage() internal pure returns (PlayerStorage storage ds) {
        bytes32 position = DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    /// @notice Mints a new player
    /// @param _name The name of the player
    /// @param _uri The IPFS URI of the player metadata
    /// @param _isMale The gender of the player
    function _mint(string memory _name, string memory _uri, bool _isMale) internal {
        PlayerStorage storage s = diamondStorage();
        require(!s.usedNames[_name], "name is taken");
        require(bytes(_name).length <= 10);
        require(bytes(_name).length >= 3);
        s.playerCount++;
        s.players[s.playerCount] = PlayerSlotLib.Player(
            1, 0, 0, 1, 10, 1, 1, 1, 1, 1, 1, 1, 1, _name, _uri, _isMale, PlayerSlotLib.Slot(0, 0, 0, 0, 0, 0)
        );
        s.slots[s.playerCount] = PlayerSlotLib.Slot(0, 0, 0, 0, 0, 0);
        s.usedNames[_name] = true;
        s.owners[s.playerCount] = msg.sender;
        s.addressToPlayers[msg.sender].push(s.playerCount);
        s.balances[msg.sender]++;
    }

    function _playerCount() internal view returns (uint256) {
        PlayerStorage storage s = diamondStorage();
        return s.playerCount;
    }

    function _nameAvailable(string memory _name) internal view returns (bool) {
        PlayerStorage storage s = diamondStorage();
        return s.usedNames[_name];
    }

    /// @notice Changes the name of a player
    /// @param _id The id of the player
    /// @param _newName The new name of the player
    function _changeName(uint256 _id, string memory _newName) internal {
        PlayerStorage storage s = diamondStorage();
        require(s.owners[_id] == msg.sender);
        require(!s.usedNames[_newName], "name is taken");
        require(bytes(_newName).length > 3, "Cannot pass an empty hash");
        require(bytes(_newName).length < 10, "Cannot be longer than 10 chars");
        string memory existingName = s.players[_id].name;
        if (bytes(existingName).length > 0) {
            delete s.usedNames[existingName];
        }
        s.players[_id].name = _newName;
        s.usedNames[_newName] = true;
    }

    function _getPlayer(uint256 _id) internal view returns (PlayerSlotLib.Player memory player) {
        PlayerStorage storage s = diamondStorage();
        player = s.players[_id];
    }

    function _ownerOf(uint256 _id) internal view returns (address owner) {
        PlayerStorage storage s = diamondStorage();
        owner = s.owners[_id];
    }

    /// @notice Transfer the player to someone else
    /// @param _to Address of the account where the caller wants to transfer the player
    /// @param _id ID of the player to transfer
    function _transfer(address _to, uint256 _id) internal {
        PlayerStorage storage s = diamondStorage();
        require(s.owners[_id] == msg.sender);
        require(_to != address(0), "_to cannot be zero address");
        s.owners[_id] = _to;
        for (uint256 i = 0; i < s.balances[msg.sender]; i++) {
            if (s.addressToPlayers[msg.sender][i] == _id) {
                delete s.addressToPlayers[msg.sender][i];
                break;
            }
        }
        s.balances[msg.sender]--;
        s.balances[_to]++;
    }

    function _getPlayers(address _address) internal view returns (uint256[] memory) {
        PlayerStorage storage s = diamondStorage();
        return s.addressToPlayers[_address];
    }
}

/// @title Player Facet
/// @dev Contract managing interaction with player data
contract PlayerFacet is ERC1155Facet {
    event Mint(uint256 indexed id, address indexed owner, string name, string uri);
    event NameChange(address indexed owner, uint256 indexed id, string indexed newName);

    function playerCount() public view returns (uint256) {
        return PlayerStorageLib._playerCount();
    }

    /// @notice Mints a new player
    /// @dev Emits a Mint event
    /// @dev Calls the _mint function from the PlayerStorageLib
    /// @param _name The name of the player
    /// @param _uri The IPFS URI of the player metadata
    /// @param _isMale The gender of the player
    function mint(string memory _name, string memory _uri, bool _isMale) external {
        PlayerStorageLib._mint(_name, _uri, _isMale);
        uint256 count = playerCount();
        emit Mint(count, msg.sender, _name, _uri);

        // This is for minting the ERC1155 token from the parent contract ERC1155Facet
        _isMale
            ? _mint(msg.sender, uint256(PlayerSlotLib.TokenTypes.PlayerMale), 1, "")
            : _mint(msg.sender, uint256(PlayerSlotLib.TokenTypes.PlayerFemale), 1, "");

        //This function will mint additional tokens in case there is a discrepancy between playersIDs and ERC1155 tokens
        historicalERC1155Mint();
    }

    /// @notice Changes the name of a player
    /// @dev Emits a NameChange event
    /// @param _id The id of the player
    /// @param _newName The new name of the player
    function changeName(uint256 _id, string memory _newName) external {
        PlayerStorageLib._changeName(_id, _newName);
        emit NameChange(msg.sender, _id, _newName);
    }

    /// @notice Retrieves a player
    /// @param _playerId The id of the player
    /// @return player The player data
    function getPlayer(uint256 _playerId) external view returns (PlayerSlotLib.Player memory player) {
        player = PlayerStorageLib._getPlayer(_playerId);
    }

    function nameAvailable(string memory _name) external view returns (bool available) {
        available = PlayerStorageLib._nameAvailable(_name);
    }

    function ownerOf(uint256 _id) external view returns (address owner) {
        owner = PlayerStorageLib._ownerOf(_id);
    }

    /// @notice Retrieves the players owned by an address
    /// @param _address The owner address
    /// @return An array of player ids
    function getPlayers(address _address) external view returns (uint256[] memory) {
        return PlayerStorageLib._getPlayers(_address);
    }

    /// @notice Retrieves the current block timestamp
    /// @return The current block timestamp
    function getBlocktime() external view returns (uint256) {
        return (block.timestamp);
    }

    //function supportsInterface(bytes4 _interfaceID) external view returns (bool) {}

    /// @notice Mints corresponding ERC1155 tokens for a player
    /// @dev this function is for backwards compatibility so that the playerIDs match the number of ERC1155 tokens held by this account
    function historicalERC1155Mint() internal {
        uint256[] memory playerIDs = PlayerStorageLib._getPlayers(msg.sender);
        (uint256 maleCount, uint256 femaleCount) = getPlayerGenderCounts(playerIDs);

        mintBasedOnGenderCount(maleCount, uint256(PlayerSlotLib.TokenTypes.PlayerMale));
        mintBasedOnGenderCount(femaleCount, uint256(PlayerSlotLib.TokenTypes.PlayerFemale));
    }

    function getPlayerGenderCounts(uint256[] memory playerIDs)
        internal
        view
        returns (uint256 maleCount, uint256 femaleCount)
    {
        for (uint256 i = 0; i < playerIDs.length; i++) {
            PlayerSlotLib.Player memory player = PlayerStorageLib._getPlayer(playerIDs[i]);
            player.male ? maleCount++ : femaleCount++;
        }
    }

    function mintBasedOnGenderCount(uint256 genderCount, uint256 tokenType) internal {
        uint256 currentBalance = balanceOf(msg.sender, tokenType);
        if (genderCount > currentBalance) {
            uint256 amountToMint = genderCount - currentBalance;
            _mint(msg.sender, tokenType, amountToMint, "");
        }
    }
}
