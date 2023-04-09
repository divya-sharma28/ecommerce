import express from 'express';
import { addProduct,allProducts,singleProduct,updateProduct,deleteProduct} from '../controllers/product.controller';
const productRouter = express.Router();

productRouter.post('/add-product',addProduct);
productRouter.get('/get-product',allProducts);
productRouter.get('/get-product/:prodID',singleProduct);
productRouter.patch('/update-product/:prodID',updateProduct);
productRouter.delete('/delete-product/:prodID',deleteProduct)

export default productRouter
