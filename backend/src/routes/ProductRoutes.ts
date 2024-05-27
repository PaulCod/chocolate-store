import {Router} from "express"
import { IProductController } from "../interfaces/ProductInterfaces"
import multer, {Multer} from "multer"

class ProductRoutes {
  router: Router
  productController: IProductController
  upload: Multer
  constructor(productController: IProductController) {
    this.router = Router()
    this.productController = productController
    this.upload = this.setMulter()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post('/products', this.upload.single('image') ,this.productController.createProduct.bind(this.productController))
    this.router.get('/products/:id', this.productController.getProduct.bind(this.productController))
    this.router.get('/products', this.productController.getAllProducts.bind(this.productController))
    this.router.put('/products/:id', this.productController.updateProduct.bind(this.productController))
    this.router.delete('/products/:id', this.productController.deleteProduct.bind(this.productController))
  }

  private setMulter(): Multer {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/')
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        file.originalname
        cb(null, `${uniqueSuffix}-${file.originalname.replaceAll(' ', '_')}`);
      }
    })
    const upload = multer({ storage: storage })
    return upload
  }
}

export default ProductRoutes