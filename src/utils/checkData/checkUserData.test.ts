import { CheckUserData } from './checkUserData';
import { IUserData } from "../../interfaces/UserInterface";

describe('CheckUserData', () => {
  let checkUserData: CheckUserData;

  beforeEach(() => {
    checkUserData = new CheckUserData();
  });

  it('should return error for invalid email', () => {
    const data: IUserData = {
      name: 'John Doe',
      email: 'john@example',
      password: '123456',
      userId: undefined,
      createdAt: undefined,
      updatedAt: undefined
    }
    checkUserData.checkEmail(data.email);
    expect(checkUserData.errors).toContain('Invalid email');
  });

  it('should return error for short password', () => {
    const data: IUserData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: '1234',
      userId: undefined,
      createdAt: undefined,
      updatedAt: undefined
     };
    checkUserData.checkPassword(data.password);
    expect(checkUserData.errors).toContain('Password must be at least 6 characters long');
  });

  it('should return error for short name', () => {
    const data: IUserData = { 
      name: 'Jo',
      email: 'john@example.com',
      password: '123456',
      userId: undefined,
      createdAt: undefined,
      updatedAt: undefined
     };
    checkUserData.checkName(data.name);
    expect(checkUserData.errors).toContain('Name must be at least 3 characters long');
  });

  it('should not return errors for valid data', () => {
    const data: IUserData = { 
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      userId: undefined,
      createdAt: undefined,
      updatedAt: undefined
    };
    checkUserData.checkAllData(data);
    expect(checkUserData.errors).toEqual([]);
  });
});
