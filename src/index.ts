import "dotenv/config"

import express from "express";
import UserController from "./controllers/UserController";
import UserRoutes from "./routes/userRoutes";
import UserRepository from "./repository/UserRepository";
import DatabaseServices from "./database/databaseServices";

const app = express();

const databaseServices = new DatabaseServices()
const userRepository = new UserRepository(databaseServices)
const userController = new UserController(userRepository)
const userRoutes = new UserRoutes(userController)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(userRoutes.router)

app.listen(process.env.PORT,() => {
  console.log(`Server running on port ${process.env.PORT}`)
})