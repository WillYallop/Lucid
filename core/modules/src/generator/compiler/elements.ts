{

    interface componentInp {
        id: string,
        markup: string
    }

    const willpressEle = async (regex: string, components: Map<string, componentInp>) => {
        var componentsString: string = '';
        for (const [key, value] of components.entries()) {
            componentsString += value.markup
        }
        return componentsString
    }

    module.exports = {
        willpressEle
    }

}