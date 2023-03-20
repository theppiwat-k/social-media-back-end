const { getToken } = require('../../services/tokens.services');

module.exports.getTokenController = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    getToken(token, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: 'Success',
            data: results,
        });
    });
};
