// KEY com_

// Register component
interface com_registerCompInp {
    name: string,
    description: string,
    file_name: string,
    image?: string
}

interface com_registerComponentRes {
    valid: boolean,
    component?: com_componentObj,
    errors: Array<com_registerErrorResponse>
}
interface com_registerErrorResponse {
    code: string,
    msg: string
}

// Get registered components
interface com_registeredComponentRes {
    has_components: boolean,
    unregistered: Array<string>,
    registered: Array<com_componentObj | string>
}

// Unregister component
interface com_unregisterComponentRes {
    has_components: boolean,
    unregistered: Array<string>
}