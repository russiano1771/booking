import Hotel from "../models/hotel.js";
import Room from "../models/room.js";




/// create
export const createHotelController = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (e) {
        next(e)
    }
}

/// update
export const updateHotelController = async (req, res, next) => {
    try{
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body }, {new: true})
        res.status(200).json(updateHotel)
    } catch (e) {
        next(e)
    }
}

/// delete

export const deleteHotelController = async (req, res, next) => {
    try{
        const delHotel = await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Success delete")
    } catch (e) {
       next(e)
    }
}


// getOne

export const getOneHotelController = async (req, res, next) => {
    try{
        const hotel = await Hotel.findById(req.params.id)
        return res.status(200).json(hotel)
    } catch (e) {
        next(e)
    }
}

// get All

export const getAllHotelController = async (req, res, next) => {

    const {min, max, ...other} = req.query
    try {
        const hotels

            = await Hotel.find({...other, cheapestPrice: {$gt: min | 1, $lt: max || 500000} /// minimum 1 И "min" /// maximum "max" ИЛИ 500000
    }).limit(req.query.limit)
        ///// req.query строка запроса позволяет задать любой параметр поиска


        return res.status(200).json(hotels)
    } catch (e) {
        next(e)
    }
}
export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(',')
    try {

        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({city: city})
        }))
        return res.status(200).json(list)
    } catch (e) {
        next(e)
    }
}
export const countByType = async (req, res, next) => {

    try {
        const hotelCount = await Hotel.countDocuments({type:"Hotel"})
        const apartmentCount = await Hotel.countDocuments({type:"Apartment"})
        const resortCount = await Hotel.countDocuments({type:"Resort"})
        const villaCount = await Hotel.countDocuments({type:"Villa"})
        const cabinCount = await Hotel.countDocuments({type:"Cabin"})
        return res.status(200).json([

            {type:"Hotel", count:hotelCount},
            {type:"Apartment", count:apartmentCount},
            {type:"Resort", count:resortCount},
            {type:"Villa", count:villaCount},
            {type:"Cabin", count:cabinCount},
        ])
    } catch (e) {
        next(e)
    }
}


export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map( (room) =>{
            return Room.findById(room)
        }))
        res.status(200).json(list)
    } catch (e) {
        next(e)
    }
}





