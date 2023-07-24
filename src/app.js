import express from 'express'
import mongoose from 'mongoose'
import categoryRouter from './routers/category'
import productRouter from './routers/product'
import authRouter from './routers/auth'
const app = express()
//middleware
app.use(express.json())
//router
app.use("/api", categoryRouter)
app.use("/api", productRouter)
app.use("/api", authRouter)
//connection
mongoose.connect('mongodb://127.0.0.1:27017/my-app')

export const viteNodeApp = app;