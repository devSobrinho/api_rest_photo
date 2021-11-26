import User from '../models/User';

class UserController {
  async show(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);
      console.log(user);
      if (!user) {
        return res.json({
          errors: ['Usuário não existe'],
        });
      }
      console.log('usuario', user);

      const { name, email } = user;

      return res.json({
        name, email,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),

      });
    }
  }

  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      const { id, name, email } = newUser;
      return res.json({ id, name, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),

      });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      const { name, email } = req.body;

      if (!user) {
        return res.json({
          errors: ['Usuário não existe'],
        });
      }

      const userUpdated = await user.update({ name, email });
      const {
        id,
      } = userUpdated;

      return res.json({
        id, name, email,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.json({
          errors: ['Usuário não existe'],
        });
      }

      const userDelete = await user.destroy();
      const { id, name, email } = userDelete;

      return res.json({ id, name, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
