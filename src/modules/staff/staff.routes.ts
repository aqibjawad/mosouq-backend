import express from 'express';
import { signupStaff, loginAuth, googleLogin, getUsers, getUserById, deleteUserById,  verifyLoginOtp } from './staff.controller';

const router = express.Router();

router.post('/add-staff', signupStaff);
router.post('/login-staff', loginAuth);
router.post('/verify-login-otp', verifyLoginOtp);
router.post('/googleLogin-staff', googleLogin);
router.get('/get-staff', getUsers);
router.get('/user/:id', getUserById);
router.delete('/delete-staff/:id', deleteUserById);
router.get('/verify-token', (req, res) => { res.json('1'); });

export default router;
 