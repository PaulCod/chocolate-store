class LoginController {

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.userRepository.getByEmail(email);
    if (user.length === 0) {
      res.status(404).json({ message: ['User not found'] });
      return;
    }
    const validPassword = await user[0].validatePassword(password);
    if (!validPassword) {
      res.status(401).json({ message: ['Invalid password'] });  
      return;
    }
    const token = user[0].generateToken();
    res.status(200).json({ token });
  }
}