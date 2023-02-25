import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
const app = express()
dotenv.config()
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected Mongo DB')
    } catch (error) {
        throw error
    }

}

mongoose.connection.on("disconnected", () => {
    console.log("Mongo DB disconnected")
})
mongoose.connection.on("connected", () => {
    console.log("Mongo DB connected")
})





app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use('/auth', authRoute)
app.use('/users', usersRoute)
app.use('/hotels', hotelsRoute)
app.use('/rooms', roomsRoute)


/// middleware
app.use(( err, req, res, next) => {
    const errorStatus = err.status || 500
    const errormessage = err.message || "Something went wrong"

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errormessage,
        stack: err.stack
    })
})


app.listen(8800, () => {
    connect()
    console.log('server started success!')
})

