const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// ...

const mock = new MockAdapter(axios);

// ...
// Example of user credentials to match against incoming credentials.
const username = 'me@domain.com';
const password = 'password';

// list of friends to return when the route /api/friends is invoked.
const friends = ['alice', 'bob']

// the hardcoded JWT access token you created @ jwt.io.
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UifQ.DjwRE2jZhren2Wt37t5hlVru6Myq4AhpGLiiefF69u8';

// ...

// /api/auth
mock.onPost('/api/auth').reply(config => {
    const body = JSON.parse(config.data);

    let response;
    if (body.username === username && body.password === password) {
        response = [200, { token }]
    } else {
        response = [401, { error: 'Invalid user credentials' }]
    }
    return response;
});

mock.onGet('/api/friends').reply(config => {
    const {
        headers // object
    } = config;

    let response;
    if (headers.Authorization && headers.Authorization === token) {
        response = [200, { friends }]
    } else if (headers.Authorization) {
        response = [401, { error: 'Unauthorized access token' }]
    } else {
        response = [400, { error: 'No authorization header' }]
        
        /*
        400 is bad request, request was incorrectly formatted.
        everything in 400 range is client error.
        401 is unauthorized but the request was correctly formatted.
        error codes are important, only way to tell what happens.
        expects proper error code usage.
        
        500 range is server-side errors of various kinds.        
        */
    }
    return response;
});

// if a request in not handled in the mocks above, this will return a generic 400 response.
mock.onAny().reply(400, { error: 'Unsupported request' });

// ...

export default axios;
