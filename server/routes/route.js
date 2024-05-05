const express = require('express');
const router = express.Router();

const location = require('../components/location/hospitalComponent');
const login = require('../components/login-register/loginComponent');
const register = require('../components/login-register/registerComponent');
const authenticateToken = require('../components/login-register/authenticateToken');
const { getProfile, updateUserDetails } = require('../components/account/profile')

router.get('/account', getProfile);
router.get('/authenticated', authenticateToken, (req, res) => {
    res.json({message: 'Authenticated successfully'})
})
router.put('/account/update-userdetails', updateUserDetails)
router.post('/location', location);
router.post('/login', login);
router.post('/register', register);

module.exports = router;