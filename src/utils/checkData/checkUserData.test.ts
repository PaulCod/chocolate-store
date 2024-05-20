import checkUserData from './checkUserData';
import { IUserData } from "../../interfaces/UserInterface";

describe('CheckUserData', () => {

  beforeEach(() => {
    checkUserData.errors = [];
  });

  test('should pass when all data is valid', () => {
    const data: IUserData = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined
    };

    checkUserData.checkAllData(data);

    expect(checkUserData.errors.length).toBe(0);
  });

  test('should fail when name is too short', () => {
    const data: IUserData = {
      name: "Jo",
      email: "john.doe@example.com",
      password: "password123",
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined
    };

    checkUserData.checkAllData(data);

    expect(checkUserData.errors).toContain("Name must be at least 3 characters long");
    expect(checkUserData.errors.length).toBe(1);
  });

  test('should fail when email is invalid', () => {
    const data: IUserData = {
      name: "John Doe",
      email: "invalid-email",
      password: "password123",
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined
    };

    checkUserData.checkAllData(data);

    expect(checkUserData.errors).toContain("Email must be valid");
    expect(checkUserData.errors.length).toBe(1);
  });

  test('should fail when password is too short', () => {
    const data: IUserData = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123",
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined
    };

    checkUserData.checkAllData(data);

    expect(checkUserData.errors).toContain("Password must be at least 6 characters long");
    expect(checkUserData.errors.length).toBe(1);
  });

  test('should accumulate all errors for invalid data', () => {
    const data: IUserData = {
      name: "Jo",
      email: "invalid-email",
      password: "123",
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined
    };

    checkUserData.checkAllData(data);

    expect(checkUserData.errors).toContain("Name must be at least 3 characters long");
    expect(checkUserData.errors.length).toBe(1);
  });
});
