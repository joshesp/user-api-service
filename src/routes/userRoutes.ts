import { Router } from 'express';
import UserController from '../controllers/UserController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/', [authMiddleware], UserController.info);

export default router;
