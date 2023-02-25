import User from "../models/user.js";




/// update
export const updateUser = async (req, res, next) => {
    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body }, {new: true})
        res.status(200).json(updateUser)
    } catch (e) {
        next(e)
    }
}

/// delete

export const deleteUser = async (req, res, next) => {
    try{
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Success delete user")
    } catch (e) {
        next(e)
    }
}


// getOne

export const getOneUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id)
        return res.status(200).json(user)
    } catch (e) {
        next(e)
    }
}

// get All

export const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find()
        return res.status(200).json(users)
    } catch (e) {
        next(e)
    }
}





