// KEY: data_auth_

// -----------------------------------
// sign in
interface data_auth_signInQuery {
    query: {
        authentication: {
            sign_in: {
                __args: {
                    username: string
                    password: string
                }
                success: boolean
                defualt_details: boolean
                _id: boolean
            }
        }
    }
}
interface data_auth_signInQueryRes {
    data: {
        authentication: {
            sign_in: {
                success: boolean
                defualt_details: boolean
                _id: string
            }
        }
    }
    errors: Array<{
        message: string
    }>
}

// -----------------------------------
// sign in and update
interface data_auth_signInAndUpdateQuery {
    mutation: {
        authentication: {
            sign_in_update: {
                __args: {
                    _id: string
                    email: string
                    username: string
                    password: string
                }
                success: boolean
            }
        }
    }
}
interface data_auth_signInAndUpdateQueryRes {
    data: {
        authentication: {
            sign_in_update: {
                success: boolean
            }
        }
    }
    errors: Array<{
        message: string
    }>
}