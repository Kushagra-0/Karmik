const User = require('../model/User');

const updateUserName = async (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.name = name;
        await user.save();
        return res.status(200).json({ msg: 'User name updated successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

module.exports = {
    updateUserName,
}