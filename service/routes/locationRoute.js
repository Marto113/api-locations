import { Router } from 'express';
import { 
    getLocations, 
    getLocationByUser, 
    getLocationMetadata, 
    createLocation 
} from '../controllers/locationController.js';

const locationRouter = Router();

locationRouter.get('/locations', getLocations);
locationRouter.get('/locations/:user_id', getLocationByUser);
locationRouter.get('/locations/:id', getLocationMetadata);
locationRouter.post('/locations', createLocation);

export default locationRouter;