import express from 'express';
import { addProduct,allProducts,singleProduct,updateProduct,deleteProduct} from '../controllers/product.controller';
import {auth} from '../middleware/auth.middleware'


const productRouter = express.Router();


productRouter.post('/add-product',addProduct);
productRouter.get('/get-product',auth,allProducts);
productRouter.get('/get-product/:prodID',auth,singleProduct);
productRouter.patch('/update-product/:prodID',updateProduct);
productRouter.delete('/delete-product/:prodID',deleteProduct)

export default productRouter
