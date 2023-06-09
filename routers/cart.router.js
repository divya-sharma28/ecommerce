import express from 'express';
import { addToCart,getUserCart,getCartData,updateCart,deleteCartItem,deleteUserCart} from "../controllers/cart.controller";

const cartRouter = express.Router();

cartRouter.post('/add-to-cart',addToCart);
cartRouter.get('/get-carts',getCartData);
cartRouter.get('/get-user-cart/:userID',getUserCart);
cartRouter.patch('/update-cart/:itemID',updateCart);
cartRouter.delete('/delete-item/:itemID',deleteCartItem);
cartRouter.delete('/delete-user-cart/:userID',deleteUserCart);

export default cartRouter;
