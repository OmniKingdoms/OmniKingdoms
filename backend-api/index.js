const express = require("express");
const redis = require("redis");
const util = require("util");
require("dotenv").config();

const app = express();

const Player = require("./models/Player");
const mongoose = require("mongoose");
const Web3 = require("web3");
require("dotenv").config();
const ABI = require("./abi/abi.json");
const CONTRACT_ADDRESS = "0xe79C627c41746bd5D013c855c6f89645a34de6F5"; // Replace with your contract address
const web3 = new Web3("https://alpha-rpc.scroll.io/l2"); // Replace with your Infura project ID and network
// Create a contract instance
const contract = new web3.eth.Contract(ABI.abi, CONTRACT_ADDRESS);
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

// Call connectToRedis function at start of application
const redisClient = connectToRedis();

// Promisify Redis methods
const redisGet = util.promisify(redisClient.get).bind(redisClient);
const redisSet = util.promisify(redisClient.set).bind(redisClient);

const leaderboardUpdate = async () => {
  console.log("leaderboard Update");
  const playerCount = parseInt(await contract.methods.playerCount().call());
  console.log(playerCount);

  if (playerCount) {
    console.log("cache boutta hit");

    const batchSize = 100;
    const batches = Math.ceil(playerCount / batchSize);
    // Connect to MongoDB using Mongoose

    const bulkOps = [];

    for (let batch = 0; batch < batches; batch++) {
      const batchStart = batch * batchSize + 1;
      const batchEnd = Math.min((batch + 1) * batchSize, playerCount);
      const batchIds = Array.from(
        { length: batchEnd - batchStart + 1 },
        (_, i) => batchStart + i
      );

      const playerData = await Promise.all(
        batchIds.map(async (id) => {
          const response = await contract.methods.getPlayer(id).call();
          return {
            id: id,
            name: response.name,
            strength: parseInt(response.strength),
            magic: parseInt(response.magic),
            health: parseInt(response.health),
            status: response.status,
            image: response.uri,
            xp: parseInt(response.xp),
          };
        })
      );

      playerData.forEach((player) => {
        bulkOps.push({
          updateOne: {
            filter: { id: player.id },
            update: { $set: player },
            upsert: true,
          },
        });
      });

      // Execute bulk update operation for each batch using Mongoose
      await Player.bulkWrite(bulkOps, { ordered: false });

      // Clear bulk operations array
      bulkOps.length = 0;
    }
    console.log("done");
  }
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
    const players = await Player.find().sort({ xp: -1, strength: -1 });

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const runLeaderboardUpdate = async () => {
  await leaderboardUpdate();
  setTimeout(runLeaderboardUpdate, 10000);
};

runLeaderboardUpdate();