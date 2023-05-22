import express from 'express';
import { addStatus, getStatus, delStatus} from '../controllers/status.controller';

const statusRouter = express.Router(); 

statusRouter.post('/add-status', addStatus);         
statusRouter.get('/get-status',getStatus);  
statusRouter.delete('/delete-status/:statusID',delStatus);          


export default statusRouter;
