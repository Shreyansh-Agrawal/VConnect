import express from 'express'
const router = express.Router()

import rateLimiter from 'express-rate-limit'
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many requests from this IP, please try again after 15 minutes',
})

import {
  register,
  login,
  updateUser,
  registerClub,
  loginClub,
  updateClub,
} from "../controllers/authController.js";

import authenticateUser from '../middleware/auth.js'
import authenticateClub from '../middleware/auth-club.js'

router.route('/register').post(apiLimiter, register)
router.route('/login').post(apiLimiter, login)
router.route('/updateUser').patch(authenticateUser, updateUser)

router.route("/registerClub").post(apiLimiter,registerClub);
router.route("/loginClub").post(apiLimiter, loginClub);
router.route("/updateClub").patch(authenticateClub, updateClub);

export default router
