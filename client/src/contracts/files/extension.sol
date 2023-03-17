// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./toy.sol";

contract Extension is NFTArena {

    mapping(uint256 => string) public names;

    function challengeArena(uint256 _tokenId, bool _winner) external isIdle(_tokenId) ownerOf(_tokenId) {
        require(!arena.open, "arena is empty");
        require(balanceOf(msg.sender, 1) >= 1, "not enough gold");
        if (_winner) {
            players[_tokenId].wins++;
            _mint(msg.sender, GOLD, 1, "");
        } else {
            _mint(arena.hostAddress, GOLD, 1, "");
            players[arena.hostId].wins++;
            safeTransferFrom(msg.sender, arena.hostAddress, 1, 1, "0x0");
        }
        arena.open = true;
        players[arena.hostId].status = Status.idle;
    }

    function endHpTraining(uint256 _tokenId) external ownerOf(_tokenId) {
        require(
            block.timestamp >= trainings[_tokenId].startTime + 600,
            "it's too early to pull out"
        );
        setIdle(_tokenId);
        players[_tokenId].hp += 5;
    }

    function changeName(uint256 _id, string memory _name) external ownerOf(_id) {
        require(bytes(_name).length > 0, "Cannot pass an empty hash");
        names[_id] = _name;
    }

    function endSilverQuest(uint256 _tokenId) external ownerOf(_tokenId) {
        require(
            block.timestamp >= quests[_tokenId].endTime + 300,
            "It's not time to finish quest"
        );
        setIdle(_tokenId);
        _mint(msg.sender, SILVER, 1, "");
        quests[_tokenId].endTime = 0;
    }
    

}