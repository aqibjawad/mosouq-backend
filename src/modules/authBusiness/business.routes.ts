import express from 'express';
import { signupBusiness, signupBusinessAdmin, loginAuth, addPassword, googleLogin, verifyOtp, getUsers, searchBusiness, searchAll, getUserById, deleteUserById } from './business.controller';

const router = express.Router();

router.post('/add-business', signupBusiness);
router.post('/add-businessAdmin', signupBusinessAdmin);
router.post('/login-business', loginAuth);
router.post('/addPassword-business', addPassword);
router.post('/googleLogin-business', googleLogin);
router.get('/verify-business', verifyOtp);
router.get('/get-business', getUsers);
router.get('/searchBusiness', searchBusiness);
router.get('/searchAll', searchAll); 
router.get('/user/:id', getUserById);
router.delete('/delete-business/:id', deleteUserById);
router.get('/verify-token', (req, res) => { res.json('1'); });

export default router;
