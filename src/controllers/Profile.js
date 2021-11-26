import User from '../models/User';
import Profile from '../models/Profile';

class ProfileController {
  async index(req, res) {
    try {
      const profileData = await Profile.findAll({ include: User });
      const profiles = profileData.map((p) => ({
        id: p.id,
        country: p.country,
        state: p.state,
        firstName: p.firstName,
        lastName: p.lastName,
        description: p.description,
        filenamePhoto: p.filenamePhoto,
        url: p.url,
        tagName: p.User.name,
      }));

      if (!profiles) {
        return res.json({
          errors: ['profile não existe'],
        });
      }

      return res.json({
        profiles,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // async show(req, res) {
  //   // IMPLEMENTES #####
  // }

  async store(req, res) {
    try {
      const {
        firstName, lastName, country, state, description,
      } = req.body;
      const { userId: user_id } = req;

      const user = await User.findOne({ where: { id: user_id } });

      console.log('user', user.getDataValue('name'));
      if (!user) {
        return res.json({
          errors: ['Usuario inválido'],
        });
      }
      const profile = await Profile.create({
        firstName, lastName, country, state, description, user_id,
      });

      if (!profile) {
        res.json({
          errors: ['Não foi possivel criar profile'],
        });
      }

      return res.json({
        firstName, lastName, country, state, description,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors?.map((err) => err.message),
        e,
      });
    }
  }

  async update(req, res) {
    try {
      const { userId: user_id } = req;
      const {
        country, state, firstName, lastName, description, filenamePhoto, url,
      } = req.body;

      const profileDataAndUpdated = await (await Profile.findOne(
        { where: { user_id }, include: User },
      )).update({
        country, state, firstName, lastName, description, filenamePhoto, url,
      });

      if (!profileDataAndUpdated) {
        return res.json({
          errors: ['Profile não existe'],
        });
      }

      // const profileUpdated = await profileData.update({
      //   country, state, firstName, lastName, description, filenamePhoto, url,
      // });

      return res.json({
        country: profileDataAndUpdated.country,
        state: profileDataAndUpdated.state,
        firstName: profileDataAndUpdated.firstName,
        lastName: profileDataAndUpdated.lastName,
        description: profileDataAndUpdated.description,
        filenamePhoto: profileDataAndUpdated.filenamePhoto,
        url: profileDataAndUpdated.url,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new ProfileController();
