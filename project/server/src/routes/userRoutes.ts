import express from 'express';
import {
    getUsers,
    login,
} from '../controller/userController';

const router = express.Router();

router.get("/user", getUsers);
router.post("/login", login);

export default router;