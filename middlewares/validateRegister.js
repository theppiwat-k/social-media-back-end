const { login } = require('../services/users.services');

module.exports = async (req, res, next) => {
    await login(req.body, (error, results) => {
        if (error) {
            return next(error);
        }
        const status = results.active.status;
        if (!status) {
            return res.status(400).send({
                message: 'Failed, This email is invalid',
            });
        }
        return next();
    });
};
