import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import { clerkMiddleware, requireAuth } from '@clerk/express'


configDotenv()

const app = express()


app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

app.get('/', (req, res) => {
    res.send('Server is Live...!')
})

app.use(requireAuth())

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})