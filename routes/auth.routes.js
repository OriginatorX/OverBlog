import { Router } from 'express';
import bcrypt from 'bcrypt';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import config from 'config';

import User from '../models/User.js';

const authHandler = Router();

authHandler.post(
    '/signUp', 
    [
        check('email', 'non-valid email').isEmail(),
        check('password', 'minimal password length is 6 symbols')
            .isLength({min: 6})
    ],
    (req, res) => {
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'invalid registration data'
            });
        }

        const {name, email, password} = req.body;

        User.findOne({email}) 
            .then(applicant => {
                if (applicant) {
                    return res.status(400).json({
                        message: "user already exists"
                    });
                }

                bcrypt.hash(password, 8)
                    .then(hashedPassword => {
                        const user = new User({
                            name, email, password: hashedPassword
                        });

                        user.save()
                            .then(saveUser => {
                                if (saveUser === user) {
                                    return res.json({
                                        message: 'user was created'
                                    });
                                }
                            });
                    });  
            })
            .catch(err => {
                res.status(500).json('user wasn\'t created');
                console.log('user wasn\'t created: ', err);
            });
    }
);

authHandler.post(
    '/signIn', 
    [
        check('email', 'Enter valid email').normalizeEmail().isEmail(),
        check('password', 'Enter valid password').exists()
    ],
    (req, res) => {
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'invalid authentication data'
            });
        }

        const {email, password} = req.body;

        User.findOne({email})
            .then(user => {
                if (!user) {
                    return res.status(400).json({
                        message: 'user not found'
                    });
                }

                bcrypt.compare(password, user.password)
                    .then(match => {
                        if (!match) {
                            return res.status(400).json({
                                message: 'Invalid password'
                            });
                        }
        
                        const token = jwt.sign(
                            {userId: user.id},
                            config.get('JWTprivateKey'),
                            {expiresIn: '2h'}
                        );
                        res.json({token, userId: user.id});
                    });
            })
    }
);

export default authHandler;
