import fs from 'fs';
import { resolve } from 'path';
import multer from 'multer';
import multerOptions from '../config/multerOptions';
import Photos from '../models/Photos';
import User from '../models/User';

const upload = multer(multerOptions).single('photo');

class Photo {
  // eslint-disable-next-line no-unused-vars

  async index(req, res) {
    const photosData = await Photos.findAll();
    const photos = photosData.map((p) => ({
      id: p.id, url: p.url, filename: p.filename, originalname: p.originalname, userId: p.user_id,
    }));
    return res.json(photos);
  }

  async show(req, res) {
    const { userId: user_id } = req;

    const photosData = await Photos.findAll({ where: { user_id } });
    const photos = photosData.map((p) => ({
      id: p.id, url: p.url, filename: p.filename, originalname: p.originalname, user_id,
    }));
    return res.json(photos);
  }

  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        console.log(error);
        return res.status(400).json({
          errors: [error.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { userId: user_id } = req;

        const user = await User.findOne({ where: { id: user_id } });
        console.log('user', user);
        if (!user) {
          return res.json({
            errors: ['Usuario inválido'],
          });
        }
        const photo = await Photos.create({ originalname, filename, user_id });
        const { id, url } = photo;

        return res.json({
          id, originalname, filename, url, user_id,
        });
      } catch (e) {
        return res.status(400).json({
          errors: ['Não foi possivel postar a foto.'],
        });
      }
    });
  }

  async delete(req, res) {
    try {
      const { userId: user_id } = req;

      const user = await User.findOne({ where: { id: user_id } });
      if (!user) {
        return res.json({
          errors: ['Usuario inválido'],
        });
      }

      const { id } = req.params;
      const photoData = await Photos.findOne({ where: { id, user_id } });
      if (!photoData) {
        return res.json({ errors: ['Foto não pode ser deletada'] });
      }
      const { originalname, filename, url } = photoData;
      photoData.destroy();

      const filePath = `${resolve(__dirname, '..', '..', 'uploads', 'images')}/${filename}`;
      await fs.exists(filePath, (exists) => {
        if (exists) {
          fs.rm(filePath, (err) => {
            if (err) throw err;
          });
        }
      });

      return res.json({
        msg: 'Foto deletada com sucesso', id, originalname, filename, url,
      });
    } catch (e) {
      return res.status(400).json({
        errors: ['Não foi possivel deletar a foto.'],
      });
    }
  }
}

export default new Photo();
