import { PoolConnection } from "mysql2/promise";
import IDatabaseService from "../interfaces/DatabaseServiceInterface";
import UserRepository from "./UserRepository";
import { IUserData } from "../interfaces/UserInterface";
import UserModel from "../models/UserModel";

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let mockDatabaseService: jest.Mocked<IDatabaseService>;
  let mockConnection: jest.Mocked<PoolConnection>;
  let userData: IUserData = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    createdAt: undefined,
    updatedAt: undefined,
  };

  beforeEach(() => {
    mockConnection = {
      execute: jest.fn(),
      release: jest.fn(),
    } as unknown as jest.Mocked<PoolConnection>;

    mockDatabaseService = {
      getConnection: jest.fn().mockResolvedValue(mockConnection),
    };

    userRepository = new UserRepository(mockDatabaseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should save a user to the database', async () => {
    const user = new UserModel(userData);
    user.formatData();
    await user.hashPassword();

    await userRepository.save(user);

    expect(mockDatabaseService.getConnection).toHaveBeenCalledTimes(1);
    expect(mockConnection.execute).toHaveBeenCalledWith(
      "INSERT INTO `users`(id, name, email, password) VALUES (?, ?, ?, ?)",
      [user.id, user.name, user.email, user.password]
    );
    expect(mockConnection.release).toHaveBeenCalledTimes(1);
  });

  it('should update a user in the database', async () => {
    const user = new UserModel(userData);
    user.formatData();
    await user.hashPassword();
    const userId = user.id as string;

    await userRepository.update(user, userId);

    expect(mockDatabaseService.getConnection).toHaveBeenCalledTimes(1);
    expect(mockConnection.execute).toHaveBeenCalledWith(
      "UPDATE `users` SET name = ? WHERE id = ?",
      [user.name, userId]
    );
    expect(mockConnection.release).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if the update fails', async () => {
    const user = new UserModel(userData);
    user.formatData();
    await user.hashPassword();

    const userId = '550e8400-e29b-41d4-a716-446655440000';
    const errorMessage = 'Update failed';

    mockConnection.execute.mockRejectedValueOnce(new Error(errorMessage));

    await expect(userRepository.update(user, userId)).rejects.toThrow(errorMessage);

    expect(mockDatabaseService.getConnection).toHaveBeenCalledTimes(1);
    expect(mockConnection.execute).toHaveBeenCalledWith(
      "UPDATE `users` SET name = ? WHERE id = ?",
      [user.name, userId]
    );
    expect(mockConnection.release).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if the save fails', async () => {
    const errorMessage = 'Save failed';
    const user = new UserModel(userData);
    user.formatData();
    await user.hashPassword();

    mockConnection.execute.mockRejectedValueOnce(new Error(errorMessage));

    await expect(userRepository.save(user)).rejects.toThrow(errorMessage);

    expect(mockDatabaseService.getConnection).toHaveBeenCalledTimes(1);
    expect(mockConnection.execute).toHaveBeenCalledWith(
      "INSERT INTO `users`(id, name, email, password) VALUES (?, ?, ?, ?)",
      [user.id, user.name, user.email, user.password]
    );
    expect(mockConnection.release).toHaveBeenCalledTimes(1);
  });

  it('should delete a user from the database', async () => {
    const userId = '550e8400-e29b-41d4-a716-446655440000';
    await userRepository.delete(userId);

    expect(mockDatabaseService.getConnection).toHaveBeenCalledTimes(1);
    expect(mockConnection.execute).toHaveBeenCalledWith(
      "DELETE FROM `users` WHERE id = ?",
      [userId]
    );
    expect(mockConnection.release).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if the delete fails', async () => {
    const errorMessage = 'Delete failed';
    const userId = '550e8400-e29b-41d4-a716-446655440000';

    mockConnection.execute.mockRejectedValueOnce(new Error(errorMessage));

    await expect(userRepository.delete(userId)).rejects.toThrow(errorMessage);

    expect(mockDatabaseService.getConnection).toHaveBeenCalledTimes(1);
    expect(mockConnection.execute).toHaveBeenCalledWith(
      "DELETE FROM `users` WHERE id = ?",
      [userId]
    );
    expect(mockConnection.release).toHaveBeenCalledTimes(1);
  });

  it("should get a user from the database", async () => {
    const userId = '550e8400-e29b-41d4-a716-446655440000';
    const mockResult: IUserData[] = [userData];

    mockConnection.execute.mockResolvedValueOnce([mockResult, []] as any);

    const user = await userRepository.getById(userId);

    expect(mockDatabaseService.getConnection).toHaveBeenCalledTimes(1);
    expect(mockConnection.execute).toHaveBeenCalledWith(
      "SELECT id, name, email, password FROM `users` WHERE id = ?",
      [userId]
    );
    expect(mockConnection.release).toHaveBeenCalledTimes(1);
    expect(user).toEqual(userData);
  });

  it("should throw an error if the get user fails", async () => {
    const errorMessage = 'Get user failed';
    const userId = '550e8400-e29b-41d4-a716-446655440000';

    mockConnection.execute.mockRejectedValueOnce(new Error(errorMessage));

    await expect(userRepository.getById(userId)).rejects.toThrow(errorMessage);

    expect(mockDatabaseService.getConnection).toHaveBeenCalledTimes(1);
    expect(mockConnection.execute).toHaveBeenCalledWith(
      "SELECT id, name, email, password FROM `users` WHERE id = ?",
      [userId]
    );
    expect(mockConnection.release).toHaveBeenCalledTimes(1);
  });
});
