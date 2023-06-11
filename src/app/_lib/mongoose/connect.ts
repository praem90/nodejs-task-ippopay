import { Schema, model, connect, now, models, Model } from 'mongoose';


export const connectDB = async () => {
    await connect(process.env.MONGODB_URL)
}