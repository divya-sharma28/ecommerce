import cartModel from '../models/cart.model';
import productModel from '../models/product.model';


// ========================================= CREATE ========================================
export const addToCart = async (req, res) => {
    try {
        const { productID, userID } = req.body;

        const product = await productModel.findOne({ _id: productID });
        console.log(product);
        const userprodExist = await cartModel.findOne({'product.id': productID , userID: userID});
        console.log(userprodExist);

        //  IF PRODUCT OF THAT USER EXIST IN CART THEN UPDATE QUANTITY 

        if(userprodExist){
            const new_quantity = userprodExist.product.quantity + 1
            const updatequantity = await cartModel.updateOne({_id: userprodExist._id},{
                $set:{
                    product:{
                        id: product.id,
                        name: product.name,
                        image: product.thumbnail,
                        price: product.user_price * new_quantity ,
                        quantity: new_quantity
                }
        }});

            if (updatequantity) {
                res.status(201).json({
                    data: updatequantity,
                    message: 'Added to Cart successfully :)'
                })
            } else {
                res.status(400).json({
                    message: 'Error in storing category data :('
                });
            }
        }
        //  IF PRODUCT OF THAT USER DOES NOT EXIST IN CART THEN ADD TO CART

        else{
        
            const addData = new cartModel({
                product: {
                    id: product.id,
                    name: product.name,
                    image: product.thumbnail,
                    price: product.user_price,
                    quantity: 1
                },
                userID: userID
            });
            const saveData = addData.save();
            if (saveData) {
                res.status(201).json({
                    data: addData,
                    message: 'Added to Cart successfully :)'
                })
            } else {
                res.status(400).json({
                    message: 'Error in storing cart data :('
                });
            }
        }
       
    } 
    catch (error) {
        res.status(500).json({
            message: `Something went wrong: ${error.message}`
        })
    }
}
// ======================================= READ ==========================================
// GET ALL CARTS
export const getCartData = async (req,res) =>{
    try {
        
        const cartData = await cartModel.find();
    
        if(cartData){
            res.status(200).json({
                data: cartData,
                message:'Cart retrieved successfully!',
                path: `${process.env.IMG_PATH}/prod_images`,
            });
        }
        else{

        }
    } catch (error) {
        res.status(500).json({
            message: `Something went wrong: ${error.message}`
        }); 
    }
}
// GET ENTIRE CART OF A USER
export const getUserCart = async (req,res) =>{
    try {
        const userID = req.params.userID;
        
        const cartData = await cartModel.find({userID: userID});
        let totatAmount = 0;
        for (let i = 0; i < cartData.length; i++) {
            const element = cartData[i];
            totatAmount+= element.product.user_price;
        }
        if(cartData){
            res.status(200).json({
                data:{
                    cart: cartData,
                    cart_total: totatAmount,
                    path: `${process.env.IMG_PATH}/prod_images`,

                },
                message:'Cart retrieved successfully!'
            });
        }
        else{
            res.status(400).json({
                message: `Error in retrieving cart`
            }); 
        }
    } catch (error) {
        res.status(500).json({
            message: `Something went wrong: ${error.message}`
        }); 
    }
}

// ======================================= UPDATE =====================================
export const updateCart = async (req,res)=>{
try {
    const itemID = req.params.itemID;
    const {quantity} = req.body;

    const getdata = await cartModel.findOne({_id: itemID});
    console.log(getdata)
    const orgPrice = getdata.product.price/getdata.product.quantity  //45000
    const newprice = orgPrice*quantity;
    console.log(newprice)


  

    const updateCartData = await cartModel.updateOne({_id: itemID},
        {$set:{
            product:{
            id:getdata.product._id,
            name:getdata.product.name,
            image:getdata.product.image,
            quantity:quantity,
            price:newprice
            }
        }});

    if(updateCartData){
        res.status(200).json({
            data : updateCartData,
            message: 'cart updated successfully!'
        });
    }
    else{
        res.status(200).json({
            message: 'Failed to update cart!'
        });
    }

} catch (error) {
    res.status(500).json({
        message: `Something went wrong: ${error.message}`
    }); 
}
}
// ========================================= DELETE ======================================

// DELETE SINGLE ITEM FROM CART
export const deleteCartItem = async(req,res) =>{
    try {
        const itemID = req.params.itemID;
        const deleteItem = await cartModel.deleteOne({_id:itemID});

        if(deleteItem.deletedCount==1){
            res.status(200).json({
                data: deleteItem,
                message:'Item deleted from cart successfully'
            })
        }
        else{
            res.status(400).json({
                message:'Failed to delete item from cart'
            })
        } 
    } catch (error) {
        res.status(500).json({
            message: `Something went wrong: ${error.message}`
        }); 
    }

}

// DELETE ENTIRE USER CART
export const deleteUserCart = async(req,res) =>{
    try {
        const userID = req.params.userID;
        const delUserCart = await cartModel.deleteMany({userID:userID})
        if(delUserCart){
            res.status(200).json({
                data: delUserCart,
                message:'User cart deleted successfully'
            })
        }
        else{
            res.status(400).json({
                message:'Failed to delete user cart'
            })
        } 
    } catch (error) {
        res.status(500).json({
            message: `Something went wrong: ${error.message}`
        }); 
    }
}
