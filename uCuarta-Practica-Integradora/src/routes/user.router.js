import { Router } from 'express';
import multer from 'multer';

import userController from '../controllers/user.controller.js';
import path from 'path';
import __dirname from '../utils.js';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder;

        if (req.body.type === 'documents') {
            folder = 'documents';
        } else if (req.body.type === 'products') {
            folder = 'products';
        } else if (req.body.type === 'profiles') {
            folder = 'profiles';
        } else {
            throw new Error('Invalid type for storage: ' + req.body.type);
        }
        cb(null, path.join(__dirname, `./data/${folder}`));
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        cb(null, `${timestamp}-${file.originalname}`);
    },
});


const usersRouter = Router();
const upload = multer({ storage });

usersRouter.post('/', userController.createUser)
usersRouter.post('/premium/:uid', userController.updateRol);
usersRouter.post('/auth', userController.authUser);
usersRouter.post('/logout', userController.logOut);
usersRouter.delete('/:uid', userController.deleteUser);
usersRouter.post('/:uid/documents', upload.array('documents'), userController.uploadDocuments);

export default usersRouter;
