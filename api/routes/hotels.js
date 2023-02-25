import express from 'express'
const router = express.Router()

import {
    countByCity, countByType,
    createHotelController,
    deleteHotelController, getAllHotelController, getHotelRooms,
    getOneHotelController,
    updateHotelController
} from "../controllers/hotelController.js";
import {verifyAdmin} from "../utlis/verifyToken.js";

//create
router.post('/', verifyAdmin, createHotelController)
//update
router.put('/:id', verifyAdmin, updateHotelController)
//delete
router.delete('/:id', verifyAdmin, deleteHotelController)
//getOne
router.get('/find/:id', getOneHotelController)
//getAll
router.get('/', getAllHotelController)
// getRoom
router.get('/room/:id', getHotelRooms)





router.get('/countByCity', countByCity)
router.get('/countByType', countByType)
export default router