import express from 'express';
import { signupUser, loginAuth, googleLogin, getUsers, getUserById, deleteUserById, verifyLoginOtp, updatePassword } from './user.controller';

const router = express.Router();

router.post('/add-user', signupUser);
router.post('/login-user', loginAuth);
router.post('/update-password', updatePassword);
router.post('/login-admin', loginAuth);
router.post('/verify-login-otp', verifyLoginOtp);
router.post('/googleLogin-user', googleLogin);
router.get('/get-users', getUsers);
router.get('/user/:id', getUserById);
router.delete('/delete-user/:id', deleteUserById);
router.get('/verify-token', (req, res) => { res.json('1'); });

export default router;
