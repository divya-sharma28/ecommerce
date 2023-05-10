import express from 'express';
import { register , login , getAdmin, getAdmins, updateAdmin, deleteAdmin} from '../controllers/admin.controller';
import { addCategory, getCategories,singleCategory, upadateCategory, deleteCategory } from '../controllers/category.controller'; 
import { addProduct,allProducts,singleProduct,updateProduct,deleteProduct} from '../controllers/product.controller';

const adminRouter = express.Router();

adminRouter.post('/register', register);
adminRouter.post('/login', login);
adminRouter.get('/get-admin', getAdmins);
adminRouter.get('/get-admin/:adminID',getAdmin);
adminRouter.patch('/update-admin/:adminID', updateAdmin);
adminRouter.delete('/delete-admin/:adminID', deleteAdmin);

adminRouter.post('/add-category', addCategory);         
adminRouter.get('/get-category',getCategories);  
adminRouter.get('/get-category/:catID',singleCategory);          
adminRouter.patch('/update-category/:catID',upadateCategory); 
adminRouter.delete('/delete-category/:catID', deleteCategory); 


adminRouter.post('/add-product',addProduct);
adminRouter.get('/get-product',allProducts);
adminRouter.get('/get-product/:prodID',singleProduct);
adminRouter.patch('/update-product/:prodID',updateProduct);
adminRouter.delete('/delete-product/:prodID',deleteProduct)

export default adminRouter;