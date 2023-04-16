import adminModel from "../models/admin.model";
import bcrypt from 'bcrypt';
import jwt  from "jsonwebtoken";


// ----------------- REGISTER NEW admin (POST) -------------------

export const register = async (req, res) => {
    try {
        const { name, email, password, confirm_password } = req.body;
        const adminExists = await adminModel.findOne({email:email});

        if(adminExists){
            res.status(409).json({
                message: `${adminExists.email} already exists!`
            })
        }

        else{
            if(password !== confirm_password){
                res.status(401).json({
                    message: `Password does not match!`
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
                        message: `${email} registered successfully!`
                    })
                }
                else{
                    res.status(400).json({
                        message:`Registeration failed!`
                    })
                }
            }
          
        }

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
}

// ----------------- admin LOGIN (POST) -------------------

export const login = async(req,res) =>{
    try {
        const {email, password} = req.body;

        const existadmin = await adminModel.findOne({email:email});
        if(existadmin){
            const match = await bcrypt.compare(password, existadmin.password);
            if(match){
                const token = jwt.sign({_id:existadmin._id,email:existadmin.email},'admin123',{expiresIn:'90d'})
                res.status(200).json({
                    data: {name: existadmin.name, email: existadmin.email},
                    token: token,
                    message: 'Login successful!'
                });
            }
            else{
                res.status(400).json({
                    message: 'Password incorrect!'
                });  
            }
        }
        else{
            res.status(400).json({
                message: `${email} is not registered!`
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
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
                message: 'admins fetched successfully!'
            });
        }
        else {
            res.status(400).json({
                message: 'Error while fetching admins!'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
}

// ----------------- GET SINGLE admin (GET) -------------------
export const getAdmin = async(req,res)=>{
    try {
        const adminID = req.params.adminID
        const getadmin = await adminModel.find({_id: adminID});
        if (getadmin) {
            res.status(201).json({
                data: getadmin,
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

// ----------------- UPDATE admin (PATCH) -------------------
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



// ----------------- DELETE admin (DELETE) -------------------

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