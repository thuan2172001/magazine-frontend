import userTableMock from './user-table-mck';
import {CREDENTIAL_URL, REQUEST_PASSWORD_URL} from '../_redux/auth.service';

export default function mockAuth(mock: any) {
  mock.onPost(CREDENTIAL_URL).reply(({data}: any) => {
    const {email, password} = JSON.parse(data);
    
    if (email && password) {
      const user = userTableMock.find(
        x => x.email.toLowerCase() === email.toLowerCase() && x.password === password,
      );
      
      if (user) {
        return [200, {...user, password: undefined}];
      }
    }
    
    return [400];
  });
  
  mock.onPost(REQUEST_PASSWORD_URL).reply(({data}: any) => {
    const {email} = JSON.parse(data);
    
    if (email) {
      const user: any = userTableMock.find(x => x.email.toLowerCase() === email.toLowerCase());
      
      if (user) {
        user.password = undefined;
        
        return [200, {...user, password: undefined}];
      }
    }
    
    return [400];
  });
  
  // mock.onGet(ME_URL).reply(({ headers: { Authorization } }) => {
  //   const accessToken =
  //     Authorization && Authorization.startsWith('Bearer ') && Authorization.slice('Bearer '.length);
  //
  //   if (accessToken) {
  //     const user = userTableMock.find(x => x.accessToken === accessToken);
  //
  //     if (user) {
  //       return [200, { ...user, password: undefined }];
  //     }
  //   }
  //
  //   return [401];
  // });
  function generateUserId() {
    const ids = userTableMock.map(el => el.id);
    const maxId = Math.max(...ids);
    return maxId + 1;
  }
}
