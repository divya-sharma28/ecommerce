import cartModel from "../models/cart.model"
import statusModel from "../models/status.model"
import vendorOrdersModel from "../models/venodor_orders.model"


export const addToOrders  = async (req,res) =>{
    try {
        const {userID, statusID} = req.body
        const userCart = await cartModel.find({userID: userID})
        
        const priceArr = userCart.map((val)=> {
            return val.product.price
        })
        const itemsArr = userCart.map((val)=> {
            return val.product.quantity
        })

        const totalPrice = priceArr.reduce((a,b)=> a+b)
        console.log(totalPrice)
        const totalItems = itemsArr.reduce((a,b)=> a+b)
        console.log(totalItems)

        const status = await statusModel.findOne({_id:statusID})
        const addOrders = new vendorOrdersModel({
            items: totalItems,
            total_price: totalPrice,
            status: status.status
        })

        addOrders.save()
        if (addOrders) {
            res.status(200).json({
                data: addOrders,
                message: 'Order added to the list'
            })
        } else {
            res.status(400).json({
                message: 'Error in adding order'
            });
        }

        
    } catch (error) {
        res.status(500).json({
            message: `Something went wrong: ${error.message}`
        })
    }
}


export const getOrdersData =async (req,res)=>{
    try {
        const getOrders = await vendorOrdersModel.find()
        if(getOrders){
            res.status(200).json({
                data: getOrders,
                message: 'Orders fetched successfully!'
            })
        }
        else{
            res.status(400).json({
                message:'Could not fetch orders!'
            })
        }

    } catch (error) {
        res.status(500).json({
            message: `Something went wrong: ${error.message}`
        }); 
    }
}

