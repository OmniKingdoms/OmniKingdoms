// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFTArena is ERC1155 {
    uint256 public constant PLAYER = 0;
    uint256 public constant GOLD = 1;
    uint256 public constant SILVER = 2;
    uint256 public constant SWORD = 3;
    uint256 public constant SHIELD = 4;

    string private baseURI;
    uint256 public playerCount;
    bool public arenaOpen;
    Arena public arena = Arena(true, 0, payable(msg.sender));

    //mapping(address => uint) public profiles;
    mapping(uint => Player) public players;
    mapping(uint => Quest) public quests;
    mapping(uint => Train) public trainings;
    mapping(uint => uint) public URIs;
    mapping(address => uint256[]) public addressToPlayers;
    mapping(address => bool) public owners;

    enum Status {
        idle,
        questing,
        training
    }

    struct Player {
        uint256 hp;
        uint256 attack;
        Status status;
    }

    struct Quest {
        uint256 endTime;
    }

    struct Train {
        uint256 startTime;
    }

    struct Arena {
        bool open;
        uint256 hostId;
        address payable hostAddress;
    }

    constructor()
        ERC1155(
            "https://bafybeihfvy2hmcnvpax6anx3tgx53qie4nj32eqtuehsu2g5c5hx3ukxc4.ipfs.nftstorage.link/"
        )
    {
        baseURI = "https://bafybeihfvy2hmcnvpax6anx3tgx53qie4nj32eqtuehsu2g5c5hx3ukxc4.ipfs.nftstorage.link/";
    }

    modifier isIdle(uint256 _tokenId) {
        require(players[_tokenId].status == Status.idle, "not ready");
        _;
    }

    function _mintPlayer() external {
        playerCount++;
        _mint(msg.sender, PLAYER, 1, "");

        URIs[playerCount] = random() % 598 + 1;
        players[playerCount] = Player(10, 1, Status.idle);
        quests[playerCount] = Quest(0);
        trainings[playerCount] = Train(0);
    }

    function uri(uint256 _id) public view override returns (string memory) {
        //require(_exists(id), "Nonexistant token");
        string memory s = string(
            abi.encodePacked(baseURI, Strings.toString(URIs[_id]), ".png")
        );
        return s;
    }

    function setIdle(uint256 _tokenId) internal {
        players[_tokenId].status = Status.idle;
    }

    function startQuest(uint256 _tokenId) external isIdle(_tokenId) {
        players[_tokenId].status = Status.questing;
        Quest storage quest = quests[_tokenId];
        quest.endTime = block.timestamp + 120;
    }

    function endQuest(uint256 _tokenId) external {
        require(
            block.timestamp >= quests[_tokenId].endTime,
            "It's not time to finish quest"
        );
        setIdle(_tokenId);
        _mint(msg.sender, GOLD, 1, "");
        quests[_tokenId].endTime = 0;
    }

    function startTraining(uint256 _tokenId) external isIdle(_tokenId) {
        players[_tokenId].status = Status.training;
        trainings[_tokenId].startTime = block.timestamp;
    }

    function endTraining(uint256 _tokenId) external {
        require(
            block.timestamp >= trainings[_tokenId].startTime + 120,
            "it's too early to pull out"
        );
        setIdle(_tokenId);
        players[_tokenId].attack++; //we can make this logic more complex later
    }

    function enterArena(uint256 _tokenId) external isIdle(_tokenId) {
        require(arena.open, "arena is closed");
        require(balanceOf(msg.sender, 1) >= 1, "not enough gold");
        safeTransferFrom(msg.sender, address(this), 1, 1, "0x0");
        arena.open = false;
    }

    function fightArena(uint256 _tokenId) external isIdle(_tokenId) {
        require(!arena.open, "arena is empty");
        require(balanceOf(msg.sender, 1) >= 1, "not enough gold");
        uint256 winner = simulateFight(arena.hostId, _tokenId);
        if (winner == _tokenId) {
            safeTransferFrom(address(this), msg.sender,  1, 1, "0x0");
        } else {
            safeTransferFrom(address(this), arena.hostAddress,  1, 1, "0x0");
            safeTransferFrom(msg.sender, arena.hostAddress,  1, 1, "0x0");
        }
        arena.open = false;
    }

    function simulateFight(uint256 _hostId, uint256 _challengerId) internal view returns(uint256) {
        Player storage host = players[_hostId];
        Player storage challenger = players[_challengerId];
        uint hostHp = host.hp;
        uint challengerHp = challenger.hp;
        while(hostHp > 0 && challengerHp > 0) {
            challengerHp - host.attack * (random() % 2);
            if (challengerHp <= 0) {
                break;
            }
            hostHp - challenger.attack * (random() % 2);
        }
        return _challengerId; 
    }

    function random() internal view returns(uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp + block.difficulty + playerCount)));
    }

    function craftSword(uint256 _tokenId) external isIdle(_tokenId) {
        require(balanceOf(msg.sender, 1) >= 10, "you don't have enough gold");
        safeTransferFrom(msg.sender, address(this), 1, 10, "0x0");
        _mint(msg.sender, SWORD, 3, "");
    }


}
