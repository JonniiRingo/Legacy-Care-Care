//dependencies
import express from "express"; 
import {body, validationResult} from 'express-validator';
import {createClient} from '@supabase/supabase-js';
import cors from 'cors';
import dotenv from 'dotenv'; 
dotenv.config();

//declare cors, express, and port
//cors is needed in case of different ports
//port can be put into .env file for security purposes
const app = express();
app.use(cors());
const port = 3000;

//link to .env
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

//app.post signup route
//requires email and password to signup
//'/signup' can be any route
app.post('/signup',
    body('email').isEmail().withMessage('A valid email is required'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        //parse
        const {email, password} = req.body;

        //create user
        try{
            const {data, error} = await supabase.auth.signUp({
                email,
                password,
            });

            //error with signup
            if (error) {
                return res.status(400).json({message: error.message});
            }

            //success msg
            res.status(201).json({
                message: 'User created successfully.',
                user: data.usuer,
            });
        } catch (error) {
            console.error('Error during signup: ', error);
            res.status(500).json({message: 'An error occured. Please try again later...'});
        }
    }
);

//login route
//requires email and password
//'/login' can be any route
app.post('/login',
    body('email').isEmail().withMessage('Valid email is required.'),
    body('password').notEmpty().withMessage('Password is required.'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({message: errors.array()});
        }

        //parse
        const {email, password} = req.body;

        //authenticate using supabase
        try {
            const {data, error} = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                return res.status(400).json({message: error.message});
            }

            //login success
            //session control with access token
            res.status(200).json({
                message: 'Login successful',
                user: data.user,
                accessToken: data.session.access_token,
            });
        } catch (error) {
            console.error('Error during login: ', error);
            res.status(500).json({message: 'An error occured. Please try again later...'});
        }
    }
);

//default route ('/home')
//can route to any page you want ot use as home page
app.get('/home',
    (req, res) => {
        res.send('Welcome to the home page!');
});

//server is working
//as stated before, port can be placed in a .env file
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
