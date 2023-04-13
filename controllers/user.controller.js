import userModel from "../models/user.model";
import bcrypt from 'bcrypt';
import jwt  from "jsonwebtoken";


// ----------------- REGISTER NEW USER (POST) -------------------

export const register = async (req, res) => {
    try {
        const { name, email, password, confirm_password } = req.body;
        const userExists = await userModel.findOne({email:email});

        if(userExists){
            res.status(409).json({
                message: `${userExists.email} already exists!`
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
                const addUser = new userModel({
                    name : name,
                    email: email,
                    password: hashPassword
                });

                addUser.save();

                if(addUser){
                    res.status(200).json({
                        Data: {email:addUser.email,name: addUser.name},
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

// ----------------- USER LOGIN (POST) -------------------

export const login = async(req,res) =>{
    try {
        const {email, password} = req.body;

        const existUser = await userModel.findOne({email:email});
        if(existUser){
            const match = await bcrypt.compare(password, existUser.password);
            if(match){
                const token = jwt.sign({_id:existUser._id,email:existUser.email},'user123',{expiresIn:'90d'})
                res.status(200).json({
                    data: {name: existUser.name, email: existUser.email},
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

// ----------------- GET ALL USERS (GET) -------------------
export const getUsers = async(req,res)=>{
    try {
        const getuser = await userModel.find();
        if (getuser) {
            res.status(201).json({
                data: getuser,
                message: 'Users fetched successfully!'
            });
        }
        else {
            res.status(400).json({
                message: 'Error while fetching users!'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
}

// ----------------- GET SINGLE USER (GET) -------------------
export const getUser = async(req,res)=>{
    try {
        const userID = req.params.userID
        const getuser = await userModel.find({_id: userID});
        if (getuser) {
            res.status(201).json({
                data: getuser,
                message: 'User fetched successfully!'
            });
        }
        else {
            res.status(400).json({
                message: 'Error while fetching user!'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
}

// ----------------- UPDATE USER (PATCH) -------------------
export const updateUser = async(req,res)=>{
    try {
        const userID = req.params.userID
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
        const updateUser = await userModel.updateOne({_id: userID},{
            $set:{
                name: name,
                email: email,
                password: hashPassword
            }
        });
        
        if (updateUser.acknowledged) {
            res.status(201).json({
                data: updateUser,
                message: 'Users updated successfully!'
            });
        }
        else {
            res.status(400).json({
                message: 'Error while updating users!'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
}



// ----------------- DELETE USER (DELETE) -------------------

export const deleteUser = async(req,res)=>{
    try {
        const userID = req.params.userID
        const deluser = await userModel.deleteOne({_id: userID});
        if (deluser) {
            res.status(201).json({
                data: deluser,
                message: 'User fetched successfully!'
            });
        }
        else {
            res.status(400).json({
                message: 'Error while fetching user!'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
}