const express = require('express');
const router = express.Router();
const { register, login } = require('../../controllers/authController');
const { getMe } = require('../../controllers/userController');
const { protect } = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const { registerValidation, loginValidation } = require('../../utils/validators');

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.get('/me', protect, getMe);

module.exports = router;
