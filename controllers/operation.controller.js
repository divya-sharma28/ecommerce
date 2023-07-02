import vendorModel from "../models/vendor.model";
import userModel from "../models/user.model";
import cartModel from "../models/cart.model";
import operationModel from "../models/operation.model";

export const operation = async (req, res) => {
    try {
    const{userID} = req.body
    const userData = await userModel.findOne({_id:userID});

    const userCartData = await cartModel.find({ userID: userID});
    console.log(userCartData,"userCartData")

    let userCatArr = userCartData.map((val) => {
        return val.product.category
    })

    // userCatArr: user category array without repeated values
    userCatArr = [...new Set(userCatArr)].sort()

    console.log(userCatArr,"userCatArr")

    const vendors = await vendorModel.find() 
    const userLoc = userData.address
    const vendorsMatch = vendors.filter(ven => ven.address===userLoc)

    const vendorsCatArr = vendorsMatch.map(val=> val.category)

    console.log(vendorsCatArr,"vendorsCatArr")
    let arr = [];

    vendorsCatArr.forEach((val) => {
        const matched = val.filter((elem) => {
            return userCatArr.includes(elem)
        })

        // console.log(matched,"matched")


        if (userCatArr.length <= matched.length) {
            arr.push(val)
        }
    })

    console.log(arr,"arr")

    let filteredVendors;
    if (arr.length !==0){

         filteredVendors = vendorsMatch.filter(val => val.category.every(category => arr[0].includes(category)));
    
        const addData = new operationModel({
            userID: userID,
            vendorID: filteredVendors[0]._id,
            userCart: userCartData
        })
        addData.save()
    }
    if(filteredVendors){
        res.status(200).json({
            data: filteredVendors[0]._id,
            message:"Match found"
        });
    }
    else{
        res.status(400).json({
            message:"No Match found"
        });
    }



    } catch (error) {
        res.status(500).json({
            message: "Server Error"+error.message,
        });
    }

};


export const getOperation = async (req,res)=>{
    try {
        const getData = await operationModel.find();
        if(getData){
            res.status(200).json({
                data: getData,
                message: 'operation data fetched successfully!'
            })
        }
        else{
            res.status(400).json({
                message: 'Failed to fetch operation data!'
            })  
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error"+error.message,
        });
    }
    }
