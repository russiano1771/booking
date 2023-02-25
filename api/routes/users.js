import express from 'express'
import {deleteUser, getAllUser, getOneUser, updateUser} from "../controllers/userController.js";
import {verifyAdmin, verifyUser} from "../utlis/verifyToken.js";
const router = express.Router()

// //checkAuth
// router.get('/checkAuth', verifyToken, (req, res, next) => {
//     res.send("Вы успешно авторизовались!")
//
// })
//
// // checkUser
// router.get('/checkUser/:id', verifyUser, (req, res, next) => {
//     res.send("Вы успешно авторизовались и можете управлять своим аккаунтом!")
//
// })
//
// //checkAdmin
// router.get('/checkAdmin/:id', verifyAdmin, (req, res, next) => {
//     res.send("Вы админ!")
//
// })

//update
router.put('/:id', verifyUser,updateUser)
//delete
router.delete('/:id', verifyUser, deleteUser)
//getOne
router.get('/:id', verifyUser, getOneUser)
//getAll
router.get('/', verifyAdmin, getAllUser)
export default router