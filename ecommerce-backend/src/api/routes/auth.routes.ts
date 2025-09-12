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


export default router;