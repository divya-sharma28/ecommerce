import express from 'express';
import { addLocation, getLocations, singleLocation, upadateLocation, deleteLocation } from '../controllers/location.controller';
const locRouter = express.Router(); 

locRouter.post('/add-location', addLocation);         
locRouter.get('/get-location',getLocations);  
locRouter.get('/get-location/:locID',singleLocation);          
locRouter.patch('/update-location/:locID',upadateLocation); 
locRouter.delete('/delete-location/:locID', deleteLocation);  

export default locRouter;
