const bcrypt = require('bcryptjs');
const { register } = require('../../services/users.services');

module.exports.registerController = async (req, res, next) => {
    const { password } = req.body;

    const salt = await bcrypt.genSaltSync(10);

    req.body.password = await bcrypt.hashSync(password, salt);

    register(req.body, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: 'Success, We have sent email for validate your account',
            data: results,
        });
    });
};
