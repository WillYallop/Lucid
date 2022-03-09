const getApiUrl = () => {
    const location = window.location;
    if (location.origin === 'http://localhost:3000') {
        return `http://192.168.1.103:7344/api/v1`
    } else {
        return `${location.protocol}//${location.hostname}${ location.port ? `:${location.port}` : '' }/api/v1`;
    }
}

export default getApiUrl;