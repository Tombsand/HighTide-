import express from 'express'
import {router as filmRoute} from './film/filmController.js'
import cors from 'cors'
const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())
app.use("/film", filmRoute)

app.listen(PORT, ()=>{
    console.log("server Running")
})