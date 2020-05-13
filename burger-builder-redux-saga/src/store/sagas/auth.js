import { put, call, delay } from "redux-saga/effects";
import axios from "axios";

import * as actions from "../actions/index";

// function 后面加上* 是SE6新特性, 是一种新的function, 我们叫generator
// 这种function是可以暂停的, 如果在这里面运行async, 可以等这个async运行完之后再进行下一步 
export function* logoutSaga(action) {
  // yield 就是等这一条执行完了才能进行下一条
  // yield localStorage.removeItem('token');
  // yield localStorage.removeItem('expirationDate');
  // yield localStorage.removeItem('userId');
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "expirationDate");
  yield call([localStorage, "removeItem"], "userId");
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}


export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };
  let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBjhVQbauE0J3KpFM2g_maLSkD442DSAtE';
  if (!action.isSignup) {
    url =
     'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBjhVQbauE0J3KpFM2g_maLSkD442DSAtE';
  }
  try {
    const response = yield axios.post(url, authData);

    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );
    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}
