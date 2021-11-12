{
    
    const { willpressEle } = require('./elements')

    const elements = [
        { tag: 'willpressHead', regex: /<willpressHead>/i },
        { tag: 'willpress', regex: /<willpress>/i },
        { tag: 'willpressFooter', regex: /<willpressFooter>/i }
    ]


    const unescapeMarkup = async (markup: string) => {
        return markup.replace(/\r?\n|\rs/g, '');
    }

    // public
    interface compilePageInp {
        template: {
            markup: string
        },
        components: string,
        head: string,
        footer: string
    }
    const compilePage = async (data: compilePageInp) => {
        var markup = data.template.markup;
        for(const element of elements) {
            switch(element.tag) {
                case 'willpressHead': {
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

    module.exports = {
        compilePage,
        unescapeMarkup
    }

}