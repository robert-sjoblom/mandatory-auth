const axios         = require('axios');
const MockAdapter   = require('axios-mock-adapter');

// ...

const mock = new MockAdapter(axios);

// ...
// Example of user credentials to match against incoming credentials.
const username = 'me@domain.com';
const password = 'password';

// list of friends to return when the route /api/friends is invoked.
const friends  = ['alice', 'bob'] 

// the hardcoded JWT access token you created @ jwt.io.
const token = '';

// ...

// /api/auth
mock.onPost('/api/auth').reply(config => {
    const body // object
        = JSON.parse(config.data);

    // return ...
});

mock.onGet('/api/friends').reply(config => {
    const {
        headers // object
    } = config;

    // return ...
});

// if a request in not handled in the mocks above, this will return a generic 400 response.
mock.onAny().reply(400, { error: 'Unsupported request' });

// ...

export default axios;