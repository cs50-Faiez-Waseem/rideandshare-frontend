import { UserLogin, UserRegister } from '@/types/register.type';
import fetcher from '@/utils/fetcher';
const ACCESS_TOKEN_KEY = '@userAuthSessionKey';

const register = (user: UserRegister, callback: Function) => {
  let formdata = new FormData();
  formdata.append('username', user.name);
  formdata.append('email', null); // can be null
  formdata.append('password', user.password);
  formdata.append('phoneNo', user.phoneNo);
  formdata.append('avatar', null); // can be null
  formdata.append('phoneNoVerfication', user.isVerify);

  const res = fetcher('user/register', {
    method: 'POST',
    body: formdata,
  });
  res.then(async (response) => {
    console.log(response);
    if (response.data) {
      await localStorage.setItem(ACCESS_TOKEN_KEY, response.access_token);
      callback({
        isRegisterd: true,
        data: response.data,
      });
    } else {
      callback({
        isRegisterd: false,
        data: response,
      });
    }
  });

  res.catch((err) => {
    callback({
      isRegisterd: false,
      data: err,
    });
  });
};
const login = (user: UserLogin, callback: Function) => {
  let formdata = new FormData();
  formdata.append('phoneNo', user.phoneNo);
  formdata.append('password', user.password);
  fetcher('user/login', {
    method: 'POST',
    body: formdata,
  })
    .then(async (res) => {
      console.log(res);
      if (res.access_token) {
        await localStorage.setItem(ACCESS_TOKEN_KEY, res.access_token);
        callback({
          isRegisterd: true,
          data: res.message,
        });
      } else {
        callback({
          isRegisterd: false,
          data: res.message,
        });
      }
    })
    .catch((err) => {
      callback({
        isRegisterd: false,
        data: err,
      });
    });
};
async function logOut(callback) {
  const access_token = await retrieveUserSession();
  if (access_token) {
    fetcher('user/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: 'application/json',
      },
    }).then(async (res) => {
      await localStorage.removeItem(ACCESS_TOKEN_KEY);
      callback(res);
    });
  }
}

async function retrieveUserSession(): Promise<any> {
  try {
    const session = await localStorage.getItem(ACCESS_TOKEN_KEY);

    if (session !== undefined) {
      return session;
    }
    return null;
  } catch (error) {
    // There was an error on the native side
    return null;
  }
}
export { register, retrieveUserSession, login, logOut };
