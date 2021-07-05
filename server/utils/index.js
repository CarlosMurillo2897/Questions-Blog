export const handleError = (err, res) => {
    res.status(500).json({
        message: 'An error occurred.',
        error
    });
};

export const handleLoginFailed = (res, message) => 
    res.status(401).json({
        message: 'Login failed.',
        error: message || 'Email and Password do not match.',
});