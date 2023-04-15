import categoryModel from "../models/category.model";
import { categoryUpload } from "../multer";
import fs from 'fs';

// ========================================= CREATE ========================================
export const addCategory = (req, res) => {
    try {
        const uploadData = categoryUpload.single('image');
        uploadData(req, res, (err) => {
            if (err) {
                res.status(400).json({
                    message: `Cannot upload image ${err.message}`
                });
            }
            else {
                const { name } = req.body;
                let img;
                if(req.files){
                    img = req.file.filename;

                }
                else{
                    img = "default.png"
                }
                const addCat = new categoryModel({
                    name: name,
                    image: img
                })
                const saveData = addCat.save();
                if (saveData) {
                    res.status(201).json({
                        data: addCat,
                        path: `${process.env.PATH}/category_images`,
                        message: 'Category added to database :)'
                    });
                }
                else {
                    res.status(400).json({
                        message: 'Failed to add Category to database :('
                    });
                }
            }
        });

    } catch (error) {
        res.status(500).json({
            message: `Server error: ${error.message}`
        })
    }
}

// =============================================== READ ==========================================

//GET ALL CATEGORIES
export const getCategories = async (req, res) => {
    try {
        const { search } = req.query;
        let allCats;
        if (search) {
            allCats = await categoryModel.find({ name: { $regex: `.*${search}.*`, $options: "i" } })
        }
        else {
            allCats = await categoryModel.find()
        }

        if (allCats) {
            res.status(200).json({
                data: allCats,
                path: `${process.env.PATH}/category_images`,
                message: 'Categories fetched successfully!'
            });
        }
        else {
            res.status(400).json({
                message: 'Error while fetchhing categories'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Server error:${error.message}`
        });
    }
}

//GET SINGLE CATEGORY
export const singleCategory = async (req, res) => {
    try {
        const catID = req.params.catID
        const singleCat = await categoryModel.findOne({ _id: catID });
        if (singleCat) {
            res.status(200).json({
                data: singleCat,
                message: 'Category fetched successfully!'
            });
        }
        else {
            res.status(400).json({
                message: 'Error while fetching category'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Server error:${error.message}`
        });
    }
}

// ======================================= UPDATE =====================================

export const upadateCategory = (req, res) => {
    try {
        const uploadData = categoryUpload.single('image');
        uploadData(req, res, async (err) => {
            if (err) {
                res.status(400).json({
                    message: `Cannot upload image ${err.message}`
                });
            } else {
                const catID = req.params.catID;
                const { name } = req.body;
                let img;
                if(req.file){
                    img = req.file.filename;
                    const oldData = await categoryModel.findOne({_id: catID});
                    fs.unlink(`./uploads/category_images/${oldData.image}`,(err)=>{
                        if(err){
                            res.status(400).json({
                                message: 'Cannot delete image'+err.message
                            })
                        }
                    })
                }
                const updateCat = await categoryModel.updateOne({ _id: catID },
                    {
                        $set: {
                            name: name,
                            image:img
                        }
                    });
                if (updateCat) {
                    res.status(200).json({
                        data: updateCat,
                        message: 'Category updated successfully!'
                    });
                }
                else {
                    res.status(400).json({
                        message: 'Error while updating category'
                    })
                }
            }
        })


    } catch (error) {
        res.status(500).json({
            message: `Server error:${error.message}`
        });
    }
}

// ========================================= DELETE ======================================

export const deleteCategory = async (req, res) => {
    try {
        const catID = req.params.catID;
        const oldData = await categoryModel.findOne({ _id: catID });
        if (oldData.image !== 'default.png'){
            fs.unlink(`./uploads/category_images/${oldData.image}`, (err)=>{
                if(err){
                    res.status(400).json({
                        message: `Cannot delete image: ${err.message}`
                    })
                }
            })
        }
   
        const deleteCat = await categoryModel.deleteOne({ _id: catID });
        if (deleteCat) {
            res.status(200).json({
                data: deleteCat,
                message: 'Category deleted successfully!'
            });
        }
        else {
            res.status(400).json({
                message: 'Error while deleting category'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Server error:${error.message}`
        });
    }
}



