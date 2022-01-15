const getApiUrl = () => {
    let uri;
    if(window.location.hostname === 'localhost') {
        uri = `http://api.lucid.local/auth`;
    }
    else {
        const location = window.location;
        uri = `${location.protocol}//${location.hostname.replace('cms.', 'api.')}/auth`;
        console.log(uri);
    }
    return uri;
}

export default getApiUrl;