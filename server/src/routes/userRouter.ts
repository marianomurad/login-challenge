import { check, header } from 'express-validator';
import { loginController, signUpController, getUserController } from '../controllers/userController'
import { Router } from 'express';
import auth from "../middleware/auth";

const router =  Router();

router.post(
    '/signup',
    [
        check('avatar', 'Please enter an avatar URL').not().isEmpty(),
        check('age', 'Please enter your age').not().isEmpty(),
        check('email', 'Please enter a valid email').isEmail().not().isEmpty(),
        check('name', 'Please Enter a Valid name').not().isEmpty(),
        check('password', 'Please enter a valid password').isLength({ min: 6}).isAlphanumeric(),
        check('role', 'Please enter a valid role').not().isEmpty(),
        check('surname', 'please enter a surname').not().isEmpty()
    ],
    signUpController);

router.post(
    '/login',
    [
            check('email', 'Please enter a valid email').isEmail(),
            check('password', 'Please enter a valid password').isLength({ min: 6})
    ],
    loginController);

router.get('/me/user-info',
    [
        auth
    ],
    getUserController)

export default router;
