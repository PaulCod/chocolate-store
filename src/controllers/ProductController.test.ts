import { Request, Response } from "express";
import ProductController from "./ProductController";
import { IProductRepository, IProductData } from "../interfaces/ProductInterfaces";

describe("ProductController", () => {
  let mockProductRepository: jest.Mocked<IProductRepository>;
  let productController: ProductController;

  beforeEach(() => {
    mockProductRepository = {
      save: jest.fn(),
      getById: jest.fn(),
      getAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<IProductRepository>;

    productController = new ProductController(mockProductRepository);
  });

  describe("createProduct", () => {
    it("should create a product successfully", async () => {
      const req = {
        body: {
          name: "test",
          price: 10,
          description: "test test test test",
          imgUrl: "test",
        },
        file: {
          fieldname: 'image',
          originalname: 'test.png',
          encoding: '7bit',
          mimetype: 'image/png',
          buffer: Buffer.from(''),
          size: 1000,
          destination: '',
          filename: 'test.png',
          path: '',
        },
      } as unknown as Request;

      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      await productController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: ["Product created"] });
    });

    it("should return an error if image is not provided", async () => {
      const req = {
        body: {
          name: "test",
          price: 10,
          description: "test",
          imgUrl: "test",
        },
      } as unknown as Request;

      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      await productController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: ["Image is required"] });
    })

    it("should return an error if name is not provided", async () => {
      const req = {
        body: {
          name: "t",
          price: 10,
          description: "test test test test",
          imgUrl: "test",
        },
        file: {
          fieldname: 'image',
          originalname: 'test.png',
          encoding: '7bit',
          mimetype: 'image/png',
          buffer: Buffer.from(''),
          size: 1000,
          destination: '',
          filename: 'test.png',
          path: '',
        },
      } as unknown as Request;

      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      await productController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: ["Name must be at least 3 characters long"] });
    })

    it("should return an error if price is not provided", async () => {
      const req = {
        body: {
          name: "test",
          price: 0,
          description: "test test test test",
          imgUrl: "test",
        },
        file: {
          fieldname: 'image',
          originalname: 'test.png',
          encoding: '7bit',
          mimetype: 'image/png',
          buffer: Buffer.from(''),
          size: 1000,
          destination: '',
          filename: 'test.png',
          path: '',
        },
      } as unknown as Request;

      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      await productController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: ["Price must be greater than 0"] });
    })

    it ("should return an error if description is not provided", async () => {
      const req = {
        body: {
          name: "test",
          price: 10,
          description: "",
          imgUrl: "test",
        },
        file: {
          fieldname: 'image',
          originalname: 'test.png',
          encoding: '7bit',
          mimetype: 'image/png',
          buffer: Buffer.from(''),
          size: 1000,
          destination: '',
          filename: 'test.png',
          path: '',
        },
      } as unknown as Request;

      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      await productController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: ["Description must be at least 10 characters long"] });
    })
  });

  describe("getProduct", () => {
    it("should get a product successfully", async () => {
      const req = { params: { id: "1" } } as unknown as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
  
      // Ajuste o objeto retornado pelo mockProductRepository.getById
      const expectedProduct = { id: "1", name: "test", price: 10, description: "test", imgUrl: "test", createdAt: new Date(), updatedAt: new Date() };
  
      mockProductRepository.getById.mockResolvedValueOnce(expectedProduct);
  
      await productController.getProduct(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      // Use toEqual para verificar a igualdade dos objetos
      expect(res.json).toHaveBeenCalledWith(expectedProduct);
    });

    it("should return an error if id is not provided", async () => {
      const req = { params: { id: "" } } as unknown as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
  
      await productController.getProduct(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: ["Id is required"] });
    })

    it("should return an error if product not found", async () => {
      const req = { params: { id: "1" } } as unknown as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
  
      await productController.getProduct(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: ["Product not found"] });
    })
  });

  describe("getAllProducts", () => {
    it("should get all products successfully", async () => {
      const products: IProductData[] = [
        { name: "product1", price: 10, description: "desc1", imgUrl: "img1", id: "1", createdAt: new Date(), updatedAt: new Date() },
        { name: "product2", price: 20, description: "desc2", imgUrl: "img2", id: "2", createdAt: new Date(), updatedAt: new Date() },
      ];

      const req = {} as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      mockProductRepository.getAll.mockResolvedValueOnce(products);

      await productController.getAllProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(products);
    });
  });

  describe("updateProduct", () => {
    it("should update a product successfully", async () => {
      const req = {
        params: { id: "1" },
        body: { name: "updatedName", price: 15, description: "updatedDesc", imgUrl: "updatedImg", id: "1", createdAt: new Date(), updatedAt: new Date() },
      } as unknown as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      mockProductRepository.getById.mockResolvedValueOnce({ name: "test", price: 10, description: "test", imgUrl: "test", id: "1", createdAt: new Date(), updatedAt: new Date() });

      await productController.updateProduct(req, res);

      expect(mockProductRepository.update).toHaveBeenCalledWith(req.body, req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: ["Product updated"] });
    });

    it ("should return an error if id is not provided", async () => {
      const req = {
        params: { id: "" },
        body: { name: "updatedName", price: 15, description: "updatedDesc", imgUrl: "updatedImg", id: "1", createdAt: new Date(), updatedAt: new Date() },
      } as unknown as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      await productController.updateProduct(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: ["Id is required"] });
    })

    it("should return an error if product not found", async () => {
      const req = {
        params: { id: "1" },
        body: { name: "updatedName", price: 15, description: "updatedDesc", imgUrl: "updatedImg", id: "1", createdAt: new Date(), updatedAt: new Date() },
      } as unknown as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      await productController.updateProduct(req, res);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: ["Product not found"] });
    })
  });

  describe("deleteProduct", () => {
    it("should delete a product successfully", async () => {
      const req = { params: { id: "1" } } as unknown as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      mockProductRepository.getById.mockResolvedValueOnce({ name: "test", price: 10, description: "test", imgUrl: "test", id: "1", createdAt: new Date(), updatedAt: new Date() });

      await productController.deleteProduct(req, res);

      expect(mockProductRepository.delete).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: ["Product deleted"] });
    });

    it("should return an error if id is not provided", async () => {
      const req = { params: { id: "" } } as unknown as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      await productController.deleteProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: ["Id is required"] }); 
    })

    it("should return an error if product not found", async () => {
      const req = { params: { id: "1" } } as unknown as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      await productController.deleteProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: ["Product not found"] });
    })
  });
});
