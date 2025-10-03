import { Router } from "express";
import * as authController from '../controllers/auth.controller.js'



const router = Router();
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
// POST /api/auth/register
router.post('/register', authController.register);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: User Login successfully
 *       400:
 *         description: Bad request
 */
// POST /api/auth/login  
router.post('/login', authController.login);


export default router;