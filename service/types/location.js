export class Location{
    constructor(id, name, latitude, longitude, description) {
        if (typeof id !== 'string' || id.trim() === '') {
            throw new Error('Invalid id');
        }
        if (typeof name !== 'string' || name.trim() === '') {
            throw new Error('Invalid name');
        }
        if (typeof latitude !== 'number' || latitude < -90 || latitude > 90) {
            throw new Error('Invalid latitude');
        }
        if (typeof longitude !== 'number' || longitude < -180 || longitude > 180) {
            throw new Error('Invalid longitude');
        }
        if (description && typeof description !== 'string') {
            throw new Error('Invalid description');
        }

        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = description || '';
    }
}