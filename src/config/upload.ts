import multer from 'multer';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', 'tmp'),
    filename(_, file, callback) {
      return callback(null, file.originalname);
    },
  }),
};
