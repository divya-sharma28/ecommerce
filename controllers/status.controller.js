import statusModel from "../models/status.model";

// ========================================= CREATE ========================================

export const addStatus = (req, res) => {
    try {
        const { status } = req.body;
        const addStat = new statusModel({
            status: status
        })
        addStat.save(); res
        if (addStat) {
            res.status(201).json({
                data: addStat,
                message: 'status added to database!'
            });
        }
        else {
            res.status(400).json({
                message: 'Failed to add status to database!'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Server error: ${error.message}`
        })
    }
}


// ========================================= READ ========================================
export const getStatus = async (req, res) => {
    try {
        const getStatus = await statusModel.find()
        if (getStatus) {
            res.status(201).json({
                data: getStatus,
                message: 'status fetched from database!'
            });
        }
        else {
            res.status(400).json({
                message: 'Failed to fetch status from database!'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Server error: ${error.message}`
        })
    }
}
// ========================================= DELETE ======================================

export const delStatus = async (req, res) => {
    try {
        const statusID = req.params.statusID
        const deleteStat = await statusModel.deleteOne({_id:statusID})
        if (deleteStat) {
            res.status(201).json({
                data: deleteStat,
                message: 'status deleted from database!'
            });
        }
        else {
            res.status(400).json({
                message: 'Failed to delete status from database!'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Server error: ${error.message}`
        })
    }
}