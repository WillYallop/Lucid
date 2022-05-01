import { NextFunction, Response, Request } from 'express';
import jsonwebtoken from 'jsonwebtoken';

const path = require('path');
const config = require(path.resolve("./lucid.config.js"));


// Check auth
export default (req: any, res: Response, next: NextFunction) => {
    // Then try standard auth check
    try {
        const token = req.signedCookies['authCookie']
        if(token != undefined) {
            const decoded = jsonwebtoken.verify(token, config.key);
            req.jwt_decoded = {
                authorised: true,
                data: decoded
            };
            return next();
        }
        else {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
    }
    catch(error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}