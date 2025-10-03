import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Express Request type to include our user payload
interface AuthRequest extends Request {
  user?: { userId: number };
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1]; // "Bearer TOKEN" -> "TOKEN"
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_default_secret') as { userId: number };
      
      // Attach the user's ID to the request object
      req.user = { userId: decoded.userId };
      
      next(); // Proceed to the next function (the controller)
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};