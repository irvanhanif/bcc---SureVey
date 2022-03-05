module.exports = {
    SUCCESS : (res, status, data) => {
        return res.status(status).json({
            success: true,
            data: data
        });
    },
    ERROR : (res, status, message) => {
        return res.status(status).json({
            success: false,
            data: null,
            message: message
        });
    }
}