import productModel from '../models/product.model';
import categoryModel from '../models/category.model';
import { prodUpload } from '../multer';
import fs from 'fs';

// ========================================= CREATE ========================================
export const addProduct=(req,res)=>{
    try {
        const uploadData = prodUpload.array('images',3);
        uploadData(req,res, (ERR)=>{
            if(ERR){
                res.status(400).json({
                    message:`YOU GOT AN ERROR :${ERR.message}`
                })
            }
            else{
                const {name,description,vendor_price,user_price,rating,stock,brand,category}= req.body;
                const images = req.files;

               const imgs = images.map(a=>{
                    return a.filename;
               });

                const addProd  = new productModel({
                    name: name,
                    description: description,
                    vendor_price: vendor_price,
                    user_price: user_price,
                    rating: rating,
                    stock: stock,
                    brand: brand,
                    category:category,
                    thumbnail: imgs[0],
                    images: imgs
                });

                const saveData = addProd.save();
                if(saveData){
                    res.status(201).json({
                        data: addProd,
                        message: 'Product inserted successfully!!'
                    
                    })
                }
                else{
                    res.status(400).json({
                        message:'Error while inserting product!!'
                    })
                }
            }
        })
    } catch (error) {
        res.status(500).json({
            message:`Server error:${error.message}`
        })
    }
}

// =============================================== READ ==========================================

// GET ALL PRODUCTS

export const allProducts = async(req,res)=>{
    try {

        const {q,limit,skip,select,category} = req.query;
        let allProds =[]

        // --------------------- Find product by category ----------------------------
        if(category){
            const catdata = await categoryModel.findOne({categoryName: category});
            // console.log(catdata);
            allProds = await productModel.find({category: catdata._id}).populate('category');
        }

        // ------------------------------- search ------------------------------------
        else if(q){
             allProds = await productModel.find({
            /*  NOTE:  => '.' refers to any character it can be anything number,string,sprecial character etc.
                       => '*' indicates we are able to repeat word or letter infinte number of times.
                       => 'i' refers to case insensitivity.
            */                
                $or:[
                    {title:{$regex: `.*${q}.*`,$options:'i'}},
                    {brand:{$regex: `.*${q}.*`,$options:'i'}}
                ]
            }).populate('category');

        }
    
        // ----------------------------- select, limit, skip -----------------------
        else{
            if(select){
            var sel = select.split(',').join(' ')
            }   
            allProds = await productModel.find().limit(limit).skip(skip).select(sel).populate('category');
        }

        if(allProds){
            res.status(200).json({
                data: allProds,
                path: `${process.env.IMG_PATH}/prod_images`,
                message: 'Products fetched successfully!'
            });
        } 
        else{
            res.status(400).json({
                message:'Error while fetchhing product'
            })
        }
    } catch (error) {
        res.status(500).json({
            message:`Server error:${error.message}`
        });
    }
}

// GET SINGLE PRODUCTS

export const singleProduct = async(req,res)=>{
    try {
        const prodID = req.params.prodID
        const singleProd = await productModel.findOne({_id:prodID});
        if(singleProd){
            res.status(200).json({
                data: singleProd,
                path: `${process.env.IMG_PATH}/prod_images`,
                message: 'Product fetched successfully!'
            });
        } 
        else{
            res.status(400).json({
                message:'Error while fetching product'
            })
        }
    } catch (error) {
        res.status(500).json({
            message:`Server error:${error.message}`
        })
    }
}

// ======================================= UPDATE =====================================

export const updateProduct = (req,res)=>{
    try {
        const uploadData = prodUpload.array('images',3);
        uploadData(req,res,async (err)=>{
            if(err){
                res.status(400).json({
                    message:`Cannot upload image: ${err.message}`
                })
            }
            else{

                const prodID = req.params.prodID;

                const {name,description,vendor_price,user_price,rating,stock,brand,category}= req.body;


                let new_images;
                let imgs;
                if(req.files){
                    new_images = req.files;
                    imgs = new_images.map(a=>{
                        return a.filename
                    });
                    const oldProdData = await productModel.findOne({_id:prodID});
                    oldProdData.images.forEach(element => {
                        console.log(element)
                        fs.unlink(`./uploads/prod_images/${element}`, (err)=>{
                            res.status(400).json({
                                message: `Could not delete old Image: ${err}`
                            })
                        });
                    });
                }

                const updateProd = await productModel.updateOne({_id:prodID},
                    {$set:{name:name, description: description, vendor_price: vendor_price, user_price: user_price,
                    rating:rating,stock:stock,brand:brand,category:category, thumbnail:imgs[0], images: imgs }});

                if(updateProd){
                    res.status(200).json({
                        data: updateProd,
                        message: 'Product updated!'
                    });
                }
                else{
                    res.status(400).json({
                        message:'Error in updating!'
                    })
                }
    
            }

        })
    } catch (error) {
        res.status(500).json({
            message:`Server error:${error.message}`
        });
    }
}

// ========================================= DELETE ======================================

export const deleteProduct = async(req,res)=>{
    try {
        const prodID = req.params.prodID;
        const prodData = await productModel.findOne({_id: prodID})
        const delImgs =  prodData.images;

        delImgs.forEach(element => {
            fs.unlink(`./uploads/prod_images/${element}`, (err) => {
                if (err) {
                    res.status(400).json({
                        message: `Error while deleting image:${err.message}`
                    });
                }
            });
        });
       
        const delProd = await productModel.deleteOne({_id:prodID})
        if(delProd){
            res.status(200).json({
                data: delProd,
                message: 'Product deleted!'
            });
        }
        else{
            res.status(400).json({
                message:'Error in deleting!'
            })
        }
    } catch (error) {
        res.status(500).json({
            message:`Server error:${error.message}`
        });
    }
}


 