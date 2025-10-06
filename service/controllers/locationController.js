import { Location } from '../types/location';
import { PrismaClient } from '@prisma/client'; 
const prisma = new PrismaClient();

export const getLocations = (req, res) => {
    // TODO - Fetch locations from db
    // return list of locations only returning id, name, latitude, longitude
    prisma.get.
    res.json();
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
        console.error('createLocation error', err);
        res.status(500).json({ error: 'Failed to create location' });
    }
}

export const getLocationMetadata = (req, res) => {
    // TODO - Fetch metadata for a specific location
    // return all fields for a location by id including the user who created it
    res.json();
}

export const getLocationByUser = (req, res) => {
    // TODO - Fetch locations associated with a specific user
    // get all locations created by a specific user
    res.json();
}