import express from 'express';
import { register , login , getUser, getUsers, updateUser, deleteUser} from '../controllers/user.controller';

const urouter = express.Router();

urouter.post('/register', register);
urouter.post('/login', login);
urouter.get('/get-user', getUsers);
urouter.get('/get-user/:userID', getUser);
urouter.patch('/update-user/:userID', updateUser);
urouter.delete('/delete-user/:userID', deleteUser);

export default urouter;