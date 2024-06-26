import { Request, Response } from "express";
import { IProductController, IProductData, IProductRepository } from "../interfaces/ProductInterfaces";
import path from "path";
import ProductModel from "../models/ProductModel";
import CheckProductData from "../utils/checkData/checkProductData";

class ProductController implements IProductController {
  productRepository: IProductRepository;
  private checkDataProduct: CheckProductData

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository
    this.checkDataProduct = new CheckProductData()
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    if (req.file === undefined) {
      res.status(400).json({
        message: ['Image is required'],
      });
      return;
    }

    const imagePath = path.join(__dirname, '..', '..','uploads', req.file.filename);

    req.body.imgUrl = `http://192.168.1.7:3838/images/${req.file.filename}`

    const product = new ProductModel(req.body);

    this.checkDataProduct.checkData(product);
    if (this.checkDataProduct.errors.length > 0) {
      res.status(400).json({message: this.checkDataProduct.errors})
      return
    }

    try {
      await this.productRepository.save(product);
      res.status(201).json({
        message: ['Product created'],
      })
    } catch (error) {
      res.status(500).json({
        message: ['Internal server error'],
      });
    }
  }
  async getProduct(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    if (!id || id === '') {
      res.status(400).json({message: ['Id is required']})
      return
    }

    try {
      const product = await this.productRepository.getById(id)
      if (!product) {
        res.status(404).json({message: ['Product not found']})
        return
      }

      res.status(200).json(product)
    } catch (error) {
      res.status(500).json({message: ['Internal server error']})
      return
    }
  }
  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productRepository.getAll();
      
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({
        message: ['Internal server error'],
      });
    }
  }
  async updateProduct(req: Request, res: Response): Promise<void> {
    const id = req.params.id

    if (!id || id === '') {
      res.status(400).json({message: ['Id is required']})
      return
    }

    const product = new ProductModel(req.body)

    this.checkDataProduct.checkData(product)
    if (this.checkDataProduct.errors.length > 0) {
      res.status(400).json({message: this.checkDataProduct.errors})
      return
    }

    try {
      const productExists = await this.productRepository.getById(id)
      if (!productExists) {
        res.status(404).json({message: ['Product not found']})
        return
      }

      await this.productRepository.update(product, id)

      res.status(200).json({message: ['Product updated']})

      return
    } catch (error) {
      res.status(500).json({message: ['Internal server error']})
      return
    }
  }
  async deleteProduct(req: Request, res: Response): Promise<void> {
    const id = req.params.id

    if (!id || id === '') {
      res.status(400).json({message: ['Id is required']})
      return
    }

    try {
      const product = await this.productRepository.getById(id)
      if (!product) {
        res.status(404).json({message: ['Product not found']})
        return
      }

      await this.productRepository.delete(id)
      res.status(200).json({message: ['Product deleted']})
      return
    } catch (error) {
      res.status(500).json({message: ['Internal server error']})
      return
    }
  }

}

export default ProductController;