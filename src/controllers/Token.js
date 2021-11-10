import jwt from 'jsonwebtoken';
import User from '../models/User';

class Token {
  // eslint-disable-next-line no-unused-vars
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.json({
        errors: ['Credenciais inválidas'],
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.json({
        errors: ['Usuário não existe'],
      });
    }

    const passwordValidate = await user.passwordIsValid(password);

    if (!passwordValidate) {
      return res.json({
        errors: ['Senha inválidas'],
      });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    console.log('usuario:', user);

    return res.json({
      token,
      user: { id, name: user.name, email },
    });
  }
}

export default new Token();
