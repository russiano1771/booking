import User from "../models/user.js";
import bcrypt from 'bcrypt'
import {createError} from "../utlis/error.js";
import jwt from 'jsonwebtoken'

export const registration = async (req, res, next) => {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })
        await newUser.save()
        res.status(200).json("Пользователь успешно зарегистрирован")
    } catch (e) {
        next(e)
    }
}

export const login = async (req, res, next) => {

    try {
       const user = await User.findOne({username: req.body.username})
        if (!user){
            return next(createError(401, "Пользователь с такими данными не найден"))
        }
        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        if (!comparePassword){
            return next(createError(401, "Неверный пароль или username"))
        }
        const {password, isAdmin, ...otherDetails} = user._doc
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.SECRET_KEY)


        return res.cookie("access_token", token, {httpOnly: true}).status(200).json({otherDetails})

    } catch (e) {
        next(e)
    }
}