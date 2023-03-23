const { updateUserProfile } = require('../../services/users.services');

module.exports.updateUserProfileController = (req, res, next) => {

    updateUserProfile(req, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: 'Success',
            data: results,
        });
    });
};
