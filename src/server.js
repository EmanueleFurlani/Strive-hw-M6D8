import express from "express"
import listEndpoints from "express-list-endpoints"
import mongoose from "mongoose"
import cors from "cors"
import blogPostsRouter from "./services/blogPosts/index.js"
import { notFoundHandler, badRequestHandler, genericErrorHandler } from "./errorHandlers.js"

const server = express()
const port = process.env.PORT || 3003

server.use(express.json())
server.use(cors())

server.use("/blogPosts", blogPostsRouter)


server.use(notFoundHandler)
server.use(badRequestHandler)
server.use(genericErrorHandler)


mongoose.connect(process.env.CON_MONG)
mongoose.connection.on("connected", ()=>{
    console.log("Successfully connect to Mango!")
    server.listen(port, ()=>{
        console.table(listEndpoints(server))
        console.log("Server is pretty coooooool!")
    })
})
mongoose.connection.on("error", err => {
  console.log("MONGO ERROR: ", err)
})