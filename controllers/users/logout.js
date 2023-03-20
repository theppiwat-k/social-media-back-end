const { logout } = require('../../services/users.services');

module.exports.logoutController = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    logout(token, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: 'Success',
            data: results,
        });
    });
};
