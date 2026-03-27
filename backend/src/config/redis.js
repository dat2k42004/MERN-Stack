const Redis = require("ioredis");
const dotenv = require("dotenv");
dotenv.config();

const redis = new Redis({
     host: process.env.REDIS_HOST,
     port: process.env.REDIS_PORT,
     password: process.env.REDIS_PASSWORD,
     retryStrategy: (times) => {
          return Math.min(times * 50, 2000);
     },
});

redis.on("error", (err) => {
     console.error(err);
});

redis.on("connect", () => {
     console.log("Connected to Redis");
})

module.exports = redis;