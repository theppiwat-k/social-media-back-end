const { activatedUser } = require('../../services/users.services');

module.exports.activatedUserController = async (req, res, next) => {
    activatedUser(req.query, (error) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: 'Success, You can login now',
        });
    });
};
