import vendorModel from "../models/vendor.model";
import cartModel from "../models/cart.model";
import userModel from "../models/user.model";

export const vendorControl = async (req, res) => {
    try {
        const { userID } = req.body;
        const userData = await userModel.findOne({ _id: userID })
        const userCart = await cartModel.find({ userID: userID });


        let userCatArr = userCart.map((val) => {
            return val.product.category
        })
        // userCatArr: user category array without repeated values
        userCatArr = [...new Set(userCatArr)]
        // console.log(userCatArr)
        const sellers = await vendorModel.find();
        // vendorsCatArr : array of category arrays of each vendor
        const vendorsCatArr = sellers.map((val) => {
            return val.category
        });

        // console.log(vendorsCatArr,"all vendors")


        let arr = [];

        vendorsCatArr.forEach((val) => {
            const matched = val.filter((elem) => {
                return userCatArr.includes(elem)
            })

            if (userCatArr.length === matched.length) {
                arr.push(val)
            }
        })
        console.log(arr[0], "arr")

        const filteredVendors = sellers.filter(val => {
            const sortedArr = arr[0].slice().sort();
            const sortedCategory = val.category.slice().sort();
            return sortedArr.join(',') === sortedCategory.join(',');
          });
        
        console.log(filteredVendors);


        if (filteredVendors.length > 1) {
            try {
                //location match
                const vendorData = filteredVendors.aggregate([
                    {
                        $geoNear: {
                            near: {
                                type: "Point",
                                coordinates: [parseFloat(userData.longitude), parseFloat(userData.latitude)]
                            },
                            key: "location",
                            maxDistance: 100,
                            distanceFeild: "dist.calculated",
                            spherical: true

                        }
                    }
                ]);

                res.status(200).json({
                    message: "Nearest vendor fethched",
                    data: vendorData
                })
            } catch (error) {
                res.status(400).json({
                    message: error
                })
            }


        }
        //    console.log(filteredVendors)

        else {
            if (userCatArr && vendorsCatArr) {
                res.status(200).json({
                    ucat: userCatArr,
                    vcat: filteredVendors,
                    message: "success"

                })
            }
            else {
                res.status(400).json({
                    data: vendorLoc,
                    message: "fail"

                })
            }

        }

    } catch (error) {
        res.status(500).json({
            message: `Something went wrong: ${error}`
        })
    }
}