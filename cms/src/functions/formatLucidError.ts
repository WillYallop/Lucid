// Example lucid error message
// Unexpected error value: "Lucid Error! Code: 403, Origin: contentTypeController.saveSingle, Message: Content type with name \"test_repeater\" has already been registered.!"

interface formatLucidErrorRes { 
    message: string
    code: string 
}

const formatLucidError = (error: string): formatLucidErrorRes => {
    if(error.includes('Lucid Error')) {
        //message
        let message = error.split('Message:')[1];
        message = message.substring(0, message.length - 1);
        message = message.replace(/\\"/g, '"');
        // code
        let code = error.split('Code:')[1];
        code = code.split(', Origin:')[0];
        return {
            message: message,
            code: code
        }
    }
    else {

        switch(error) {
            case 'duplicate key value violates unique constraint "pages_slug_key"': {
                return {
                    message: 'this page slug is already in use for another page, please change it!',
                    code: '409'
                }
            }
            default: {
                return {
                    message: error,
                    code: '409'
                }
            }
        }


    }
}

export default formatLucidError;