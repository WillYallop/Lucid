// KEY: data_auth_

// -----------------------------------
// get single component
interface data_auth_signInQuery {
    query: {
        authentication: {
            sign_in: {
                __args: {
                    username: string,
                    password: string
                }
                success: boolean
            }
        }
    }
}
interface data_auth_signInQueryRes {
    data: {
        authentication: {
            sign_in: {
                success: boolean
            }
        }
    }
    errors: Array<{
        message: string
    }>
}