// KEY: data_utility_

// -----------------------------------
// ping api
interface data_utility_pingQuery {
    query: {
        utility: {
            ping: {
                __args: {}
                recieved: boolean
            }
        }
    }
}
interface data_utility_pingQueryRes {
    data: {
        utility: {
            ping: {
                recieved: boolean
            }
        }
    }
    errors: Array<{
        message: string
    }>
}