import multer from 'multer';

let fileStorage = multer.diskStorage({
    destination :(req, file, cb) => {
        cb(null, "../client/src/uploads")
    },
    filename : (req, file, cb) => {
        cb(null,file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
})

let upload = multer({storage: fileStorage}).single('image');

export default upload