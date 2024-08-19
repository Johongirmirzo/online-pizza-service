import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../assets/images'))
  },
  filename(req, file, cb) {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`)
  },
})

function checkFileType(file: any, cb: any) {
  const filetypes = /jpeg|jpg|png|webp|svg/i
  const extname = filetypes.test(path.extname(file.originalname))
  if (extname) {
    return cb(null, true)
  } else {
    cb('Only jpg|png|webp|svg file formats are allowed!')
  }
}

export const uploadImage = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
  limits: { fileSize: 1000000 },
})
