import mysql from "mysql2/promise";
import DatabaseServices from "./databaseServices";
import { release } from "os";

jest.mock("mysql2/promise", () => {
  const mPool = {
    getConnection: jest.fn(),
    end: jest.fn()
  }

  return {
    createPool: jest.fn(() => mPool),
  }
});

describe("DatabaseServices", () => {
  let databaseService: DatabaseServices;
  let mockPool: any;

  beforeEach(() => {
    jest.clearAllMocks()
    databaseService = new DatabaseServices();
    mockPool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  });

  describe("getConnection", () => {
    it("should return a connection from the pool", async () => {
      const mockConnection = {release: jest.fn()};
      mockPool.getConnection = jest.fn().mockResolvedValue(mockConnection);

      const connection = await databaseService.getConnection();

      expect(mockPool.getConnection).toHaveBeenCalledTimes(1);
      expect(connection).toBe(mockConnection);
    })

    it("should throw an error if the pool cannot get a connection", async () => {
      const error = new Error("Connection failed");
      mockPool.getConnection.mockRejectedValue(error);

      await expect(databaseService.getConnection()).rejects.toThrow(error);
      expect(mockPool.getConnection).toHaveBeenCalledTimes(1);
    })
  })

  describe("closePool", () => {
    it("should close the database pool successfully", async () => {
      mockPool.end.mockResolvedValue();

      await databaseService.closePool()

      expect(mockPool.end).toHaveBeenCalledTimes(1)
    })

    it("should throw an error if the pool cannot be closed", async () => {
      const error = new Error("Closing pool failed");
      mockPool.end.mockRejectedValue(error);

      await expect(databaseService.closePool()).rejects.toThrow("Closing pool failed");
      expect(mockPool.end).toHaveBeenCalledTimes(1)
    })
  })
})
