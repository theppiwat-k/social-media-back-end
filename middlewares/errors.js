module.exports.errorHandler = (err, req, res) => {
    if (typeof err === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        const message = err.errors.email.properties.message;
        return res.status(400).json({ message: message });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Token not valid' });
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
};
