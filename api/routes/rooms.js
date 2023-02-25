import express from 'express'
import {verifyAdmin} from "../utlis/verifyToken.js";
import {createRoom, deleteRoom, getAllRooms, getOneRoom, updateRoom} from "../controllers/roomController.js";
const router = express.Router()

//create
router.post('/:hotelid', verifyAdmin, createRoom)
//update
router.put('/:id', verifyAdmin, updateRoom)
//delete
router.delete('/:id/:hotelId', verifyAdmin, deleteRoom)
//getOne
router.get('/:id', getOneRoom)
//getAll
router.get('/', getAllRooms)
export default router