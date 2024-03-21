import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";

const __filename:string = fileURLToPath(import.meta.url);
const __dirname:string = path.dirname(__filename);

const storage = multer.diskStorage({
  destination:(req, file, callback) => {
    callback(null, path.join(__dirname,'..', 'uploads'))
  },
  filename:(req, file, callback) => {
    callback(null, file.originalname)
  }
})

const upload = multer({storage}).single('file');

export default upload