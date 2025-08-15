import express from 'express';
import { userlogin, usersignup,getid, getname } from './controller.js';
const router = express.Router();
router.get('/login/:username', userlogin)
router.get('/signup/:username', usersignup)
router.get('/:username/:id', getid)
router.get('/',getname)
export default router;