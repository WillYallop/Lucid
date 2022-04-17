import db from '../../db';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { __generateErrorString } from '../../functions/shared';
import { __updateSetQueryGen } from '../shared/functions';

const path = require('path');
const config = require(path.resolve("./lucid.config.js"));

const __generateToken = (_id: usr_userModel["_id"], username: usr_userModel["username"], privilege: usr_userModel["privilege"]) => {
    try {
        const tokenData = {
            _id: _id,
            username: username,
            privilege: privilege
        };
        const token = jsonwebtoken.sign(tokenData, config.key, {
            expiresIn: "7d"
        });
        return token;
    }
    catch(err) {
        throw err;
    }
}


// Handle create a new user
export const createUser = async (data: cont_aut_createUserInp) => {
    try {
        const { exists } = await db.one('SELECT EXISTS(SELECT 1 FROM users WHERE username=$1)', data.username);
        if(!exists) {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const userRes = await db.one('INSERT INTO users(username, password, privilege) VALUES(${username}, ${password}, ${privilege}) RETURNING *', {
                username: data.username,
                password: hashedPassword,
                privilege: data.privilege
            });
            return {
                created: true,
                user: userRes
            };
        }
        else {
            return {
                created: false
            }
        }
    }
    catch(err) {
        throw err;
    }
}

// Handle signing in
export const signIn = async (data: cont_aut_signInInp) => {
    try {
        const user: usr_userModel = await db.oneOrNone('SELECT * FROM users WHERE username=$1', data.username);
        if(user !== undefined) {
            const comparePass = await bcrypt.compare(data.password, user.password);
            if(comparePass) {
                return {
                    success: true,
                    token: __generateToken(user._id, user.username, user.privilege),
                    _id: user._id,
                    defualt_details: user.defualt_details
                }
            }
            else {
                return {
                    success: false
                }
            }
        } 
        else {
            return {
                success: false
            }
        }
    }
    catch(err) {
        throw err;
    }
}

export const firstSignInUpdateDetails = async (data: cont_aut_firstSignInInp) => {
    try {
        const user: usr_userModel = await db.oneOrNone('SELECT * FROM users WHERE _id=$1', data._id);
        if(user !== undefined) {
            if(user.defualt_details) {
                const hashedPassword = await bcrypt.hash(data.password, 10);
                const userData = {
                    username: data.username,
                    password: hashedPassword,
                    email: data.email,
                    defualt_details: false
                }
                await db.none(`UPDATE users SET ${__updateSetQueryGen(userData)} WHERE _id='${data._id}'`, userData);
                return {
                    success: true,
                    _id: user._id,
                    token: __generateToken(user._id, data.username, user.privilege)
                }
            }
            else {
                throw  __generateErrorString({
                    code: 401,
                    message: 'you are not authorised to update the users details',
                    origin: 'firstSignInUpdateDetails'
                })
            }
        }
        else {
            return {
                success: false
            }
        }
    }
    catch(err) {
        throw err;
    }
}