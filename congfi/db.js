import mongoose from "mongoose"
export const connectdb = async() => {
    const MONGODB_URL = 'mongodb+srv://ritiktyagi287:ritik123@cluster0.ybr6lw3.mongodb.net/express';

    await mongoose.connect(MONGODB_URL).then(() => {
        console.log('database is connected successfullly!')
    })
}