const express = require("express");
const redis = require("redis");
const util = require("util");
require("dotenv").config();

const app = express();

const Player = require("./models/Player");
const mongoose = require("mongoose");
const { ethers } = require("ethers");
require("dotenv").config();
const ABI = require("../deployment/artifacts/hardhat-diamond-abi/HardhatDiamondABI.sol/DIAMOND-1-HARDHAT.json");
const CONTRACT_ADDRESS = process.env.SMART_CONTRACT; // Replace with your contract address
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC);

// Create a contract instance
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI.abi, provider);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Create Redis client
function connectToRedis() {
  const redisClient = redis.createClient();
  redisClient.on("error", (err) => console.error(`Redis error: ${err}`));
  return redisClient;
}
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
// Call connectToRedis function at start of application
const redisClient = connectToRedis();

// Promisify Redis methods
const redisGet = util.promisify(redisClient.get).bind(redisClient);
const redisSet = util.promisify(redisClient.set).bind(redisClient);

const leaderboardUpdate = async () => {
  contract.on("Mint", async (id, owner, name, uri) => {
    try {
      // Check if player already exists in database
      let player = await Player.findOne({ id: parseInt(id) });
      if (player) {
        // Player already exists, update owner, name, and uri
        player.owner = owner;
        player.name = name;
        player.image = uri;
        await player.save();
      } else {
        // Player does not exist, create new player in database
        player = new Player({ id, owner, name, image: uri });
        await player.save();
      }
      console.log(
        `Player ${id} minted by ${owner} with name "${name}" and URI "${uri}"`
      );
    } catch (error) {
      console.error(error);
    }
  });

  contract.on("BeginTrainingCombat", async (playerAddress, id) => {
    try {
      // Find player by id
      const player = await Player.findOne({ id: parseInt(id) });

      if (player) {
        // Update player status
        player.status = 1;
        await player.save();

        console.log(
          `Player with id ${player.id} and name ${player.name} is now training`
        );
      }
    } catch (err) {
      console.error(err);
    }
  });
  contract.on("NameChange", async (owner, id, newName) => {
    try {
      // Find player by id and update name
      const player = await Player.findOneAndUpdate(
        { id: parseInt(id) },
        { name: newName },
        { new: true }
      );
      console.log(`Player ${id} name changed to "${newName}" by ${owner}`);
    } catch (error) {
      console.error(error);
    }
  });
  contract.on("BeginTrainingMana", async (playerAddress, id) => {
    try {
      // Find player by id and update trainingInProgress and trainingStartTime
      const player = await Player.findOne({ id: parseInt(id) });

      if (player) {
        // Update player status
        player.status = 1;
        await player.save();

        console.log(
          `Player with id ${player.id} and name ${player.name} is now training`
        );
      }
    } catch (err) {
      console.error(err);
    }
  });

  contract.on("EndTrainingMana", async (playerAddress, id) => {
    try {
      // Find player by id and update trainingInProgress and trainingEndTime
      const player = await Player.findOne({ id: parseInt(id) });

      if (player) {
        // Update player status
        player.status = 0;
        player.mana += 1;
        await player.save();

        console.log(
          `Player with id ${player.id} and name ${player.name} is now ended training`
        );
      }
    } catch (err) {
      console.error(err);
    }
  });
  // Listen for EndTraining events
  contract.on("EndTrainingCombat", async (playerAddress, id) => {
    try {
      // Find player by id
      const player = await Player.findOne({ id: parseInt(id) });

      if (player) {
        // Update player status
        player.status = 0;
        player.strength += 1;
        await player.save();

        console.log(
          `Player with id ${player.id} and name ${player.name} is now  ended training`
        );
      }
    } catch (err) {
      console.error(err);
    }
  });
  contract.on("MainWin", async (playerId) => {
    try {
      // Find player in database
      const player = await Player.findOne({ id: playerId });
      if (!player) {
        console.log(`Player with id ${playerId} not found`);
        return;
      }

      // Update player wins
      player.wins += 1;
      player.Mainwins += 1;
      await player.save();

      console.log(`Player with id ${playerId} has ${player.wins} wins`);
    } catch (err) {
      console.error(err);
    }
  });
  contract.on("MagicWin", async (playerId) => {
    try {
      // Find player by id
      const player = await Player.findOne({ id: playerId });
      // If player exists, update wins count
      if (player) {
        player.wins += 1;
        player.Magicwins += 1;
        await player.save();
        console.log(`Player ${player.id} wins updated to ${player.wins}`);
      }
    } catch (err) {
      console.error(err);
    }
  });
  contract.on("MainLoss", async (playerId) => {
    try {
      // Find player by id
      const player = await Player.findOne({ id: playerId });
      // If player exists, do nothing
      if (player) {
        player.losses += 1;
        player.Mainlosses += 1;
        console.log(`Player ${player.id} suffered a main loss`);
      }
    } catch (err) {
      console.error(err);
    }
  });
  contract.on("MagicLoss", async (playerId) => {
    try {
      // Find player by id
      const player = await Player.findOne({ id: playerId });
      // If player exists, do nothing
      if (player) {
        player.losses += 1;
        player.Magiclosses += 1;
        console.log(`Player ${player.id} suffered a magic loss`);
      }
    } catch (err) {
      console.error(err);
    }
  });
  contract.on("EnterMain", async (playerId) => {
    try {
      // Find player by id
      const player = await Player.findOne({ id: playerId });
      // If player exists, do nothing
      if (player) {
        player.status = 4;
        console.log(`Player ${player.id} entered the main arena`);
      }
    } catch (err) {
      console.error(err);
    }
  });
  contract.on("EnterMagic", async (playerId) => {
    try {
      // Find player by id
      const player = await Player.findOne({ id: playerId });
      // If player exists, do nothing
      if (player) {
        player.status = 4;
        console.log(`Player ${player.id} entered the magic arena`);
      }
    } catch (err) {
      console.error(err);
    }
  });
};
app.get("/leaderboard", async (req, res) => {
  try {
    // Get query parameters
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    // Generate cache key
    const cacheKey = `leaderboard:${page}:${pageSize}`;

    // Check if Redis client is connected
    if (redisClient.connected) {
      // Check if leaderboard is in cache
      let leaderboardCache = await redisGet(cacheKey);
      if (leaderboardCache !== null) {
        console.log("Cache hit");

        // Parse cache data
        const leaderboard = JSON.parse(leaderboardCache);

        // Calculate pagination values
        const totalPlayers = leaderboard.length;
        const totalPages = Math.ceil(totalPlayers / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const playersOnPage = leaderboard.slice(startIndex, endIndex);

        // Send response with leaderboard and pagination values
        return res.status(200).json({
          success: true,
          players: playersOnPage,
          page,
          pageSize,
          totalPages,
          totalPlayers,
        });
      }
      console.log("Cache miss");
    }

    // Fetch leaderboard from database
    const players = await Player.aggregate([
      {
        $addFields: {
          totalMatches: { $add: ["$wins", "$losses"] },
          winRatio: {
            $cond: {
              if: { $eq: ["$wins", 0] },
              then: 0,
              else: { $divide: ["$wins", { $add: ["$wins", "$losses"] }] },
            },
          },
        },
      },
      {
        $sort: { winRatio: -1 },
      },
    ]);
    // Calculate pagination values
    const totalPlayers = players.length;
    const totalPages = Math.ceil(totalPlayers / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const playersOnPage = players.slice(startIndex, endIndex);

    // Send response with leaderboard and pagination values
    res.status(200).json({
      success: true,
      players: playersOnPage,
      page,
      pageSize,
      totalPages,
      totalPlayers,
    });

    // Update cache
    if (redisClient.connected) {
      const leaderboardCache = JSON.stringify(players);
      await redisSet(
        cacheKey,
        leaderboardCache,
        "EX",
        process.env.REDIS_EXPIRATION
      );
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const runLeaderboardUpdate = async () => {
  await leaderboardUpdate();
};

runLeaderboardUpdate();
