import locationModel from "../models/location.model";

// ========================================= CREATE ========================================
export const addLocation = (req, res) => {
    try {
        const { address, latitude, longitude } = req.body
        const addLoc = new locationModel({
            address: address,
            location: {
                type: "Point",
                coordinates: [longitude, latitude]
            }

        })
        const saveData = addLoc.save()
        if (saveData) {
            res.status(201).json({
                data: addLoc,
                message: 'Location added to database!'
            });
        }
        else {
            res.status(400).json({
                message: 'Failed to add Location to database!'
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
export const getLocations = async (req, res) => {
    try {
        const { search } = req.query;
        let allLocs;
        if (search) {
            allLocs = await locationModel.find({ address: { $regex: `.*${search}.*`, $options: "i" } })
        }
        else {
            allLocs = await locationModel.find()
        }

        if (allLocs) {
            res.status(200).json({
                data: allLocs,
                message: 'Locations fetched successfully!'
            });
        }
        else {
            res.status(400).json({
                message: 'Error while fetchhing locations'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Server error:${error.message}`
        });
    }
}

//GET SINGLE CATEGORY
export const singleLocation = async (req, res) => {
    try {
        const locID = req.params.locID
        const singleLoc = await locationModel.findOne({ _id: locID });
        if (singleLoc) {
            res.status(200).json({
                data: singleLoc,
                message: 'Location fetched successfully!'
            });
        }
        else {
            res.status(400).json({
                message: 'Error while fetching location'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Server error:${error.message}`
        });
    }
}

// ======================================= UPDATE =====================================

export const upadateLocation = async (req, res) => {
    try {
        const locID = req.params.locID;
        const { address, latitude, longitude } = req.body;
        const updateLoc = await locationModel.updateOne({ _id: locID },
            {
                $set: {
                    address: address,
                    location: {
                        type: " Point",
                        coordinates: [longitude, latitude]
                    }
                }
            });
        if (updateLoc) {
            res.status(200).json({
                data: updateLoc,
                message: 'Location updated successfully!'
            });
        }
        else {
            res.status(400).json({
                message: 'Error while updating location'
            })
        }

    } catch (error) {
        res.status(500).json({
            message: `Server error:${error.message}`
        });
    }
}

// ========================================= DELETE ======================================

export const deleteLocation = async (req, res) => {
    try {
        const locID = req.params.locID;
        const deleteLoc = await locationModel.deleteOne({ _id: locID });
        if (deleteLoc) {
            res.status(200).json({
                data: deleteLoc,
                message: 'Location deleted successfully!'
            });
        }
        else {
            res.status(400).json({
                message: 'Error while deleting location'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Server error:${error.message}`
        });
    }
}



