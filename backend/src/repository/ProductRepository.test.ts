import ProductRepository from "./ProductRepository";
import { IProductData } from "../interfaces/ProductInterfaces";


const mockConnection = {
  execute: jest.fn(),
  release: jest.fn()
};

const mockDatabaseService = {
  getConnection: jest.fn().mockResolvedValue(mockConnection)
};

const productRepository = new ProductRepository(mockDatabaseService);

describe("ProductRepository", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should save a product", async () => {
    const product: IProductData = {
      id: "1",
      name: "Chocolate",
      price: 10,
      description: "Delicious chocolate",
      imgUrl: "http://example.com/chocolate.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockConnection.execute.mockResolvedValueOnce([]);

    await productRepository.save(product);

    expect(mockConnection.execute).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO `chocolate`"),
      [product.id, product.name, product.price, product.description, product.imgUrl]
    );

    expect(mockConnection.release).toHaveBeenCalled();
  });

  it("should update a product", async () => {
    const product: IProductData = {
      id: "1",
      name: "Chocolate",
      price: 10,
      description: "Delicious chocolate",
      imgUrl: "http://example.com/chocolate.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockConnection.execute.mockResolvedValueOnce([]);

    await productRepository.update(product, product.id as string);

    expect(mockConnection.execute).toHaveBeenCalledWith(
      expect.stringContaining("UPDATE `chocolate`"),
      [product.name, product.price, product.description, product.id]
    );

    expect(mockConnection.release).toHaveBeenCalled();
  });

  it("should delete a product", async () => {
    const productId = "1";

    mockConnection.execute.mockResolvedValueOnce([]);

    await productRepository.delete(productId);

    expect(mockConnection.execute).toHaveBeenCalledWith(
      expect.stringContaining("DELETE FROM `chocolate`"),
      [productId]
    );

    expect(mockConnection.release).toHaveBeenCalled();
  });

  it("should get a product by ID", async () => {
    const productId = "1";
  
    mockConnection.execute.mockResolvedValueOnce([]);
  
    await expect(productRepository.getById(productId)).rejects.toThrow("Product not found");
  
    expect(mockConnection.execute).toHaveBeenCalledWith(
      expect.stringContaining("SELECT * FROM `chocolate` WHERE id = ?"),
      [productId]
    );
  
    expect(mockConnection.release).toHaveBeenCalled();
  });
  
  
  it("should get all products", async () => {
    const products: IProductData[] = [
      {
        id: "1",
        name: "Chocolate",
        price: 10,
        description: "Delicious chocolate",
        imgUrl: "http://example.com/chocolate.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "2",
        name: "Candy",
        price: 5,
        description: "Sweet candy",
        imgUrl: "http://example.com/candy.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  
    mockConnection.execute.mockResolvedValueOnce([products]);
  
    const retrievedProducts = await productRepository.getAll();
  
    expect(retrievedProducts).toEqual(products);
  
    expect(mockConnection.execute).toHaveBeenCalledWith(
      expect.stringContaining("SELECT * FROM `chocolate`")
    );
  
    expect(mockConnection.release).toHaveBeenCalled();
  });
  
});
