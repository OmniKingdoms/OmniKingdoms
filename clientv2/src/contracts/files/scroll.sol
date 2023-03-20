// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract NFTArena is ERC1155 {
    uint256 public constant PLAYER = 0;
    uint256 public constant GOLD = 1;
    uint256 public constant SILVER = 2;
    uint256 public constant SWORD = 3;
    uint256 public constant SHIELD = 4;

    string private baseURI;
    uint256 public playerCount;
    uint256 public swordCount;
    bool public arenaOpen = true;
    Arena public arena = Arena(true, 0, payable(msg.sender));

    mapping(uint => Player) public players;
    mapping(uint => Quest) public quests;
    mapping(uint => Train) public trainings;
    mapping(uint => uint) public URIs;
    mapping(address => uint256[]) public addressToPlayers;
    mapping(address => uint256[]) public addressToSwords;
    mapping(address => bool) public owners;
    mapping(uint => address) public owner;
    mapping(uint => Sword) public swords;


    enum Status {
        idle,
        questing,
        training,
        arena
    }

    struct Player {
        uint256 hp;
        uint256 attack;
        Status status;
        uint256 wins;
        bool item;
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

    struct Sword {
        bool available;
        address owner;
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

    modifier ownerOf(uint _tokenId) {
        require(owner[_tokenId] == msg.sender);
        _;
    }

    modifier unequpied(uint _tokenId) {
        require(players[_tokenId].item == false);
        _;
    }

    function _mintPlayer() external {
        playerCount++;
        _mint(msg.sender, PLAYER, 1, "");
        _mint(msg.sender, GOLD, 5, "");

        URIs[playerCount] = random(playerCount) % 598 + 1;
        players[playerCount] = Player(200, 2, Status.idle, 0, false);
        quests[playerCount] = Quest(0);
        trainings[playerCount] = Train(0);
        addressToPlayers[msg.sender].push(playerCount);
        owner[playerCount] = msg.sender;
    }

    function uri(uint256 _id) public view override returns (string memory) {
        //require(_exists(id), "Nonexistant token");
        string memory s = string(
            abi.encodePacked(baseURI, Strings.toString(URIs[_id]), ".png")
        );
        return s;
    }


    function getPlayers(address _address) public view returns (uint256[] memory) {
        return addressToPlayers[_address];
    }

    function getSwords(address _address) public view returns (uint256[] memory) {
        return addressToSwords[_address];
    }

    function setIdle(uint256 _tokenId) internal ownerOf(_tokenId) {
        players[_tokenId].status = Status.idle;
    }

    function startQuest(uint256 _tokenId) external isIdle(_tokenId) ownerOf(_tokenId){
        players[_tokenId].status = Status.questing;
        Quest storage quest = quests[_tokenId];
        quest.endTime = block.timestamp + 1;
    }

    function endQuest(uint256 _tokenId) external ownerOf(_tokenId) {
        require(
            block.timestamp >= quests[_tokenId].endTime,
            "It's not time to finish quest"
        );
        setIdle(_tokenId);
        _mint(msg.sender, GOLD, 1, "");
        quests[_tokenId].endTime = 0;
    }

    function startTraining(uint256 _tokenId) external isIdle(_tokenId) ownerOf(_tokenId) {
        players[_tokenId].status = Status.training;
        trainings[_tokenId].startTime = block.timestamp;
    }

    function endTraining(uint256 _tokenId) external ownerOf(_tokenId) {
        require(
            block.timestamp >= trainings[_tokenId].startTime + 120,
            "it's too early to pull out"
        );
        setIdle(_tokenId);
        players[_tokenId].attack++; //we can make this logic more complex later
    }

    function getBlocktime() external view  returns (uint256) {
        return (block.timestamp);
    }

    // function enterArena(uint256 _tokenId) external isIdle(_tokenId) {
    //     require(arena.open, "arena is closed");
    //     require(balanceOf(msg.sender, 1) >= 1, "not enough gold");
    //     _safeTransferFrom(msg.sender, address(this), 1, 1, "0x0");
    //     arena.open = false;
    // }

    // function fightArena(uint256 _tokenId) external isIdle(_tokenId) {
    //     require(!arena.open, "arena is empty");
    //     require(balanceOf(msg.sender, 1) >= 1, "not enough gold");
    //     uint256 winner = simulateFight(arena.hostId, _tokenId);
    //     if (winner == _tokenId) {
    //         safeTransferFrom(address(this), msg.sender,  1, 1, "0x0");
    //     } else {
    //         safeTransferFrom(address(this), arena.hostAddress,  1, 1, "0x0");
    //         safeTransferFrom(msg.sender, arena.hostAddress,  1, 1, "0x0");
    //     }
    //     arena.open = false;
    // }

    // function simulateFight(uint256 _hostId, uint256 _challengerId) internal view returns(uint256) {
    //     Player storage host = players[_hostId];
    //     Player storage challenger = players[_challengerId];
    //     uint hostHp = host.hp;
    //     uint challengerHp = challenger.hp;
    //     while(hostHp > 0 && challengerHp > 0) {
    //         challengerHp - host.attack * (random() % 2);
    //         if (challengerHp <= 0) {
    //             break;
    //         }
    //         hostHp - challenger.attack * (random() % 2);
    //     }
    //     return _challengerId; 
    // }

    function enterArena(uint256 _tokenId) external isIdle(_tokenId) ownerOf(_tokenId) {
        require(arena.open, "arena is closed");
        require(balanceOf(msg.sender, 1) >= 1, "not enough gold");
        safeTransferFrom(msg.sender, address(this), 1, 1, "0x0");
        players[_tokenId].status = Status.arena;
        arena.open = false;
        arena.hostId = _tokenId;
        arena.hostAddress = payable(msg.sender);
    }

    function fightArena(uint256 _tokenId) external isIdle(_tokenId) ownerOf(_tokenId) {
        require(!arena.open, "arena is empty");
        require(balanceOf(msg.sender, 1) >= 1, "not enough gold");
        uint256 winner = simulateFight(arena.hostId, _tokenId);
        if (winner == _tokenId) {
            players[_tokenId].wins++;
            _mint(msg.sender, GOLD, 1, "");
        } else {
            _mint(msg.sender, GOLD, 1, "");
            players[arena.hostId].wins++;
            safeTransferFrom(msg.sender, arena.hostAddress, 1, 1, "0x0");
        }
        arena.open = true;
        players[arena.hostId].status = Status.idle;
    }

    function simulateFight(uint256 _hostId, uint256 _challengerId)
        internal
        view
        returns (uint256)
    {
        Player storage host = players[_hostId];
        Player storage challenger = players[_challengerId];
        uint hostPoints = (host.hp * (random(_hostId) % 5)) - (challenger.attack  * (random(_challengerId) % 4));
        uint challengerPoints = (challenger.hp * (random(_challengerId) % 5)) - (host.attack  * (random(_hostId) % 5));
        if ( hostPoints >= challengerPoints ) {
            return _hostId;
        } else {
            return _challengerId;
        }
    }

    function openArena() public {
        arena.open = true;
    }
    

    function random(uint _tokenId) internal view returns(uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp + block.difficulty + playerCount + _tokenId)));
    }

    function craftSword(uint256 _tokenId) external isIdle(_tokenId) ownerOf(_tokenId) unequpied(_tokenId) {
        require(balanceOf(msg.sender, 1) >= 5, "you don't have enough gold");
        safeTransferFrom(msg.sender, address(this), 1, 3, "0x0");
        swordCount++;
        swords[swordCount].available = true;
        addressToSwords[msg.sender].push(swordCount);
        _mint(msg.sender, SWORD, 1, "");
    }

    function equipSword(uint256 _tokenId, uint256 _swordId) external isIdle(_tokenId) ownerOf(_tokenId) {
        require(swords[_swordId].available, "this sword is not avliable right now");
        players[_tokenId].item = true;
        players[_tokenId].attack += 5;
        swords[_swordId].available = false;
        swords[_swordId].owner = msg.sender;
    }

    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes memory
    ) public virtual returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address,
        address,
        uint256[] memory,
        uint256[] memory,
        bytes memory
    ) public virtual returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }
    

}
