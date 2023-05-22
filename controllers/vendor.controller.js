import vendorModel from '../models/vendor.model';
import locationModel from '../models/location.model';
import bcrypt from 'bcrypt';
import jwt  from "jsonwebtoken";
import { vendorUpload } from '../multer';
import fs from 'fs'



// ----------------- REGISTER NEW VENDOR (POST) -------------------

export const register = (req, res) => {
    try {
        const uploadData = vendorUpload.single('logo');
        uploadData(req,res, async (err)=>{
            if (err) {
                res.status(400).json({
                    message: `Cannot upload image ${err.message}`
                });
            }
            else{
                const {company, email,phone, password, confirm_password, category,location } = req.body;
                const img = req.file.filename;
                const location_data = await locationModel.findOne({address: location})
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
                            company: company,
                            logo: img,
                            email: email,
                            phone: phone,
                            password: hashPassword,
                            category: catData,
                            vendor_location: location_data
        
                        });
        
                        addVendor.save();
              
                        if(addVendor){
                            res.status(200).json({
                                Data: addVendor,
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
            }
        })
    

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
                    data: {company: existVendor.company, email: existVendor.email},
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
                message: 'Vendors fetched successfully!',
                path: process.env.IMG_PATH + '/company_images'
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
export const updateVendor = (req,res)=>{
    try {
        const uploadData = vendorUpload.single('logo')
        uploadData(req,res, async (err)=>{
            if(err){
                res.status(400).json({
                    message: `Cannot upload image ${err.message}`
                });  
            }
            else{
                const vendorID = req.params.vendorID
                const {company, email,phone, password, confirm_password, category, location} = req.body;
                let img;
                if(req.file){
                    img=req.res.filename;
                    const oldData = await vendorModel.findOne({_id: vendorID});
                    fs.unlink(`./uploads/company_images/${oldData.logo}`,(err)=>{
                        if(err){
                            res.status(400).json({
                                message: 'Cannot delete image'+err.message
                            })
                        }
                    })                
                }
                let location_data;
                if (location){
                    location_data  = await locationModel.findOne({address: location})
                }
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
                        company: company,
                        logo: img,
                        email: email,
                        phone:phone,
                        password: hashPassword,
                        category: category,
                        vendor_location: location_data
        
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
            }
        })
     
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
        const delData = await vendorModel.findOne({_id: vendorID});
        fs.unlink(`./uploads/company_images/${delData.logo}`, (err)=>{
            if(err){
                res.status(400).json({
                    message: `Could not delete image: ${err}`
                })
            }
        })
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