import { Request, Response } from "express";

interface IProductData{
  id: string | undefined
  name: string
  description: string
  price: number
  imgUrl: string
  createdAt: Date | undefined
  updatedAt: Date | undefined
}

interface IProductMethods {}

interface IProductController {
  createProduct(req: Request, res: Response): Promise<void>
  getProduct(req: Request, res: Response): Promise<void>
  getAllProducts(req: Request, res: Response): Promise<void>
  updateProduct(req: Request, res: Response): Promise<void>
  deleteProduct(req: Request, res: Response): Promise<void>
}

interface IProductRepository {
  save(product: IProductData): Promise<void>
  update(product: IProductData, id: string): Promise<void>
  delete(id: string): Promise<void>
  getById(id: string): Promise<IProductData>
  getAll(): Promise<IProductData[]>
}

export { IProductData, IProductMethods, IProductController, IProductRepository }