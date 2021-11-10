import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      // const { name, password, email } = req.body;

      // console.log('logo: ', req.body);
      const newUser = await User.create(req.body);
      const { id, name, email } = newUser;
      return res.json({ id, name, email });
    } catch (e) {
      console.log('logo do error:', e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),

      });
    }
  }
}

export default new UserController();
