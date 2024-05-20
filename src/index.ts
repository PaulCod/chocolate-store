import "dotenv/config"

import express from "express";
import UserController from "./controllers/UserController";
import UserRoutes from "./routes/userRoutes";
import UserRepository from "./repository/UserRepository";
import DatabaseServices from "./database/databaseServices";
import ProductRepository from "./repository/ProductRepository";
import ProductController from "./controllers/ProductController";
import ProductRoutes from "./routes/ProductRoutes";

const app = express();

const databaseServices = new DatabaseServices()
const userRepository = new UserRepository(databaseServices)
const userController = new UserController(userRepository)
const userRoutes = new UserRoutes(userController)

const productRepository = new ProductRepository(databaseServices)
const productController = new ProductController(productRepository)
const productRoutes = new ProductRoutes(productController)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api",userRoutes.router)
app.use("/api", productRoutes.router)

app.listen(process.env.PORT,() => {
  console.log(`Server running on port ${process.env.PORT}`)
})