import { NextFunction, Response, Request } from 'express';
import db from '../db';
const path = require('path');

// Check database connection middleware
export default (req: Request, res: Response, next: NextFunction) => {
    db.connect()
    .then((obj: any) => {
        next();
    })
    .catch((error: any) => {
        res.sendFile(path.join(__dirname, '../../templates/connect_db.html'));
    });
}