import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getLocations = async (req, res) => {
    try {
        const list = await prisma.location.findMany({
            select: { id: true, name: true, latitude: true, longitude: true }
        });
        return res.json(list);
    } catch (err) {
        console.error('getLocations error', err);
        return res.status(500).json({ error: 'Failed to fetch locations' });
    }
}

export const createLocation = async (req, res) => {
    const { name, latitude, longitude, description } = req.body || {};

    if (!name || latitude === undefined || longitude === undefined) {
        return res.status(400).json({ error: 'Missing required fields: name, latitude, longitude' });
    }

    const lat = Number(latitude);
    const lon = Number(longitude);
    if (Number.isNaN(lat) || Number.isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        return res.status(400).json({ error: 'Invalid latitude or longitude' });
    }

    try {
        const created = await prisma.location.create({
            data: {
                name,
                latitude: lat,
                longitude: lon,
                description: description || null,
            }
        });

        res.status(201).json(created);
    } catch (err) {
            console.error('createLocation error', err && err.message);
            if (err && err.stack) console.error(err.stack);
        res.status(500).json({ error: 'Failed to create location' });
    }
}

export const getLocationMetadata = async (req, res) => {
    // Fetch metadata for a specific location by its id (UUID)
    const { id } = req.params || {};
    if (!id) {
        return res.status(400).json({ error: 'Missing location id' });
    }

    try {
        // id is a String UUID in the Prisma schema, do not coerce to Number
        const location = await prisma.location.findUnique({
            where: { id },
        });

        if (!location) {
            return res.status(404).json({ error: 'Location with this ID not found' });
        }

        return res.json(location);
    } catch (err) {
        console.error('getLocationMetadata error', err && err.message);
        if (err && err.stack) console.error(err.stack);
        return res.status(500).json({ error: 'Failed to fetch location metadata' });
    }

}

export const getLocationByUser = (req, res) => {
    // TODO - Fetch locations associated with a specific user
    // get all locations created by a specific user
    res.json();
}