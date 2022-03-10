export const cmdDevOrgin = 'http://192.168.1.104:7344';

const getApiUrl = () => {
    const location = window.location;
    if (location.origin === 'http://localhost:3000') {
        return `${cmdDevOrgin}/api/v1`;
    } else {
        return `${location.protocol}//${location.hostname}${ location.port ? `:${location.port}` : '' }/api/v1`;
    }
}

export default getApiUrl;