import db from '../../db';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

const path = require('path');
const config = require(path.resolve("./lucid.config.js"));

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
        const user: usr_userModel = await db.one('SELECT * FROM users WHERE username=$1', data.username);;
        if(user != undefined) {
            const comparePass = await bcrypt.compare(data.password, user.password);
            if(comparePass) {
                const tokenData = {
                    _id: user._id,
                    username: user.username,
                    privilege: user.privilege
                };
                const token = jsonwebtoken.sign(tokenData, config.jwt_key, {
                    expiresIn: "7d"
                });
                return {
                    success: true,
                    token: token   
                }
            }
            else {
                return {
                    success: false
                }
            }
        }
    }
    catch(err) {
        throw err;
    }
}