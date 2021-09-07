import MockAdapter from 'axios-mock-adapter';
import mockAuth from '../../app/pages/auth/__mocks__/mock-auth';

export default function mockAxios(axios: any) {
    const mock = new MockAdapter(axios, {delayResponse: 300});
    mockAuth(mock);
    return mock;
}
