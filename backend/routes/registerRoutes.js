import express from 'express';
import { registerUser, loginUser ,refreshToken,logoutUser} from '../controllers/registerformController.js';
import protect from '../middleware/authmiddleware.js';
const router = express.Router();
router.post('/registerUser', registerUser);
router.post('/loginUser', loginUser);
router.post('/refreshToken', refreshToken);
router.post("/logoutUser", protect, logoutUser);
export default router;