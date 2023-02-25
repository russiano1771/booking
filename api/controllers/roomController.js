;
import Room from "../models/room.js";
import Hotel from "../models/hotel.js";




//create
export const createRoom = async (req, res, next) => {

    const hotelId = req.params.hotelId
    const newRoom = new Room(req.body)
    
    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId,
                {$push: {rooms: savedRoom._id}}
            )
        } catch (e) {
            next(e)
        }
        res.status(200).json(savedRoom)
    } catch (e) {
        next(e)
    }
}

/// update
export const updateRoom = async (req, res, next) => {
    try{
        const updateRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body }, {new: true})
        res.status(200).json(updateRoom)
    } catch (e) {
        next(e)
    }
}

/// delete

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId

    try{
        try {
            await Hotel.findByIdAndUpdate(hotelId,
                {$pull: {rooms: req.params.id}}
            )
        } catch (e) {
            next(e)
        }
        const delRoom = await Room.findByIdAndDelete(req.params.id)
        res.status(200).json("Success room delete")
    } catch (e) {
        next(e)
    }
}


// getOne

export const getOneRoom = async (req, res, next) => {
    try{
        const room = await Room.findById(req.params.id)
        return res.status(200).json(room)
    } catch (e) {
        next(e)
    }
}

// get All

export const getAllRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find()
        return res.status(200).json(rooms)
    } catch (e) {
        next(e)
    }
}
