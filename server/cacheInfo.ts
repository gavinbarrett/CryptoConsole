import * as redis from 'redis';

// set up Redis connection
const redisClient = redis.createClient();
// set up Redis error handling
redisClient.on('error', err => { if (err) console.log(`Error: ${err}`) });

const getFromCache = async (id: string) => {
	/* Retrieve the data from memory */
	return new Promise((resolve, reject) => {
		redisClient.get(id, async (err, res) => {
			if (err || !res) resolve(null);
			resolve(res);
		});
	});
}

const setInCache = async (id: string, value: string) => {
	/* Set the data in memory */
	const expiry = 2;
	return new Promise((resolve, reject) => {
		redisClient.set(id, value, 'EX', expiry, async (err, res) => {
			if (err) resolve(null);
			resolve(true);
		});
	});
}

const checkInCache = async (id: string) => {
	/* Check if a key exists */
	return new Promise((resolve, reject) => {
		redisClient.exists(id, (err, res) => {
			if (err || !res) resolve(false);
			resolve(true);
		});
	});
}

const deleteFromCache = async (id: string) => {
	/* Delete key from Redis cache */
	return new Promise((resolve, reject) => {
		redisClient.del(id, (err, res) => {
			if (res === 1) resolve(true);
			resolve(false);
		});
	});
}

export { getFromCache, setInCache, checkInCache, deleteFromCache }
