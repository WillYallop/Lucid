// Key: core_

// Initiliase config param
declare interface core_initConfig {
    directories: {
        readonly theme: string
    }
}

// Error Message
interface core_errorMsg {
    code: number
    origin?: string
    title: string
    message: string
}