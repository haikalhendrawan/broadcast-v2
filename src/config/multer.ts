import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";


const storage = multer.diskStorage({
  destination:(req, file, callback) => {
    callback(null, '../../../uploads')
  },
  filename:(req, file, callback) => {
    callback(null, file.originalname)
  }
})

const upload = multer({storage}).single('file');

export default upload