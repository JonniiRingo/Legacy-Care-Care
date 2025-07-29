const express = require('express');
const {body} = require('express-validator');
const supabase = require('../supabaseClient');
const handleValidation = require('../middleware/validation')
const router = express.Router();
const port = process.env.PORT || 4000;

//requires email to send reset link
router.post('/',
    [body('email').isEmail().withMessage('Valid email is required.'),
        handleValidation],
    async (req, res) => {
        //parse email
        const { email } = req.body;

        //reset pass
        try {
            const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: process.env.PASSWORD_RESET_REDIRECT_URL || `http://localhost:${port}/update-password`
            });

            //error resetting
            if (error) {
                return res.status(400).json({ error: error.message });
            }

            res.status(200).json({ message: 'Password reset email sent successfully' });
        } catch (error) {
            console.error('Error during password reset:', error);
            res.status(500).json({ error: 'An error occured. Please try again later...' });
        }
    }
);

module.exports = router;