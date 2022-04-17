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
            req.jwt_decoded = {
                authorised: false,
                data: {}
            };
            return next();
        }
    }
    catch(error) {
        req.jwt_decoded = {
            authorised: false,
            data: {}
        };
        return next();
    }
}