const { verify } = require('jsonwebtoken');
const { ERROR } = require('./respon');

module.exports = {
    userToken: (req, res, next) => {
        let token = req.get("authorization");
        if(!token) return ERROR(res, 409, "Access Denied!");
        token = token.slice(7);

        verify(token, process.env.APP_KEY, {algorithms: "HS256"}, (error, decoded) => {
            if(error) return ERROR(res, 500, error);

            if(!decoded.user.id_user) return ERROR(res, 409, "account is not user")
            req.decoded = decoded;
            next();
        })
    }
}