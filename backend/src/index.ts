import "dotenv/config"

import express from "express";
import UserController from "./controllers/UserController";
import UserRoutes from "./routes/userRoutes";
import UserRepository from "./repository/UserRepository";
import DatabaseServices from "./database/databaseServices";
import ProductRepository from "./repository/ProductRepository";
import ProductController from "./controllers/ProductController";
import ProductRoutes from "./routes/ProductRoutes";
import OrderRepository from "./repository/OrderRepository";
import OrderController from "./controllers/OrderController";
import OrderRoutes from "./routes/OrderRoutes";
import LoginController from "./controllers/LoginController";
import LoginRoutes from "./routes/LoginRoutes";

const app = express();

const databaseServices = new DatabaseServices()

const userRepository = new UserRepository(databaseServices)
const userController = new UserController(userRepository)
const userRoutes = new UserRoutes(userController)

const productRepository = new ProductRepository(databaseServices)
const productController = new ProductController(productRepository)
const productRoutes = new ProductRoutes(productController)

const orderRepository = new OrderRepository(databaseServices)
const orderController = new OrderController(orderRepository)
const orderRoutes = new OrderRoutes(orderController)

const loginController = new LoginController(userRepository)
const loginRoutes = new LoginRoutes(loginController)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api",userRoutes.router)
app.use("/api", productRoutes.router)
app.use("/api", orderRoutes.router)
app.use("/api", loginRoutes.router)

app.listen(process.env.PORT || 3001,() => {
  console.log(`Server running on port ${process.env.PORT}`)
})