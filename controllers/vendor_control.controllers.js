// import vendorModel from "../models/vendor.model";
// import cartModel from "../models/cart.model";

// export const vendorControl = async(req, res) => {
//     try {
//         const {userID} = req.body;
//         const userCart = await cartModel.find({userID:userID});
//         let userCatArr = userCart.map((val)=>{
//             return val.product.category
//         })
//         // userCatArr: user category array without repeated values
//         userCatArr = [...new Set(userCatArr)]
//         const sellers = await vendorModel.find();
//         // vendorsCatArr : array of category arrays of each vendor
//         const vendorsCatArr = sellers.map((val)=>{
//             return val.category
//         });

//         let intersec;
//         let arr=[];
//         vendorsCatArr.forEach((val)=>{
//             intersec = val.filter((elem)=>{
//                 return userCatArr.includes(elem)
//             })

//             if(userCatArr.length === intersec.length){
//                 arr.push(val)
//             }
//         })
//         // const a = vendorsCatArr.filter((vals)=>{
//         //    return vals.filter((val)=> {
//         //         return userCatArr.includes(val)

//         //     })
//         // })
//         console.log(arr)

       



//         // let result;
//         // if(userCatArr.length > vendorCatArr.length){
//         //     result = "NO MATCH FOUND"
//         // }
//         // else{
//         //     const intersection = vendorCatArr.filter(element => userCatArr.includes(element));
//         //     if(intersection.length == user.length){
//         //         console.log('MATCHED SUCCESSFULY')
//         //     }
//         //     else{
//         //         result = "NO MATCH FOUND"
//         //     }
//         // }





//         // -------------------------------------------------------------------------------

//         // const { longitude, latitude } = req.body;
//         // const result = vendorModel.aggregate([{
//         //     $geoNear: {
//         //         near: {
//         //             type: "Point",
//         //             coordinates: [parseFloat(longitude), parseFloat(latitude)]
//         //         },
//         //         key: "location",
//         //         maxDistance: 1000,
//         //         distanceField: "dist.calculated",
//         //         spherical: true
//         //     }
//         // }])

//         if (userCatArr&&vendorsCatArr) {
//             res.status(200).json({
//                 ucat: userCatArr,
//                 vcat:"Df",
//                 message: "success"

//             })
//         }
//         else {
//             res.status(400).json({
//                 data: vendorLoc,
//                 message: "fail"

//             })
//         }


//     } catch (error) {
//         res.status(500).json({
//             message: `Something went wrong: ${error.message}`
//         })
//     }
// }