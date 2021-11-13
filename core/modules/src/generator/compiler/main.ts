{
    
    const { willpressEle } = require('./elements')

    const elements = [
        { tag: 'willpressHead', regex: /<willpressHead>/i },
        { tag: 'willpress', regex: /<willpress>/i },
        { tag: 'willpressFooter', regex: /<willpressFooter>/i }
    ]

    const compilePage = async (data: gen_compilePage) => {
        try {
            var markup = data.template.markup;
            // Build markup if needed and replace elements in tempalte markup.
            for(const element of elements) {
                switch(element.tag) {
                    case 'willpressHead': {
                        // add seo
                        // add others
                        markup = markup.replace(element.regex, data.head);
                        break;
                    }
                    case 'willpress': {
                        let component = await willpressEle(element.regex, data.components);
                        markup = markup.replace(element.regex, component);
                        break;
                    }
                    case 'willpressFooter': {
                        markup = markup.replace(element.regex, data.footer);
                        break;
                    }
                }
            }
            return markup
        }
        catch(err) {
            throw(err);
        }
    }

    module.exports = {
        compilePage
    }

}