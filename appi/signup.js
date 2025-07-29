const express = require('express');
const {body} = require('express-validator');
const supabase = require('../../supabaseClient');
const handleValidation = require('../../middleware/validation')
const router = express.Router();

//requires email and password to signup
router.post('/',
    [body('email').isEmail().withMessage('A valid email is required'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'), 
    handleValidation],    
    async (req, res) => {
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
                return res.status(400).json({error: error.message});
            }

            //success msg
            res.status(201).json({
                message: 'User created successfully.',
                user: data.user,
            });
        } catch (error) {
            console.error('Error during signup: ', error);
            res.status(500).json({error: 'An error occured. Please try again later...'});
        }
    }
);

module.exports = router;