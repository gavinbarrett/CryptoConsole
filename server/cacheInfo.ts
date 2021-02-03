import * as redis from 'redis';

// set up Redis connection
const redisClient = redis.createClient();
// set up Redis error handling
redisClient.on('error', err => { if (err) console.log(`Error: ${err}`) });

const getFromCache = async (id: string) => {
	/* Retrieve the data from memory */
	return redisClient.get(id);
}

const setInCache = async (id: string, value: string) => {
	/* Set the data in memory */
	return redisClient.set(id, value);
}

const checkInCache = async (id: string) => {
	/* Check if a key exists */
	return redisClient.exists(id);
}

const deleteFromCache = async (id: string) => {
	/* Delete key from Redis cache */
	return redisClient.del(id);
}

export {getFromCache, setInCache}
