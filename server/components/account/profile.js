const User = require('../model/UserDetail');
const bcrypt = require('bcrypt');

const getProfile = async (req, res) => {
    const { username } = req.query;
    try {
        const userDetails = await User.findOne({ username: username });
        console.log(userDetails)
        if (!userDetails) {
            return res.status(401).json({ error: `Error Fetching User ${username}` });
        }
        return res.json({userDetails});
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
}

const updateUserDetails = async (req, res) => {
    const { updateUser } = req.body;
    try {
        const user = await User.findOne({ username: updateUser.username});
        bcrypt.compare(updateUser.password, user.password, async (err, result) => {
            if (err || !result) {
                return res.status(401).json({ error: 'Invalid password' });
            } else {
                updateUser.password = user.password;
                const result = await User.updateOne(user, updateUser);
                return res.json(`${result.modifiedCount} document(s) updated!`);
            }
        })
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
}

module.exports = { getProfile, updateUserDetails };