import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js'
import connectCloudinary from './config/cloudnary.js'
import userRouter from './routes/userRoute.js'


configDotenv()

const app = express()

connectCloudinary()


app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

app.get('/', (req, res) => {
    res.send('Server is Live...!')
})

app.use(requireAuth())

app.use('/api/ai', aiRouter)
app.use('/api/user', userRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})