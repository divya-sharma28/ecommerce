import vendorModel from '../models/vendor.model';
import bcrypt from 'bcrypt';
import jwt  from "jsonwebtoken";


// ----------------- REGISTER NEW VENDOR (POST) -------------------

export const register = async (req, res) => {
    try {
        const { name, email, password, confirm_password, category, location } = req.body;
        const vendorExists = await vendorModel.findOne({email:email});

        if(vendorExists){
            res.status(409).json({
                message: `${vendorExists.email} already exists!`,
                success: false

            })
        }
        else{
            if(password !== confirm_password){
                res.status(401).json({
                    message: `Password does not match!`,
                    success: false

                })
            }
            else{
                const catData = category.split(",")
                const hashPassword = bcrypt.hashSync(password, 10);
                const addVendor = new vendorModel({
                    name : name,
                    email: email,
                    password: hashPassword,
                    category: catData,
                    location: location

                });

                addVendor.save();

                if(addVendor){
                    res.status(200).json({
                        Data: {email:addVendor.email,name: addVendor.name, category: addVendor.category, location: addVendor.location},
                        message: `${email} registered successfully!`,
                        success: true

                    })
                }
                else{
                    res.status(400).json({
                        message:`Registeration failed!`,
                        success: false

                    })
                }
            }
          
        }

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`,
            success: false

        });
    }
}

// ----------------- VENDOR LOGIN (POST) -------------------

export const login = async(req,res) =>{
    try {
        const {email, password} = req.body;

        const existVendor = await vendorModel.findOne({email:email});
        if(existVendor){
            const match = await bcrypt.compare(password, existVendor.password);
            if(match){
                const token = jwt.sign({_id:existVendor._id,email:existVendor.email, _id:existVendor._id},'vendor123',{expiresIn:'90d'})
                res.status(200).json({
                    data: {name: existVendor.name, email: existVendor.email},
                    token: token,
                    message: 'Login successful!',
                    success: true

                });
            }
            else{
                res.status(400).json({
                    message: 'Password incorrect!',
                    success: false

                });  
            }
        }
        else{
            res.status(400).json({
                message: `${email} is not registered!`,
                success: false

            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`,
            success: false

        });
    }
}

// ----------------- GET ALL VENDORS (GET) -------------------
export const getVendors = async(req,res)=>{
    try {
        const getVendor = await vendorModel.find();
        if (getVendor) {
            res.status(201).json({
                data: getVendor,
                message: 'Vendors fetched successfully!'
            });
        }
        else {
            res.status(400).json({
                message: 'Error while fetching vendors!'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
}

// ----------------- GET SINGLE VENDOR (GET) -------------------
export const getVendor = async(req,res)=>{
    try {
        const vendorID = req.params.vendorID
        const getVendor = await vendorModel.find({_id: vendorID});
        if (getVendor) {
            res.status(201).json({
                data: getVendor,
                message: 'Vendor fetched successfully!'
            });
        }
        else {
            res.status(400).json({
                message: 'Error while fetching vendor!'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
}

// ----------------- UPDATE VENDOR (PATCH) -------------------
export const updateVendor = async(req,res)=>{
    try {
        const vendorID = req.params.vendorID
        const {name, email, password, confirm_password, category, location} = req.body;

        let hashPassword;
        if(password){
            if(password !== confirm_password ){
                res.status(400).json({
                    message: 'Password does not match!'
                });
            }
            else{
                hashPassword = bcrypt.hashSync(password, 10);
            }

        }
        const updateVendor = await vendorModel.updateOne({_id: vendorID},{
            $set:{
                name: name,
                email: email,
                password: hashPassword,
                category: category,
                location: location

            }
        });
        
        if (updateVendor.acknowledged) {
            res.status(201).json({
                data: updateVendor,
                message: 'Vendors updated successfully!'
            });
        }
        else {
            res.status(400).json({
                message: 'Error while updating vendor!'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
}



// ----------------- DELETE VENDOR (DELETE) -------------------

export const deleteVendor = async(req,res)=>{
    try {
        const vendorID = req.params.vendorID
        const delvendor = await vendorModel.deleteOne({_id: vendorID});
        if (delvendor) {
            res.status(201).json({
                data: delvendor,
                message: 'Vendor deleted successfully!'
            });
        }
        else {
            res.status(400).json({
                message: 'Error while deleting vendor!'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
}