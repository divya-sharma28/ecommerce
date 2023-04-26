import adminModel from "../models/admin.model";
import bcrypt from 'bcrypt';
import jwt  from "jsonwebtoken";


// ----------------- REGISTER NEW ADMIN (POST) -------------------

export const register = async (req, res) => {
    try {
        const { name, email, password, confirm_password } = req.body;
        const adminExists = await adminModel.findOne({email:email});

        if(adminExists){
            res.status(409).json({
                message: `${adminExists.email} already exists!`,
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
                const hashPassword = bcrypt.hashSync(password, 10);
                const addAdmin = new adminModel({
                    name : name,
                    email: email,
                    password: hashPassword
                });

                addAdmin.save();

                if(addAdmin){
                    res.status(200).json({
                        Data: {email:addAdmin.email,name: addAdmin.name},
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

// ----------------- ADMIN LOGIN (POST) -------------------

export const login = async(req,res) =>{
    try {
        const {email, password} = req.body;

        const existadmin = await adminModel.findOne({email:email});
        if(existadmin){
            const match = await bcrypt.compare(password, existadmin.password);
            if(match){
                const token = jwt.sign({_id:existadmin._id,email:existadmin.email},'admin123',{expiresIn:'90d'})
                res.status(200).json({
                    data: {name: existadmin.name, email: existadmin.email, _id:existadmin._id},
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

// ----------------- GET ALL ADMINS (GET) -------------------
export const getAdmins = async(req,res)=>{
    try {
        const getAdmin = await adminModel.find();
        if (getAdmin) {
            res.status(201).json({
                data: getAdmin,
                message: 'admins fetched successfully!',
                success: true

            });
        }
        else {
            res.status(400).json({
                message: 'Error while fetching admins!',
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

// ----------------- GET SINGLE ADMIN (GET) -------------------
export const getAdmin = async(req,res)=>{
    try {
        const adminID = req.params.adminID
        const getadmin = await adminModel.find({_id: adminID});
        if (getadmin) {
            res.status(201).json({
                data: getadmin,
                message: 'admin fetched successfully!',
                success: true

            });
        }
        else {
            res.status(400).json({
                message: 'Error while fetching admin!',
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

// ----------------- UPDATE ADMIN (PATCH) -------------------
export const updateAdmin = async(req,res)=>{
    try {
        const adminID = req.params.adminID
        const {name, email, password, confirm_password} = req.body;

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
        const updateadmin = await adminModel.updateOne({_id: adminID},{
            $set:{
                name: name,
                email: email,
                password: hashPassword
            }
        });
        
        if (updateadmin.acknowledged) {
            res.status(201).json({
                data: updateadmin,
                message: 'admins updated successfully!'
            });
        }
        else {
            res.status(400).json({
                message: 'Error while updating admins!'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
}



// ----------------- DELETE ADMIN (DELETE) -------------------

export const deleteAdmin = async(req,res)=>{
    try { 
        const adminID = req.params.adminID
        const deladmin = await adminModel.deleteOne({_id: adminID});
        if (deladmin) {
            res.status(201).json({
                data: deladmin,
                message: 'admin fetched successfully!'
            });
        }
        else {
            res.status(400).json({
                message: 'Error while fetching admin!'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
}