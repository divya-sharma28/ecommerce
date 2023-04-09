import categoryModel from "../models/category.model";

// ========================================= CREATE ========================================
export const addCategory = (req, res) => {
    try {
        const { name} = req.body
        const addCat = new categoryModel({
            name: name,
        })
        const saveData = addCat.save()
        if (saveData) {
            res.status(201).json({
                data: addCat,
                message: 'Category added to database :)'
            });
        }
        else {
            res.status(400).json({
                message: 'Failed to add Category to database :('
            });
        }
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
        const {search} = req.query;
        let allCats;
        if(search){
            allCats = await categoryModel.find({name:{$regex:`.*${search}.*`, $options:"i"}})            
        }   
        else{
            allCats = await categoryModel.find()            
        }   

        if (allCats) {                                          
            res.status(200).json({
                data: allCats,
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

export const upadateCategory = async (req, res) => {                       
    try {                                                                  
        const catID = req.params.catID;                                    
        const { name} = req.body;                           
        const updateCat = await categoryModel.updateOne({ _id: catID },   
            {
                $set: {
                    name: name,
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



