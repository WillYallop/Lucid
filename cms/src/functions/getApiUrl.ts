const getApiUrl = () => {
    const location = window.location;
    const uri = `${location.protocol}//${location.hostname}${ location.port ? `:${location.port}` : '' }/api/v1`;
    return uri;
}

export default getApiUrl;