import { IUserData } from "../../interfaces/UserInterface"

class CheckUserData {
  errors: string[] = []

  checkEmail(email: string): boolean {
    return email && email.includes('@') ? true : false
  }

  checkPassword(password: string): boolean {
    return password && password.length >= 6 ? true : false
  }

  checkName(name: string): boolean {
    return name && name.length >= 3 ? true : false
  }

  checkAllData(data: IUserData): void {
    this.errors = []

    if (!this.checkName(data.name)) {
      this.errors.push('Name must be at least 3 characters long')
      return
    }

    if (!this.checkEmail(data.email)) {
      this.errors.push('Email must be valid')
      return
    }

    if (!this.checkPassword(data.password as string)) {
      this.errors.push('Password must be at least 6 characters long')
      return
    }
  }
}

export default new CheckUserData();