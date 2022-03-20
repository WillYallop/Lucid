import { NextFunction, Response, Request } from 'express';
import db from '../db';
const path = require('path');

// Check database connection middleware
export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const connection = await db.connect();
        connection.done();
        return next();
    }
    catch(err) {
        res.sendFile(path.join(__dirname, '../../templates/connect_db.html'));
    }
}