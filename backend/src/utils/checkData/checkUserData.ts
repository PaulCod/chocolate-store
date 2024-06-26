import { IUserData } from "../../interfaces/UserInterface";

class CheckUserData {
  errors: string[] = [];

  checkAllData(user: IUserData) {
    // this.errors = [];
    this.checkName(user.name);
    this.checkEmail(user.email);
    this.checkPassword(user.password);
  }

  checkName(name: string) {
    
    if (!name || name.length < 3) {
      this.errors = [];
      this.errors.push("Name must be at least 3 characters long");
      return
    }
  }

  checkEmail(email: string) {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      this.errors = [];
      this.errors.push("Invalid email");
      return
    }
  }

  checkPassword(password: string | undefined) {
   
    if (!password || password.length < 6) {
      this.errors = [];
      this.errors.push("Password must be at least 6 characters long");
      return
    }
  }
  
}

const checkUserData = new CheckUserData();
export default checkUserData;
export { CheckUserData }
