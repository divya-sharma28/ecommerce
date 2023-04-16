import express from 'express';
import { register , login , getAdmin, getAdmins, updateAdmin, deleteAdmin} from '../controllers/admin.controller';

const adminRouter = express.Router();

adminRouter.post('/register', register);
adminRouter.post('/login', login);
adminRouter.get('/get-admin', getAdmins);
adminRouter.get('/get-admin/:adminID',getAdmin);
adminRouter.patch('/update-admin/:adminID', updateAdmin);
adminRouter.delete('/delete-admin/:adminID', deleteAdmin);

export default adminRouter;