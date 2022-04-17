// Key: cont_auth_

interface cont_aut_createUserInp {
    username: usr_userModel["username"]
    password: usr_userModel["password"]
    privilege: usr_userModel["privilege"]
}

interface cont_aut_signInInp {
    username: usr_userModel["username"]
    password: usr_userModel["password"]
}

interface cont_aut_firstSignInInp {
    _id: usr_userModel["_id"]
    username: usr_userModel["username"]
    password: usr_userModel["password"]
    email: usr_userModel["email"]
}