import express from 'express';
import { addCategory, getCategories,singleCategory, upadateCategory, deleteCategory } from '../controllers/category.controller'; 

const catRouter = express.Router(); 

catRouter.post('/add-category', addCategory);         
catRouter.get('/get-category',getCategories);  
catRouter.get('/get-category/:catID',singleCategory);          
catRouter.patch('/update-category/:catID',upadateCategory); 
catRouter.delete('/delete-category/:catID', deleteCategory);  

export default catRouter;

