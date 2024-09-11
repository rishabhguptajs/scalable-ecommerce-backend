import { createClient } from 'redis';

const client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

const connectRedis = async() => {
    try {
        await client.connect();
        console.log(`Redis Connected`);
    } catch (error: any) {
        console.log('Error connecting Redis', error.message);
    }
}

connectRedis();

export const getCache = async(key: string): Promise<any> => {
    try {
        const data = await client.get(key);
        return data ? JSON.parse(data) : null;
    } catch (error: any) {
        console.log('Error getting cache', error);
        return null
    }
}

export const setCache = async(key: string, value: any, expiration: number = 3600): Promise<void> => {
    try {
        await client.set(key, JSON.stringify(value), {
            EX: expiration
        });
    } catch (error: any) {
        console.log('Error setting cache', error);
    }
}

export const clearCache = async(key: string) => {
    try {
        await client.del(key);
    } catch (error: any) {
        console.error('Error clearing cache', error);
    }
}

export default client;