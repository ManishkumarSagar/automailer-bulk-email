const { Redis } = require('ioredis');
require('dotenv').config();

const redisConnection = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379', {
  maxRetriesPerRequest: null,
});

redisConnection.on('connect', () => {
  console.log('✅ Redis Connected for Queues');
});

module.exports = redisConnection;